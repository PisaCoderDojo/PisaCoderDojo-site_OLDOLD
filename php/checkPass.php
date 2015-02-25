<?php
require_once('jwt_helper.php');

$data = json_decode(file_get_contents("php://input"));
$pass = $data->password;
$secret = password_hash("dio", PASSWORD_DEFAULT);
if (password_verify($pass, $secret)){
  $token = array();
  $token['admin'] = true;
  echo JWT::encode($token, 'secret_server_key');
}else{
  echo 'error';
}
?>
