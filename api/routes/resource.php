<?php
require_once('Helper.php');

Class Resource {
  public static function create($app){
    // Get book with ID
    $app->get('/cat/:cat', Helper::setHeader($app), function ($cat) {
      $db = Helper::getDB();
      $stmt = $db->prepare("SELECT * FROM RESOURCE WHERE category_id=:cat");
      $stmt->bindValue(':cat',$cat,SQLITE3_TEXT);
      $res = $stmt->execute();
      echo Helper::encodeJsonArray($res);
    });

    $app->get('/id/:id', Helper::setHeader($app), function($id){
      $db = Helper::getDB();
      $stmt = $db->prepare("SELECT * FROM RESOURCE WHERE id=:id");
      $stmt->bindValue(':id',$id,SQLITE3_INTEGER);
      $res = $stmt->execute();
      echo Helper::encodeJsonObject($res);
    });

    $app->post('/cat/:cat', Helper::checkToken($app), function($cat) use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("INSERT INTO RESOURCE (title,description,resource,category_id,creation_date)
                            VALUES (:title,:des,:res,:cat,:date)");
      $stmt->bindValue(':title', $data->title, SQLITE3_TEXT);
      $stmt->bindValue(':des', $data->description, SQLITE3_TEXT);
      $stmt->bindValue(':res', $data->resource, SQLITE3_TEXT);
      $stmt->bindValue(':cat', $cat, SQLITE3_INTEGER);
      $stmt->bindValue(':date', time()*1000, SQLITE3_INTEGER);
      $ret = $stmt->execute();
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo "success";
      }
    });

    $app->put('/id/:id', Helper::checkToken($app), function($id) use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("UPDATE RESOURCE
                            SET title=:title,
                                description=:des,
                                resource=:res,
                                category_id=:cat
                            WHERE id=:id");
      $stmt->bindValue(':title', $data->title, SQLITE3_TEXT);
      $stmt->bindValue(':des', $data->description, SQLITE3_TEXT);
      $stmt->bindValue(':res', $data->resource, SQLITE3_TEXT);
      $stmt->bindValue(':cat', $data->category_id, SQLITE3_INTEGER);
      $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
      $ret = $stmt->execute();
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo "success";
      }
    });

    $app->delete('/id/:id', Helper::checkToken($app), function($id) use($app){
      $db = Helper::getDB();
      $stmt = $db->prepare("DELETE FROM RESOURCE WHERE id=:id");
      $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
      $ret = $stmt->execute();
      if(!$ret){
        echo $database->lastErrorMsg();
      } else {
        echo "success";
      }
    });
  }
}

?>
