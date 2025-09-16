<?php
include "error_catch.php";
$word = $_GET["word"];
$path = getcwd() . "/../lists/all-def";

$out["def"] = "";
$out["hiragana"] = "";
$out["class"] = "";
$out["conj"]  = "";
$out["conj-hiragana"]  = "";
$out["root"]  = "";
$contents = file_get_contents($path);
$dict = json_decode($contents, JSON_UNESCAPED_UNICODE) or die("ERROR: Could not open 'all-def'");   

if (array_key_exists($word,$dict)) {
    $tmp = $dict[$word];
    $out["def"] = $tmp[1];
    $out["hiragana"] = $tmp[0];
    if (count($tmp) > 2) $out["class"] = $tmp[2];
    if (count($tmp) > 3) $out["conj"] = $tmp[3];
    if (count($tmp) > 4) $out["conj-hiragana"] = $tmp[4];
} else {
    foreach($dict as $key => $value) {
        if (count($value) >3) {
            if (in_array($word,$value[3])) {
                $out["root"] = $key;
                $out["def"] = $value[1];
                $out["class"] = $value[2];
                $out["conj"] = $value[3];
                if (count($value) > 4) {
                    $out["conj-hiragana"] = $value[4];
                    for($i =0; $i < count($value[4]); $i++) {
                        if ($value[3][$i] == $word) {
                            $out["hiragana"] = $value[4][$i];
                            break;
                        }
                    }
                } else {
                    $out["hiragana"] = $value[1];
                }
                break;
            }
        }
    }
}

echo json_encode($out);