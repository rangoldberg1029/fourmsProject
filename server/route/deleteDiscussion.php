<?php
include '../connect.php';
$con=$_SESSION['connect'];

$req=file_get_contents("php://input");
if(isset($req) && !empty($req)){
    $sid=$req->id;
    $sql="DELETE FROM `fourm` where `id`=`$sid` ";
    $run=mysqli_query($con,$sql);
}