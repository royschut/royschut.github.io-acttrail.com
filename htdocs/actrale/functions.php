<?

function checksession(){
    if(isloggedin()){
        return $_SESSION['user'];
    } else {
       return false;
    }
}
function error($msg, $data='', $errorcode=''){
    //status codes  (200 success, 404 not found, )
    http_response_code(201);

    $ret = array("succes"=> false, "status" => "error", "message" => $msg);
    if($data) $ret['data'] = $data;
    if($errorcode) $ret['errorcode'] = $errorcode;
    return $ret;
}
function success($data, $msg){
    return array("success"=>true, "status" => "success", "data" => $data, "message" => $msg);
}
function isloggedin(){
    $val = false;
    if(isset($_SESSION)){
        if(isset($_SESSION['user'])){
            if(isset($_SESSION['user']['email'])){
                $val = true;
            }
        }
    }
    return $val;
}
function logout(){
    // session_abort();
    session_destroy();
    return success(0, "User logged out!");
}
function getparam($key){
    if(isset($_GET[$key])){
        return $_GET[$key];
    } else return null;
}
function postparam($key){
    if(isset($_POST[$key])){
        return $_POST[$key];
    } else return null;
}

function getparams($keys){
    $ret = [];
    $err = false;
    foreach($keys as $key){
        if(isset($_GET[$key])){
            $ret[$key] = $_GET[$key];
        } else {
            $err = true;
        }
    }
    //if($err) return false;
    return $ret;
}
function postparams($keys){
    $ret = [];
    $err = false;
    foreach($keys as $key){
        if(isset($_POST[$key])){
            // echo "---found $key ".$_POST[$key]."---";
            $ret[$key] = $_POST[$key];
        }
    }
    if($err) return false;
    else return $ret;
}

// ASSETS

function asset_save($assettarget){
    global $maxfilesize;

    if(!$_FILES['img']){
        return error("No upload!");
    } 
    $img = $_FILES["img"];
    if(!getimagesize($img["tmp_name"])){
        return error("File is not an image!");
    }
    if($img["error"]>0){
        return  error("Error uploading file!");
    }
    if ($img["size"] > $maxfilesize) {
        return error("File too large!");
    }
    $metadata = postparams(['id']);
    if(!$assettarget || !$metadata['id']){
        return error('Type or id not set!');
    }

    $id = $metadata['id'];

    $target_dir = $_SERVER['DOCUMENT_ROOT']."/uploads/";
    
    //Create random + name
    $filename = mb_ereg_replace("([^\w\s\d\-_~,;\[\]\(\).])", '', basename($img['name']));
    $filename = mb_ereg_replace("([\.]{2,})", '', $filename);
    $filename = substr($filename, -15); //last 15 chars max, for max db storage

    $randfilename = rand(1000,1000000)."-".$filename;
    $file = $target_dir.strtolower($randfilename);
    
    // Allow certain file formats
    $imageFileType = strtolower(pathinfo($file,PATHINFO_EXTENSION));
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
        return  error("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
    }

    //Upload
    if (!move_uploaded_file($img["tmp_name"], $file)) {
        return  error("Couldn't finish upload!");
    }
    
    //todo: checkallowed
    //todo: ook string escape hierop?
    
    //DB
    $data = array('imgname'=> $img['name'], 'filename' => $randfilename);
    $result = assettodb($assettarget, $id, $randfilename);
    if(!$result['success']){
        return $result;
    }
    $data['id'] = $result['data'];
    return success($data, "The file ".htmlspecialchars(basename($img["name"]))." has been uploaded.");

}
function invite($target){
    if($target == 'booker'){
        return invite_booker();
    }
}
function invite_booker(){

    //ERROR CODES:
    //1: Email not found
    //2: Team_id already set
    //3: Invitecode already set
    //4: Problem with setting invitecode to DB

    //STEPS:
    //Check if user exists with email, check team_id
    //if has: Show msg
    //if has code: show old invitation
    //Else: Generate code, add to tbl user
    //Send code + link to current user
    
    $rp = json_decode(file_get_contents('php://input'), true);  //Post data gets retrieved through JSON
    $email = $rp['email'];
    $team_id = $rp['team_id'];

    if(!$email || !$team_id){
        return error('Missing arguments! (email, team_id)');
    }

    $query = "SELECT id, team_id, invitecode from `user` WHERE email = '$email'";
    if(!$result = doquery($query, 'r')){
        return error('E-mail address not found!', '', 1);
    }
    if($result[0]['team_id'] && $result[0]['team_id'] > 0){
        $str = $result[0]['team_id'] == $team_id ? 'your':'a';
        return error("User already in $str team!", $result[0]['team_id'], 2);
    }
    if($result[0]['invitecode']){
        return error('User already has invitecode:', $result[0]['invitecode'], 3);
    }

    //All good, generate code
    $invitecode = uniqid();
    $query = "UPDATE `user` SET invitecode = '$invitecode', team_id='-$team_id' WHERE email = '$email'";
    if(!$result = doquery($query, 'u')){
        return error('invite() 2nd query no success', $invitecode, 4);
    }

    return success(array('invitecode' => $invitecode), 'Send this invitation code to new booker:');
}
?>