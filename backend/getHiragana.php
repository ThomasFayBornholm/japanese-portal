<?php
$path = getcwd() . "/../lists/";
$contents = file_get_contents($path . "hiragana" );
$dict = json_decode($contents, JSON_UNESCAPED_UNICODE) or die("ERROR: Could not open 'hiragana'");   

echo json_encode($dict);