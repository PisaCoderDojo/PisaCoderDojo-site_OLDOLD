//aggiunto in issController branch
<?php
class MyDB extends SQLite3
  {
     function __construct()
     {
        $this->open('../sqlite/newsdb.db', SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE );
     }
  }
  $db = new MyDB();
  if(!$db){
     echo $db->lastErrorMsg();
  } else {
     echo "Opened database successfully\n";
  }

/*
//------------------------------------JSON format ------------------
class RecordsDb {
  public $title = '';
  public $body = "";
  public $author = "";
  public $date = "";

  function __construct( $t , $b , $a , $d ) {
    $this->title = $t;//$_POST['title'] ;
    $this->body = $b;//$_POST['body'] ;
    $this->author = $a;//$_POST['author'];
    $this->date = $d ; //$_POST['bdaytime'];
 }
}
    $r = new RecordsDb( $_POST['title'],$_POST['body'] ,$_POST['author'],$_POST['bdaytime']);
    //$r = new RecordsDb( 'aa', 'bb', 'cc', 'dd');
    echo json_encode($r);

//--------------------------------------------------
*/

$title = $_POST['title'] ;
$body = $_POST['body'] ;
$author = $_POST['author'];
$date = $_POST['bdaytime'];

$sql ="INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE) VALUES ('$title' ,'$body', '$author','$date')";

 /*INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE)
 VALUES ($POST['title'],$POST['body'],$POST['uthor'],$POST['bdaytime']);
*/

  $ret = $db->exec($sql);
  if(!$ret){
      echo $db->lastErrorMsg();
  } else {
    echo "<h2>Records created successfully\n</h2>";
  }

?>
