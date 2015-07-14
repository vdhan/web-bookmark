<?php
$doc = new DOMDocument('1.0','UTF-8');
$doc->load("../bookmark.xml");
$a = $_REQUEST["Name"];
$b = $_REQUEST["Url"];

$name=$doc->createElement("name");
$tname=$doc->createTextNode($a);
$name->appendChild($tname);

$url=$doc->createElement("url");
$turl=$doc->createTextNode($b);
$url->appendChild($turl);

$data=$doc->createElement("data");
$data->appendChild($name);
$data->appendChild($url);

$bm=$doc->getElementsByTagName("bookmark")->item(0);
$bm->appendChild($data);
$doc->save("../bookmark.xml");
?>