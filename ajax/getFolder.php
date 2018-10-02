<?php 
$directory = '../assets/img/objects/';
$entries = array_diff(scandir($directory), array('..', '.'));
$filelist = array();
foreach($entries as $entry) {
    $filelist[] = $entry;
}

echo json_encode($filelist);
