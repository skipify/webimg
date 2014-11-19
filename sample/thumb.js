var Webimg = require('../');

//缩略图默认的名字是原图生成的
//如 pic.jpg => pic_t0.jpg

//缩略图，最简单的缩小到宽度100 高度不指定则自动按比例缩小
//new Webimg('../a.jpg').width(100).thumb();

//按照指定宽高自动缩小，比例不合适时自动裁剪
//new Webimg('../a.jpg').height(50).width(100).thumb();
//=》等同于
//new Webimg('../a.jpg').resize(100,50).thumb();

//指定输出的名字
//指定名字如果包含 . 则不会增加扩展名，如果不包含.则会自动添加源文件的扩展名
//不包含 / 则会生成到与原图相同的目录 包含 / 则会当做一个最终的路径输出
//new Webimg('../a.jpg').resize(100,50).thumbName('thumb.jpg').thumb();

//高级应用，
//配置对象

//new Webimg('../a.jpg').params({
//	width:200,
//	thumbName:'xx.jpg',
//}).thumb();

//配置项：

/*
width
height
thumbName

*/

//同时生成多张缩略图

new Webimg('../a.jpg').params([{
	width:200,
},
{
	height:300,
	text:'hahahasdsd',
	fontcolor:'#ffffff'
},
{
	width:290
}

]).thumb();
