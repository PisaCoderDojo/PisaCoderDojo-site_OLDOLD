<?php
require_once('lib/jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $_SERVER['SECRET_KEY']);

if ($token->admin){
  $database = new SQLite3('../sqlite/newsdb.db');
  $title = $database->escapeString($data->title);
  $description = $database->escapeString($data->description);
  $category_id = $database->escapeString($data->category_id);
  $resource = $database->escapeString($data->resource);
  $date = time()*1000;

  $sql ="INSERT INTO RESOURCE (title,description,resource,category_id,creation_date)
         VALUES ('$title','$description','$resource','$category_id','$date')";

  $ret = $database->exec($sql);
  if(!$ret){
    echo $database->lastErrorMsg();
  } else {
    echo "success";
  }
}else
  echo "token is not valid";
?>
