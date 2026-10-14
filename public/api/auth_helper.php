<?php
/**
 * Nam Nilam Authentication & Security Helper
 * Provides cryptographically secure JWT issuance, HMAC validation, and rate limiting
 */

require_once __DIR__ . '/config.php';

if (!function_exists('getJwtSecret')) {
    function getJwtSecret() {
        $secret = getAppConfig('JWT_SECRET');
        if (!empty($secret)) {
            $trimmed = trim((string)$secret);
            // Require minimum 32 characters and reject default documentation placeholder
            if (strlen($trimmed) >= 32 && $trimmed !== 'replace_with_a_secure_random_64_character_hex_or_string') {
                return $trimmed;
            }
        }
        // Fail securely: Zero predictable fallbacks. Do not issue or accept tokens without configured strong secret.
        return null;
    }
}

if (!function_exists('base64UrlEncode')) {
    function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}

if (!function_exists('base64UrlDecode')) {
    function base64UrlDecode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}

if (!function_exists('generateAdminToken')) {
    function generateAdminToken($username = 'admin', $role = 'Super Administrator') {
        $secret = getJwtSecret();
        if (empty($secret)) {
            error_log('Security Error: JWT_SECRET is missing, empty, or under 32 characters. Token issuance denied.');
            return null;
        }
        $header = base64UrlEncode(json_encode([
            'alg' => 'HS256',
            'typ' => 'JWT'
        ]));
        $payload = base64UrlEncode(json_encode([
            'sub' => $username,
            'role' => $role,
            'iat' => time(),
            'exp' => time() + (86400 * 2) // Valid for 48 hours
        ]));
        $signature = base64UrlEncode(hash_hmac('sha256', "{$header}.{$payload}", $secret, true));
        return "{$header}.{$payload}.{$signature}";
    }
}

if (!function_exists('getAuthorizationHeader')) {
    function getAuthorizationHeader() {
        if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
            return trim($_SERVER['HTTP_AUTHORIZATION']);
        }
        if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            return trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
        }
        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            if (!empty($headers['Authorization'])) {
                return trim($headers['Authorization']);
            }
            if (!empty($headers['authorization'])) {
                return trim($headers['authorization']);
            }
        }
        return '';
    }
}

if (!function_exists('validateAdminToken')) {
    function validateAdminToken() {
        $secret = getJwtSecret();
        if (empty($secret)) {
            // Fail securely: reject all tokens if secret is not configured
            return null;
        }

        $authHeader = getAuthorizationHeader();
        if (empty($authHeader)) {
            return null;
        }

        if (!preg_match('/Bearer\s+(\S+)$/i', $authHeader, $matches)) {
            return null;
        }

        $token = trim($matches[1]);
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        list($headerB64, $payloadB64, $sigB64) = $parts;

        // Algorithm validation: must strictly be HS256
        $headerJson = base64UrlDecode($headerB64);
        if ($headerJson === false) {
            return null;
        }
        $header = json_decode($headerJson, true);
        if (!$header || !is_array($header) || !isset($header['alg']) || $header['alg'] !== 'HS256') {
            return null;
        }
        if (isset($header['typ']) && strtoupper($header['typ']) !== 'JWT') {
            return null;
        }

        // Constant-time HMAC signature verification
        $expectedSig = base64UrlEncode(hash_hmac('sha256', "{$headerB64}.{$payloadB64}", $secret, true));
        if (!hash_equals($expectedSig, $sigB64)) {
            return null;
        }

        // Payload validation
        $payloadJson = base64UrlDecode($payloadB64);
        if ($payloadJson === false) {
            return null;
        }
        $payload = json_decode($payloadJson, true);
        if (!$payload || !is_array($payload)) {
            return null;
        }

        // Expiration check
        if (!isset($payload['exp']) || !is_numeric($payload['exp']) || $payload['exp'] < time()) {
            return null;
        }

        // Issued-at sanity check (reject future-dated tokens)
        if (isset($payload['iat']) && is_numeric($payload['iat']) && $payload['iat'] > time() + 300) {
            return null;
        }

        // Role check
        if (!isset($payload['role']) || empty($payload['role'])) {
            return null;
        }

        return $payload;
    }
}

if (!function_exists('requireAdminAuth')) {
    function requireAdminAuth() {
        $admin = validateAdminToken();
        if (!$admin) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'error' => 'Unauthorized. A valid administrative session token is required to perform this action.'
            ]);
            exit();
        }
        return $admin;
    }
}

if (!function_exists('checkLoginRateLimit')) {
    function checkLoginRateLimit($ip) {
        $lockFile = sys_get_temp_dir() . '/nn_rate_' . md5($ip) . '.json';
        if (file_exists($lockFile)) {
            $data = json_decode(@file_get_contents($lockFile), true);
            if ($data && isset($data['count'], $data['last_attempt'])) {
                if (time() - $data['last_attempt'] > 900) {
                    @unlink($lockFile);
                    return true;
                }
                if ($data['count'] >= 5) {
                    return false;
                }
            }
        }
        return true;
    }
}

if (!function_exists('recordFailedLoginAttempt')) {
    function recordFailedLoginAttempt($ip) {
        $lockFile = sys_get_temp_dir() . '/nn_rate_' . md5($ip) . '.json';
        $count = 1;
        if (file_exists($lockFile)) {
            $data = json_decode(@file_get_contents($lockFile), true);
            if ($data && isset($data['count'], $data['last_attempt'])) {
                if (time() - $data['last_attempt'] <= 900) {
                    $count = $data['count'] + 1;
                }
            }
        }
        @file_put_contents($lockFile, json_encode([
            'count' => $count,
            'last_attempt' => time()
        ]), LOCK_EX);
    }
}

if (!function_exists('resetLoginRateLimit')) {
    function resetLoginRateLimit($ip) {
        $lockFile = sys_get_temp_dir() . '/nn_rate_' . md5($ip) . '.json';
        if (file_exists($lockFile)) {
            @unlink($lockFile);
        }
    }
}
