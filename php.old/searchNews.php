<?php
$database = new SQLite3('../sqlite/newsdb.db');

if(isset($_GET["text"])){
  $query = SQLite3::escapeString($_GET["text"]);
  $uResult = $database->query("SELECT * FROM NEWS WHERE title LIKE '%$query%' OR body LIKE '%$query%'");

  $aResult = array();
  while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
    $aResult[] = $aRow;
  }

  echo json_encode($aResult);
}
?>
