<?php 
	$tab = $_GET['tab'];
	$ftype = $_GET['ftype'];
	$fsamp = $_GET['fsamp'];
	$fcutoff = $_GET['fcutoff'];
	$order = $_GET['order'];
	$window = $_GET['window'];

	$con = mysqli_connect('localhost',"root", "root", "test");
	if (!$con) {
	    die('Could not connect: ' . mysqli_error($con));
	}
	$sql = "INSERT INTO FD_State (filter_type, fsamp, fcutoff, degree, window, tab) VALUES (\"{$ftype}\", \"{$fsamp}\", \"{$fcutoff}\", \"{$order}\", \"{$window}\", \"{$tab}\")";

	if ($con->query($sql) === TRUE) {
	    echo "New record created successfully ";
	} else {
	    echo "Error: " . $sql . "<br>" . $con->error;
	} 	
?>