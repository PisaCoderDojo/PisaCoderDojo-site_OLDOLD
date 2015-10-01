<?php
require_once('Helper.php');

Class News {
  public static function create($app){
    // Get book with ID
    $app->get('/', Helper::setHeader($app), function () use ($app){
      $db = Helper::getDB();
      $tag = $app->request()->get('tag');
      $search = $app->request()->get('search');
      if (null!==$tag){
        $stmt = $db->prepare("SELECT id,title,body,author,creation_date
                              FROM NEWS INNER JOIN TAGS ON NEWS.id=TAGS.news_id
                              WHERE TAGS.name=:tag");
        $stmt->bindValue(':tag', $tag, SQLITE3_TEXT);
        $result = $stmt->execute();
      }elseif (null!==$search) {
        $db = Helper::getDB();
        $stmt = $db->prepare("SELECT * FROM NEWS WHERE title LIKE :text OR body LIKE :text");
        $stmt->bindValue(':text', '%'.$search.'%', SQLITE3_TEXT);
        $result = $stmt->execute();
      }else{
        $result = $db->query("SELECT * FROM news ORDER BY id DESC");
      }
      echo Helper::encodeJsonArray($result);
    });

    $app->get('/:id', Helper::setHeader($app), function($id){
      $db = Helper::getDB();
      $stmt = $db->prepare("SELECT * FROM news WHERE id=:id");
      $stmt->bindValue(':id', $id, SQLITE3_INTEGER);

      $result = $stmt->execute();
      echo Helper::encodeJsonObjectNews($result);
    });

    /*
    $app->get('/tag/:tag', Helper::setHeader($app), function($tag){
      $db = Helper::getDB();
      $stmt = $db->prepare("SELECT id,title,body,author,creation_date
                            FROM NEWS INNER JOIN TAGS ON NEWS.id=TAGS.news_id
                            WHERE TAGS.name=:tag");
      $stmt->bindValue(':tag', $tag, SQLITE3_TEXT);
      $uResult = $stmt->execute();
      echo Helper::encodeJsonArray($uResult);
    });
    */
    /*
    $app->get('/search/:text', Helper::setHeader($app), function($text){
      $db = Helper::getDB();
      $stmt = $db->prepare("SELECT * FROM NEWS WHERE title LIKE :text OR body LIKE :text");
      $stmt->bindValue(':text', '%'.$text.'%', SQLITE3_TEXT);
      $uResult = $stmt->execute();
      echo Helper::encodeJsonArrayNews($uResult);
    });
    */
    $app->post('/', Helper::checkToken($app), function() use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("INSERT INTO NEWS (title,body,author,creation_date)
                            VALUES (:title,:body,:author,:creation_date)");
      $stmt->bindValue(':title', $data->title, SQLITE3_TEXT);
      $stmt->bindValue(':body', $data->body, SQLITE3_TEXT);
      $stmt->bindValue(':author', $data->author, SQLITE3_TEXT);
      $stmt->bindValue(':creation_date', time()*1000, SQLITE3_INTEGER);
      $ret = $stmt->execute();

      if(!$ret){
        echo $db->lastErrorMsg();
      }else {
        $newsID = $db->lastInsertRowID();
        $tagList = $data->tags;
        foreach ($tagList as $tag){
          $stmt = $db->prepare("INSERT INTO TAGS (name,news_id) VALUES (:tag,:id)");
          $stmt->bindValue(':tag', $tag, SQLITE3_TEXT);
          $stmt->bindValue(':id', $newsID, SQLITE3_INTEGER);
          $stmt->execute();
        }
        echo 'success';
      }
    });

    $app->put('/:id', Helper::checkToken($app), function($id) use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $stmt = $db->prepare("UPDATE NEWS
                    SET title = :title, body = :body, author = :author
                    WHERE id=:id");
      $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
      $stmt->bindValue(':title', $data->title, SQLITE3_TEXT);
      $stmt->bindValue(':body', $data->body, SQLITE3_TEXT);
      $stmt->bindValue(':author', $data->author, SQLITE3_TEXT);
      $ret = $stmt->execute();

      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        $tags = $data->tags;
        $stmt = $db->prepare("DELETE FROM TAGS WHERE news_id=:id");
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
        $stmt->execute();
        foreach ($tags as $tag){
          $stmt = $db->prepare("INSERT INTO TAGS (name,news_id) VALUES (:tag,:id)");
          $stmt->bindValue(':tag', $tag, SQLITE3_TEXT);
          $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
          $stmt->execute();
        }
        echo "success";
      }
    });

    $app->delete('/:id', Helper::checkToken($app), function($id) use($app){
      $db = Helper::getDB();
      $stmt = $db->prepare("DELETE FROM news WHERE id=:id");
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
