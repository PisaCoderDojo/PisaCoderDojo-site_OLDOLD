<?php
require_once('jwt_helper.php');
require_once('password.php');

$data = json_decode(file_get_contents("php://input"));
$pass = $data->password;
$secret = password_hash("secret", PASSWORD_DEFAULT);
if (password_verify($pass, $secret)){
  $token = array();
  $token['admin'] = true;
  echo JWT::encode($token, '3cki6Ymla7690PjbGuKj5C4BI26tMt55');
}else{
  echo 'error';
}
?>
