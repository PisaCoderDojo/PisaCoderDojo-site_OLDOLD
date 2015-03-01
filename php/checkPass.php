<?php
require_once('CONF.php');
require_once('jwt_helper.php');
require_once('password.php');

$data = json_decode(file_get_contents("php://input"));
$pass = $data->password;
$secret = password_hash($ADMIN_PASS, PASSWORD_DEFAULT);
if (password_verify($pass, $secret)){
  $token = array();
  $token['admin'] = true;
  echo JWT::encode($token, $SECRET_KEY);
}else{
  echo 'error';
}
?>
