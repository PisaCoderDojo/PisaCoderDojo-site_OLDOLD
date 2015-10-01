<?php
require_once('Helper.php');

Class Category {
  public static function create($app){
    // Get book with ID
    $app->get('/', Helper::setHeader($app), function () {
      $db = Helper::getDB();
      $uResult = $db->query("SELECT * FROM CATEGORY");
      echo Helper::encodeJsonArray($uResult);
    });

    $app->get('/:id', Helper::setHeader($app), function ($id) {
      $db = Helper::getDB();
      $stmt = $db->prepare("SELECT * FROM category WHERE id=:id");
      $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
      $result = $stmt->execute();
      echo Helper::encodeJsonObject($result);
    });

    $app->post('/', Helper::checkToken($app), function() use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("INSERT INTO CATEGORY (name) VALUES (:name)");
      $stmt->bindValue(':name',$data->name, SQLITE3_TEXT);
      $ret = $stmt->execute();
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo $db->lastInsertRowID();
      }
    });

    $app->put('/:id', Helper::checkToken($app), function($id) use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("UPDATE CATEGORY
                            SET name = :name
                            WHERE id=:id");
      $stmt->bindValue(':name', $data->name, SQLITE3_TEXT);
      $stmt->bindValue(':id',$id, SQLITE3_INTEGER);
      $ret = $stmt->execute();

      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo "success";
      }
    });

    $app->delete('/:id', Helper::checkToken($app), function($id) use($app){
      $db = Helper::getDB();
      $stmt = $db->prepare("DELETE FROM CATEGORY WHERE id=:id");
      $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
      $ret = $stmt->execute();
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo "success";
      }
    });
  }
}

?>
