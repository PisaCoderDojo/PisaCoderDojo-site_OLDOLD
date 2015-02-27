<?php
$database = new SQLite3('../sqlite/newsdb.db');
$aResult = array();
$uResult = $database->query("SELECT * FROM news");

while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
  $aResult[] = $aRow;
}

echo json_encode($aResult);
?>
