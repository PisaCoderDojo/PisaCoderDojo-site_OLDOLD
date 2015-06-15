<?php
$database = new SQLite3('../sqlite/newsdb.db');
$aResult = array();
$uResult = $database->query("SELECT name, count(*) as count FROM TAGS GROUP BY name");

while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
  $aResult[] = $aRow;
}

echo json_encode($aResult);
?>
