var webimg = require('../')

//最简单的验证码
var captcha = new webimg().captcha();
console.log(captcha.getStr()); //输出验证码的文字


//背景颜色为 #ff00ff的验证码，输出文件到./aa.png
var captcha = new webimg(100,50,'#ff00ff').captcha('./aa.png');


//设置属性
var captcha = new webimg(100,50,'#ff00ff');
	captcha.fontSize(40)//字号
			.font('../font.ttf')//字体文件
			.fontColor('#ffffff')//字的颜色
			.width(200)
			.height(100)
			.captcha('newcaptcha.gif');

//通过改变验证文字的产生来自定义

webimg.captcha.prototype.random = function(){
	return '5 + 3 =?';
}

var captcha = new webimg().captcha('out.jpg');