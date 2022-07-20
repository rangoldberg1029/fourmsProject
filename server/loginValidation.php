<?php

if (!isset( $_POST["token"])) { exit("NO"); }

//DECODE TOKEN
include "config.php";
include "private/vendor/autoload.php";
use Firebase\JWT\JWT;

    try{
        $jwt = JWT::decode($_POST["token"], JWT_SECRET, [JWT_ALGO]);
    }catch (Exception $ex){
        exit("NO");
    }

// JWT VALIDATION
    $now = strtotime("now");
    if ($jwt->iss !== JWT_ISSUER || $jwt->nbf > $now || $jwt->exp < $now) { exit("NO"); }
    echo $jwt;



