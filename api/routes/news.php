<?php
require_once('Helper.php');

Class News {
  public static function create($app){
    // Get book with ID
    $app->get('/', Helper::setHeader($app), function () {
      $db = Helper::getDB();
      $sql = "SELECT * FROM news ORDER BY id DESC";
      $uResult = $db->query($sql);
      echo Helper::encodeJsonNews($uResult);
    });

    $app->get('/id/:id', Helper::setHeader($app), function($id){
      $db = Helper::getDB();
      $sql = "SELECT * FROM news WHERE id=$id";
      $uResult = $db->query($sql);
      echo Helper::encodeJsonNews($uResult);
    });

    $app->get('/tag/:tag', Helper::setHeader($app), function($tag){
      $db = Helper::getDB();
      $sql = "SELECT id,title,body,author,creation_date
              FROM NEWS INNER JOIN TAGS ON NEWS.id=TAGS.news_id
              WHERE TAGS.name='$tag'";
      $uResult = $db->query($sql);
      echo Helper::encodeJsonNews($uResult);
    });

    $app->post('/', Helper::checkToken($app), function() use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $title = $db->escapeString($data->title);
      $body = $db->escapeString($data->text);
      $author = $db->escapeString($data->user);
      $date = time()*1000;
      //$tagList = $data->tags;

      $sql ="INSERT INTO NEWS (title,body,author,creation_date)
             VALUES ('$title','$body','$author','$date')";

      $ret = $db->exec($sql);
      if(!$ret){
        echo $db->lastErrorMsg();
      }else {
        $newsID = $db->lastInsertRowID();
        /*foreach ($tagList as $tag){
          $db->exec("INSERT INTO TAGS (name,news_id) VALUES ('$tag',$newsID)");
        }*/
        echo $newsID;
      }
    });

    $app->put('/', Helper::checkToken($app), function() use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $id = $db->escapeString($data->id);
      $title = $db->escapeString($data->title);
      $body = $db->escapeString($data->text);
      $author = $db->escapeString($data->user);
      $tags = $data->tags;

      $sql ="UPDATE NEWS
             SET title = '$title', body = '$body', author = '$author'
             WHERE id='$id'";

      $ret = $db->exec($sql);
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        $db->exec("DELETE FROM TAGS WHERE news_id=$id");
        foreach ($tags as $tag){
          $db->exec("INSERT INTO TAGS (name,news_id) VALUES ('$tag',$id)");
        }
        echo "success";
      }
    });

    $app->delete('/', Helper::checkToken($app), function() use($app){
      $data = json_decode($app->request->getBody());
      $db = Helper::getDB();
      $id = $db::escapeString($data->id);
      $sql ="DELETE FROM news WHERE ID=$id";

      $ret = $db->exec($sql);
      if(!$ret){
        echo $db->lastErrorMsg();
      } else {
        echo "success";
      }
    });
  }
}

?>
