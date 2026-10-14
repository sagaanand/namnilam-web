import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

console.log('--- PHP SYNTAX & STATIC STRUCTURE VALIDATION ---');

const phpFiles = [
  'api/config.php',
  'api/db.php',
  'api/auth.php',
  'api/auth_helper.php',
  'api/leads.php',
  'api/projects.php',
  'api/properties.php',
  'api/prerender.php'
];

let totalChecks = 0;
let passedChecks = 0;

for (const relPath of phpFiles) {
  const filePath = path.join(ROOT_DIR, relPath);
  assert.ok(fs.existsSync(filePath), `File exists: ${relPath}`);
  const code = fs.readFileSync(filePath, 'utf8');

  // 1. Starts with valid <?php tag
  totalChecks++;
  assert.ok(code.trim().startsWith('<?php'), `${relPath} must begin with <?php`);
  passedChecks++;

  // 2. No closing ?> tag (PSR-12 recommendation for pure PHP files to avoid whitespace leaks)
  totalChecks++;
  assert.ok(!code.includes('?>'), `${relPath} should omit closing ?> tag per PSR-12`);
  passedChecks++;

  // 3. Bracket, parenthesis, and brace balancing
  totalChecks++;
  let openBrace = 0;
  let openParen = 0;
  let openBracket = 0;
  let inString = false;
  let stringChar = '';
  let inLineComment = false;
  let inBlockComment = false;
  let escaped = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const nextChar = code[i + 1] || '';

    if (inLineComment) {
      if (char === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (char === '*' && nextChar === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }

    // Comment starts
    if (char === '/' && nextChar === '/') {
      inLineComment = true;
      i++;
      continue;
    }
    if (char === '#' && (i === 0 || code[i - 1] === '\n' || code[i - 1] === ' ')) {
      inLineComment = true;
      continue;
    }
    if (char === '/' && nextChar === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    // String starts
    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      continue;
    }

    // Delimiters
    if (char === '{') openBrace++;
    if (char === '}') openBrace--;
    if (char === '(') openParen++;
    if (char === ')') openParen--;
    if (char === '[') openBracket++;
    if (char === ']') openBracket--;

    if (openBrace < 0) throw new Error(`Mismatched closing brace '}' in ${relPath} around index ${i}`);
    if (openParen < 0) throw new Error(`Mismatched closing parenthesis ')' in ${relPath} around index ${i}`);
    if (openBracket < 0) throw new Error(`Mismatched closing bracket ']' in ${relPath} around index ${i}`);
  }

  assert.equal(openBrace, 0, `Unbalanced braces in ${relPath}: balance is ${openBrace}`);
  assert.equal(openParen, 0, `Unbalanced parentheses in ${relPath}: balance is ${openParen}`);
  assert.equal(openBracket, 0, `Unbalanced brackets in ${relPath}: balance is ${openBracket}`);
  assert.equal(inString, false, `Unterminated string in ${relPath}`);
  assert.equal(inBlockComment, false, `Unterminated block comment in ${relPath}`);
  passedChecks++;

  console.log(`  ✓ ${relPath} passed lexical structure, quote, and delimiter balance checks`);
}

console.log(`\n========================================`);
console.log(`PHP STRUCTURE CHECKS: ${passedChecks}/${totalChecks} Passed`);
console.log(`========================================\n`);
