<?php
require_once('lib/Facebook-sdk/autoload.php');
use Facebook\FacebookSession;
use Facebook\FacebookRequest;

FacebookSession::setDefaultApplication('852604174797487', '9e20b12fb740a2f5f58287f4378d23b0');
$session = FacebookSession::newAppSession();
try {
  $session->validate();
} catch (FacebookRequestException $ex) {
  // Session not valid, Graph API returned an exception with the reason.
  echo $ex->getMessage();
} catch (\Exception $ex) {
  // Graph API returned info, but it may mismatch the current app or have expired.
  echo $ex->getMessage();
}

if(isset($_GET["id"])){
  $id = $_GET["id"];
  $request = new FacebookRequest(
    $session,
    'GET',
    '/'.$id.'/photos'
  );
  $response = $request->execute();
  $graphObject = $response->getGraphObject();
  echo json_encode($graphObject->asArray()['data']);

}else{
  $request = new FacebookRequest(
    $session,
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
}

?>
