
<?php
   $database = 'newsdb.db' ;
   $db = new SQLite3($database );
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }

// ------------------- CREATE TABLE ----------------
   $sql = <<<EOF
   CREATE TABLE news (
     ID  integer PRIMARY KEY AUTOINCREMENT,
     TITLE varchar(30),
     BODY  text,
     AUTHOR varchar(20),
     DATE_CREATE integer
   )
EOF;

   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo "Table created successfully\n";
   }


 // ---------------------INSERT  operation ------------------
/*
    $sql =<<<EOF
     INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE)
     VALUES ( 'primo tit', 'body 1', 'Davdie', 'YYY.1111' );

     INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE)
     VALUES ( 'secondo tit', 'body 2', 'luca', 'YYY.222' );

     INSERT INTO news (TITLE,BODY,AUTHOR,DATE_CREATE)
     VALUES ( 'terzo tit', 'body 3', 'stefano', 'YYY.7777' );
EOF;

    $ret = $db->exec($sql);
    if(!$ret){
     echo $db->lastErrorMsg();
  } else {
     echo "Records created successfully\n";
  }


// ---------------------select operation -------------------


  $sql =<<<EOF
     SELECT * from news;
EOF;

  $ret = $db->query($sql);
  while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
     echo "ID = ".$row['ID']."\n";
     echo "BODY = ".$row['BODY']."\n";
     echo "AUTHOR = ".$row['AUTHOR']."\n";
     echo "DATE_CREATE =  ".$row['DATE_CREATE']."\n\n";
  }
  echo "Operation done successfully\n";
  $db->close();
*/
?>
