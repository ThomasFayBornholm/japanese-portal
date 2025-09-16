<?php

include "error_catch.php";
$word = $_GET["word"];
$path = getcwd() . "/../lists/all-def";

$out["root"] = "";
$out["conj"] =  $word;
$contents = file_get_contents($path);
$dict = json_decode($contents, JSON_UNESCAPED_UNICODE) or die("ERROR: Could not open 'all-def'");   

foreach($dict as $key => $value) {
    if (count($value) > 3) {
        if (in_array($word,$value[3])) {
            $out["root"] = $key;
            break;
        }
    }
}

echo json_encode($out);