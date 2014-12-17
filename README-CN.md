webimg
======

[English](https://github.com/skipify/webimg/blob/master/README.md)

此项目使用了著名的[gm](https://github.com/aheckmann/gm),在使用之前请安装[graphicsmagick](http://www.graphicsmagick.org/),如果你用到了验证码或者文字水印你还应该安装[Ghostscript](http://www.ghostscript.com/).


	此项目用于生成缩略图、添加水印、生成验证码，批量缩略图水印
# 安装
	
	npm install webimg

## 缩略图示例

	Webimg('./test.jpg').resize(100,50).thumb('thumb.jpg'); 

## 水印示例
	Webimg('./test.jpg')
		.markText('test')//设置水印文字
		.markPos(5)//水印位置  123456789
		.fontSize(50)//文字水印字体大小
		//.font('foot.ttf')//文字水印字体
		.fontColor('#ffffff')//字体颜色
		.watermark('./mark.jpg');

## 验证码示例

	var captcha = webimg().captcha();
	console.log(captcha.getStr()); //输出验证码的文字

## 缩略图和水印联合

	Webimg('./test.jpg').params({
		width:100,  
		text:'hahahasdsd', ////生成图片的同时添加水印 如果 text img同时存在 那么先添加图片水印后添加文字水印
		fontcolor:'#ffffff',
		fontsize:12
	}).thumb();

# API

### Webimg 构造函数
	
	缩略图和水印
	@param string 图片文件名

	或
	用于验证码：
	@param int 宽
	@param int 高
	@param string 背景颜色

### size
	@param function 回调
	返回图片的尺寸

### filesize
	@param function 
	返回文件的大小

### outFile
	@param string 设置输出的文件名 

### font
	@param string 字体路径 （文字水印，验证码）

### fontColor
	@param string 文字颜色 (#ffffff)

### fontSize
	@param int 文字大小 

### width
	@param int 宽度

### height
	@param int 高度

	**注意**
	缩略图生成的时候如果只指定宽或者高则未指定的按照比例自动计算，
	如果同时指定了宽高那么会按照指定缩小，比例不合适时会自动裁剪

### resize
	@param int 宽度
	@param int 高度

	相当于 width height俩方法同时调用

### quality
	@param int 图片质量 1-100

### backgroundColor
	@param string 背景颜色 #000000

### markImg
	@param string 设置水印的图片地址

### markText
	@param string 设置水印的文字

### markPos 
	@param int 设置水印的位置
	对应位置如下：
	1,2,3
	4,5,6
	7,8,9

### params
	@param object
	此方法用于一次性设置参数
	参数如下：
	`width` 宽度  @param int
	`text` 生成图片的同时添加水印 如果 text img同时存在 那么图片和文字水印会随机意外添加 @param string
	`fontcolor` 字体颜色 @param string #ffffff
	`fontsize` 字体大小 @param int 
	`img` 水印图片地址 @param string 
	`pos` 水印位置 @param int 1,2,3,4,5,6,7,8,9
	`quality` 图片质量 @param int  1-100
	`outFile` 输出的文件地址 缩略图、水印、验证码通用
			输出文件地址的格式 可以使 thumb.jpg thumb 这样的话最终的路径与原图一致
								如果是/aa.jpg 带有/的地址 则会直接医用指定的地址

## thumb 
	@param string/null/function
	@param function
	生成缩略图最终调用的方法
	对于非批量的缩略图生成可以指定唯一的输出文件参数
	第二个参数是回调函数，可以接受一个参数是生成的缩略图名称

## watermark
	@param string/null
	水印生成后输出的地址，不指定则会自动生成自动原文件名后添加 _t0(_t1,_t2)

## captcha
	@param string/function
	验证码的输出地址，如果不指定输出地址则需要指定一个回调函数，回调函数会返回 相应 png图片的 Buffer
	function(err,buf){

	}


## captcha 验证码生成类
	
### getStr
	返回生成的验证码字符串

### random
	为验证码提供随机的字符串，此方法可以覆盖覆盖后可以自定义字符


# 原生的gm
	可以直接使用 Webimg.gm 来调用原生的gm