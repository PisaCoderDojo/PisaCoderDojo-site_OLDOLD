<?php
$database = new SQLite3('../sqlite/newsdb.db');

$uResult = $database->query("SELECT * FROM CATEGORY");

$aResult = array();
while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
  $aResult[] = $aRow;
}

echo json_encode($aResult);

?>
