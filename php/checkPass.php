<?php
require_once('lib/jwt_helper.php');
require_once('lib/password.php');

$data = json_decode(file_get_contents("php://input"));
$pass = $data->password;
$secret = password_hash($_SERVER["ADMIN_PASS"], PASSWORD_DEFAULT);
if (password_verify($pass, $secret)){
  $token = array();
  $token['admin'] = true;
  echo JWT::encode($token, $_SERVER['SECRET_KEY']);
}else{
  echo 'error';
}
?>
