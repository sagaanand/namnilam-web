<?php
/**
 * Nam Nilam Database Connection Helper
 * Supports Hostinger MySQL (u665690797_nncpro) with graceful fallback
 */

// Enable CORS for frontend API calls
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getDatabaseConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    // Hostinger MySQL Credentials
    $db_host = 'localhost';
    $db_name = 'u665690797_nncpro';
    $db_user = 'u665690797_nncpro';
    $db_pass = 'NamNilam@2026';

    try {
        $dsn = "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4";
        $pdo = new PDO($dsn, $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 2
        ]);
        return $pdo;
    } catch (Throwable $e) {
        // Try local SQLite if driver is available
        if (extension_loaded('pdo_sqlite')) {
            try {
                $sqlite_path = sys_get_temp_dir() . '/namnilam_local.sqlite';
                $pdo = new PDO("sqlite:" . $sqlite_path, null, null, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]);

                $pdo->exec("
                    CREATE TABLE IF NOT EXISTS leads (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        phone TEXT NOT NULL,
                        email TEXT,
                        form_type TEXT NOT NULL,
                        source_page TEXT NOT NULL,
                        referrer_url TEXT,
                        intent_purpose TEXT,
                        category TEXT DEFAULT 'General',
                        location TEXT DEFAULT 'Trichy',
                        message TEXT,
                        status TEXT DEFAULT 'new',
                        admin_notes TEXT,
                        ip_address TEXT,
                        user_agent TEXT,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    );

                    CREATE TABLE IF NOT EXISTS projects (
                        id TEXT PRIMARY KEY,
                        title TEXT NOT NULL,
                        slug TEXT UNIQUE NOT NULL,
                        location TEXT NOT NULL,
                        type TEXT DEFAULT 'Residential Plots',
                        price_per_sqft REAL DEFAULT 0,
                        starting_price TEXT DEFAULT '₹15 Lakhs',
                        status TEXT DEFAULT 'Ready to Register',
                        approval TEXT DEFAULT 'DTCP Approved',
                        total_units INTEGER DEFAULT 50,
                        available_units INTEGER DEFAULT 15,
                        amenities TEXT,
                        description TEXT,
                        image_url TEXT,
                        featured INTEGER DEFAULT 0,
                        display_order INTEGER DEFAULT 0,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    );
                ");

                return $pdo;
            } catch (Throwable $sqliteEx) {
                // Return null to fallback to static JSON
                return null;
            }
        }
        return null;
    }
}
