<?php
include "../connect.php";
const LOGIN_SESSION = 'fduuifdshfurtui43';
$con=$_SESSION['connect'];

function isEmailValied($email,$con){
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Invalid email";
    }else {
        $sql = "SELECT email FROM `users`  where email='{$email}'";
        $run = mysqli_query($con, $sql);
        $data = mysqli_fetch_assoc($run);
        if ($data == null) return "valid email";
        return "this email already exists ";
    }
}

function sanitize($dirty){
    $clean=htmlentities($dirty,ENT_QUOTES,"UTF-8");
    return trim($clean);
}

function cleanPost($post){
    $clean=[];
    foreach ($post as $key=>$value){
        $clean[$key]=sanitize($value);
    }
    return $clean;
}
function login($user){
    $_SESSION[LOGIN_SESSION]=$user['id'];
}
//function current_user($con){
//    $sessionExist=isset($_SESSION[LOGIN_SESSION]);
//    if(!$sessionExist)
//        return false;
//    $id=$_SESSION[LOGIN_SESSION];
//    $sql="SELECT * FROM `users` where email='{$id}'";
//    $result=mysqli_query($con,$sql);
//    $user=mysqli_fetch_assoc($result);
//    if($user){
//        return $user;
//    }
//    return false;
//}
