<?php
require('config.php');
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = new \stdClass();
if(isset($_GET["id"])){
$id = $_GET["id"];
}

if(empty($id)){
    $json = file_get_contents('php://input');
    // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
     // Populate User name from JSON $obj array and store into $name.
    $id = $obj['id'];
}

if(!empty($id)){
$sql = "DELETE FROM employee_table WHERE id='".$id."'";
    if ($conn->query($sql) === TRUE) {
        $response->success=true;
        $response->msg = "Record deleted successfully";
    } else {
        $response->success=false;
        $response->msg = "Error deleting record: " . $conn->error;
    }
}else{
    $response->success=false;
    $response->msg = "Please enter the employee id";
}

echo json_encode($response);
$conn->close();
?>