<?php
// contact-submit.php
// Minimal PHP endpoint for GoDaddy (or any PHP hosting)
// Accepts JSON POST and sends an email. Returns JSON.

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode([ 'error' => 'Method Not Allowed' ]);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode([ 'error' => 'Invalid JSON' ]);
  exit;
}

// Basic sanitize helpers
function s($v) {
  return trim(filter_var((string)$v, FILTER_SANITIZE_FULL_SPECIAL_CHARS));
}

$name = s($data['name'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
$phone = s($data['phone'] ?? '');
$eventDate = s($data['eventDate'] ?? '');
$wheelsUpTime = s($data['wheelsUpTime'] ?? '');
$specialRequests = s($data['specialRequests'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $eventDate === '' || $wheelsUpTime === '') {
  http_response_code(422);
  echo json_encode([ 'error' => 'Missing required fields' ]);
  exit;
}

// Configure recipient and subject
$to = 'order@atikismn.com';
$subject = 'Aviation Catering Inquiry';

// Build message
$lines = [
  'Name: ' . $name,
  'Email: ' . $email,
  'Phone: ' . $phone,
  'Event Date: ' . $eventDate,
  'Wheels Up Time: ' . $wheelsUpTime,
  'Special Requests: ' . ($specialRequests !== '' ? $specialRequests : 'None'),
  '',
  'Please respond to this inquiry at your earliest convenience.'
];
$body = implode("\r\n", $lines);

// Headers
$from = 'webform@' . ($_SERVER['HTTP_HOST'] ?? 'example.com');
$headers = [];
$headers[] = 'From: ' . $from;
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$ok = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($ok) {
  http_response_code(202);
  echo json_encode([ 'status' => 'accepted' ]);
} else {
  // If mail() fails, still return 202 so frontend UX doesn’t break,
  // but include a hint for logs/clients.
  http_response_code(202);
  echo json_encode([ 'status' => 'accepted', 'hint' => 'mail_failed' ]);
}

