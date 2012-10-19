//==========================================
//文 件 名：Js/function.asp
//文件用途：系统JS函数
//版权所有：方卡在线
//==========================================
var formTemp="";
var ajaxProcess="0";
var outdo="0";
var Un=0;

//==========================================
//用途：按ESC关闭弹出窗口
//参数：
//==========================================
$(document).keypress(function(e){  
	if (e.keyCode==27)  
		CloseBox();
});

//==========================================
//函数名：PageReSize
//用途：页面初始化
//参数：
//==========================================
function PageReSize(){
	var LeftWidth=189;
	var RightWidth=$("#Bodys").width()-189;
	var WindowsHeight=$(document).height()-90;
	var LeftHeight=$("#MainLeft").height();
	var RightHeight=$("#MainRight").height();
	if(RightWidth>812){
		$("#MainRight").width(RightWidth);
		$("#AllBox").width($("#Bodys").width());
	}else{
		$("#AllBox").width(1001);
	}
	if(LeftHeight<WindowsHeight||LeftHeight<RightHeight){
		if(RightHeight>WindowsHeight){
			$("#MainLeft").height(RightHeight);
		}else{
			$("#MainLeft").height(WindowsHeight);
		}
	}
}

//==========================================
//函数名：ShowBox
//用途：操作框弹出
//参数：
//==========================================
function ShowBox(DoUrl){
	$('#BoxContent').html("<div id='LoadBox'><a href='javascript:void(0);' title='点此关闭' onclick='CloseBox();'><img src='Images/Loading2.gif' /></a></div>");
	$("#Boxs").show();
	$.get(DoUrl,
		function(data){
			document.getElementById('BoxContent').innerHTML=data;
			$('.qbox').simpletooltip();
			//$('.qbox').hide();
			PageReSize();
			$("#AlphaBox").height($(document).height());
			return true;
		}
	);
	$('select').hide();
	$('html,body').animate({scrollTop: 0},100);
}

//==========================================
//函数名：CloseBox
//用途：关闭操作框
//参数：
//==========================================
function CloseBox(){
	$('#Boxs').hide();
	$('select').show();
	$('html,body').animate({scrollTop: 0},100);
}

//==========================================
//函数名：ClickNav
//用途：主菜单项切换
//参数：
//==========================================
function ClickNav(leftUrl,RightUrl,navId){
	if(leftUrl!="")
		SetRContent('MainLeft',leftUrl);
	if(RightUrl!="")
		SetRContent('MainRight',RightUrl);
	$('#TopNav li').removeClass('NavNow');
	$('#TopNav li').addClass('NavOther');
	$(navId).removeClass('NavOther');
	$(navId).addClass('NavNow');
}

//==========================================
//函数名：ClickBoxNav
//用途：内容窗体菜单切换
//参数：
//==========================================
function ClickBoxNav(navId){
	$('.bnr').removeClass('check');
	$('#s'+navId).addClass('check');
	$('.tnr').hide();
	$('#t'+navId).show();
	$('.qbox').simpletooltip();
	//$('.qbox').hide();
	PageReSize();
	$("#AlphaBox").height($(document).height());
}

//==========================================
//函数名：SetRContent
//用途：替换DIV内容
//参数：DivId：要替换的DIV
//     Urls：获取内容的链接
//==========================================
function SetRContent(DivId,Urls){
	$('#'+DivId).html("<a href='javascript:void(0);' title='点此关闭' onclick='CloseBox();'><img src='Images/Loading.gif' /></a>");
	$.get(Urls,
		function(data){
			document.getElementById(DivId).innerHTML=data;
			$('.qbox').simpletooltip();
			//$('.qbox').hide();
			$('#ListContent tr').mouseover(function(){
				$(this).css("background","#F7F7F7");
			});
			$('#ListContent tr').mouseout(function(){
				$(this).css("background","none");
			});
			PageReSize();
			$("#AlphaBox").height($(document).height());
			return true;
		}
	);
	PageReSize();
}

