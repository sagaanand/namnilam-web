<?php
/**
 * Nam Nilam Leads Attribution & Management API
 * Tracks form submissions, source page, purpose, contact details, and status.
 */

require_once __DIR__ . '/db.php';
$pdo = getDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------
// POST: Submit a new lead OR perform action (update_status, delete)
// -------------------------------------------------------------
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $action = isset($data['action']) ? $data['action'] : 'submit';

    // 1. UPDATE LEAD STATUS
    if ($action === 'update_status') {
        $leadId = isset($data['id']) ? trim($data['id']) : '';
        $newStatus = isset($data['status']) ? trim($data['status']) : 'new';
        $adminNotes = isset($data['admin_notes']) ? trim($data['admin_notes']) : null;

        if (!$leadId) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Lead ID is required']);
            exit();
        }

        $stmt = $pdo->prepare("UPDATE leads SET status = ?, admin_notes = COALESCE(?, admin_notes) WHERE id = ?");
        $stmt->execute([$newStatus, $adminNotes, $leadId]);

        echo json_encode([
            'success' => true,
            'message' => "Lead {$leadId} updated to {$newStatus}"
        ]);
        exit();
    }

    // 2. DELETE LEAD
    if ($action === 'delete') {
        $leadId = isset($data['id']) ? trim($data['id']) : '';
        if (!$leadId) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Lead ID is required']);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
        $stmt->execute([$leadId]);

        echo json_encode([
            'success' => true,
            'message' => "Lead {$leadId} deleted successfully"
        ]);
        exit();
    }

    // 3. NEW LEAD SUBMISSION WITH FULL ATTRIBUTION
    $name = isset($data['name']) ? trim($data['name']) : '';
    $phone = isset($data['phone']) ? trim($data['phone']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $formType = isset($data['form_type']) ? trim($data['form_type']) : 'Website Enquiry';
    $sourcePage = isset($data['source_page']) ? trim($data['source_page']) : '/';
    $referrerUrl = isset($data['referrer_url']) ? trim($data['referrer_url']) : (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '');
    $intentPurpose = isset($data['intent_purpose']) ? trim($data['intent_purpose']) : (isset($data['intent']) ? trim($data['intent']) : 'General Advisory');
    $category = isset($data['category']) ? trim($data['category']) : 'Property';
    $location = isset($data['location']) ? trim($data['location']) : 'Trichy';
    $message = isset($data['message']) ? trim($data['message']) : (isset($data['notes']) ? trim($data['notes']) : '');
    
    // Validate required fields
    if (empty($phone) || strlen($phone) < 8) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Valid phone number is required'
        ]);
        exit();
    }

    if (empty($name)) {
        $name = 'Prospective Client';
    }

    $id = 'lead_' . date('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 6);
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? substr($_SERVER['HTTP_USER_AGENT'], 0, 255) : '';

    $stmt = $pdo->prepare("
        INSERT INTO leads (
            id, name, phone, email, form_type, source_page, referrer_url,
            intent_purpose, category, location, message, status, ip_address, user_agent
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, 'new', ?, ?
        )
    ");

    $stmt->execute([
        $id, $name, $phone, $email, $formType, $sourcePage, $referrerUrl,
        $intentPurpose, $category, $location, $message, $ip, $userAgent
    ]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Lead captured with full attribution',
        'lead_id' => $id,
        'data' => [
            'name' => $name,
            'phone' => $phone,
            'form_type' => $formType,
            'source_page' => $sourcePage,
            'intent_purpose' => $intentPurpose
        ]
    ]);
    exit();
}

// -------------------------------------------------------------
// GET: Fetch all captured leads (for Admin Dashboard)
// -------------------------------------------------------------
if ($method === 'GET') {
    $formType = isset($_GET['form_type']) ? trim($_GET['form_type']) : '';
    $status = isset($_GET['status']) ? trim($_GET['status']) : '';
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;

    $sql = "SELECT * FROM leads WHERE 1=1";
    $params = [];

    if (!empty($formType) && $formType !== 'all') {
        $sql .= " AND form_type = ?";
        $params[] = $formType;
    }

    if (!empty($status) && $status !== 'all') {
        $sql .= " AND status = ?";
        $params[] = $status;
    }

    if (!empty($search)) {
        $sql .= " AND (name LIKE ? OR phone LIKE ? OR message LIKE ? OR source_page LIKE ?)";
        $searchTerm = "%{$search}%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    $sql .= " ORDER BY created_at DESC LIMIT ?";
    $params[] = $limit;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $leads = $stmt->fetchAll();

    // Calculate quick metrics
    $totalCount = count($leads);
    $newCount = 0;
    $formsDistribution = [];
    $sourcesDistribution = [];

    foreach ($leads as $lead) {
        if ($lead['status'] === 'new') {
            $newCount++;
        }
        $ft = $lead['form_type'];
        $formsDistribution[$ft] = isset($formsDistribution[$ft]) ? $formsDistribution[$ft] + 1 : 1;

        $sp = $lead['source_page'];
        $sourcesDistribution[$sp] = isset($sourcesDistribution[$sp]) ? $sourcesDistribution[$sp] + 1 : 1;
    }

    echo json_encode([
        'success' => true,
        'metrics' => [
            'total_leads' => $totalCount,
            'new_leads' => $newCount,
            'by_form' => $formsDistribution,
            'by_source_page' => $sourcesDistribution
        ],
        'leads' => $leads
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
