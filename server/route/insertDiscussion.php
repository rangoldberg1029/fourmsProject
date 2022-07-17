<?php
include "../connect.php";
include "./functions.php";
$con=$_SESSION['connect'];

$req = json_decode(file_get_contents('php://input'), true);
if(isset($req)&& !empty($req)){
    $post=cleanPost($req);
    $newPost=$post['post'];
    $parent_comment=$post['parent_comment'];
    $date=$post['date'];
    $username=$post['user'];
    $sql = "INSERT INTO `fourm` (`id`, `post`, `parent_comment`, `date`, `user`)  VALUES (NULL,'{$newPost}','{$parent_comment}','{$date}','{$username}')";
    $result = mysqli_query($con, $sql);
    echo json_encode($post);

}