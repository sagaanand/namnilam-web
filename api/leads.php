<?php
/**
 * Nam Nilam Leads Attribution & Management API
 * Public lead capture with input sanitization & rate limiting.
 * Private lead retrieval, status updating, and deletion protected by admin authentication.
 */

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_helper.php';

$pdo = getDatabaseConnection();
$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------
// POST: Submit a new lead (Public) OR perform action (Protected)
// -------------------------------------------------------------
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $action = isset($data['action']) ? trim((string)$data['action']) : 'submit';

    // -------------------------------------------------------------
    // PROTECTED ACTIONS: update_status and delete require Admin Auth
    // -------------------------------------------------------------
    if ($action === 'update_status') {
        requireAdminAuth();

        $leadId = isset($data['id']) ? trim((string)$data['id']) : '';
        $newStatus = isset($data['status']) ? trim((string)$data['status']) : 'new';
        $adminNotes = isset($data['admin_notes']) ? trim((string)$data['admin_notes']) : null;

        $validStatuses = ['new', 'contacted', 'in_progress', 'converted', 'closed'];
        if (!in_array($newStatus, $validStatuses, true)) {
            $newStatus = 'new';
        }

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE leads SET status = ?, admin_notes = COALESCE(?, admin_notes) WHERE id = ?");
                $stmt->execute([$newStatus, $adminNotes, $leadId]);

                echo json_encode(['success' => true, 'message' => "Lead updated to {$newStatus}"]);
                exit();
            } catch (Throwable $e) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Database error updating lead status']);
                exit();
            }
        }

        echo json_encode(['success' => true, 'message' => "Lead updated"]);
        exit();
    }

    if ($action === 'delete') {
        requireAdminAuth();

        $leadId = isset($data['id']) ? trim((string)$data['id']) : '';

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
                $stmt->execute([$leadId]);

                echo json_encode(['success' => true, 'message' => "Lead deleted"]);
                exit();
            } catch (Throwable $e) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Database error deleting lead']);
                exit();
            }
        }

        echo json_encode(['success' => true, 'message' => "Lead deleted"]);
        exit();
    }

    // -------------------------------------------------------------
    // PUBLIC ACTION: Standard Lead Submission
    // -------------------------------------------------------------
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '127.0.0.1';

    // 1. Spam Honeypot Check (Silently drop bots filling hidden fields)
    if (!empty($data['hp_field']) || !empty($data['website_url'])) {
        echo json_encode(['success' => true, 'message' => 'Lead received', 'lead_id' => 'lead_ack']);
        exit();
    }

    // 2. Submission Rate Limiting (max 5 per minute per IP)
    $submitLock = sys_get_temp_dir() . '/nn_sub_' . md5($ip) . '.json';
    if (file_exists($submitLock)) {
        $subData = json_decode(@file_get_contents($submitLock), true);
        if ($subData && isset($subData['count'], $subData['time'])) {
            if (time() - $subData['time'] < 60 && $subData['count'] >= 5) {
                http_response_code(429);
                echo json_encode(['success' => false, 'error' => 'Submission rate limit reached. Please wait a moment before sending another inquiry.']);
                exit();
            }
            if (time() - $subData['time'] >= 60) {
                $subData = ['count' => 1, 'time' => time()];
            } else {
                $subData['count']++;
            }
        } else {
            $subData = ['count' => 1, 'time' => time()];
        }
    } else {
        $subData = ['count' => 1, 'time' => time()];
    }
    @file_put_contents($submitLock, json_encode($subData), LOCK_EX);

    // 3. Input Sanitization & Validation
    $rawPhone = isset($data['phone']) ? trim((string)$data['phone']) : '';
    $digitsOnly = preg_replace('/[^0-9]/', '', $rawPhone);
    if (strlen($digitsOnly) < 10) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide a valid 10-digit phone number.']);
        exit();
    }

    $name = isset($data['name']) ? mb_substr(strip_tags(trim((string)$data['name'])), 0, 100) : 'Prospective Client';
    $rawEmail = isset($data['email']) ? trim((string)$data['email']) : '';
    $email = filter_var($rawEmail, FILTER_VALIDATE_EMAIL) ? $rawEmail : null;
    $formType = isset($data['form_type']) ? mb_substr(strip_tags(trim((string)$data['form_type'])), 0, 100) : 'Website Enquiry';
    $sourcePage = isset($data['source_page']) ? mb_substr(strip_tags(trim((string)$data['source_page'])), 0, 255) : '/';
    $referrerUrl = isset($data['referrer_url']) ? mb_substr(strip_tags(trim((string)$data['referrer_url'])), 0, 500) : (isset($_SERVER['HTTP_REFERER']) ? mb_substr($_SERVER['HTTP_REFERER'], 0, 500) : null);
    $intentPurpose = isset($data['intent_purpose']) ? mb_substr(strip_tags(trim((string)$data['intent_purpose'])), 0, 255) : (isset($data['intent']) ? mb_substr(strip_tags(trim((string)$data['intent'])), 0, 255) : 'General Advisory');
    $category = isset($data['category']) ? mb_substr(strip_tags(trim((string)$data['category'])), 0, 100) : 'Property';
    $location = isset($data['location']) ? mb_substr(strip_tags(trim((string)$data['location'])), 0, 100) : 'Trichy';
    $message = isset($data['message']) ? mb_substr(strip_tags(trim((string)$data['message'])), 0, 2000) : (isset($data['notes']) ? mb_substr(strip_tags(trim((string)$data['notes'])), 0, 2000) : null);

    $id = 'lead_' . date('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 6);
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? mb_substr(strip_tags($_SERVER['HTTP_USER_AGENT']), 0, 255) : '';

    if ($pdo) {
        try {
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
                $id, $name, $rawPhone, $email, $formType, $sourcePage, $referrerUrl,
                $intentPurpose, $category, $location, $message, $ip, $userAgent
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Lead captured with full attribution',
                'lead_id' => $id
            ]);
            exit();
        } catch (Throwable $e) {
            // Fallthrough to fallback logger
        }
    }

    // Fallback: log to file so lead is never lost
    $leadEntry = [
        'id' => $id,
        'timestamp' => date('c'),
        'name' => $name,
        'phone' => $rawPhone,
        'email' => $email,
        'form_type' => $formType,
        'source_page' => $sourcePage,
        'intent_purpose' => $intentPurpose,
        'message' => $message
    ];
    @file_put_contents(sys_get_temp_dir() . '/namnilam_leads.log', json_encode($leadEntry) . PHP_EOL, FILE_APPEND);

    echo json_encode(['success' => true, 'message' => 'Lead captured successfully', 'lead_id' => $id]);
    exit();
}

