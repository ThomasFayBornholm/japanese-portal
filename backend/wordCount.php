<?php

$out["count"] = 0;
$path = getcwd() . "/../lists/all-def";
$contents = file_get_contents($path);
$dict = json_decode($contents, JSON_UNESCAPED_UNICODE) or die("ERROR: Could not open 'all-def'");   

$out["count"] = count($dict);

echo json_encode($out);