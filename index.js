var gm = require('gm'),
	fs = require('fs'),
	_  = require('underscore'),
	opts = {};


var Webimg = function(img){
	if(!img){
		throw new Error('No Image File Specified');
	}
	this.dst = img;
	this.gm  = gm(this.dst);
}

Webimg.fn = {};

/*
	根据原来的文件路径，宽高
	创建一个新文件名
 */
Webimg.fn.fileName = function(path,w,h)
{
	path = path || opts.dst;
	if(!path){
		throw new Error("No File Specified");
	}
	var paths = path.split('/'),
		n     = paths.pop(),
		ns    = n.split('.'),
		ext   = ns.pop(),
		xname = (new Date()).getTime();
		if(w && h){
			xname += "_" + w + "x" + h;
		}else{
			return this.gm.size(function(e,val){
				xname += "_" + val.width + "x" + val.height;
				return paths.join('/') + "/" + xname + "." + ext;
			});
		}
	return paths.join('/') + "/" + xname + "." + ext;
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
Webimg.fn.quality = function(quality){
	if(_.isArray(opts)) {
		throw new Error('You have already set up the batch configuration');
	}
	opts.quality = quality;
	return this;
}

/*
	缩略图
 */
//生成缩略图
var thumb = function(dst,width, height, outName, quality,callback){
	if(!dst){
		throw new Error('Do not specify a picture');
	}
	quality = quality || 100;
	
	gm(dst).thumb(width,height,outName,quality,function(err, stdout, stderr, command){
		callback.apply(null,arguments);
	});
}

//生成缩略图
Webimg.fn.thumb = function(callback){
	if(_.isArray(opts)){
		for(var i in opts)
		{
			var outName = this.fileName(this.dst,opt[i].width,opt[i].height);
			thumb(this.dst,opts[i].width,opts[i].height,outName,opts[i].quality,function(err, stdout, stderr, command){
				if(err){
					throw err;
				}
				recive(opts[i],outName);
				callback.apply(null,arguments);
			});
		}
	}else{
		var outName = this.fileName(this.dst,opt.width,opt.height);
		thumb(this.dst,opts.width,opts.height,outName,opts.quality,function(err, stdout, stderr, command){
				if(err){
					throw err;
				}
				recive(opts[i],outName);
				callback.apply(null,arguments);				
			});
	}

	function recive(opt,file){
		if(!opt.markImg && !opt.markText){
			return false;
		}
		//添加水印
		
	}

}

/*
	水印
 */

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
var formatMarkPos = function(pos){
  var types = [
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
  if(_.indexOf(types,pos) > -1)
  {
  	return pos;
  }
  if(!_.isNumber(pos))
  {
  	return 'SouthEast';
  }
  pos = parseInt(pos);
  pos --;
  return types[pos];
}
//生成水印

Webimg.fn.watermark = function(){
	//组织水印配置
	var markopts = {};
	markopts.img  = opts.img  || null;
	markopts.text = opts.text || null;
	markopts.pos  = opts.pos  || 'SouthEast';
	markopts.fontsize = opts.fontsize || 14;
	markopts.font     = opts.font     || __dirname + '/font.ttf';
	markopts.fontcolor = opts.fontcolor || '#000000';
	watermark(this.dst,markopts);
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
Webimg.prototype.captcha = function(text){
	var captcha = ccap(width, height, offset);
}


//设置水印

//

//处理配置文件
//对于只传递了宽或者高的配置按照图片比例计算未设置项
Webimg.fn.formatParmas = function(opt){
	opt  = opt || opts;
	return this.gm.size(function(e,value){
			if(e){
				throw e;
			}
			var radio = value.width/value.height;//宽高比
			if(_.isArray(opt))
			{//批量
				if(opt.length === 0)
				{
					return opt;
				}
				for(var i in opt)
				{
					opt[i] = Webimg.fn.formatParmas(opt[i]);
				}
				return opt;
			}else{
				if(opt.width && opt.height){
					return opt;
				}
				if(!opt.width && !opt.height)
				{
					opt.width  = value.width;
					opt.height = value.height;
					return opt;
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
		});	
}


Webimg.prototype = Webimg.fn;
Webimg.gm = gm;
module.exports = Webimg;