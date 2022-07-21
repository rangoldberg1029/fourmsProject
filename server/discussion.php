<?php
include "config.php";
include "loginValidation.php";

class Discussion{
    public $con=null;
    public $stmt=null;

    function __construct()
    {
        try{
            $this->con=mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        }catch (Exception $ex){
            exit($ex->getMessage());
        }
    }
    function __destruct () {
        if ($this->stmt!==null) { $this->stmt = null; }
        if ($this->con!==null) { $this->con = null; }
    }

    function getAll()
    {
        $comments = [];
        $sql = "SELECT * FROM  `fourm`";
        if ($result= mysqli_query($this->con, $sql)) {
            $i = 0;
            while ($data = mysqli_fetch_assoc($result)) {
                $comments[$i]['id'] = $data['id'];
                $comments[$i]['post'] = $data['post'];
                $comments[$i]['parent_comment'] = $data['parent_comment'];
                $comments[$i]['date'] = $data['date'];
                $i++;
            }
        }
        return $comments;
    }

    function deleteOne($id){
        try{
            $token=include "loginValidation.php";
            $token=explode(" ",$token);
            if($token==="NO"){
                    return http_response_code(401);
            }else{
                    $sql="DELETE FROM `fourm` WHERE id='{$id}'";
                    $result= mysqli_query($this->con, $sql);
                    if($result) return true;
                    return false;
            }

        }catch (Exception $ex){
            exit($ex->getMessage());
        }


    }

    function addDiscussion($newPost,$parent_comment,$date,$username){

        try{
            $token=$_SERVER["HTTP_TOKEN"];
            $valid=validLogin($token);
            if($valid==="NO"){
                return http_response_code(401);
            }else{
                $sql = "INSERT INTO `fourm` (`id`, `post`, `parent_comment`, `date`, `user`)  VALUES (NULL,'{$newPost}','{$parent_comment}','{$date}','{$username}')";
                $result= mysqli_query($this->con, $sql);
                if($result==="NO") return "NO";
                return true;
            }

        }catch (Exception $ex){
            exit($ex->getMessage());
        }
    }


}
