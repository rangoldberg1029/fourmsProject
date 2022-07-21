<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");


$req = json_decode(file_get_contents('php://input'), true);
//NO EMAIL/PASSWORD SENT
if(!isset($req)){exit("NO");}

//VALIDATE USER
include "user.php";
include "route/functions.php";
$post=cleanPost($req);
$USER=new User();
$user=$USER->verify($post["email"],$post["password"]);

if($user===false){exit("NO");}
////GENERATE JWT TOKEN
include "private/vendor/autoload.php";
use Firebase\JWT\JWT;

$now = strtotime("now");
echo JWT::encode([
        "iat" => $now, // ISSUED AT - TIME WHEN TOKEN IS GENERATED
        "nbf" => $now, // NOT BEFORE - WHEN THIS TOKEN IS CONSIDERED VALID
        "exp" => $now + 36000, // EXPIRY - 1 HR (3600 SECS) FROM NOW IN THIS EXAMPLE
        "jti" => base64_encode(random_bytes(16)), // JSON TOKEN ID
        "iss" => JWT_ISSUER, // ISSUER
        "aud" => JWT_AUD, // AUDIENCE

        "data" => [
            "id"=>$user["id"],
            "username" => $user["username"],
            "email" => $user["email"]
        ]
    ], JWT_SECRET, JWT_ALGO);




