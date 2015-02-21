

<?php

$sDatabaseFileName = '../sqlite/newsdb.db';
$oDatabaseHandler = new SQlite3ToJSONConverter($sDatabaseFileName);
$jsonNews = $oDatabaseHandler->getJSONFromSQLite();

var_dump($jsonNews);

/**
 * The aim of this class is to offer a transformation
 * of a SQLite database to its JSON stirng format equivalent
 * @author Samuel Grau : <samuel.grau@gmail.com>
 */
class SQlite3ToJSONConverter {

    private $database = NULL;

    /**
     * Open the database by creating a new SQLite3 instance from the
     * filename given to the constructor initially
     */
    public function __construct($sDatabaseFileName = NULL) {
        $this->openDatabase($sDatabaseFileName);
    }

    /**
     * Open the database by creating a new SQLite3 instance from the
     * filename given to the constructor initially
     */
    protected function openDatabase($databaseFileName = NULL) {
        $this->database = new SQLite3($databaseFileName);
        assert($this->database);
    }

    /**
     * This method returns information about the given table name
     */
    private function columnsInformationWithTableName($sTableName) {
        // Setting the query
        $sQueryColumns = "PRAGMA table_info(':name')";
        $sQueryColumns = str_replace(':name', $sTableName, $sQueryColumns);

        // Preparing the query
        $oResult = $this->database->query($sQueryColumns);

        // Fetching result and preparing formatting of the result to a
        // convenient usable format.
        $aResult = array();
        while ($aRow = $oResult->fetchArray(SQLITE3_ASSOC)) {
            $aResult[] = $aRow;
        }

        return $aResult;
    }

    /**
     * This method returns information about the given table name
     */
    private function tablesInformation() {
        // Launch the query to find information about tables
        // of the database
        $sQueryTables = "SELECT * FROM sqlite_master WHERE type='table'";
        $uResult = $this->database->query($sQueryTables);

        // Fetching result and preparing formatting of the result to a
        // convenient usable format.
        $aResult = array();
        while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
            $aResult[] = $aRow;
        }

        return $aResult;
    }

    private function schemaInformation() {
        $aSchema = array();
        $aTables = $this->tablesInformation();
        foreach ($aTables as $aTableInformation) {
            if (!isset($aTableInformation['name'])) {
                throw new Exception();
            }

            $sTableName = $aTableInformation['name'];
            $aColumns = $this->columnsInformationWithTableName($sTableName);
            $aSchema[$sTableName] = $aColumns;

            unset($sTableName);
        }
        unset($aTables);
        return $aSchema;
    }

    private function dataInformation($sTableName) {

        $sQueryData = "SELECT * FROM `$sTableName`";
        $uResult = $this->database->query($sQueryData);

        // Fetching result and preparing formatting of the result to a
        // convenient usable format.
        $aResult = array();
        while ($aRow = $uResult->fetchArray(SQLITE3_ASSOC)) {
            $aResult[] = $aRow;
        }

        return $aResult;
    }

    /**
     * Main method that will export the SQLite Database to a JSON stirng format.
     */
    public function getJSONFromSQLite() {
        $aResult = array();

        $aTables = $this->schemaInformation();
        $aData = array();
        foreach($aTables as $sTableName => $aColumns) {
            $aRows = $this->dataInformation($sTableName);
            $aData[$sTableName] = $aRows;
        }

        $aResult['database_schema'] = $aTables;
        $aResult['data'] = $aData;

        return json_encode($aResult);
    }
}



?>


<?php
/*
class MyDB extends SQLite3
  {
     function __construct()
     {
        $this->open('../sqlite/newsdb.db');
     }
  }
  $db = new MyDB();
  if(!$db){
     echo $db->lastErrorMsg();
  } else {
     echo "Opened database successfully\n";
  }

  $sql =<<<EOF
       SELECT * from news;
EOF;

    $ret = $db->query($sql);
    $rows = array();
    while($row = $ret->fetchArray(SQLITE3_ASSOC)) {
      $rows['newsjson']() = $row;
    }
    print json_encode($rows);

    $json = array();

    while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      //$stack = array("orange", "banana");
      echo json_encode($row);
      array_push($json, json_encode($row));
      print_r($stack);
    //  $json
      //echo json_encode($row);
     echo "ID = " . $row['ID'] . "\n";
       echo "TITLE = " . $row['TITLE'] . "\n";
       echo "BODY = " . $row['BODY'] . "\n";
       echo "AUTHOR = " . $row['AUTHOR'] . "\n";
       echo "DATE_CREATE =  " . $row['DATE_CREATE'] . "\n\n";
    }
    echo "Operation done successfully\n";
    $db->close();

  ?>
  */
