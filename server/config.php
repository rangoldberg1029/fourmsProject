<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");

define("DB_HOST", "localhost");
define("DB_NAME", "db");
//define("DB_CHARSET", "utf8");
define("DB_USER", "root");
define("DB_PASSWORD", '');

// (B) JWT STUFF
define("JWT_SECRET", "gHfKxh%zjqC7ZMKAcY@B(fC(aC0Opv9Q");
define("JWT_ISSUER", "RAN");
define("JWT_ALGO", "HS512");
define("JWT_AUD", "localhost");

