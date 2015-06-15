<?php
require_once('Helper.php');
require_once('lib/Facebook-sdk/autoload.php');
use Facebook\FacebookSession;
use Facebook\FacebookRequest;

Class Photo {

  private static function getSession(){
    FacebookSession::setDefaultApplication('852604174797487', '9e20b12fb740a2f5f58287f4378d23b0');
    $session = FacebookSession::newAppSession();
    try {
      $session->validate();
      return $session;
    } catch (FacebookRequestException $ex) {
      // Session not valid, Graph API returned an exception with the reason.
      echo $ex->getMessage();
    } catch (\Exception $ex) {
      // Graph API returned info, but it may mismatch the current app or have expired.
      echo $ex->getMessage();
    }
  }

  public static function create($app){
    // Get book with ID
    $app->get('/:id', function ($id) {
      $request = new FacebookRequest(
        self::getSession(),
        'GET',
        '/'.$id.'/photos'
      );
      $response = $request->execute();
      $graphObject = $response->getGraphObject();
      echo json_encode($graphObject->asArray()['data']);
    });

    $app->get('/', function() use($app){
      $request = new FacebookRequest(
        self::getSession(),
        'GET',
        '/1386160968362978/albums'
      );
      $response = $request->execute();
      $graphObject = $response->getGraphObject();
      $ris = array();
      $noAlbum = array(1416643945314680,1416026268709781,1386180185027723,1386175348361540);
      foreach ($graphObject->asArray()['data'] as $value){
        if (!array_search($value->id, $noAlbum))
          array_push($ris,$value);
      }
      echo json_encode($ris);
    });
  }
}

?>
