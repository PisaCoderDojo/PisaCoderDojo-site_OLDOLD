<?php
require_once('Helper.php');

Class Resource {
  public static function create($app){
    // Get book with ID
    $app->get('/', Helper::setHeader($app), function () use ($app){
      $db = Helper::getDB();
      $cat = $app->request()->get('category');
      if(null!==$cat){
        $stmt = $db->prepare("SELECT * FROM resource WHERE category_id=:cat");
        $stmt->bindValue(':cat',$cat,SQLITE3_TEXT);
        $res = $stmt->execute();
      }else{
        $res = $db->query("SELECT * FROM resource ORDER BY id DESC");
      }
      echo Helper::encodeJsonArray($res);
    });

    $app->get('/:id', Helper::setHeader($app), function($id){
      $db = Helper::getDB();
      $stmt = $db->prepare("SELECT * FROM RESOURCE WHERE id=:id");
      $stmt->bindValue(':id',$id,SQLITE3_INTEGER);
      $res = $stmt->execute();
      echo Helper::encodeJsonObject($res);
    });

    $app->post('/', Helper::checkToken($app), function() use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("INSERT INTO RESOURCE (title,description,links,category_id,creation_date)
                            VALUES (:title,:des,:res,:cat,:date)");
      $stmt->bindValue(':title', $data->title, SQLITE3_TEXT);
      $stmt->bindValue(':des', $data->description, SQLITE3_TEXT);
      $stmt->bindValue(':res', $data->links, SQLITE3_TEXT);
      $stmt->bindValue(':cat', $data->category_id, SQLITE3_INTEGER);
      $stmt->bindValue(':date', time()*1000, SQLITE3_INTEGER);
      $ret = $stmt->execute();
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo "success";
      }
    });

    $app->put('/:id', Helper::checkToken($app), function($id) use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("UPDATE RESOURCE
                            SET title=:title,
                                description=:des,
                                links=:res,
                                category_id=:cat
                            WHERE id=:id");
      $stmt->bindValue(':title', $data->title, SQLITE3_TEXT);
      $stmt->bindValue(':des', $data->description, SQLITE3_TEXT);
      $stmt->bindValue(':res', $data->links, SQLITE3_TEXT);
      $stmt->bindValue(':cat', $data->category_id, SQLITE3_INTEGER);
      $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
      $ret = $stmt->execute();
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo "success";
      }
    });

    $app->delete('/:id', Helper::checkToken($app), function($id) use($app){
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
