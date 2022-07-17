<?php

include "../connect.php";
$con=$_SESSION['connect'];

$comments=Array();
$sql="SELECT * FROM  `fourm`";
if($result=mysqli_query($con,$sql)){
    $i=0;
    while($data=mysqli_fetch_assoc($result))
    {
        $comments[$i]['id']=$data['id'];
        $comments[$i]['post']=$data['post'];
        $comments[$i]['parent_comment']=$data['parent_comment'];
        $comments[$i]['date']=$data['date'];
        $i++;
    }
    echo json_encode($comments);
   
   
  
}
