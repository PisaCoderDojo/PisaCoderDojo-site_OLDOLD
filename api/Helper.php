<?php
require_once('lib/jwt_helper.php');

class Helper{

  public static function getDB(){
    return new SQLite3('../sqlite/newsdb.db');
  }

  public static function encodeJsonArray($sqlArray){
    $aResult = array();
    while ($aRow = $sqlArray->fetchArray(SQLITE3_ASSOC)) {
      $aResult[] = $aRow;
    }
    return json_encode($aResult);
  }

  public static function encodeJsonObject($sqlArray){
    return json_encode($sqlArray->fetchArray(SQLITE3_ASSOC));
  }

  public static function encodeJsonArrayNews($sqlArray){
    $db = self::getDB();
    $aResult = array();
    while ($aRow = $sqlArray->fetchArray(SQLITE3_ASSOC)) {
      $id = $aRow['id'];
      $tagsRes = $db->query("SELECT name FROM TAGS WHERE news_id=$id");
      $tResult = array();
      while ($tRow = $tagsRes->fetchArray(SQLITE3_ASSOC)) {
        $tResult[] = $tRow['name'];
      }
      $aRow['tags'] = $tResult;
      $aResult[] = $aRow;
    }
    return json_encode($aResult);
  }

  public static function encodeJsonObjectNews($sqlArray){
    $db = self::getDB();
    $aResult = $sqlArray->fetchArray(SQLITE3_ASSOC);
    $id = $aResult['id'];
    $tagsRes = $db->query("SELECT name FROM TAGS WHERE news_id=$id");
    $tResult = array();
    while ($tRow = $tagsRes->fetchArray(SQLITE3_ASSOC)) {
      $tResult[] = $tRow['name'];
    }
    $aResult['tags'] = $tResult;
    return json_encode($aResult);
  }

  public static function setHeader($app){
    return function() use ($app){
      $app->response->headers->set('Content-Type', 'application/json');
    };
  }

  public static function checkToken($app){
    return function() use ($app){
      $res = $app->response();
      //$data = json_decode($app->request->getBody());
      //$token = $data->token;
      $token = $app->request->headers->get('token');
      $token = JWT::decode($token, $_SERVER['SECRET_KEY']);
      if(!$token->admin){
        $res->status(401);
        $res->body('auth error');
      }

    };
  }
}
?>
