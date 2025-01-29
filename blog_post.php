<?php
require_once 'config.php';

function create_blog_post($user_id, $title, $content) {
    $conn = db_connect();
    $title = sanitize_input($title);
    $content = sanitize_input($content);

    $stmt = $conn->prepare("INSERT INTO blog_posts (user_id, title, content) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $title, $content);

    if ($stmt->execute()) {
        $post_id = $stmt->insert_id;
        $stmt->close();
        $conn->close();
        return $post_id;
    } else {
        $stmt->close();
        $conn->close();
        return false;
    }
}

function get_user_posts($user_id) {
    $conn = db_connect();

    $stmt = $conn->prepare("SELECT id, title, content, created_at, views FROM blog_posts WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $row['earnings'] = calculate_earnings($row['views']);
        $posts[] = $row;
    }

    $stmt->close();
    $conn->close();
    return $posts;
}

function calculate_earnings($views) {
    // Assuming a CPM of $5
    $cpm = 5;
    return ($views / 1000) * $cpm;
}

