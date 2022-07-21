<?php
include "../discussion.php";
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");

$req=file_get_contents("php://input");
if(isset($req) && !empty($req)){
    $id=$req["id"];
    $DISCUSSION=new Discussion();
    $result=$DISCUSSION->deleteOne($id);
    if($result){
        echo true;
    }
    echo json_encode($result);
}