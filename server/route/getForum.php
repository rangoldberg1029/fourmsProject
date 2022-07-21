<?php
include "../discussion.php";
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");

$DISCUSSION=new Discussion();
$allDiscussion=$DISCUSSION->getAll();
echo json_encode($allDiscussion);

