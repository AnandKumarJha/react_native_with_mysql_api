<?php
require('config.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM employee_table";
$result = $conn->query($sql);
$response['employees'] = array();

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $response_one = array(
            'id' =>   $row["id"],
            'name' => $row["name"],
            'gender' =>   $row["gender"],
            'dob' => $row["dob"],
            'specialisation' => $row["specialisation"],
            'email' => $row["email"],
            'phone' =>   $row["phone"],
            'address' => $row["address"],
            'profile_pic' => $row["profile_pic"],
        );
        $response['employees'][]= $response_one;
    }
    echo json_encode($response);
} else {
    echo "0 results";
}
$conn->close();
?>