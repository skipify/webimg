var gm = require('gm'),
	fs = require('fs'),
	_  = require('underscore'),
	opts = {
		quality : 100//默认参数
	},
	posTypes = [
     "NorthWest",
     "North",
     "NorthEast",
     "West",
     "Center",
     "East",
     "SouthWest",
     "South",
     "SouthEast"
    ];


var Webimg = function(img,height,background){

	//验证码配置
	if(_.isNumber(img))
	{
		opts.width = img;
		img = null;
		opts.height = height;
		opts.background = background;
		this.dst = null;
	}else{
		this.dst = img;
	}
	if(this.dst)
	{
		this.gm  = gm(this.dst);
	}
}

Webimg.fn = {};

/*
	根据原来的文件路径，宽高
	创建一个新文件名
 */
Webimg.fn.fileName = function(i,opts)
{
	if(!this.dst){
		return '';
	}
	if(_.isObject(i)){
		opts = i;
		i = 0;
	}
	var path  = this.dst,
		paths = path.split('/'),
		n     = paths.pop(),
		ns    = n.split('.'),
		ext   = "." + ns.pop(),
		xname = ns.join('.');

		if(opts.thumbName){
			if(opts.thumbName.indexOf('/') > -1) {
				return opts.thumbName;
			}
			xname = opts.thumbName.indexOf('.') > -1 ? opts.thumbName : (opts.thumbName + ext);
		}else{
			xname += "_t" + i + ext;
		}


	return paths.join('/') + "/" + xname;
}

//指定一个缩略图的名字
Webimg.fn.thumbName = function(name){
	if(_.isArray(opts)) {
		throw new Error('You have already set up the batch configuration');
	}
	opts.thumbName = name;
	return this;
}
//文件尺寸
Webimg.fn.size = function(callback){
	this.gm.size(function(e,v){
		callback.apply(null,arguments);
	})
}
//文件大小
Webimg.fn.filesize = function(callback){
	this.gm.filesize(function(e,v){
		callback.apply(null,arguments);
	})
};

//设置字体
Webimg.fn.font = function(font){
	opts.font = font;
	return this;
}

//设置文字颜色
Webimg.fn.fontColor = function(color){
	opts.fontcolor = color;
	return this;
}
Webimg.fn.fontSize = function(size){
	opts.fontsize = size;
	return this;
}
/*
	设置各种参数
 */

//批量设置
Webimg.fn.params = function(setting){
	opts = setting;
	return this;
}
//重置所有设置
Webimg.fn.resetParams = function(){
	opts = {};
	return this;
}

//设置要生成的图片宽高质量，通用于缩略图 验证码
Webimg.fn.width = function(width){
	if(_.isArray(opts)){
		throw new Error('You have already set up the batch configuration');
	}
	opts.width = width;
	return this;
}
Webimg.fn.height = function(height)
{
	if(_.isArray(opts)){
		throw new Error('You have already set up the batch configuration');
	}
	opts.height = height;
	return this;
}
Webimg.fn.resize = function(width,height){
	this.width(width);
	this.height(height);
	return this;
}
Webimg.fn.quality = function(q){
	if(_.isArray(opts)) {
		throw new Error('You have already set up the batch configuration');
	}
	opts.quality = q;
	return this;
}
//设置图片背景色
Webimg.fn.backgroundColor = function(color){
	opts.background = color;
}


//设置水印物料
Webimg.fn.markImg = function(mark)
{
	if(_.isArray(opts))
	{
		throw new Error('You have already set up the batch configuration');
	}
	opts.img  = mark;
	opts.text = null;
	return this;
}
//水印文字
Webimg.fn.markText = function(text){
	if(_.isArray(opts))
	{
		throw new Error('You have already set up the batch configuration');
	}
	opts.text = text;
	opts.img  = null;
	return this;
}
//水印位置
Webimg.fn.markPos = function(pos){
	opts.pos  = formatMarkPos(pos);
	return this;
}

/*
	缩略图
 */

//生成缩略图
Webimg.fn.thumb = function(thumbname){
	var that = this,
		dst  = this.dst,
		oopts = opts;
	this.resetParams();
	if(!dst){
		throw new Error('No file specified');
	}
	this.formatParmas(oopts,function(sopts){
		if(_.isArray(sopts)){
			for(var i=0;i<sopts.length;i++)
			{
				var opt = sopts[i];
					opt.thumbName = that.fileName(i,opt);
				thumb(dst,opt,function(opt){
					recive(opt);
				});
			}
		}else{
			sopts.thumbName = thumbname; //可以指定一个输出的名字
			sopts.thumbName = that.fileName(sopts);
			thumb(dst,sopts,function(sopts){
					recive(sopts);
				});
		}

	});

	function recive(opt){
		if(!opt || (!opt.img && !opt.text)){
			return false;
		}
		//添加水印
		watermark(opt.thumbName,opt);
	}
}

