<?php
/**
 * Nam Nilam Properties Management & Discovery API
 * Public property discovery & listing.
 * Creation, updates, and deletion protected by admin authentication.
 */

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_helper.php';

$pdo = getDatabaseConnection();

$defaultProperties = [
    [
        'id' => 'prop-1',
        'slug' => 'jai-nagar-1200-sqft-residential-plot-siruganur-trichy',
        'title' => '1,200 Sq.Ft DTCP & RERA Approved Residential Plot in Jai Nagar',
        'property_type' => 'Residential Plot',
        'locality' => 'Siruganur',
        'city' => 'Tiruchirappalli',
        'district' => 'Tiruchirappalli',
        'state' => 'Tamil Nadu',
        'country' => 'India',
        'landmark' => 'Near M.A.M College of Engineering, Chennai-Trichy NH-45',
        'plot_area' => 1200.00,
        'plot_area_unit' => 'sq.ft',
        'asking_price' => 960000.00,
        'price_label' => '₹9.6 Lakhs',
        'price_per_sqft' => 800.00,
        'currency' => 'INR',
        'description' => 'Premium 1,200 sq.ft DTCP & RERA approved east/north-facing residential plot in Jai Nagar, Siruganur. Features 40ft blacktop roads, sweet groundwater at 25ft, ready for immediate registration and house construction.',
        'images' => ['/projects/jai-nagar.jpg'],
        'featured_image' => '/projects/jai-nagar.jpg',
        'status' => 'published',
        'availability' => 'available',
        'approval_status' => 'DTCP & RERA Approved',
        'rera_id' => 'TN/16/Layout/0512/2024',
        'project_id' => 'proj-1',
        'project_slug' => 'jai-nagar',
        'project_title' => 'Jai Nagar',
        'display_order' => 1
    ],
    [
        'id' => 'prop-2',
        'slug' => 'abirami-nagar-1200-sqft-villa-plot-thirupattur-trichy',
        'title' => '1,200 Sq.Ft DTCP Approved Villa Plot in Abirami Nagar',
        'property_type' => 'Villa Plot',
        'locality' => 'Thirupattur',
        'city' => 'Tiruchirappalli',
        'district' => 'Tiruchirappalli',
        'state' => 'Tamil Nadu',
        'country' => 'India',
        'landmark' => 'Near Sri Brahmapureeswarar Temple, Thirupattur',
        'plot_area' => 1200.00,
        'plot_area_unit' => 'sq.ft',
        'asking_price' => 420000.00,
        'price_label' => '₹4.2 Lakhs',
        'price_per_sqft' => 350.00,
        'currency' => 'INR',
        'description' => 'Affordable 1,200 sq.ft DTCP-approved residential villa plot in Abirami Nagar, Thirupattur. Sweet groundwater at 20ft, concrete internal roads, flexible monthly EMI options, and clear 30-year parent title lineage.',
        'images' => ['/projects/abirami-nagar.jpg'],
        'featured_image' => '/projects/abirami-nagar.jpg',
        'status' => 'published',
        'availability' => 'available',
        'approval_status' => 'DTCP Approved',
        'rera_id' => null,
        'project_id' => 'proj-2',
        'project_slug' => 'abirami-nagar',
        'project_title' => 'Abirami Nagar',
        'display_order' => 2
    ],
    [
        'id' => 'prop-3',
        'slug' => 'koonalai-13000-sqft-managed-farm-plot-nh45-trichy',
        'title' => '13,000 Sq.Ft Managed Farm & Agro Plot in Koonalai',
        'property_type' => 'Agro Farm Land',
        'locality' => 'Koonalai',
        'city' => 'Tiruchirappalli',
        'district' => 'Tiruchirappalli',
        'state' => 'Tamil Nadu',
        'country' => 'India',
        'landmark' => '2 km off Chennai-Trichy NH-45 Highway',
        'plot_area' => 13000.00,
        'plot_area_unit' => 'sq.ft',
        'asking_price' => 1820000.00,
        'price_label' => '₹18.2 Lakhs',
        'price_per_sqft' => 140.00,
        'currency' => 'INR',
        'description' => 'Spacious 13,000 sq.ft (approx. 30 cents) fertile red-soil farm plot in Koonalai. Ideal for organic farming, weekend retreat farmhouses, and strategic land-banking with perimeter fencing and borewell access.',
        'images' => ['/projects/farm-land.jpg'],
        'featured_image' => '/projects/farm-land.jpg',
        'status' => 'published',
        'availability' => 'available',
        'approval_status' => 'Verified Agricultural Title',
        'rera_id' => null,
        'project_id' => 'proj-3',
        'project_slug' => 'farm-land',
        'project_title' => 'Farm Land',
        'display_order' => 3
    ],
    [
        'id' => 'prop-4',
        'slug' => 'sentha-city-1200-sqft-gated-community-plot-aayakudi-trichy',
        'title' => '1,200 Sq.Ft DTCP Approved Gated Community Plot in Sentha City',
        'property_type' => 'Residential Plot',
        'locality' => 'Aayakudi',
        'city' => 'Tiruchirappalli',
        'district' => 'Tiruchirappalli',
        'state' => 'Tamil Nadu',
        'country' => 'India',
        'landmark' => 'Near Samayapuram Growth Corridor, Aayakudi',
        'plot_area' => 1200.00,
        'plot_area_unit' => 'sq.ft',
        'asking_price' => 480000.00,
        'price_label' => '₹4.8 Lakhs',
        'price_per_sqft' => 400.00,
        'currency' => 'INR',
        'description' => 'Gated community plot of 1,200 sq.ft in Sentha City, Aayakudi. DTCP-approved layout with grand entry arch, 33ft wide blacktop roads, tree-lined avenues, and sweet Kaveri water table.',
        'images' => ['/projects/sentha-city.jpg'],
        'featured_image' => '/projects/sentha-city.jpg',
        'status' => 'published',
        'availability' => 'available',
        'approval_status' => 'DTCP Approved',
        'rera_id' => null,
        'project_id' => 'proj-4',
        'project_slug' => 'sentha-city',
        'project_title' => 'Sentha City',
        'display_order' => 4
    ],
    [
        'id' => 'prop-5',
        'slug' => 'kasinath-nagar-1500-sqft-approved-residential-plot-thirupattur',
        'title' => '1,500 Sq.Ft Approved Residential Plot in Kasinath Nagar',
        'property_type' => 'Residential Plot',
        'locality' => 'Thirupattur',
        'city' => 'Tiruchirappalli',
        'district' => 'Tiruchirappalli',
        'state' => 'Tamil Nadu',
        'country' => 'India',
        'landmark' => 'Near Thirupattur Main Road',
        'plot_area' => 1500.00,
        'plot_area_unit' => 'sq.ft',
        'asking_price' => 0.00,
        'price_label' => 'Launching Soon',
        'price_per_sqft' => 0.00,
        'currency' => 'INR',
        'description' => 'Spacious 1,500 sq.ft approved residential layout plot in Kasinath Nagar, Thirupattur. Underground stormwater drainage, street lights, and upcoming introductory pricing for early investors.',
        'images' => ['/projects/kasinath-nagar.jpg'],
        'featured_image' => '/projects/kasinath-nagar.jpg',
        'status' => 'published',
        'availability' => 'available',
        'approval_status' => 'Approved Layout with Valid Sub-Division',
        'rera_id' => null,
        'project_id' => 'proj-5',
        'project_slug' => 'kasinath-nagar',
        'project_title' => 'Kasinath Nagar',
        'display_order' => 5
    ]
];

