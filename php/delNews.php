<?php
require_once('CONF.php');
require_once('jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $SECRET_KEY);

if ($token->admin){
  $data = json_decode(file_get_contents("php://input"));
  $id = $data->id;

  $sql ="DELETE FROM news WHERE ID='$id'";

  $database = new SQLite3('../sqlite/newsdb.db');

  $ret = $database->exec($sql);
  if(!$ret){
    echo $database->lastErrorMsg();
  } else {
    echo "success";
  }
}else
  echo "token is not valid";
?>
