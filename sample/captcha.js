var webimg = require('../')

//最简单的验证码
var captcha = new webimg().captcha();
console.log(captcha.getStr()); //输出验证码的文字

