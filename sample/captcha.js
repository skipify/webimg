var webimg = require('../')

//最简单的验证码
var captcha = webimg().captcha('./captcha.jpg');
console.log(captcha.getStr()); //输出验证码的文字


//背景颜色为 #ff00ff的验证码，输出文件到./aa.png
var captcha = webimg(100,50,'#ff00ff').captcha('./aa.png');


//设置属性
var captcha = webimg(100,50,'#ff00ff');
	captcha.fontSize(40)//字号
			.font('../font.ttf')//字体文件
			.fontColor('#ffffff')//字的颜色
			.width(200)
			.height(100)
			.captcha('newcaptcha.gif');

//不直接输出到图片而是返回buffer
var fs = require('fs');
var captcha2 = webimg().captcha(function(err,buf){
	if(err){
		throw err;
	}
	fs.writeFile('buffer.png',buf,function(err,data){
		if(err){
			throw err;
		}
	})
})
console.log(captcha2.getStr());

//通过改变验证文字的产生来自定义

webimg.captcha.prototype.random = function(){
	return '5 + 3 =?';
}

var captcha = webimg().captcha('out.jpg');

