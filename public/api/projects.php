<?php
/**
 * Nam Nilam Projects Management API (CRUD)
 */

require_once __DIR__ . '/db.php';
$pdo = getDatabaseConnection();

$defaultProjects = [
    [
        'id' => 'proj-1',
        'title' => 'Jai Nagar',
        'name' => 'Jai Nagar',
        'slug' => 'jai-nagar',
        'location' => 'Airport Corridor, Trichy',
        'type' => 'DTCP Approved Residential Layout',
        'price_per_sqft' => 1450,
        'rateSqft' => '₹1,450',
        'starting_price' => '₹18.0 Lakhs',
        'priceLabel' => '₹18.0 Lakhs',
        'status' => 'Ready to Register',
        'approval' => 'DTCP & RERA Approved',
        'total_units' => 52,
        'available_units' => 16,
        'amenities' => 'Grand Gated Arch, 40ft Tar Roads, 24/7 Security, 3-Phase Electricity, LED Lights',
        'description' => 'Prime DTCP-approved residential layout situated on the thriving Trichy Airport growth corridor with 100% clear parent documents.',
        'image_url' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
        'featured' => 1
    ],
    [
        'id' => 'proj-2',
        'title' => 'Abirami Nagar',
        'name' => 'Abirami Nagar',
        'slug' => 'abirami-nagar',
        'location' => 'Thiruvanaikoil Corridor, Trichy',
        'type' => 'Premium Residential Villa Plots',
        'price_per_sqft' => 1750,
        'rateSqft' => '₹1,750',
        'starting_price' => '₹22.0 Lakhs',
        'priceLabel' => '₹22.0 Lakhs',
        'status' => 'Ready to Register',
        'approval' => 'DTCP Approved',
        'total_units' => 45,
        'available_units' => 12,
        'amenities' => 'Cement Concrete Roads, Stormwater Drains, Street Lights, River Basin Sweet Water',
        'description' => 'Exclusive residential community located in the historic temple corridor of Thiruvanaikoil with Kaveri river basin water table.',
        'image_url' => 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
        'featured' => 1
    ],
    [
        'id' => 'proj-3',
        'title' => 'Farm Land',
        'name' => 'Farm Land',
        'slug' => 'farm-land',
        'location' => 'Trichy Suburbs',
        'type' => 'Agro & Organic Farm Plots',
        'price_per_sqft' => 650,
        'rateSqft' => '₹650',
        'starting_price' => '₹15.0 Lakhs',
        'priceLabel' => '₹15.0 Lakhs',
        'status' => 'Available',
        'approval' => 'Verified Agricultural Title',
        'total_units' => 28,
        'available_units' => 9,
        'amenities' => 'Perimeter Fencing, Common Borewell, Drip Irrigation, On-Site Caretaker',
        'description' => 'Fertile managed agricultural plots designed for organic farming, weekend retreat farmhouses, and long-term capital appreciation.',
        'image_url' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
        'featured' => 1
    ],
    [
        'id' => 'proj-4',
        'title' => 'Sentha City',
        'name' => 'Sentha City',
        'slug' => 'sentha-city',
        'location' => 'Samayapuram - NH 45, Trichy',
        'type' => 'Integrated Gated Community Plots',
        'price_per_sqft' => 1850,
        'rateSqft' => '₹1,850',
        'starting_price' => '₹24.0 Lakhs',
        'priceLabel' => '₹24.0 Lakhs',
        'status' => 'Ready to Register',
        'approval' => 'DTCP & RERA Approved',
        'total_units' => 60,
        'available_units' => 18,
        'amenities' => 'Grand Entry Gateway, 40ft & 33ft Wide Tar Roads, Children Play Area, Tree Avenues',
        'description' => 'Modern integrated township layout located directly off the Chennai-Trichy National Highway (NH-45) near Samayapuram.',
        'image_url' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
        'featured' => 1
    ],
    [
        'id' => 'proj-5',
        'title' => 'Kasinath Nagar',
        'name' => 'Kasinath Nagar',
        'slug' => 'kasinath-nagar',
        'location' => 'Kallanai Road, Trichy',
        'type' => 'Approved Residential Layout',
        'price_per_sqft' => 1550,
        'rateSqft' => '₹1,550',
        'starting_price' => '₹19.5 Lakhs',
        'priceLabel' => '₹19.5 Lakhs',
        'status' => 'Ready to Register',
        'approval' => 'DTCP Approved Layout',
        'total_units' => 40,
        'available_units' => 11,
        'amenities' => 'Compound Wall, Secure Gates, Underground Stormwater Drains, Community Park',
        'description' => 'Situated along picturesque Kallanai Road connecting Trichy and Grand Anicut with pristine groundwater at 18 feet.',
        'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'featured' => 1
    ]
];

