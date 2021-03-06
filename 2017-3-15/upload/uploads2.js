
/*
	http://www.jianshu.com/p/46e6e03a0d53  (jq,ajax的上传图片的小文档) 
*/
class Upload {
	constructor(){
		this.opt = {
			fileEle:null,
			btn:null,
			url:'',
			viewFn:function(){}
		}
		this.arr = [];
	}
}
$.extend(Upload.prototype,{
	init:function(opt){
		$.extend(this.opt,opt);
//		console.log(this.opt);
		
		//确认传入fileEle这个元素
		const _this = this; 
		if(this.opt.fileEle){
			this.opt.fileEle.on('change',function(){
				//console.dir(this.files[0]);
				_this.addArr(this.files[0]);
			});
		}
		
		
		//点击上传按钮
		if(this.opt.btn){
			this.opt.btn.on('click',function(){
				_this.upload();
			});
		}
	},
	//添加数据
	addArr:function(data){
		//因为选择控件的时候会出现取消，当取消的时候，同样会触发change事件，而files[0]为undefined,所以才加的这个判断。
		if(data){
			//重复file文件就不用push了
			var onoff = this.arr.some(function(a){
				return a.name == data.name
			});
			if(!onoff){
				this.arr.push(data);
				this.opt.viewFn(data);
			}
			console.log(this.arr);
		}
	},
	upload:function(){
		const _this = this;
		$.each(this.arr,function(i,e){
			const f = new FormData();
			f.append('file',e);
			$.ajax({
				url:_this.opt.url,
				type:'post',
				data:f,
				processData: false,
    			contentType: false
			});
		});
	},
	fileReader:function(file,callback){
		
		/*
			FileReader + readAsDataURL:
				将file文件转成源码 
			其中有个onload事件，转换完成
			ev -> target -> result -> 图片源码（可以直接放到img的src中）
		*/
		
		var fir = new FileReader();
		fir.onload = function(ev){
			callback && callback(ev.target.result);
		}
		fir.readAsDataURL(file);
		
		//console.log(file)
	}
});



//创建一个插件
$.fn.extend({
	uploads:function(opt){
		var u = new Upload();
		u.init(opt);
		return u;
	}
});
