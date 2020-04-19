<?php
require('config.php');
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response=new \stdClass();

//http://localhost/my_api/employee_insert.php?id=0&name=anand&gender=m&dob=aug%2008,%201991&email=asdfd&phone=sdf&addreess=asdf&profile_pic=asdf&specialisation=asdf

$name = '';
$gender = '';
$dob = '';
$specialisation = '';
$email = '';
$phone = '';
$address = '';
$profile_pic = '';

$isValueSet = false;

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
    $name = $obj['name'];
    $email = $obj['email'];
    $gender = $obj['gender'];
    $dob = $obj['dob'];
    $specialisation = $obj['specialisation'];
    $phone = $obj['phone'];
    $address = $obj['address'];
    $profile_pic = $obj['profile_pic'];

    $response->name = $name;
    $response->emttt=empty($name);
    if(empty($name)||empty($email)||empty($gender)||empty($dob)
    ||empty($specialisation)||empty($phone)||empty($address)){
        $isValueSet =false;
    }else{
        $isValueSet =true;
    }
}

if($isValueSet){
    $sql = "INSERT INTO employee_table VALUES (0, '".$name."', '".$gender."', '".$dob."',
    '".$specialisation."', '".$email."', '".$phone."', '".$address."', '".$profile_pic."')";
   if ($conn->query($sql) === TRUE) {
       $response->success=true;
       $response->msg = "New record created successfully".$sql;
   } else {
       $response->success=false;
       $response->msg = "Error: " . $sql . " " . $conn->error;
   } 
} else{
    $response->success=false;
    $response->msg = "Please make sure all field must not be empty".$name;
}

echo  json_encode($response);

$conn->close();
?>