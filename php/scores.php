<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "./connection.php";

// Check if POST variables are set
if (isset($_POST['username']) && isset($_POST['score'])) {
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
} else {
    echo "Error: Username or score not set";
}

$conn->close();
?>
