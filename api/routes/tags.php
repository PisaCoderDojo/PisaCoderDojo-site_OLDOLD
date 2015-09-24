<?php
require_once('Helper.php');

Class Tags {
  public static function create($app){
    // Get book with ID
    $app->get('/', Helper::setHeader($app), function () use ($app){
      $db = Helper::getDB();
      $uResult = $db->query("SELECT name, count(*) as count FROM TAGS GROUP BY name");
      echo Helper::encodeJsonArray($uResult);
    });
  }
}

?>
