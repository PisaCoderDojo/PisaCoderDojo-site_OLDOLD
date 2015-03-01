<?php
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$database = new SQLite3('../sqlite/newsdb.db');
$title = $database->escapeString($data->title);
$body = $database->escapeString($data->text);
$author = $database->escapeString($data->user);

$sql ="UPDATE news
       SET TITLE = '$title', BODY = '$body', AUTHOR = '$author'
       WHERE ID='$id'";



$ret = $database->exec($sql);
if(!$ret){
  echo $database->lastErrorMsg();
} else {
  echo "success";
}

?>
