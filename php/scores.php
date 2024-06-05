<?php
include "./connection.php";

// Get username and score from POST data
$username = $_POST['username'];
$score = $_POST['score'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO leaderboard (username, score) VALUES (?, ?)");
$stmt->bind_param("si", $username, $score);

if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
