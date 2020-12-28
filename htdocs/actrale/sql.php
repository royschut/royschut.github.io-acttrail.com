<?

function login(){
    $rp = json_decode(file_get_contents('php://input'), true);  //Post data gets retrieved through JSON
    $email = $rp['email'];
    $pass = $rp['pass'];
    if($email && $pass)  {
        return logindb($email, $pass);
    } else {
        return error("Didn't recieve email or pass ($email, $pass)");
    }
}
function getlist($list){
    $query = "";
    $values = "";
    $allowed = false;
    
    switch($list){
        case 'eventsforteam':
            $id = getparam('id');
            $allowed = checkallowed("team", $id);
            $query = "SELECT DISTINCT id, name, subname, date, venue_id, notes, assetsrc  FROM  `event` WHERE team_id='$id' AND id>0";
        break;
        case 'artistsforteam':
            $id = getparam('id');
            $allowed = checkallowed("team", $id);
            $query = "SELECT DISTINCT id, name, fullname, email, assetsrc FROM  `artist` WHERE team_id='$id' AND id>0";
        break;
        case 'bookingsforteam':
            $id = getparam('id');
            $allowed = checkallowed("team", $id);
            $query = "SELECT DISTINCT b.id, b.artist_id, b.event_id, b.bookingstatus_id, b.fee, b.day, b.settype, b.area, b.insertdate, b.editdate FROM  `event` as e LEFT JOIN `booking` as b ON b.event_id = e.id WHERE e.team_id='$id' AND b.id>0";
        break;

        case "team":
            $team_id = $_SESSION['user']['team_id'];
            $allowed = checkallowed("isbooker", $team_id);
            $query = "SELECT DISTINCT t.id, t.name, t.insertdate, t.editdate, u.id, u.email, u.firstname, u.lastname, u.role_id FROM `team` as t LEFT JOIN user as u ON u.team_id  = t.id WHERE t.id='$team_id' AND u.id>0";
        break;
        case 'artistfee':
            $id = getparam('artist_id');
            $allowed = checkallowed("artist", $id);
            $query = "SELECT DISTINCT id, standardfee, bottomfee FROM `artistfee` WHERE artist_id='$id' AND id>0";
        break;


        //For Artist 
        case 'artist':
            $id = getparam('id');
            $allowed = true; //todo: checkallowed("artist", $id);
            $query = "SELECT DISTINCT id, name, fullname, email, assetsrc FROM  `artist` WHERE id='$id' AND id>0";
        break;
        case "eventsforartist":
            $id = getparam('id');
            $allowed = true;//todo: checkallowed("artist", $id);
            $query = "SELECT DISTINCT e.id, e.name, e.subname, e.date, e.team_id, e.assetsrc  FROM  `booking` as b LEFT JOIN `event` as e ON b.event_id = e.id WHERE b.artist_id='$id' AND b.id>0 AND e.id>0";
        break;
        case 'bookingsforartist':
            $id = getparam('id');
            $allowed = true; //tOdo: checkallowed("artist", $id);
            $query = "SELECT DISTINCT b.id, b.artist_id, b.event_id, b.bookingstatus_id, b.fee, b.day, b.settype, b.area FROM `booking` as b WHERE b.artist_id='$id' AND b.id>0";
        break;

    }
    if(!$allowed){
        return ['succes'=>false, 'message'=> "Request not allowed for this user!"];
    } else if($query){
        // echo $query;
        if($result = doquery($query)){
            return success($result, "Here you have your list!");
        } else {
            return error("0 results");
        }
    }
}
function runcrud($target, $crud){
    $params = [];
    $crudkeys = [];
    $tablekeys =  [];
    $table = $target;
    
    $allowed = false;

    switch($target){
        case 'user':
            $tablekeys = ['email', 'password', 'firstname', 'lastname', 'team_id', 'role_id'];
            $c_keys= ['email'];
            break;
        case 'artist':
            $tablekeys = ['name', 'team_id', 'fullname', 'email'];
            $c_keys= ['name', 'team_id'];
        break;
        case 'booking':
            $tablekeys = ['artist_id', 'event_id', 'bookingstatus_id', 'fee', 'day', 'settype', 'area', 'timetable', 'briefing', 'notes'];
            $c_keys= ['artist_id', 'event_id'];
        break;
        case 'event':
            $tablekeys = ['name', 'subname', 'date', 'team_id', 'venue_id', 'notes'];
            $c_keys= ['name', 'team_id'];
        break;
        case 'artistfee':
            $tablekeys = ['artist_id', 'standardfee', 'bottomfee'];
            $c_keys = $tablekeys;
        break;
        case "asset": 
            $tablekeys = ['name', 'src', 'descr'];
        break;
        case 'contact':
            $tablekeys = ['name', 'role', 'phone', 'email', 'notes'];
        break;
        case 'role':
            $tablekeys = ['name', 'constant'];
        break;
        case 'task':
            $tablekeys = ['name', 'booking_id', 'done'];
        break;
        case 'team':
            $tablekeys = ['name'];
        break;
        case 'travel':
            $tablekeys = ['name', 'descr', 'booking_d'];
        break;
        case 'user':
            $tablekeys = ['email', 'password', 'firstname', 'lastname', 'team_id', 'role_id'];
        break;
        case 'venue':
            $tablekeys = ['name', 'address', 'zipcode', 'notes'];
            $c_keys= ['name'];
        break;
        
    }
    switch ($crud){
        case 'c':                        
            $params = getparams($c_keys);
            $allowed = checkallowed_forcreate($target, $params);
        break;
        case 'r':                           
            $params = getparams(['id']);
            $allowed = checkallowed($target, $params['id']);
        break;
        case 'u';   
            $_POST = json_decode(file_get_contents('php://input'), true);
            $params = postparams(array_merge($tablekeys, ['id']));
            $allowed = checkallowed($target, $params['id']);
        break;
        case 'd':   
            $params = json_decode(file_get_contents('php://input'), true);
            $allowed = checkallowed($target, $params['id']);
        break;      
    }

    if(!$allowed) return error("Request not allowed for this user!");
    if(!is_array($params)) return error("Missing params!");

    $ret = cruddb($table, $crud, $params);
    if(!$ret['success']) return error('cruddb couldnt succeed');
    

    //SIDE EFFECTS

    //update event with venue
    if($target=='venue' && $crud =='c'){
        //Update event
        $ret2 = cruddb('event', 'u', array('venue_id' => $ret['data'], 'id' => getparam('event_id')));
        if(!$ret2['success']) return error('crubdb couldnt finish side effect: update event to venue '.$ret['data']);
        $ret2['data'] = $ret['data'];
        return $ret2;
    }

    //update session?
    if($target=='user' && $crud =='u'){
        foreach($params as $key => $val){
            //todo: use escaped vals?
            $_SESSION['user'][$key] = $val;
        }
    }
    return $ret;
}


