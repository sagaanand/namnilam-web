<?php
/**
 * Nam Nilam Projects Management API (CRUD)
 * Allows Admin to Add, Edit, View, and Delete Projects dynamically.
 */

require_once __DIR__ . '/db.php';
$pdo = getDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------
// GET: List all projects
// -------------------------------------------------------------
if ($method === 'GET') {
    $slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';

    if (!empty($slug)) {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE slug = ? LIMIT 1");
        $stmt->execute([$slug]);
        $project = $stmt->fetch();

        if ($project) {
            echo json_encode(['success' => true, 'project' => $project]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Project not found']);
        }
        exit();
    }

    $stmt = $pdo->query("SELECT * FROM projects ORDER BY display_order ASC, created_at DESC");
    $projects = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'count' => count($projects),
        'projects' => $projects
    ]);
    exit();
}

// -------------------------------------------------------------
// POST: Create, Update, or Delete project
// -------------------------------------------------------------
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $action = isset($data['action']) ? $data['action'] : 'create';

    // 1. DELETE PROJECT
    if ($action === 'delete') {
        $projectId = isset($data['id']) ? trim($data['id']) : '';
        if (!$projectId) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Project ID is required']);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$projectId]);

        echo json_encode([
            'success' => true,
            'message' => "Project {$projectId} deleted successfully"
        ]);
        exit();
    }

    // 2. UPDATE PROJECT
    if ($action === 'update') {
        $id = isset($data['id']) ? trim($data['id']) : '';
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Project ID is required']);
            exit();
        }

        $title = isset($data['title']) ? trim($data['title']) : '';
        $slug = isset($data['slug']) ? trim($data['slug']) : strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $title));
        $location = isset($data['location']) ? trim($data['location']) : 'Trichy';
        $type = isset($data['type']) ? trim($data['type']) : 'Residential Plots';
        $pricePerSqft = isset($data['price_per_sqft']) ? floatval($data['price_per_sqft']) : 0;
        $startingPrice = isset($data['starting_price']) ? trim($data['starting_price']) : '';
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
            UPDATE projects SET
                title = ?, slug = ?, location = ?, type = ?, price_per_sqft = ?,
                starting_price = ?, status = ?, approval = ?, total_units = ?,
                available_units = ?, amenities = ?, description = ?, image_url = ?,
                featured = ?, display_order = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $title, $slug, $location, $type, $pricePerSqft,
            $startingPrice, $status, $approval, $totalUnits,
            $availableUnits, $amenities, $description, $imageUrl,
            $featured, $displayOrder, $id
        ]);

        echo json_encode([
            'success' => true,
            'message' => "Project updated successfully",
            'id' => $id
        ]);
        exit();
    }

    // 3. CREATE PROJECT
    $title = isset($data['title']) ? trim($data['title']) : '';
    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Project title is required']);
        exit();
    }

    $id = isset($data['id']) && !empty($data['id']) ? trim($data['id']) : 'proj_' . time();
    $slug = isset($data['slug']) && !empty($data['slug']) ? trim($data['slug']) : strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $title));
    $location = isset($data['location']) ? trim($data['location']) : 'Trichy';
    $type = isset($data['type']) ? trim($data['type']) : 'Residential Plots';
    $pricePerSqft = isset($data['price_per_sqft']) ? floatval($data['price_per_sqft']) : 1500;
    $startingPrice = isset($data['starting_price']) ? trim($data['starting_price']) : '₹18 Lakhs';
    $status = isset($data['status']) ? trim($data['status']) : 'Ready to Register';
    $approval = isset($data['approval']) ? trim($data['approval']) : 'DTCP & RERA Approved';
    $totalUnits = isset($data['total_units']) ? intval($data['total_units']) : 50;
    $availableUnits = isset($data['available_units']) ? intval($data['available_units']) : 15;
    $amenities = isset($data['amenities']) ? trim($data['amenities']) : 'Wide Roads, Water, Electricity, Security';
    $description = isset($data['description']) ? trim($data['description']) : '';
    $imageUrl = isset($data['image_url']) ? trim($data['image_url']) : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';
    $featured = !empty($data['featured']) ? 1 : 0;
    $displayOrder = isset($data['display_order']) ? intval($data['display_order']) : 0;

    $stmt = $pdo->prepare("
        INSERT INTO projects (
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

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'New project created successfully',
        'id' => $id,
        'slug' => $slug
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
