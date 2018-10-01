<?php 
echo "function "
     .$_GET['callback']
     ."() {return "
     .json_encode(scandir('..img/*.jpg'))
     ."}";
 