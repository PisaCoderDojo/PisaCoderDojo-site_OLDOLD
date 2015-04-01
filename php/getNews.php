<?php
if(isset($_GET["id"])){
  $id = SQLite3::escapeString($_GET["id"]);
  $sql = "SELECT * FROM news WHERE ID=$id";
}else{
  $sql="SELECT * FROM news ORDER BY ID DESC";
}
$database = new SQLite3('../sqlite/newsdb.db');
$aResult = array();
$uResult = $database->query($sql);

while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
  $aResult[] = $aRow;
}

echo json_encode($aResult);
?>
