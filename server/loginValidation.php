<?php

include "private/vendor/autoload.php";
use Firebase\JWT\JWT;

function validLogin($token)
{
    $token=explode(' ',$token);
    //DECODE TOKEN
    try {
        $jwt = JWT::decode($token, JWT_SECRET,[JWT_ALGO]);
    } catch (Exception $ex) {
        exit("NO");
    }

// JWT VALIDATION
    $now = strtotime("now");
    if ($jwt->iss !== JWT_ISSUER || $jwt->nbf > $now || $jwt->exp < $now) {
        exit("NO");
    }
    return $jwt;
}


