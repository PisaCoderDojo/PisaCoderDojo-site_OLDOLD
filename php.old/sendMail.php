<?php
  $data = json_decode(file_get_contents("php://input"));

  $to = "pisa.it@coderdojo.com";
  $subject = "[contact-form] " . $data->subject;
  $message = "From: ". $data->mail . " <br/><br/> " . $data->text;

  // Always set content-type when sending HTML email
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  // More headers
  $headers .= "From: contact-form <noreplay@sfcoding.com>\r\n";
  //$headers .= "From: contact-form <noreplay@sfcoding.com>\r\n";
  $headers .= 'Reply-To: ' . $data->mail . "\r\n" .
  
  $ris = mail($to,$subject,$message,$headers);
  if($ris){
    echo 'true';
  }else{
    echo 'false';
  }
?>
