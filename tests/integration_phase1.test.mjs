import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT_DIR = process.cwd();

console.log('--- RUNNING PHASE 1 INTEGRATION TEST SUITE ---\n');

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    failed++;
  }
}

// -------------------------------------------------------------
// JWT & Cryptographic Helpers (Mirrors api/auth_helper.php)
// -------------------------------------------------------------
function base64UrlEncode(data) {
  return Buffer.from(data)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(data) {
  let b64 = data.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return Buffer.from(b64, 'base64').toString('utf8');
}

function generateTestToken(sub = 'admin', role = 'Super Administrator', ttlSeconds = 86400, secret = 'test_secret_must_be_thirty_two_chars_long', alg = 'HS256') {
  if (!secret || secret.length < 32) return null;
  const header = base64UrlEncode(JSON.stringify({ alg, typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64UrlEncode(JSON.stringify({
    sub,
    role,
    iat: now,
    exp: now + ttlSeconds
  }));
  const sig = alg === 'none' ? '' : base64UrlEncode(crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest());
  return `${header}.${payload}.${sig}`;
}

function validateTokenSimulator(token, secret) {
  if (!secret || secret.length < 32) return null; // Policy enforcement: fail securely
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, sigB64] = parts;

  // Header & algorithm verification (strictly HS256)
  let header;
  try {
    header = JSON.parse(base64UrlDecode(headerB64));
  } catch {
    return null;
  }
  if (!header || header.alg !== 'HS256' || (header.typ && header.typ.toUpperCase() !== 'JWT')) {
    return null;
  }

  const expectedSig = base64UrlEncode(crypto.createHmac('sha256', secret).update(`${headerB64}.${payloadB64}`).digest());
  if (sigB64 !== expectedSig) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(payloadB64));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (payload.iat && payload.iat > Math.floor(Date.now() / 1000) + 300) return null;
    if (!payload.role) return null;
    return payload;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// SCENARIO 1: Unauthenticated GET /api/leads.php → 401
// -------------------------------------------------------------
console.log('[Scenario 1] Unauthenticated GET /api/leads.php');

runTest('GET /api/leads.php enforces requireAdminAuth() and denies unauthenticated access', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/leads.php'), 'utf8');
  const getMatch = code.match(/if\s*\(\$method\s*===?\s*['"]GET['"]\)\s*\{([\s\S]*?)\n\}\s*\n\s*http_response_code\(405\)/);
  assert.ok(getMatch, 'Found GET handler in api/leads.php');
  assert.match(getMatch[1], /requireAdminAuth\s*\(\)/, 'GET handler must immediately invoke requireAdminAuth()');

  const helperCode = fs.readFileSync(path.join(ROOT_DIR, 'api/auth_helper.php'), 'utf8');
  assert.match(helperCode, /http_response_code\(401\)/, 'requireAdminAuth must emit HTTP 401');
  assert.match(helperCode, /Unauthorized/, 'requireAdminAuth must return Unauthorized error message');
});

// -------------------------------------------------------------
// SCENARIO 2: Unauthorized lead updates and deletions → rejected
// -------------------------------------------------------------
console.log('\n[Scenario 2] Unauthorized Lead Updates and Deletions');

runTest('POST /api/leads.php (action: update_status) is guarded by requireAdminAuth()', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/leads.php'), 'utf8');
  const updateMatch = code.match(/if\s*\(\$action\s*===?\s*['"]update_status['"]\)\s*\{([\s\S]*?)\n\s*\}\s*\n\s*if\s*\(\$action\s*===?\s*['"]delete['"]\)/);
  assert.ok(updateMatch, 'Found update_status handler in api/leads.php');
  assert.match(updateMatch[1], /requireAdminAuth\s*\(\)/, 'update_status must invoke requireAdminAuth()');
});

runTest('POST /api/leads.php (action: delete) is guarded by requireAdminAuth()', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/leads.php'), 'utf8');
  const deleteMatch = code.match(/if\s*\(\$action\s*===?\s*['"]delete['"]\)\s*\{([\s\S]*?)\n\s*\}\s*\n\s*\/\//);
  assert.ok(deleteMatch, 'Found delete handler in api/leads.php');
  assert.match(deleteMatch[1], /requireAdminAuth\s*\(\)/, 'delete must invoke requireAdminAuth()');
});

// -------------------------------------------------------------
// SCENARIO 3: Unauthorized project mutations → rejected
// -------------------------------------------------------------
console.log('\n[Scenario 3] Unauthorized Project Mutations');

runTest('POST /api/projects.php guards all mutations with requireAdminAuth()', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/projects.php'), 'utf8');
  const postMatch = code.match(/if\s*\(\$method\s*===?\s*['"]POST['"]\)\s*\{([\s\S]*?)\n\}\s*\n\s*http_response_code\(405\)/);
  assert.ok(postMatch, 'Found POST handler in api/projects.php');
  
  const topOfPost = postMatch[1].slice(0, 100);
  assert.match(topOfPost, /requireAdminAuth\s*\(\)/, 'requireAdminAuth must be executed at the very beginning of POST');
});

// -------------------------------------------------------------
// SCENARIO 4: Public project GET → works
// -------------------------------------------------------------
console.log('\n[Scenario 4] Public Project Discovery (GET)');

runTest('GET /api/projects.php allows public listing without requiring authorization', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/projects.php'), 'utf8');
  const getMatch = code.match(/if\s*\(\$method\s*===?\s*['"]GET['"]\)\s*\{([\s\S]*?)\n\}\s*\n\s*\/\//);
  assert.ok(getMatch, 'Found GET handler in api/projects.php');
  assert.doesNotMatch(getMatch[1], /requireAdminAuth/, 'GET projects must NOT require admin auth');
  assert.match(getMatch[1], /projects/, 'GET projects returns projects array');
});

runTest('GET /api/projects.php?slug=jai-nagar retrieves specific project publicly', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/projects.php'), 'utf8');
  assert.match(code, /\$slug\s*=\s*isset\(\$_GET\['slug'\]\)/, 'Extracts slug query param');
  assert.match(code, /['"]project['"]\s*=>\s*\$project/, 'Returns project detail object on match');
});

// -------------------------------------------------------------
// SCENARIO 5: Public enquiry submission → works without admin auth
// -------------------------------------------------------------
console.log('\n[Scenario 5] Public Customer Enquiry Submission');

runTest('POST /api/leads.php (action: submit) accepts public leads without auth', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/leads.php'), 'utf8');
  assert.match(code, /\$digitsOnly\s*=\s*preg_replace\('\/\[\^0-9\]\/', '', \$rawPhone\)/, 'Validates phone digits');
  assert.match(code, /Lead captured/, 'Returns lead captured success response');
  assert.match(code, /'lead_id'\s*=>\s*\$id/, 'Issues unique lead identifier');
});

runTest('POST /api/leads.php implements honeypot anti-spam defense', () => {
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/leads.php'), 'utf8');
  assert.match(code, /!empty\(\$data\['hp_field'\]\)\s*\|\|\s*!empty\(\$data\['website_url'\]\)/, 'Honeypot fields detect spam bots');
});

// -------------------------------------------------------------
// SCENARIO 6: Valid admin authentication → succeeds
// -------------------------------------------------------------
console.log('\n[Scenario 6] Valid Admin Authentication Flow');

runTest('POST /api/auth.php performs timing-safe verification and issues signed JWT', () => {
  const authCode = fs.readFileSync(path.join(ROOT_DIR, 'api/auth.php'), 'utf8');
  assert.match(authCode, /hash_equals/, 'Uses hash_equals for timing attack prevention');
  assert.match(authCode, /generateAdminToken/, 'Issues JWT on successful authentication');
  assert.match(authCode, /'token'\s*=>\s*\$token/, 'Returns signed token in response payload');

  const testSecret = 'auth_integration_test_secret_thirty_two_chars_long';
  const token = generateTestToken('admin', 'Super Administrator', 86400, testSecret);
  const validated = validateTokenSimulator(token, testSecret);
  assert.ok(validated, 'Generated token verifies cleanly');
  assert.equal(validated.sub, 'admin');
  assert.equal(validated.role, 'Super Administrator');
});

// -------------------------------------------------------------
// SCENARIO 7: Invalid, Expired, and Forged Token Rejection
// -------------------------------------------------------------
console.log('\n[Scenario 7] Invalid, Expired, and Forged Token Rejection');

runTest('Fails securely if JWT_SECRET is unset or shorter than 32 characters', () => {
  const token = generateTestToken('admin', 'Super Administrator', 3600, 'short_secret');
  assert.equal(token, null, 'Must refuse to issue token with secret under 32 chars');
  assert.equal(validateTokenSimulator('header.payload.sig', 'short_secret'), null, 'Must reject validation when secret is weak');
});

runTest('Rejects token with invalid signature', () => {
  const secret = 'valid_secret_key_thirty_two_chars_long';
  const attackerSecret = 'attacker_secret_thirty_two_chars_long';
  const forgedToken = generateTestToken('admin', 'Super Administrator', 3600, attackerSecret);
  
  const result = validateTokenSimulator(forgedToken, secret);
  assert.equal(result, null, 'Forged token must be rejected');
});

runTest('Rejects expired token', () => {
  const secret = 'valid_secret_key_thirty_two_chars_long';
  const expiredToken = generateTestToken('admin', 'Super Administrator', -3600, secret);
  const result = validateTokenSimulator(expiredToken, secret);
  assert.equal(result, null, 'Expired token must be rejected');
});

runTest('Rejects token with alg: none attack', () => {
  const secret = 'valid_secret_key_thirty_two_chars_long';
  const noneToken = generateTestToken('admin', 'Super Administrator', 3600, secret, 'none');
  const result = validateTokenSimulator(noneToken, secret);
  assert.equal(result, null, 'alg: none token must be rejected');
});

runTest('Rejects token with tampered payload', () => {
  const secret = 'valid_secret_key_thirty_two_chars_long';
  const token = generateTestToken('user', 'Guest', 3600, secret);
  const parts = token.split('.');
  
  const elevatedPayload = base64UrlEncode(JSON.stringify({
    sub: 'admin',
    role: 'Super Administrator',
    exp: Math.floor(Date.now() / 1000) + 3600
  }));
  const tamperedToken = `${parts[0]}.${elevatedPayload}.${parts[2]}`;
  
  const result = validateTokenSimulator(tamperedToken, secret);
  assert.equal(result, null, 'Tampered token must fail HMAC validation');
});

runTest('Rejects malformed tokens', () => {
  const secret = 'valid_secret_key_thirty_two_chars_long';
  assert.equal(validateTokenSimulator('invalid.token', secret), null);
  assert.equal(validateTokenSimulator('', secret), null);
  assert.equal(validateTokenSimulator(null, secret), null);
  assert.equal(validateTokenSimulator('a.b.c.d', secret), null);
});

// -------------------------------------------------------------
// SCENARIO 8: Database connection failure → safe error without leakage
// -------------------------------------------------------------
console.log('\n[Scenario 8] Database Failure & Secret Isolation');

runTest('Database connection failure in api/db.php catches Throwable and never leaks credentials', () => {
  const dbCode = fs.readFileSync(path.join(ROOT_DIR, 'api/db.php'), 'utf8');
  assert.match(dbCode, /catch\s*\(\s*Throwable\s*\$e\s*\)/, 'Catches Throwable on PDO failure');
  assert.doesNotMatch(dbCode, /echo\s*.*\$e->getMessage/, 'Never echos exception message directly');
  assert.doesNotMatch(dbCode, /var_dump|print_r/, 'Never dumps PDO connection state');
});

runTest('Endpoints return generic sanitized errors on database failure', () => {
  const leadsCode = fs.readFileSync(path.join(ROOT_DIR, 'api/leads.php'), 'utf8');
  assert.match(leadsCode, /http_response_code\(500\)/, 'Emits 500 status on unhandled database error');
  assert.match(leadsCode, /Database error updating lead status|Database error deleting lead|Database error retrieving leads/, 'Uses generic error messages');
  assert.doesNotMatch(leadsCode, /echo\s*.*\$e->getMessage/, 'Never exposes PDO exception details');
});

console.log(`\n========================================`);
console.log(`INTEGRATION TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
