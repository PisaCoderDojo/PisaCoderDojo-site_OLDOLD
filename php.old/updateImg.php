<?php
require_once('lib/jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$token = JWT::decode($token, $_SERVER['SECRET_KEY']);

if ($token->admin){

  $url = 'img/article/';
  $path = '../'.$url;
  $realPath = realpath($path);

  $data = json_decode(file_get_contents("php://input"));
  $imgAll = $data->img;
  list($type, $imgAll) = explode(';', $imgAll);
  list(, $imgAll) = explode(',', $imgAll);
  list(, $type) = explode('/', $type);
  $img = base64_decode($imgAll);

  $name = uniqid('',true).$type;

  file_put_contents($realPath.$name, $img);


  echo $url.$name;

}else{
  echo "token is not valid";
}
?>
