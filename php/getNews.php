<?php
$db = new SQLite3('../database.db');
$results = $db->query('SELECT * FROM news');

while ($row = $results->fetchArray()) {
  echo $row['id'];
  echo $row['title'];
  echo $row['body'];
}
?>
