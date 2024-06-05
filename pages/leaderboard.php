<?php 
include "../php/connection.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../CSS/leaderboard.css">
</head>
<body>

<main>
    <div id="header">
        <h1>Ranking</h1>
    </div>
    <div id="leaderboard">
        <div class="ribbon"></div>
        <table>
            <?php
            // Fetch leaderboard data
            $sql = "SELECT * FROM leaderboard ORDER BY score DESC LIMIT 5";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td class='number'>" . $row['id'] . "</td>";
                    echo "<td class='name'>" . $row['username'] . "</td>";
                    echo "<td class='points'>" . $row['score'] . "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='3'>0 results</td></tr>";
            }

            $conn->close();
            ?>
        </table>
        <div id="buttons">
            <button class="exit"  onclick="window.location.href='../'">Back</button>
        </div>
    </div>
</main>
</body>
</html>
