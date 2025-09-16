<?php
$MAX_WORDS = 5; // Maximumber number of words to show
$text = $_GET["text"];
$path = getcwd() . "/../lists/all-def";
$contents = file_get_contents($path);
$dict = json_decode($contents, JSON_UNESCAPED_UNICODE) or die("ERROR: Could not open 'all-def'");   
$pattern = "/^" . $text . "/";
$out["matches"] = [];
foreach($dict as $key => $value) {
    if (preg_match($pattern,$key)) {
        array_push($out["matches"],[$key,$value[0]]);
        if (count($out["matches"]) === $MAX_WORDS) break;
    }
}

echo json_encode($out);