<?php
require_once 'config.php';

function get_all_users() {
    $conn = db_connect();
    $result = $conn->query("SELECT id, username, email, created_at FROM users");
    $users = $result->fetch_all(MYSQLI_ASSOC);
    $conn->close();
    return $users;
}

function get_all_posts() {
    $conn = db_connect();
    $result = $conn->query("SELECT blog_posts.*, users.username FROM blog_posts JOIN users ON blog_posts.user_id = users.id");
    $posts = $result->fetch_all(MYSQLI_ASSOC);
    $conn->close();
    return $posts;
}

function update_post_status($post_id, $status) {
    $conn = db_connect();
    $stmt = $conn->prepare("UPDATE blog_posts SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $post_id);
    $success = $stmt->execute();
    $stmt->close();
    $conn->close();
    return $success;
}

function delete_post($post_id) {
    $conn = db_connect();
    $stmt = $conn->prepare("DELETE FROM blog_posts WHERE id = ?");
    $stmt->bind_param("i", $post_id);
    $success = $stmt->execute();
    $stmt->close();
    $conn->close();
    return $success;
}

function update_user_status($user_id, $status) {
    $conn = db_connect();
    $stmt = $conn->prepare("UPDATE users SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $user_id);
    $success = $stmt->execute();
    $stmt->close();
    $conn->close();
    return $success;
}

