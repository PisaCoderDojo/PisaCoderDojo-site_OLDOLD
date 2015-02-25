<?php
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$sql ="DELETE FROM news WHERE ID='$id'";

 /*INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE)
 VALUES ($POST['title'],$POST['body'],$POST['uthor'],$POST['bdaytime']);
*/
$database = new SQLite3('../sqlite/newsdb.db');

$ret = $database->exec($sql);
if(!$ret){
  echo $database->lastErrorMsg();
} else {
  echo "success";
}

?>
