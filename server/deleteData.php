<?php
$doc = new DOMDocument('1.0','UTF-8');
$doc->load('../bookmark.xml');
$doc->preserveWhiteSpace = false; 
$a = $_REQUEST['id'];
$x=$doc->getElementsByTagName('data')->item($a);
$doc->documentElement->removeChild($x);
$doc->save('../bookmark.xml');