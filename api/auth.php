<?php
/**
 * Nam Nilam Admin Authentication API
 * Implements server-side authentication, rate limiting, and cryptographic token issuance
 */

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_helper.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '127.0.0.1';

    // Rate limiting: maximum 5 failed attempts per 15 minutes
    if (!checkLoginRateLimit($ip)) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'error' => 'Too many failed login attempts. Please wait 15 minutes before retrying.'
        ]);
        exit();
    }

    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $passcode = isset($data['passcode']) ? trim((string)$data['passcode']) : '';
    $username = isset($data['username']) ? trim((string)$data['username']) : 'admin';

    if (empty($passcode)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Passcode is required.'
        ]);
        exit();
    }

    $isAuthenticated = false;
    $role = 'Super Administrator';
    $pdo = getDatabaseConnection();

    // 1. Check against admins table in database if available
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ? LIMIT 1");
            $stmt->execute([$username]);
            $adminUser = $stmt->fetch();
            if ($adminUser && !empty($adminUser['password_hash'])) {
                if (password_verify($passcode, $adminUser['password_hash'])) {
                    $isAuthenticated = true;
                    $role = !empty($adminUser['role']) ? $adminUser['role'] : 'Super Administrator';
                }
            }
        } catch (Throwable $e) {
            // Fallthrough to environment check
        }
    }

    // 2. Check against environment-defined ADMIN_PASSCODE_HASH if set
    if (!$isAuthenticated) {
        $envHash = getAppConfig('ADMIN_PASSCODE_HASH');
        if (!empty($envHash) && password_verify($passcode, $envHash)) {
            $isAuthenticated = true;
        }
    }

    // 3. Fallback constant-time hash verification for authorized administrative passcodes
    if (!$isAuthenticated) {
        $authorizedHashes = [
            '5c45ad76d1c994d3952e25e8dc7033806aa41df4a5da60d111871c8179929292', // Primary authorized PIN
            '862e128eaa2e880d63c85ba1f9d97393995ae3b1e243e691c8adcd169d9daaad', // Desk PIN
            '5f1da9b3c3ed93e2480b2f4b27c8e9236c3a0cf2266b4ed22bd8aeee37cde818'  // Operations Passphrase
        ];
        $inputHash = hash('sha256', $passcode);
        foreach ($authorizedHashes as $authHash) {
            if (hash_equals($authHash, $inputHash)) {
                $isAuthenticated = true;
                break;
            }
        }
    }

    if ($isAuthenticated) {
        $token = generateAdminToken($username, $role);
        if (!$token) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Authentication service configuration error. Ensure JWT_SECRET is configured.'
            ]);
            exit();
        }
        resetLoginRateLimit($ip);

        echo json_encode([
            'success' => true,
            'message' => 'Authentication successful',
            'token' => $token,
            'user' => [
                'username' => $username,
                'role' => $role,
                'desk' => 'Nam Nilam Central Operations'
            ]
        ]);
        exit();
    }

    // Record failed attempt for rate limiting
    recordFailedLoginAttempt($ip);

    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid administrative credentials.'
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
