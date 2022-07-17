<?php
include '../connect.php';
include 'functions.php';
$con=$_SESSION['connect'];
//$req = json_decode(file_get_contents('php://input'), true);
//$method = $_SERVER['REQUEST_METHOD'];


if(isset($_GET["email"])&& !empty($_GET["email"])){
    $user=cleanPost($_GET);
   // $username=$_GET['username'];
    $password=$user["password"];
    $email=$user["email"];
    $match=false;
    $sql="SELECT * FROM `users` where email='{$email}'";
    $result=mysqli_query($con,$sql);
    $data=mysqli_fetch_assoc($result);
    if($data!=null) {
        $match = password_verify($user['password'], $data['password']);
    }
    if($match){
            echo json_encode($data);
        }else
        echo "";
}