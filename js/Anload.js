function loadXML()
{
var xname="bookmark.xml?t=" + Math.random();
var xhttp;
if (window.XMLHttpRequest)
{
xhttp=new XMLHttpRequest();
}
else
{
xhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xhttp.open("GET",xname,false);
xhttp.send();
return xhttp.responseXML;
}