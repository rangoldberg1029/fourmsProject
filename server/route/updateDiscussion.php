<?php
include '../connect.php';
$con=$_SESSION['connect'];

$req=file_get_contents("php://input");
if(isset($req) && !empty($req)){

}