function Type1(){
	$(".Type1").css("display","block");
	$(".Type2").css("display","none");
}

function Type2(){
	$(".Type1").css("display","none");
	$(".Type2").css("display","block");
}

//==========================================
//函数名：checknum
//用途：判断判分分值
//参数：
//==========================================
function checknum(obj_input,maxnum){
	if(isNaN($(obj_input).val())){
		alert("分值必须是数字！");
		return false;
	}
	if($(obj_input).val()>maxnum){
		alert("本题最大分值为"+maxnum+"分！");
	}
}

//==========================================
//函数名：OpenMenu
//用途：菜单开关
//参数：MenuId：菜单ID
//==========================================
function OpenMenu(MenuId){
	if($("#"+MenuId).css("display")=="block"){
		$("#"+MenuId).css("display","none");
	}else{
		$("#"+MenuId).css("display","block");
	}
}

//==========================================
//函数名：DelIt
//用途：通用删除
//参数：Cstr：提示语句
//     Urls：执行URL
//     F5Url：刷新URL
//     F5Div：刷新DIV
//==========================================
function DelIt(Cstr,Urls,F5Div,F5Url){
	if(confirm(Cstr)){
		$.get(Urls,
			function(data){
				if(data.search("成功")>0){
					document.getElementById("MsgContent").innerHTML=data;
					$("#MsgBox").show();
					setTimeout('hiddenMsg()',4000);
					var Arrstr1 = new Array();
					var Arrstr2 = new Array();
					Arrstr1 = F5Div.split("|");
					Arrstr2 = F5Url.split("|");
					for(var i=0;i<Arrstr1.length;i++){
						SetRContent(Arrstr1[i],Arrstr2[i]);
					}
				}else{
					alert(data);
				}
				return true;
			}
		);
	}
	return;
}

//==========================================
//函数名：GetCheckQbox
//用途：获取选中的试题
//参数：
//==========================================
function GetCheckQbox(){
	var text="";   
	$("input[name=QuestionId]").each(function() {   
		if ($(this).attr("checked")) {
			if(text==''){
				text = $(this).val();   
			}else{
				text += ","+$(this).val();   
			}
		}   
	}); 
	return text;
}

//==========================================
//函数名：Sends
//用途：表单提交
//参数：FormName：提交的FORM
//     ToUrl：提交向的链接
//     SuGo：成功后是否转向链接，1转向，0不转向
//     GoUrl：转向链接
//     SuAlert：成功后是否弹出框提示，1弹出，0不弹出
//     SuF5：成功后是否刷新DIV，1刷新，0不刷新
//     F5Url：刷新URL
//     F5Div：刷新DIV
//==========================================
function Sends(FormName,ToUrl,SuGo,GoUrl,SuAlert,SuF5,F5Div,F5Url){
	if(ajaxProcess=="0"){
		if(document.getElementById("Enter")!=null){
			formTemp=$('#Enter').val();
			$('#Enter').val("正在提交");
			ajaxProcess="1";
			outdo="1";
			if(ToUrl=="MainDo.asp"){
				setTimeout("formTimeout()",99000);
			}else{
				setTimeout("formTimeout()",30000);
			}
		}
		var options = { 
			url:  ToUrl,
			beforeSubmit:function(formData, jqForm, options){
			return true; 
			},
			success:function(responseText, statusText){
				if(statusText=="success"){
					ajaxProcess="0";
					outdo="0";
					if(responseText.search("成功")>0){
						iPic=0;
						cPic=0;
						if(SuAlert==1){
							var st=responseText.replace(/\|\|\|\|\|/gi,"\n");
							alert(st);
						}else{
							CloseBox();
							$('#MsgContent').html(responseText);
							$("#MsgBox").show();
							setTimeout('hiddenMsg()',4000);
						}
						if(SuGo==1){
							location.href=GoUrl;
						}
						if(SuF5==1){
							var Arrstr1 = new Array();
							var Arrstr2 = new Array();
							Arrstr1 = F5Div.split("|");
							Arrstr2 = F5Url.split("|");
							for(var i=0;i<Arrstr1.length;i++){
								SetRContent(Arrstr1[i],Arrstr2[i]);
							}
						}
					}else{
						var st=responseText.replace(/\|\|\|\|\|/gi,"\n");
						$('#Enter').val(formTemp);
						alert(st);
					}
				}else{
					alert(statusText);
				}
			}
		}; 
		$('#'+FormName+'').ajaxForm(options); 
	}else{
		alert("请勿重复提交！");
	}
}

