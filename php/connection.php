<?php
// Connection settings
$servername = "localhost";
$username = "bjornwrld1";
$password = "hq8s%S813";
$dbname = "leaderboard_088901";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
