webimg
======

[中文](https://github.com/skipify/webimg/blob/master/README-CN.md)

This Project base on [gm](https://github.com/aheckmann/gm),you shoud install [graphicsmagick](http://www.graphicsmagick.org/),If you need to use captcha or text watermark, You should install [Ghostscript](http://www.ghostscript.com/).


	This project is used to generate a thumbnail, add watermarks, generate captchas, batch thumbnail watermark.
# INSTALL
	
	npm install webimg

## thumbnail example

	Webimg('./test.jpg').resize(100,50).thumb('thumb.jpg'); 

## Watermark example
	Webimg('./test.jpg')
		.markText('test')//text
		.markPos(5)//mark position  123456789
		.fontSize(50)//fongsize
		//.font('foot.ttf')//fontfamily
		.fontColor('#ffffff')//font color
		.watermark('./mark.jpg');

## Verification code sample

	var captcha = webimg().captcha();
	console.log(captcha.getStr()); //get the captcha str

## The thumbnail and watermark

	Webimg('./test.jpg').params({
		width:100,  
		text:'hahahasdsd', ////watermark text
		fontcolor:'#ffffff',
		fontsize:12
	}).thumb();

# API

### Webimg contructor
	
	thumbnail and watermark
	@param string image name

	OR
	Captcha:
	@param int width
	@param int height
	@param string background color

### size
	@param function callback
	return image size

### filesize
	@param function 
	image's size

### outFile
	@param string   Set the output file name

### font
	@param string font path

### fontColor
	@param string fontcolor (#ffffff)

### fontSize
	@param int fontsize 

### width
	@param int width

### height
	@param int height

	**Notice**
	Thumbnails generated if only specify the width or height is not specified in accordance with the proportion of automatic calculation,If at the same time high then will be in accordance with the specified contract specifies the width, the proportion is improper cutting automatically

### resize
	@param int width
	@param int height

	

### quality
	@param int image quality 1-100

### backgroundColor
	@param string background color #000000

### markImg
	@param string watermark image path

### markText
	@param string Set text watermark

### markPos 
	@param int Sets the position of the watermark
	As Follow:
	1,2,3
	4,5,6
	7,8,9

### params
	@param object    
	This method is used for one-time setup parameters
	params：
	`width` width  @param int
	`text` The watermark generated images at the same time If the test img is at the same time Then add images and text watermark random accident @param string
	`fontcolor` fontcolor @param string #ffffff
	`fontsize` fontsize @param int 
	`img` file path @param string 
	`pos` mark position @param int 1,2,3,4,5,6,7,8,9
	`quality` quality @param int  1-100
	`outFile` The output file address Thumbnails, watermark, a verification code
			The format of the output file address Can make the thumb. JPG thumb so the final path consistent with the original image,If it is /aa. JPG with /  Will direct medical specified address

## thumb 
	@param string/null    
	Generated thumbnail in the end the method called
	For the batch thumbnail generation can be specified only output file parameters

## watermark
	@param string/null    
	Watermark generated output after the address, does not specify, it will automatically generated automatically added after the original file name _t0(_t1,_t2)

## captcha
	@param string/function
	Verification code output address, if you do not specify output address you will need to specify a callback function, the callback function returns the corresponding PNG image Buffer
	function(err,buf){

	}


## captcha Verification code generated
	
### getStr
	Returns the generated captcha string

### random
	Provide authentication code with random string, this method can cover can customize the characters


# gm
	 Webimg.gm => gm