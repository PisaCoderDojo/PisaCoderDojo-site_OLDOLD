<?php
  $data = json_decode(file_get_contents("php://input"));

  $to = "lucarin91@gmail.com";
  $subject = $data->subject;
  $message = $data->text;

  // Always set content-type when sending HTML email
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  // More headers
  $headers .= "From: <" . $data->mail . ">\r\n";
  //$headers .= 'Cc: myboss@example.com' . "\r\n";

  $ris = mail($to,$subject,$message,$headers);
  if($ris){
    echo 'true';
  }else{
    echo 'false';
  }
?>
