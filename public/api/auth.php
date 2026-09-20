<?php
/**
 * Nam Nilam Admin Authentication API
 */

require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $passcode = isset($data['passcode']) ? trim($data['passcode']) : '';
    $username = isset($data['username']) ? trim($data['username']) : 'admin';

    // Accepted passcodes: '97876' or 'namnilam@2026' or 'admin123'
    if ($passcode === '97876' || $passcode === 'namnilam@2026' || $passcode === 'admin123' || ($username === 'admin' && $passcode === '9787600006')) {
        $token = 'nn_adm_' . bin2hex(random_bytes(16));
        echo json_encode([
            'success' => true,
            'message' => 'Authentication successful',
            'token' => $token,
            'user' => [
                'username' => 'admin',
                'role' => 'Super Administrator',
                'desk' => 'Nam Nilam Central Operations'
            ]
        ]);
        exit();
    }

    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid passcode. Please enter the authorized Nam Nilam Admin PIN.'
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
