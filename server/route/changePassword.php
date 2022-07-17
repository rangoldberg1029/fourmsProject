<?php
include '../connect.php';
include '../secure.php';

$con=$_SESSION['connect'];

$req=file_get_contents("php://input");
if(isset($req) && !empty($req)){
    $newPassword=$req->password;
    $usernameAndPassword = "{$req->username}{$newPassword}";
    $email=$req->email;
    $encryption=encrypt($req->username,$newPassword);
    $sql="UPDATE `users` SET password={$encryption} where email={$email} ";
    $run=mysqli_query($con,$sql);

}