<?
//0. Open session
session_start();

// 1. Includes
require_once 'vars.php';
require_once "functions.php";
require_once 'sql.php';
require_once 'sqldb.php';

// 2. Check params
$target = getparam('target');
$crud = getparam('crud');
$list = getparam('list');
$method = getparam('method');


//3. Check session
$ret = "";
$user = checksession();

if(!$user){
    if($method){
        if($method == 'login'){
            $ret = login();
        }
    }
    if(!$ret) $ret = error("No user in session");
} else if($user){

    //4. Run the API
    if($method){
        if($method=='checksession') $ret = success($user, 'Logged in from session');
        if($method=='login') $ret = login();    //Relogin
        if($method=='logout') $ret = logout();    //Relogin
        if($method=='upload') $ret = asset_save($target);
        if($method=='invite') $ret = invite($target);
    } else if($crud){
        $ret = runcrud($target, $crud);
    } else if ($list){    
        $ret = getlist($list);
    } else $ret = "What do you want?";
}

echo json_encode($ret);
?>