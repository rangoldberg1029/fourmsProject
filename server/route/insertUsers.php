<?php
include '../connect.php';
include "functions.php";
$con=$_SESSION['connect'];

$req = json_decode(file_get_contents('php://input'), true);
 if(isset($req)&& !empty($req)){
     $post=cleanPost($req);
     $username=$post['username'];
     $password=$post['password'];
     $email=$post['email'];

     $validEmail=isEmailValied($email,$con);
     if($validEmail=="Invalid email"||$validEmail=="this email already exists "){
         echo json_encode("{$validEmail}");
     }else {
         $password=password_hash($password,PASSWORD_DEFAULT);
         $sql = "INSERT INTO `users` (`username`,`password`,`email`) VALUES ('{$username}','{$password}','{$email}')";
         $result = mysqli_query($con, $sql);
         echo json_encode($post);
     }
 }


