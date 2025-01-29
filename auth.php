<?php
require_once 'config.php';

function register_user($username, $email, $password) {
    $conn = db_connect();
    $username = sanitize_input($username);
    $email = sanitize_input($email);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        $user_id = $stmt->insert_id;
        $stmt->close();
        $conn->close();
        return generate_jwt($user_id);
    } else {
        $stmt->close();
        $conn->close();
        return false;
    }
}

function login_user($email, $password) {
    $conn = db_connect();
    $email = sanitize_input($email);

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $stmt->close();
            $conn->close();
            return generate_jwt($user['id']);
        }
    }

    $stmt->close();
    $conn->close();
    return false;
}

