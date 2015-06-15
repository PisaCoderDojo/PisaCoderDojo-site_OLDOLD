<?php
require_once('lib/jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $_SERVER['SECRET_KEY']);

if ($token->admin){
  $database = new SQLite3('../sqlite/newsdb.db');
  $title = $database->escapeString($data->title);
  $body = $database->escapeString($data->text);
  $author = $database->escapeString($data->user);
  $date = time()*1000;
  $tagList = $data->tags;

  $sql ="INSERT INTO NEWS (title,body,author,creation_date)
         VALUES ('$title','$body','$author','$date')";

  $ret = $database->exec($sql);
  if(!$ret){
    echo $database->lastErrorMsg();
  } else {
    $newsID = $database->lastInsertRowID();
    foreach ($tagList as $tag){
      $database->exec("INSERT INTO TAGS (name,news_id) VALUES ('$tag',$newsID)");
    }
    echo "success";
  }
}else
  echo "token is not valid";
?>
