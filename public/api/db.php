<?php
/**
 * Nam Nilam Database Connection Helper
 * Supports Hostinger MySQL (u665690797_nncpro) with local SQLite fallback for dev
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
    $db_host = 'localhost'; // In Hostinger, internal host is localhost
    $db_name = 'u665690797_nncpro';
    $db_user = 'u665690797_nncpro';
    $db_pass = 'NamNilam@2026'; // Default or configured in cpanel

    try {
        $dsn = "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4";
        $pdo = new PDO($dsn, $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 3
        ]);
        return $pdo;
    } catch (PDOException $e) {
        // Fallback to local SQLite database for local offline development or if MySQL is unreachable
        try {
            $sqlite_path = __DIR__ . '/local_namnilam.sqlite';
            $pdo = new PDO("sqlite:" . $sqlite_path, null, null, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);

            // Initialize SQLite schema if fresh
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
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

            // Seed if empty
            $count = $pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn();
                $seedProjects = [
                    ['proj-1', 'Jai Nagar', 'jai-nagar', 'Airport Corridor, Trichy', 'DTCP Approved Residential Layout', 1450, '₹18.0 Lakhs', 'Ready to Register', 'DTCP & RERA Approved', 52, 16, 'Grand Gated Arch, 40ft Tar Roads, 24/7 Security, 3-Phase Electricity, LED Lights', 'Prime DTCP-approved residential layout situated on the thriving Trichy Airport growth corridor with 100% clear parent documents.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', 1, 1],
                    ['proj-2', 'Abirami Nagar', 'abirami-nagar', 'Thiruvanaikoil Corridor, Trichy', 'Premium Residential Villa Plots', 1750, '₹22.0 Lakhs', 'Ready to Register', 'DTCP Approved', 45, 12, 'Cement Concrete Roads, Stormwater Drains, Street Lights, River Basin Sweet Water', 'Exclusive residential community located in the historic temple corridor of Thiruvanaikoil with Kaveri river basin water table.', 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80', 1, 2],
                    ['proj-3', 'Farm Land', 'farm-land', 'Trichy Suburbs', 'Agro & Organic Farm Plots', 650, '₹15.0 Lakhs', 'Available', 'Verified Agricultural Title', 28, 9, 'Perimeter Fencing, Common Borewell, Drip Irrigation, On-Site Caretaker', 'Fertile managed agricultural plots designed for organic farming, weekend retreat farmhouses, and long-term capital appreciation.', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', 1, 3],
                    ['proj-4', 'Sentha City', 'sentha-city', 'Samayapuram - NH 45, Trichy', 'Integrated Gated Community Plots', 1850, '₹24.0 Lakhs', 'Ready to Register', 'DTCP & RERA Approved', 60, 18, 'Grand Entry Gateway, 40ft & 33ft Wide Tar Roads, Children Play Area, Tree Avenues', 'Modern integrated township layout located directly off the Chennai-Trichy National Highway (NH-45) near Samayapuram.', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80', 1, 4],
                    ['proj-5', 'Kasinath Nagar', 'kasinath-nagar', 'Kallanai Road, Trichy', 'Approved Residential Layout', 1550, '₹19.5 Lakhs', 'Ready to Register', 'DTCP Approved Layout', 40, 11, 'Compound Wall, Secure Gates, Underground Stormwater Drains, Community Park', 'Situated along picturesque Kallanai Road connecting Trichy and Grand Anicut with pristine groundwater at 18 feet.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 5]
                ];

                $stmt = $pdo->prepare("INSERT INTO projects (id, title, slug, location, type, price_per_sqft, starting_price, status, approval, total_units, available_units, amenities, description, image_url, featured, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                foreach ($seedProjects as $p) {
                    $stmt->execute($p);
                }
            }

            return $pdo;
        } catch (Exception $fallbackEx) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Database connection failed: ' . $fallbackEx->getMessage()
            ]);
            exit();
        }
    }
}
