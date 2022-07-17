<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");

    $serverName="localhost";
    $userName='root';
    $password='';
    $dbName='db';

    $con = mysqli_connect($serverName, $userName, $password, $dbName);
    if(!$con) {
        echo "e";
    }
if(!isset($_SESSION['connect'])) {
    session_start();
    $_SESSION['connect'] = $con;
}


