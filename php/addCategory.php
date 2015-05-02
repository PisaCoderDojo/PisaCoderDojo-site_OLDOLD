<?php
require_once('lib/jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $_SERVER['SECRET_KEY']);

if ($token->admin){
  $database = new SQLite3('../sqlite/newsdb.db');
  $name = $database->escapeString($data->name);

  $sql ="INSERT INTO CATEGORY (name) VALUES ('$name')";

  $ret = $database->exec($sql);
  if(!$ret){
    echo $database->lastErrorMsg();
  } else {
    //$id = $database->lastInsertRowID();
    echo "success";
  }
}else
  echo "token is not valid";
?>
