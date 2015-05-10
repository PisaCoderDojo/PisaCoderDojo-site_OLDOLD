<?php
require_once('lib/jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $_SERVER['SECRET_KEY']);

if ($token->admin){
  $data = json_decode(file_get_contents("php://input"));
  $id = SQLite3::escapeString($data->id);

  $sql ="DELETE FROM RESOURCE WHERE ID=$id";

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
