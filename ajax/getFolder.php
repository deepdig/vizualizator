<?php

# Получить JSON как строку
$json_str = file_get_contents('php://input'); 

# Получить объект
$json_obj = json_decode(strip_tags($json_str),true);

$key = $json_obj['key'];

$directory = '../assets/img/objects/';
$entries = array_diff(scandir($directory), array('..', '.'));
$filelist = array();
foreach($entries as $entry) {
    $filelist[] = $entry;
}

echo json_encode($filelist[$key]);
