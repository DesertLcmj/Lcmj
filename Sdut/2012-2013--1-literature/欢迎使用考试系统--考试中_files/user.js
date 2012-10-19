function Res(Tis){
	if(Alls.indexOf(","+Tis+",")==-1){
		Alls=Alls+Tis+","
		AllCount=AllCount+1;
		document.getElementById("AllCounts").innerHTML="答题："+AllCount+"/"+AllCount2;
	}
}

//加入页面保护
function rf() {
	return false;
}
document.oncontextmenu = rf
function keydown() {
	if (event.ctrlKey == true || event.keyCode == 93) {
		return false;
	}
}
document.onkeydown = keydown
function drag() {
	return false;
}
document.ondragstart = drag
function stopmouse(e) {
	if (navigator.appName == 'Netscape' && (e.which == 3 || e.which == 2)) return false;
	else if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3)) {
		alert("请认真考试！");
		return false;
	}
	return true;
}
document.onmousedown = stopmouse;
if (document.layers) window.captureEvents(Event.MOUSEDOWN);
window.onmousedown = stopmouse;

function JM_cc(ob) {
	var obj = MM_findObj(ob);
	if (obj) {
		obj.select();
		js = obj.createTextRange();
		js.execCommand("Copy");
	}
}

function MM_findObj(n, d) { //v4.0
	var p, i, x;
	if (!d) d = document;
	if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document;
		n = n.substring(0, p);
	}
	if (! (x = d[n]) && d.all) x = d.all[n];
	for (i = 0; ! x && i < d.forms.length; i++) x = d.forms[n];
	for (i = 0; ! x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers.document);
	if (!x && document.getElementById) x = document.getElementById(n);
	return x;
}
function showDiv(Ids){
	document.getElementById('Box'+Ids).style.display='block';
	document.getElementById('Bgs').style.display='block';
}

function closeDiv(Ids){
	document.getElementById('Box'+Ids).style.display='none';
	document.getElementById('Bgs').style.display='none';
}
function checkLeave(){
	if(Un==0)
		event.returnValue="考试尚未提交，请点击“取消”返回考试！”！";
}
window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
