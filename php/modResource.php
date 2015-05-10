<?php
require_once('lib/jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $_SERVER['SECRET_KEY']);

if ($token->admin){
  $database = new SQLite3('../sqlite/newsdb.db');
  $id = $database->escapeString($data->id);
  $title = $database->escapeString($data->title);
  $description = $database->escapeString($data->description);
  $category_id = $database->escapeString($data->category_id);
  $resource = $database->escapeString($data->resource);
  $date = time()*1000;


  $sql ="UPDATE RESOURCE
         SET title='$tile',
             description='$description',
             resource='$resource',
             category_id='$category_id',
             creation_date='$date'
         WHERE id='$id'";

  $ret = $database->exec($sql);
  if(!$ret){
    echo $database->lastErrorMsg();
  } else {
    echo "success";
  }
}else
  echo "token is not valid";
?>
