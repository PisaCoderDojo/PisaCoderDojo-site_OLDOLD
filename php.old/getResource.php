<?php
$database = new SQLite3('../sqlite/newsdb.db');

if(isset($_GET["cat"])){
  $cat = SQLite3::escapeString($_GET["cat"]);
  $sql = "SELECT * FROM RESOURCE WHERE category_id=$cat";

}else if(isset($_GET['id'])){
  $id = SQLite3::escapeString($_GET["id"]);
  $sql = "SELECT * FROM RESOURCE WHERE id=$id";
}
else{
  echo "cat or id parameter are needed";
  exit();
}

$uResult = $database->query($sql);

$aResult = array();
while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
  $aResult[] = $aRow;
}
echo json_encode($aResult);

?>
