<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "employee";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$id = 0;
$name = '';
$gender = '';
$dob = '';
$specialisation = '';
$email = '';
$phone = '';
$address = '';
$profile_pic = '';

$response=new \stdClass();
$isValueSet = false;

if(isset($_GET["id"])){
    $id = $_GET["id"];
}

if(isset($_GET["name"])){
$name = $_GET["name"];
}

if(isset($_GET["gender"])){
$gender = $_GET["gender"];
}

if(isset($_GET["dob"])){
$dob = $_GET["dob"];
}

if(isset($_GET["specialisation"])){
$specialisation = $_GET["specialisation"];
}

if(isset($_GET["email"])){
$email = $_GET["email"];
}

if(isset($_GET["phone"])){
$phone = $_GET["phone"];
}

if(isset($_GET["address"])){
$address = $_GET["address"];
}

if(isset($_GET["profile_pic"])){
$profile_pic = $_GET["profile_pic"];
}

if(empty($name)||empty($email)||empty($gender)||empty($dob)||
empty($specialisation)||empty($phone)||empty($address)){
    $isValueSet =false;
}

if(!$isValueSet){
    $json = file_get_contents('php://input');
    // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
     // Populate User name from JSON $obj array and store into $name.
    $id = $obj['id'];
    $name = $obj['name'];
    $email = $obj['email'];
    $gender = $obj['gender'];
    $dob = $obj['dob'];
    $specialisation = $obj['specialisation'];
    $phone = $obj['phone'];
    $address = $obj['address'];
    $profile_pic = $obj['profile_pic'];

    if(empty($name)||empty($email)||empty($gender)||empty($dob)
    ||empty($specialisation)||empty($phone)||empty($address)){
        $isValueSet =false;
    }else{
        $isValueSet =true;
    }
}

if($isValueSet){
$sql = "UPDATE employee_table SET name='".$name."', gender='".$gender."', dob='".$dob."',
 specialisation='".$specialisation."', email='".$email."', phone='".$phone."', address='".$address."',
  profile_pic='".$profile_pic."' WHERE id='".$id."'";

$response->sql = $sql;
if ($conn->query($sql) === TRUE) {
    $response->success=true;
    $response->msg = "Record updated successfully";
} else {
    $response->success=false;
       $response->msg = "Error updating record: " . $conn->error;
}
}else{
    $response->success=false;
    $response->msg = "Please make sure all field must not be empty";
}
echo  json_encode($response);
$conn->close();
?>