<?php
/**
 * Nam Nilam Application Configuration & Environment Loader
 * Loads sensitive credentials from server environment variables or uncommitted .env file.
 */

if (!function_exists('loadEnvFile')) {
    function loadEnvFile($envPath) {
        if (!file_exists($envPath) || !is_readable($envPath)) {
            return false;
        }
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            return false;
        }
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || $line[0] === '#' || (function_exists('str_starts_with') && str_starts_with($line, '#'))) {
                continue;
            }
            if (strpos($line, '=') !== false) {
                list($key, $val) = explode('=', $line, 2);
                $key = trim($key);
                $val = trim($val);
                // Strip surrounding single or double quotes
                $len = strlen($val);
                if ($len >= 2) {
                    if (($val[0] === '"' && $val[$len - 1] === '"') ||
                        ($val[0] === "'" && $val[$len - 1] === "'")) {
                        $val = substr($val, 1, -1);
                    }
                }
                if (!array_key_exists($key, $_SERVER) && !array_key_exists($key, $_ENV)) {
                    putenv("{$key}={$val}");
                    $_ENV[$key] = $val;
                    $_SERVER[$key] = $val;
                }
            }
        }
        return true;
    }
}

// Attempt to load .env from Hostinger document root, parent roots, or local dir
$envCandidatePaths = array_filter([
    isset($_SERVER['DOCUMENT_ROOT']) ? rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/.env' : null,
    dirname(dirname(__DIR__)) . '/.env',
    dirname(__DIR__) . '/.env',
    __DIR__ . '/.env'
]);
foreach ($envCandidatePaths as $candidate) {
    if (loadEnvFile($candidate)) {
        break;
    }
}

function getAppConfig($key, $default = null) {
    $val = getenv($key);
    if ($val !== false && $val !== '') {
        return $val;
    }
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        return $_ENV[$key];
    }
    if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') {
        return $_SERVER[$key];
    }
    return $default;
}