$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------
// GET: Fetch published property list or single property by slug (PUBLIC)
// -------------------------------------------------------------
if ($method === 'GET') {
    $slug = isset($_GET['slug']) ? trim((string)$_GET['slug']) : '';
    $locality = isset($_GET['locality']) ? trim((string)$_GET['locality']) : '';
    $propertyType = isset($_GET['type']) ? trim((string)$_GET['type']) : '';
    $projectId = isset($_GET['project_id']) ? trim((string)$_GET['project_id']) : '';

    if ($pdo) {
        try {
            if (!empty($slug)) {
                $stmt = $pdo->prepare("
                    SELECT p.*, pr.slug as project_slug, pr.title as project_title 
                    FROM properties p
                    LEFT JOIN projects pr ON p.project_id = pr.id
                    WHERE p.slug = ? AND p.status = 'published'
                    LIMIT 1
                ");
                $stmt->execute([$slug]);
                $property = $stmt->fetch();
                if ($property) {
                    if (is_string($property['images'])) {
                        $property['images'] = json_decode($property['images'], true) ?: [$property['featured_image']];
                    }
                    echo json_encode(['success' => true, 'property' => $property]);
                    exit();
                }
            } else {
                $sql = "
                    SELECT p.*, pr.slug as project_slug, pr.title as project_title 
                    FROM properties p
                    LEFT JOIN projects pr ON p.project_id = pr.id
                    WHERE p.status = 'published'
                ";
                $params = [];
                if (!empty($locality)) {
                    $sql .= " AND p.locality = ?";
                    $params[] = $locality;
                }
                if (!empty($propertyType)) {
                    $sql .= " AND p.property_type = ?";
                    $params[] = $propertyType;
                }
                if (!empty($projectId)) {
                    $sql .= " AND p.project_id = ?";
                    $params[] = $projectId;
                }
                $sql .= " ORDER BY p.display_order ASC, p.created_at DESC";

                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
                $properties = $stmt->fetchAll();

                if (!empty($properties)) {
                    foreach ($properties as &$prop) {
                        if (is_string($prop['images'])) {
                            $prop['images'] = json_decode($prop['images'], true) ?: [$prop['featured_image']];
                        }
                    }
                    echo json_encode([
                        'success' => true,
                        'count' => count($properties),
                        'properties' => $properties
                    ]);
                    exit();
                }
            }
        } catch (Throwable $e) {
            // Fallback to static verified inventory
        }
    }

    // Static fallback
    if (!empty($slug)) {
        foreach ($defaultProperties as $p) {
            if ($p['slug'] === $slug && $p['status'] === 'published') {
                echo json_encode(['success' => true, 'property' => $p]);
                exit();
            }
        }
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Property listing not found or not published']);
        exit();
    }

    $filtered = array_values(array_filter($defaultProperties, function($p) use ($locality, $propertyType, $projectId) {
        if ($p['status'] !== 'published') return false;
        if (!empty($locality) && strcasecmp($p['locality'], $locality) !== 0) return false;
        if (!empty($propertyType) && strcasecmp($p['property_type'], $propertyType) !== 0) return false;
        if (!empty($projectId) && $p['project_id'] !== $projectId) return false;
        return true;
    }));

    echo json_encode([
        'success' => true,
        'count' => count($filtered),
        'properties' => $filtered
    ]);
    exit();
}

// -------------------------------------------------------------
// POST: Create, Update, or Delete (PROTECTED — Admin Token Required)
// -------------------------------------------------------------
if ($method === 'POST') {
    requireAdminAuth();

    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    if (!$data) $data = $_POST;

    $action = isset($data['action']) ? trim((string)$data['action']) : 'create';

    if ($pdo) {
        try {
            if ($action === 'delete') {
                $id = isset($data['id']) ? trim((string)$data['id']) : '';
                if (empty($id)) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'error' => 'Property ID is required for deletion.']);
                    exit();
                }
                $stmt = $pdo->prepare("DELETE FROM properties WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true, 'message' => "Property {$id} deleted"]);
                exit();
            }

            if ($action === 'create' || $action === 'update') {
                $id = isset($data['id']) && !empty($data['id']) ? trim((string)$data['id']) : 'prop_' . time();
                $title = isset($data['title']) ? mb_substr(strip_tags(trim((string)$data['title'])), 0, 255) : '';
                $slug = isset($data['slug']) && !empty($data['slug']) 
                    ? strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', trim((string)$data['slug']))) 
                    : strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $title));
                $propertyType = isset($data['property_type']) ? mb_substr(strip_tags(trim((string)$data['property_type'])), 0, 100) : 'Residential Plot';
                $locality = isset($data['locality']) ? mb_substr(strip_tags(trim((string)$data['locality'])), 0, 191) : 'Siruganur';
                $city = isset($data['city']) ? mb_substr(strip_tags(trim((string)$data['city'])), 0, 100) : 'Tiruchirappalli';
                $district = isset($data['district']) ? mb_substr(strip_tags(trim((string)$data['district'])), 0, 100) : 'Tiruchirappalli';
                $state = isset($data['state']) ? mb_substr(strip_tags(trim((string)$data['state'])), 0, 100) : 'Tamil Nadu';
                $country = 'India';
                $landmark = isset($data['landmark']) ? mb_substr(strip_tags(trim((string)$data['landmark'])), 0, 255) : null;
                $plotArea = isset($data['plot_area']) ? floatval($data['plot_area']) : 1200.00;
                $plotAreaUnit = isset($data['plot_area_unit']) ? mb_substr(strip_tags(trim((string)$data['plot_area_unit'])), 0, 32) : 'sq.ft';
                $askingPrice = isset($data['asking_price']) ? floatval($data['asking_price']) : 0.00;
                $priceLabel = isset($data['price_label']) ? mb_substr(strip_tags(trim((string)$data['price_label'])), 0, 100) : 'Price on Request';
                $pricePerSqft = isset($data['price_per_sqft']) ? floatval($data['price_per_sqft']) : 0.00;
                $description = isset($data['description']) ? mb_substr(strip_tags(trim((string)$data['description'])), 0, 5000) : '';
                $featuredImage = isset($data['featured_image']) ? mb_substr(strip_tags(trim((string)$data['featured_image'])), 0, 500) : '/projects/jai-nagar.jpg';
                $images = isset($data['images']) ? (is_array($data['images']) ? json_encode($data['images']) : (string)$data['images']) : json_encode([$featuredImage]);
                $status = isset($data['status']) && in_array($data['status'], ['published', 'draft', 'archived'], true) ? $data['status'] : 'published';
                $availability = isset($data['availability']) && in_array($data['availability'], ['available', 'under_offer', 'sold'], true) ? $data['availability'] : 'available';
                $approvalStatus = isset($data['approval_status']) ? mb_substr(strip_tags(trim((string)$data['approval_status'])), 0, 191) : 'DTCP Approved';
                $reraId = isset($data['rera_id']) ? mb_substr(strip_tags(trim((string)$data['rera_id'])), 0, 100) : null;
                $projectId = isset($data['project_id']) ? trim((string)$data['project_id']) : null;
                $displayOrder = isset($data['display_order']) ? intval($data['display_order']) : 0;

                $stmt = $pdo->prepare("
                    REPLACE INTO properties (
                        id, slug, title, property_type, locality, city, district, state, country,
                        landmark, plot_area, plot_area_unit, asking_price, price_label, price_per_sqft,
                        currency, description, images, featured_image, status, availability,
                        approval_status, rera_id, project_id, display_order
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?, ?,
                        'INR', ?, ?, ?, ?, ?,
                        ?, ?, ?, ?
                    )
                ");
                $stmt->execute([
                    $id, $slug, $title, $propertyType, $locality, $city, $district, $state, $country,
                    $landmark, $plotArea, $plotAreaUnit, $askingPrice, $priceLabel, $pricePerSqft,
                    $description, $images, $featuredImage, $status, $availability,
                    $approvalStatus, $reraId, $projectId, $displayOrder
                ]);

                echo json_encode(['success' => true, 'id' => $id, 'slug' => $slug, 'message' => 'Property saved successfully']);
                exit();
            }
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Database error executing property operation']);
            exit();
        }
    }

    echo json_encode(['success' => true, 'message' => 'Property operation processed']);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
