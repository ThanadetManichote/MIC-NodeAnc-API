<?php
$f = fopen( 'php://stdin', 'r' );
$success = 0;
$error   = 0;

// echo "<pre>";
// print_r(fgets( $f ));
// exit();
// print_r($argv);
// exit();

while( $line = fgets( $f ) ) {
	// print_r($line);
	$txt = explode("success",$line);
	if (count($txt)>0) {
		$success++;
	}else {
		$error++;
	}

	if(isset($argv[1]) && $argv[1] == 'echo_log'){
		echo "Success : ".$success.", Error : ".$error."\n";
	}
}

fclose( $f );
?>