//==========================================
//函数名：hiddenMsg
//用途：关闭提示窗口
//==========================================
function hiddenMsg(){
	$("#MsgBox").hide();
}


//==========================================
//函数名：QuestionTest
//用途：考题导入测试
//参数：
//==========================================
function QuestionTest(){
	Sends_Div('Import','Question.asp?Type=10','q2');
	$('#q1').hide();
	$('#q2').show();
	$('#q3').show();
}

//==========================================
//函数名：QuestionTestRe
//用途：返回考题导入
//参数：
//==========================================
function QuestionTestRe(){
	$('#q1').show();
	$('#q2').hide();
	$('#q3').hide();
}

//==========================================
//函数名：formTimeout
//用途：超时显示提示
//==========================================
function formTimeout(){
	if(outdo=="1"){
		outdo="0";
		$('#Enter').val(formTemp);
		ajaxProcess="0";
		alert("提交未获取正常返回，可能原因如下：\n\n1.数据库不可写，导致程序无法正常执行\n\n2.由于网速过慢或者处理内容过多，仍然在处理中或者已经超时\n\n3.程序出错，或者服务器异常\n\n请尝试重新提交，或者稍候再试！\n\n如还有问题，请联系管理员！");
	}
}

//==========================================
//函数名：Sends_Div
//用途：表单提交更新DIV
//参数：FormName：提交的FORM
//     ToUrl：提交向的链接
//     F5Div：刷新DIV
//==========================================
function Sends_Div(FormName,ToUrl,F5Div){
	$('#'+F5Div).html("<a href='javascript:void(0);' title='点此关闭' onclick='CloseBox();'><img src='Images/Loading.gif' /></a>");
	var options = { 
		url:  ToUrl,
		beforeSubmit:function(formData, jqForm, options){
		return true; 
		},
		success:function(responseText, statusText){
			if(statusText=="success"){
				$('#'+F5Div).html(responseText);
				$('.qbox').simpletooltip();
				//$('.qbox').hide();
				PageReSize();
				$("#AlphaBox").height($(document).height());
			}
			else{
				alert(statusText);
			}
		}
	}; 
	$('#'+FormName+'').ajaxForm(options); 
}

//==========================================
//函数名：ChangeSelect
//用途：修改Select内容
//参数：Urls：执行URL
//     SId：操作的Select
//==========================================
function ChangeSelect(Urls,SId){
	$.get(Urls,
		function(data){
			if(data!=""){
				BuildSel(data,document.getElementById(SId));
			}
			return true;
		}
	);
}

//==========================================
//函数名：BuildSel
//用途：执行修改Select内容
//参数：Urls：执行URL
//     SId：操作的Select
//==========================================
function BuildSel(Str,Sel){
	var Arrstr = new Array();
	Arrstr = Str.split(",,,,,");
	if(Str!=""){
		Sel.options.length=0;
		var arrst;
		for(var i=0;i<Arrstr.length;i++){
			if(Arrstr[i]!=""){
				Arrst=Arrstr[i].split("|||||");
				Sel.options[Sel.options.length]=new Option(Arrst[1],Arrst[0]);
			}
		}
	}
}

//==========================================
//函数名：CheckAll
//用途：全选
//参数：form：表单
//==========================================
function CheckAll(form) {
	for (var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if (e.name != 'chkall') 
			e.checked = form.chkall.checked;
	}
}




