<?php
include "config.php";

    class User{
        public $error="";
        public $con=null;
        public $stmt=null;

        //CONNECT TO DATABASE
        function __construct()
        {
            try{
                $this->con=mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            }catch (Exception $ex){
                exit($ex->getMessage());
            }
        }

        //CLOSE CONNECTION
        function __destruct () {
            if ($this->stmt!==null) { $this->stmt = null; }
            if ($this->con!==null) { $this->con = null; }
        }
        function query($sql){ //***
            try{
                $result = mysqli_query($this->con, $sql);
//                $this->stmt->execute($data);
                if(!is_bool($result)) {
                    $this->stmt = mysqli_fetch_assoc($result);
                    if ($this->stmt != null) return true;
                    else return false;
                }
                if($result) return true;
                return false;
            }catch (Exception $ex){
                $this->error=$ex->getMessage();
                return false;
            }
        }

        function isEmailExist($email){
            $sql = "SELECT email FROM `users`  where email='{$email}'";
            return $this->query($sql);
        }

        //INSERT OR UPDATE USER
        function save($username,$email,$password,$id=null){

            if($id===null) //Insert user
            {
                $sql="INSERT INTO `users` (`email`,`username`,`password`) VALUES ('{$email}','{$username}','{$password}')";
                //$data=[$username,$email,$password];
            }else{ //update user
                $sql="UPDATE `users` SET `username`=?,`password`=?,`email`=? WHERE `id`=?";
               // $data=[$username,$email,$password,$id];
            }
            return $this->query($sql);
        }

        function get($email){
            $sql="SELECT * FROM `users` where email='{$email}'";
            $this->query($sql);
            return $this->stmt;
        }

        //VERIFY USER
        function verify($email,$password){
            //GET USER
            $user=$this->get($email);
            $valid=is_array($user);

            //CHECK PASSWORD
            if($valid){
                $valid=password_verify($password,$user["password"]);
            }
            //RETURN RESULT (FALSE IF INVALID, USER ARRAY IF VALID)
            if($valid){return $user;}
            else{
                $this->error="Invalid email/password";
                return false;
            }


        }

    }