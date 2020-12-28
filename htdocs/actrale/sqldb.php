<?

require_once 'vars.php';    

function logindb($email, $pass){
    $query = "SELECT u.id, u.email, u.firstname, u.lastname, u.role_id, u.team_id, t.name as team_name FROM user AS u LEFT JOIN team AS t ON t.id = u.team_id WHERE email ='$email' AND password='$pass' ";
    // echo $query;
    $result = doquery($query, 'r');
    if($result[0]){
        session_regenerate_id(true);
        $_SESSION["user"] = $result[0];
        return success($_SESSION['user'], "User logged in!");
    }  else {
        return error("Can't find user");
    }
}
function cruddb($table, $crud, $params){
    global $mysqli;

    // print_r($params);
    // print_r($mysqli);
    $query = '';
    switch ($crud){
        case 'c':
            $count = 0;
            $fields = '';
            foreach($params as $col => $val) {
                if($count++ != 0) $fields .= ', ';
                $col = $mysqli->real_escape_string($col);
                $val = $mysqli->real_escape_string($val);
                $fields .= "$col = '$val'";
            }
            $query  = "INSERT INTO `$table` SET $fields";
        break;
        case 'r';
        $query = "SELECT DISTINCT * from `$table` WHERE id='".$params['id']."' LIMIT 1";
            //select specific cols?
        break;  
        case 'u':
            $count = 0;
            $fields = '';
            foreach($params as $col => $val) {
                if($col != 'id'){
                    if($count++ != 0) $fields .= ', ';
                    $col = $mysqli->real_escape_string($col);
                    $val = $mysqli->real_escape_string($val);
                    $fields .= "$col = '$val'";
                }
            }
            $query = "UPDATE `$table` set $fields WHERE id='".$params['id']."' ";
        break;
        case 'd';
            $query = "UPDATE `$table` set id='-".$params['id']."'  WHERE id='".$params['id']."' ";
        break;
    }
    if($query){ 
        $result = doquery($query, $crud);
        return success($result, "Crud done! $crud");
    }
 
}
function doquery($query, $crud = 'r'){
    global $mysqli;

    if(!$query){ 
        die(json_encode(error('doquery(): No query recieved')));
    }
    if ($mysqli->connect_error) {
        die(json_encode(error('doquery(): Couldnt connect to MySQL: '.$mysqli->connect_error)));
    }
    if (!$result = $mysqli->query($query)) {
        die(json_encode(error('doquery(): Couldnt finish query '.$query)));
    }

    if($crud=='c')  $result = $mysqli->insert_id;
    if($crud=='r')  $result = $result->fetch_all(MYSQLI_ASSOC);

    return $result;
}
?>