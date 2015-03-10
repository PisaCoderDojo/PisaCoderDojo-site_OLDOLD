<?php
require_once('CONF.php');
require_once('jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $SECRET_KEY);

if ($token->admin){
  $database = new SQLite3('../sqlite/newsdb.db');
  $id = $data->id;
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
}else
  echo "token is not valid";
?>