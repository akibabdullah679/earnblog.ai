<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'blog_platform');

// Connect to the database
function db_connect() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

// Global function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Global function to generate JWT token
function generate_jwt($user_id) {
    $secret_key = "your_secret_key";
    $issued_at = time();
    $expiration_time = $issued_at + (60 * 60); // Valid for 1 hour
    $payload = array(
        "user_id" => $user_id,
        "iat" => $issued_at,
        "exp" => $expiration_time
    );
    return jwt_encode($payload, $secret_key);
}

// You'll need to install a JWT library for PHP, like firebase/php-jwt
// and include it here

