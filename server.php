<?php
$_POST = json_decode( file_get_contents("php://input"), true );
// echo var_dump($_POST);

$name = $_POST['fullname'];
$phone = $_POST['phone_number'];

header('Content-Type: application/json');
echo json_encode([$name, $phone]);
?>