// -------------------------------------------------------------
// GET: Fetch leads (PROTECTED — Admin authentication required)
// -------------------------------------------------------------
if ($method === 'GET') {
    requireAdminAuth();

    if ($pdo) {
        try {
            $formTypeFilter = isset($_GET['form_type']) && $_GET['form_type'] !== 'all' ? trim($_GET['form_type']) : null;
            $statusFilter = isset($_GET['status']) && $_GET['status'] !== 'all' ? trim($_GET['status']) : null;
            $searchQuery = isset($_GET['search']) ? trim($_GET['search']) : null;

            $sql = "SELECT * FROM leads WHERE 1=1";
            $params = [];

            if ($formTypeFilter) {
                $sql .= " AND form_type = ?";
                $params[] = $formTypeFilter;
            }
            if ($statusFilter) {
                $sql .= " AND status = ?";
                $params[] = $statusFilter;
            }
            if ($searchQuery) {
                $sql .= " AND (name LIKE ? OR phone LIKE ? OR message LIKE ?)";
                $like = "%{$searchQuery}%";
                $params[] = $like;
                $params[] = $like;
                $params[] = $like;
            }

            $sql .= " ORDER BY created_at DESC LIMIT 100";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $leads = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'metrics' => [
                    'total_leads' => count($leads),
                    'new_leads' => count(array_filter($leads, fn($l) => $l['status'] === 'new'))
                ],
                'leads' => $leads
            ]);
            exit();
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Database error retrieving leads']);
            exit();
        }
    }

    echo json_encode([
        'success' => true,
        'metrics' => ['total_leads' => 0, 'new_leads' => 0],
        'leads' => []
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