function checkallowed($key, $val){
    $team_id = $_SESSION['user']['team_id'];
    switch($key){
        case 'user':
            return $_SESSION['user']['id'] == $val;
        break;
        case "isbooker":
            $user_id = $_SESSION['user']['id'];
            $query = "SELECT t.id FROM `team` as t LEFT JOIN `user` as u ON u.team_id=t.id WHERE u.id='$user_id' AND t.id='$team_id' AND u.role_id = '1'";
            return count(doquery($query)) > 0;
        case 'team':
            return $team_id == $val;
        break;
        case 'artist':
        case 'event':
            $query = "SELECT id FROM `$key` WHERE id='$val' AND team_id='$team_id'";
            return count(doquery($query)) > 0;
        break;
        case 'booking':
            $query = "SELECT b.id FROM `event` AS e LEFT JOIN `booking` AS b ON b.event_id = e.id WHERE b.id='$val' AND e.team_id='$team_id'";
            return count(doquery($query)) > 0;
        break;
        case 'venue':
            $query = "SELECT id FROM `event` WHERE id='$val' AND team_id='$team_id'";
            return count(doquery($query)) > 0;
        break;
    }
}
function checkallowed_forcreate($target, $params){
    $allowed = false;
    switch($target){
        case 'artist':
        case 'event':
            $allowed = checkallowed('team', $params['team_id']);
        break;
        case 'booking':
            $allowed = checkallowed('event', $params['event_id']) && checkallowed('artist', $params['artist_id']);
        break;
        case 'artistfee':
            $allowed = checkallowed('artist', $params['artist_id']);
        break;
        case 'task':
        case 'travel':
            $allowed = checkallowed('booking', $params['booking_id']);
        break;
        case 'venue':
        case "asset": 
        case 'contact':
        case 'user':
            $allowed = true;
        break;
    }
    return $allowed;
}
function assettodb($type, $id, $filename){
    switch ($type){
        case 'event':
            // $query1 = "UPDATE `asset` set active = '0' WHERE relation = '$type' AND relation_id = '$id'";
            // $query2 = "INSERT INTO `asset` (src, descr, relation, relation_id, active) values ('$filename', 'avatar', '$type', '$id', '1')";
            $query = "UPDATE `event` SET assetsrc = '$filename' WHERE id='$id'";
        break;
        case 'artist':
            $query = "UPDATE `artist` SET assetsrc = '$filename' WHERE id='$id'";
        break;
    }
    //TODO: Remove unused images?
    if(!$query){
        return error('assettodb: Didnt find queries');
    }
    if(!$result = doquery($query, 'u')){
        return error('assettodb: query no results');
    } else {
        return success($result, "Did it!");
    }
}
?>


