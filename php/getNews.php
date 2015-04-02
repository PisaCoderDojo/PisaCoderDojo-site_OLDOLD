<?php
$database = new SQLite3('../sqlite/newsdb.db');

if(isset($_GET["id"])){
  $id = SQLite3::escapeString($_GET["id"]);
  $sql = "SELECT * FROM news WHERE id=$id";

}else if(isset($_GET["tag"])){
  $tag = $database->escapeString($_GET["tag"]);
  $sql = "SELECT id,title,body,author,creation_date
          FROM NEWS INNER JOIN TAGS ON NEWS.id=TAGS.news_id
          WHERE TAGS.name='$tag'";
}else{
  $sql = "SELECT * FROM news ORDER BY id DESC";
}

$aResult = array();
$uResult = $database->query($sql);

while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
  $aResult[] = $aRow;
}

echo json_encode($aResult);
?>
