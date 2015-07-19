<?php
$doc = new DOMDocument('1.0', 'UTF-8');
$doc->load('../bookmark.xml');

$a = $_REQUEST['Name'];
$b = $_REQUEST['Url'];
$c = $_REQUEST['Id'];

$x = $doc->getElementsByTagName('name')->item($c)->childNodes->item(0);
$x->nodeValue = $a;
$y = $doc->getElementsByTagName('url')->item($c)->childNodes->item(0);
$y->nodeValue = $b;
$doc->save('../bookmark.xml');