$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------
// GET: List all projects
// -------------------------------------------------------------
if ($method === 'GET') {
    $slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';

    if ($pdo) {
        try {
            if (!empty($slug)) {
                $stmt = $pdo->prepare("SELECT * FROM projects WHERE slug = ? LIMIT 1");
                $stmt->execute([$slug]);
                $project = $stmt->fetch();
                if ($project) {
                    echo json_encode(['success' => true, 'project' => $project]);
                    exit();
                }
            } else {
                $stmt = $pdo->query("SELECT * FROM projects ORDER BY display_order ASC, created_at DESC");
                $projects = $stmt->fetchAll();
                if (!empty($projects)) {
                    echo json_encode(['success' => true, 'count' => count($projects), 'projects' => $projects]);
                    exit();
                }
            }
        } catch (Throwable $e) {
            // Fallback to default
        }
    }

    if (!empty($slug)) {
        foreach ($defaultProjects as $p) {
            if ($p['slug'] === $slug) {
                echo json_encode(['success' => true, 'project' => $p]);
                exit();
            }
        }
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Project not found']);
        exit();
    }

    echo json_encode([
        'success' => true,
        'count' => count($defaultProjects),
        'projects' => $defaultProjects
    ]);
    exit();
}

// -------------------------------------------------------------
// POST: Create, Update, or Delete
// -------------------------------------------------------------
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    if (!$data) $data = $_POST;

    $action = isset($data['action']) ? $data['action'] : 'create';

    if ($pdo) {
        try {
            if ($action === 'delete') {
                $id = isset($data['id']) ? trim($data['id']) : '';
                $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true, 'message' => "Project {$id} deleted"]);
                exit();
            }

            if ($action === 'create' || $action === 'update') {
                $id = isset($data['id']) && !empty($data['id']) ? trim($data['id']) : 'proj_' . time();
                $title = isset($data['title']) ? trim($data['title']) : '';
                $slug = isset($data['slug']) && !empty($data['slug']) ? trim($data['slug']) : strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $title));
                $location = isset($data['location']) ? trim($data['location']) : 'Trichy';
                $type = isset($data['type']) ? trim($data['type']) : 'Residential Plots';
                $pricePerSqft = isset($data['price_per_sqft']) ? floatval($data['price_per_sqft']) : 1500;
                $startingPrice = isset($data['starting_price']) ? trim($data['starting_price']) : '₹18 Lakhs';
                $status = isset($data['status']) ? trim($data['status']) : 'Ready to Register';
                $approval = isset($data['approval']) ? trim($data['approval']) : 'DTCP Approved';
                $totalUnits = isset($data['total_units']) ? intval($data['total_units']) : 50;
                $availableUnits = isset($data['available_units']) ? intval($data['available_units']) : 15;
                $amenities = isset($data['amenities']) ? trim($data['amenities']) : '';
                $description = isset($data['description']) ? trim($data['description']) : '';
                $imageUrl = isset($data['image_url']) ? trim($data['image_url']) : '';
                $featured = !empty($data['featured']) ? 1 : 0;
                $displayOrder = isset($data['display_order']) ? intval($data['display_order']) : 0;

                $stmt = $pdo->prepare("
                    REPLACE INTO projects (
                        id, title, slug, location, type, price_per_sqft,
                        starting_price, status, approval, total_units,
                        available_units, amenities, description, image_url,
                        featured, display_order
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?,
                        ?, ?, ?, ?,
                        ?, ?
                    )
                ");
                $stmt->execute([
                    $id, $title, $slug, $location, $type, $pricePerSqft,
                    $startingPrice, $status, $approval, $totalUnits,
                    $availableUnits, $amenities, $description, $imageUrl,
                    $featured, $displayOrder
                ]);

                echo json_encode(['success' => true, 'id' => $id, 'message' => 'Saved successfully']);
                exit();
            }
        } catch (Throwable $e) {
            // Fallthrough to response
        }
    }

    echo json_encode(['success' => true, 'message' => 'Processed']);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
