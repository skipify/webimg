var Webimg = require('../');

//缩略图默认的名字是原图生成的
//如 pic.jpg => pic_t0.jpg

//缩略图，最简单的缩小到宽度100 高度不指定则自动按比例缩小
new Webimg('./test.jpg').width(100).thumb();

//按照指定宽高自动缩小，比例不合适时自动裁剪
new Webimg('./test.jpg').height(50).width(100).thumb();
//=》等同于
new Webimg('./test.jpg').resize(100,50).thumb();

//指定输出的名字
//指定名字如果包含 . 则不会增加扩展名，如果不包含.则会自动添加源文件的扩展名
//不包含 / 则会生成到与原图相同的目录 包含 / 则会当做一个最终的路径输出
//new Webimg('./test.jpg').resize(100,50).outFile('thumb.jpg').thumb();
//等同于 
//new Webimg('./test.jpg').resize(100,50).thumb('thumb.jpg'); 
//等同于 
new Webimg('./test.jpg').resize(100,50).thumb('thumb'); 


//高级应用，
//配置对象

new Webimg('./test.jpg').params({
	width:185,
	outFile:'xx.jpg',
}).thumb();

//配置项：

/*
width
height
outFile

*/

//同时生成多张缩略图

new Webimg('./test.jpg').params([{
	width:200,
},
{
	width:100,  
	text:'hahahasdsd', ////生成图片的同时添加水印 如果 text img同时存在 那么先添加图片水印后添加文字水印
	fontcolor:'#ffffff',
	fontsize:12
},
{
	width:290
}

]).thumb();


