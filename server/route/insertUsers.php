<?php

include "functions.php";
include "../user.php";
include "../verify.php";

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");

$req = json_decode(file_get_contents('php://input'), true);

 if(isset($req)&& !empty($req)){
     $post=cleanPost($req);
     $username=$post['username'];
     $password=password_hash($post['password'],PASSWORD_DEFAULT);
     $email=$post['email'];

     if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
         exit("NO");
     } else {
         $user=new User();
         $UserExist=$user->isEmailExist($email);
         if($UserExist){
             exit("User already exists");
         }
         $result= $user->save($username,$email,$password);
         if($result){
             $token= generateToken($username,$email);
             setcookie("jwt", $token);

//             $now = strtotime("now")+ 360000000;
//             setcookie("jwt",$token,$now,'/') ;
             echo $token;
         }
         echo false;
     }
 }



