<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");
include "./functions.php";
include "../discussion.php";

$req = json_decode(file_get_contents('php://input'), true);

if(isset($req)&& !empty($req)){
    $post=cleanPost($req);
    $newPost=$post['post'];
    $parent_comment=$post['parent_comment'];
    $date=$post['date'];
    $username=$post['user'];
    $DISCUSSION=new Discussion();
    $result=$DISCUSSION->addDiscussion($newPost,$parent_comment,$date,$username);
    echo json_encode($result);


}