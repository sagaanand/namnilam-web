<?php
/**
 * Nam Nilam Dynamic Pre-renderer Fallback
 * Serves real crawlable HTML for dynamic property listings added post-build.
 * Ensures zero-delay search engine and AI crawler discoverability without rebuilding frontend.
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

$slug = isset($_GET['slug']) ? trim((string)$_GET['slug']) : '';
$type = isset($_GET['type']) ? trim((string)$_GET['type']) : 'property';

// Sanitize slug
$slug = preg_replace('/[^a-zA-Z0-9_-]/', '', $slug);

if (empty($slug)) {
    http_response_code(404);
    echo '<!DOCTYPE html><html lang="en"><head><title>Page Not Found | Nam Nilam</title><meta name="robots" content="noindex, nofollow"></head><body><h1>Page Not Found</h1><p>The requested property could not be found.</p><a href="/">Return to Nam Nilam</a></body></html>';
    exit;
}

// Find base template index.html
$templatePath = __DIR__ . '/../dist/index.html';
if (!file_exists($templatePath)) {
    $templatePath = __DIR__ . '/../index.html';
}

$templateHtml = file_exists($templatePath) ? file_get_contents($templatePath) : '<!DOCTYPE html><html lang="en"><head></head><body><div id="root"></div></body></html>';

$prop = null;
$pdo = getDbConnection();

if ($pdo !== null) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM properties WHERE slug = :slug AND status = 'published' LIMIT 1");
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch();
        if ($row) {
            $prop = $row;
            if (isset($prop['features']) && is_string($prop['features'])) {
                $prop['features'] = json_decode($prop['features'], true) ?: [];
            }
            if (isset($prop['images']) && is_string($prop['images'])) {
                $prop['images'] = json_decode($prop['images'], true) ?: [];
            }
        }
    } catch (\Throwable $e) {
        // Fallback silently without exposing DB error
    }
}

// If property not found in MySQL or database unavailable, check fallback seed
if ($prop === null) {
    http_response_code(404);
    $title = 'Property Not Found | Nam Nilam';
    $desc = 'The requested property could not be found or has been withdrawn.';
    $notFoundHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</title><meta name="robots" content="noindex, nofollow"></head><body style="background:#0b0f19;color:#fff;font-family:sans-serif;padding:60px;text-align:center;"><h1>Property Listing Not Found</h1><p>' . htmlspecialchars($desc, ENT_QUOTES, 'UTF-8') . '</p><p><a href="/properties" style="color:#10b981;">Browse Verified Plots</a> • <a href="/" style="color:#fff;">Home</a></p></body></html>';
    echo $notFoundHtml;
    exit;
}

// Build dynamic metadata
$pageTitle = htmlspecialchars($prop['plot_area'] . ' Sq.Ft ' . $prop['property_type'] . ' in ' . $prop['locality'] . ', Trichy | Nam Nilam', ENT_QUOTES, 'UTF-8');
$pageDesc = htmlspecialchars($prop['title'] . '. Located in ' . $prop['locality'] . ', Trichy (' . ($prop['landmark'] ?? 'Trichy') . '). Asking: ' . $prop['price_label'] . ' (' . $prop['approval_status'] . '). Verified by Nam Nilam.', ENT_QUOTES, 'UTF-8');
$canonical = 'https://namnilam.com/properties/' . htmlspecialchars($prop['slug'], ENT_QUOTES, 'UTF-8');
$imgUrl = !empty($prop['featured_image']) ? htmlspecialchars($prop['featured_image'], ENT_QUOTES, 'UTF-8') : 'https://namnilam.com/nam-nilam-logo.png';
if (!str_starts_with($imgUrl, 'http')) {
    $imgUrl = 'https://namnilam.com' . $imgUrl;
}

$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'Place',
    '@id' => $canonical . '#place',
    'name' => $prop['title'],
    'description' => $prop['description'],
    'url' => $canonical,
    'image' => [$imgUrl],
    'address' => [
        '@type' => 'PostalAddress',
        'addressLocality' => $prop['locality'],
        'addressRegion' => $prop['state'] ?? 'Tamil Nadu',
        'addressCountry' => 'IN'
    ],
    'additionalProperty' => [
        ['@type' => 'PropertyValue', 'name' => 'Plot Area', 'value' => $prop['plot_area'] . ' ' . ($prop['plot_area_unit'] ?? 'sq.ft')],
        ['@type' => 'PropertyValue', 'name' => 'Property Type', 'value' => $prop['property_type']],
        ['@type' => 'PropertyValue', 'name' => 'Approval Status', 'value' => $prop['approval_status']]
    ]
];

$head = '
    <title>' . $pageTitle . '</title>
    <meta name="description" content="' . $pageDesc . '">
    <link rel="canonical" href="' . $canonical . '">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta property="og:title" content="' . $pageTitle . '">
    <meta property="og:description" content="' . $pageDesc . '">
    <meta property="og:url" content="' . $canonical . '">
    <meta property="og:image" content="' . $imgUrl . '">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="Nam Nilam">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="' . $pageTitle . '">
    <meta name="twitter:description" content="' . $pageDesc . '">
    <meta name="twitter:image" content="' . $imgUrl . '">
    <script id="schema-jsonld-page" type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>
';

$body = '
    <main style="max-width:1100px;margin:0 auto;padding:40px 20px;color:#f8fafc;font-family:sans-serif;background:#0b0f19;">
      <nav aria-label="Breadcrumb" style="margin-bottom:20px;font-size:0.85rem;color:#94a3b8;">
        <a href="/" style="color:#94a3b8;text-decoration:none;">Home</a> › 
        <a href="/properties" style="color:#94a3b8;text-decoration:none;">Properties</a> › 
        <span style="color:#10b981;">' . htmlspecialchars($prop['locality'] . ' - ' . $prop['plot_area'] . ' sq.ft', ENT_QUOTES, 'UTF-8') . '</span>
      </nav>
      <span style="background:rgba(16,185,129,0.2);color:#34d399;padding:4px 10px;border-radius:6px;font-size:0.75rem;font-weight:600;">' . htmlspecialchars($prop['approval_status'], ENT_QUOTES, 'UTF-8') . '</span>
      <h1 style="font-size:2rem;font-weight:800;color:#fff;margin:12px 0;">' . htmlspecialchars($prop['title'], ENT_QUOTES, 'UTF-8') . '</h1>
      <p style="color:#94a3b8;">📍 ' . htmlspecialchars($prop['locality'], ENT_QUOTES, 'UTF-8') . ', Tiruchirappalli • Landmark: ' . htmlspecialchars($prop['landmark'] ?? '', ENT_QUOTES, 'UTF-8') . '</p>
      
      <div style="background:#1e293b;padding:20px;border-radius:12px;margin:24px 0;">
        <div style="font-size:1.8rem;font-weight:800;color:#10b981;">' . htmlspecialchars($prop['price_label'], ENT_QUOTES, 'UTF-8') . '</div>
        <div style="color:#94a3b8;font-size:0.9rem;">₹' . htmlspecialchars((string)$prop['price_per_sqft'], ENT_QUOTES, 'UTF-8') . ' / sq.ft • Guideline: ' . htmlspecialchars($prop['guideline_value'] ?? 'Fair Market Indexed', ENT_QUOTES, 'UTF-8') . '</div>
        <div style="color:#38bdf8;font-size:0.9rem;margin-top:8px;">Sweet Kaveri groundwater at 25-30 ft depth</div>
      </div>

      <div style="background:#1e293b;padding:20px;border-radius:12px;margin-bottom:24px;">
        <h2 style="font-size:1.2rem;color:#fff;">Description</h2>
        <p style="color:#cbd5e1;line-height:1.7;">' . nl2br(htmlspecialchars($prop['description'], ENT_QUOTES, 'UTF-8')) . '</p>
      </div>

      <div style="background:linear-gradient(135deg,#0f172a,#064e3b);padding:24px;border-radius:12px;border:1px solid #059669;">
        <h3 style="color:#fff;margin:0 0 8px 0;">Verified Site Visit & Title Verification</h3>
        <p style="color:#94a3b8;font-size:0.9rem;">Contact Nam Nilam Trichy Advisory Office for 30-year parent title deed audit and patta transfer assistance.</p>
        <p><a href="https://wa.me/919787600006?text=' . urlencode('Hi Nam Nilam, I am interested in verified plot: ' . $prop['title']) . '" style="background:#10b981;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Chat on WhatsApp (+91 97876 00006)</a></p>
      </div>
    </main>
';

// Output injected HTML
$html = $templateHtml;
if (strpos($html, '<title>') !== false) {
    $html = preg_replace('/<title>[\s\S]*?<\/title>/i', '<title>' . $pageTitle . '</title>', $html);
} else {
    $html = str_replace('</head>', '<title>' . $pageTitle . '</title></head>', $html);
}
$html = str_replace('</head>', $head . '</head>', $html);
$html = str_replace('<div id="root"></div>', '<div id="root">' . $body . '</div>', $html);

header('Content-Type: text/html; charset=UTF-8');
header('X-Prerender: Dynamic-PHP');
echo $html;
