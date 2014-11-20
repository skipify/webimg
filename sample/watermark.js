var Webimg = require('../');

Webimg('./test.jpg')
		.markText('test')//设置水印文字
		.markPos(5)//水印位置  123456789
		.fontSize(50)//文字水印字体大小
		//.font('foot.ttf')//文字水印字体
		.fontColor('#ffffff')//字体颜色
		.watermark('./mark.jpg');

Webimg('./test.jpg').params({
	img:'./node.png',
	pos:5,
	fontcolor:'#ff00ff',
	fontsize:100
}).watermark('./batmark.jpg')

