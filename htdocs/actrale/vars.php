<?
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

if (filter_input(INPUT_SERVER, 'SERVER_NAME', FILTER_SANITIZE_URL) == "localhost") {
    header("Access-Control-Allow-Origin: http://localhost:3000");

    $servername = "localhost";
    $sv_user = "root";
    $sv_pass = "";
    $dbname = "actrale";  
} else {    
    header("Access-Control-Allow-Origin: http://acttrail.com");
    //I'd like to keep this sort of private :-)
    $servername = "localhost";
    $sv_user = "royscml113_royscml113";
    $sv_pass = "Ad599bOss!";
    $dbname = "royscml113_actrale";
}

$mysqli = new mysqli($servername, $sv_user, $sv_pass, $dbname) or die ('failed to connect');

$maxfilesize = 500000; //asset uploads

?>