//生成缩略图
var thumb = function(dst,opt,callback){
	if(!dst){
		throw new Error('Do not specify a picture');
	}
	opt = formatOpts(opt);
	console.log(arguments);
	gm(dst).thumb(opt.width,opt.height,opt.thumbName,opt.quality,function(err, stdout, stderr, command){
		if(err){
			throw err;
		}
		callback && callback.call(null,opt);
	});
}


/*
	水印
 */

var formatMarkPos = function(pos){

  if(_.indexOf(posTypes,pos) > -1)
  {
  	return pos;
  }
  if(!_.isNumber(pos))
  {
  	return 'SouthEast';
  }
  pos = parseInt(pos);
  pos --;
  return posTypes[pos];
}
//生成水印

Webimg.fn.watermark = function(){
	if(!this.dst){
		throw new Error('No file specified');
	}
	//组织水印配置
	var markopts = formatOpts(opts);
	this.resetParams();//重置参数
	watermark(this.dst,markopts);
}

//格式化非宽高配置
var formatOpts = function(opts){
	opts.img  = opts.img  || null;
	opts.text = opts.text || null;
	opts.pos  = opts.pos  || 'SouthEast';
	opts.fontsize   = opts.fontsize || 28;
	opts.font       = opts.font     || __dirname + '/font.ttf';
	opts.fontcolor  = opts.fontcolor || '#000000';
	opts.background = opts.background || '#ffffff';
	opts.quality    = opts.quality || 100;
	return opts;
}

var watermark = function(file,opts){
	//图片水印
	if(opts.img)
	{
		watermarkImg(file,opts);
	}
	//文字水印
	if(opts.text)
	{
		watermarkText(file,opts);
	}
}
//生成图片水印
var watermarkImg = function(file,opts){
	var gm = gm(file);
	gm.composite(opts.markImg).gravity(opts.markPos).write(file,function(err){
		if(err)
		{
			throw err
		}
	})
}
//生成文字水印

var watermarkText = function(file,opts)
{
	var pos = opts.pos.toLowerCase();
	gm(file)
	.stroke(opts.fontcolor)
	.font(opts.font, opts.fontsize)
	.drawText(20, 20, opts.text,pos)
	.write(file, function (err) {
	  if (err){
	  	throw err;
	  }
	});
}

/*
	验证码
 */
Webimg.fn.captcha = function(outfile){
		sopts = formatOpts(opts);
		this.resetParams();
	var c    =  new captcha(outfile,sopts);
	return c;
}

//验证码
var captcha = function(outfile,opts){
	opts.width  = opts.width  || 80;
	opts.height = opts.height || 35;
	opts.background  = opts.background || '#ffffff';
	this.str    = this.random() || '8888';
	outfile     = outfile || './captcha.jpg';

	this.img    = gm(opts.width,opts.height,opts.background);
	this.img.stroke(opts.fontcolor)
			.fill(opts.fontcolor)
			.font(opts.font, opts.fontsize)
			.drawText(0, 0, this.str ,'center');
		this.drawLine(opts);
	this.img.swirl(45).write(outfile, function (err) {
  		if(err){
  			throw err;
  		}
	});
}
captcha.prototype.getStr = function(){
	return this.str;
}

//生成验证码字符串
captcha.prototype.random = function(len){
	len = parseInt(len) || 4;
	var chars = ['a','b','c','d','e','f','g','i','h','k','m','n','p','q','r','s','t','u','v','w','x','y','3','4','5','6','7','8','9'],
		str   = "",
		clen  = chars.length - 1;
	for(var i =0;i<len;i++)
	{
		var cindex = _.random(0,clen);
		str += chars[cindex];
	}
	return str;
}
//点的数量
captcha.prototype.drawLine = function(opt,num){
	num = num || _.random(1,3);
	for(var i=0;i<num;i++)
	{
		this.img.stroke(opt.background).fill(opt.background)
			.drawLine(0,_.random(1,opt.height-1),opt.width,_.random(1,opt.height-1));
	}

}

//设置水印

//

//处理配置文件
//对于只传递了宽或者高的配置按照图片比例计算未设置项,
//所有需要宽高参数的应用都应该使用回调
Webimg.fn.formatParmas = function(opt,callback){
	opt  = opt || opts;

	gm(this.dst).size(function(e,value){
		if(e){
			throw e;
		}
		var radio = value.width/value.height;//宽高比
		if(_.isArray(opt))
		{//批量
			for(var i in opt)
			{
				opt[i] = format(opt[i]);
			}
		}else{
			opt = format(opt);
		}
		function format(opt){
			if(!opt.width && !opt.height)
			{
				opt.width  = value.width;
				opt.height = value.height;
			}
			if(!opt.height)
			{
				opt.height = opt.width / radio;
			}
			if(!opt.width)
			{
				opt.width = opt.height * radio;
			}
			return opt;
		}
		callback && callback.call(null,opt);
	});	
}


Webimg.prototype = Webimg.fn;
Webimg.gm = gm;
Webimg.captcha = captcha;
module.exports = Webimg;