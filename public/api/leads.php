<?php
/**
 * Nam Nilam Leads Attribution & Management API
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

    if ($pdo) {
        try {
            if ($action === 'update_status') {
                $leadId = isset($data['id']) ? trim($data['id']) : '';
                $newStatus = isset($data['status']) ? trim($data['status']) : 'new';
                $adminNotes = isset($data['admin_notes']) ? trim($data['admin_notes']) : null;

                $stmt = $pdo->prepare("UPDATE leads SET status = ?, admin_notes = COALESCE(?, admin_notes) WHERE id = ?");
                $stmt->execute([$newStatus, $adminNotes, $leadId]);

                echo json_encode(['success' => true, 'message' => "Lead updated to {$newStatus}"]);
                exit();
            }

            if ($action === 'delete') {
                $leadId = isset($data['id']) ? trim($data['id']) : '';
                $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
                $stmt->execute([$leadId]);

                echo json_encode(['success' => true, 'message' => "Lead deleted"]);
                exit();
            }

            // Standard submission
            $name = isset($data['name']) ? trim($data['name']) : 'Prospective Client';
            $phone = isset($data['phone']) ? trim($data['phone']) : '';
            $email = isset($data['email']) ? trim($data['email']) : '';
            $formType = isset($data['form_type']) ? trim($data['form_type']) : 'Website Enquiry';
            $sourcePage = isset($data['source_page']) ? trim($data['source_page']) : '/';
            $referrerUrl = isset($data['referrer_url']) ? trim($data['referrer_url']) : (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '');
            $intentPurpose = isset($data['intent_purpose']) ? trim($data['intent_purpose']) : (isset($data['intent']) ? trim($data['intent']) : 'General Advisory');
            $category = isset($data['category']) ? trim($data['category']) : 'Property';
            $location = isset($data['location']) ? trim($data['location']) : 'Trichy';
            $message = isset($data['message']) ? trim($data['message']) : (isset($data['notes']) ? trim($data['notes']) : '');

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

            echo json_encode([
                'success' => true,
                'message' => 'Lead captured with full attribution',
                'lead_id' => $id
            ]);
            exit();
        } catch (Throwable $e) {
            // Fallback to file logging below
        }
    }

    // Fallback: log to file so lead is never lost
    $leadEntry = [
        'id' => 'lead_' . date('Ymd_His'),
        'timestamp' => date('c'),
        'name' => isset($data['name']) ? $data['name'] : '',
        'phone' => isset($data['phone']) ? $data['phone'] : '',
        'form_type' => isset($data['form_type']) ? $data['form_type'] : 'Website Enquiry',
        'source_page' => isset($data['source_page']) ? $data['source_page'] : '/',
        'intent_purpose' => isset($data['intent_purpose']) ? $data['intent_purpose'] : '',
        'message' => isset($data['message']) ? $data['message'] : ''
    ];
    @file_put_contents(sys_get_temp_dir() . '/namnilam_leads.log', json_encode($leadEntry) . PHP_EOL, FILE_APPEND);

    echo json_encode(['success' => true, 'message' => 'Lead captured successfully', 'lead_id' => $leadEntry['id']]);
    exit();
}

// -------------------------------------------------------------
// GET: Fetch leads
// -------------------------------------------------------------
if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 100");
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
            // Fallthrough
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
