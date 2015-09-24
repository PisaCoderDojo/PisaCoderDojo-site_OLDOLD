<?php
require 'lib/Slim/Slim.php';
require_once('lib/jwt_helper.php');
require_once('lib/password.php');
require_once('Helper.php');
require_once('routes/news.php');
require_once('routes/tags.php');
require_once('routes/resource.php');
require_once('routes/category.php');
require_once('routes/photo.php');

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->group('/news', function() use ($app){
  News::create($app);
});

$app->group('/tags', function () use($app){
  Tags::create($app);
});

$app->group('/resources', function() use ($app){
  Resource::create($app);
});

$app->group('/category', function() use ($app){
  Category::create($app);
});

$app->group('/album', function() use ($app){
  Photo::create($app);
});

$app->post('/login', function () use ($app) {
  $data = json_decode($app->request->getBody());
  $pass = $data->password;
  $secret = password_hash($_SERVER['ADMIN_PASS'], PASSWORD_DEFAULT);
  if (password_verify($pass, $secret)){
    $token = array();
    $token['admin'] = true;
    echo JWT::encode($token, $_SERVER['SECRET_KEY']);
  }else{
    echo 'error';
  }
});

$app->post('/sendmail', function() use ($app){
  $data = json_decode($app->request->getBody());

  $to = "pisa.it@coderdojo.com";
  $subject = "[contact-form] " . $data->subject;
  $message = "From: ". $data->mail . " <br/><br/> " . $data->text;

  // Always set content-type when sending HTML email
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  // More headers
  $headers .= "From: contact-form <noreplay@sfcoding.com>\r\n";
  $headers .= 'Reply-To: ' . $data->mail . "\r\n" .

  $ris = mail($to,$subject,$message,$headers);
  if($ris){
    echo 'true';
  }else{
    echo 'false';
  }
});

$app->post('/uploadimg', Helper::checkToken($app), function() use ($app){
  $url = 'img/article/';
  $path = '../'.$url;
  $realPath = realpath($path);

  $data = json_decode($app->request->getBody());
  $imgAll = $data->img;
  list($type, $imgAll) = explode(';', $imgAll);
  list(, $imgAll) = explode(',', $imgAll);
  list(, $type) = explode('/', $type);
  $img = base64_decode($imgAll);

  $name = uniqid('',true).$type;

  file_put_contents($realPath.$name, $img);

  echo $url.$name;
});

$app->run();
?>
