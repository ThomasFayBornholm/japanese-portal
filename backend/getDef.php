<?php
include "error_catch.php";
$word = $_GET["word"];
$path = getcwd() . "/../lists/all-def";

$out["def"] = "";
$out["hiragana"] = "";

$contents = file_get_contents($path);
$dict = json_decode($contents, JSON_UNESCAPED_UNICODE) or die("ERROR: Could not open 'all-def'");   

if (array_key_exists($word,$dict)) {
    $tmp = $dict[$word];
    $out["def"] = $tmp[1];
    $out["hiragana"] = $tmp[0];
}

echo json_encode($out);