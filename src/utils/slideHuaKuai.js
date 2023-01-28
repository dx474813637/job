
// function SlideHuaKuai(opt) {
// 	if(opt.el == '') return
// 	this.opt = opt
// 	this.box = this.getEle(this.opt.el)
// 	this.bgColor = this.getEle(this.opt.bgColor)
// 	this.txt = this.getEle(this.opt.txt)
// 	this.slider = this.getEle(this.opt.slider)
// 	this.icon = this.getEle(icon)
// 	this.successMoveDistance = this.box.offsetWidth - this.slider.offsetWidth
// 	this.downX = null
// 	this.isSuccess = false
// 	this.handleEvent()
// }
// SlideHuaKuai.prototype.handleEvent = function() {
// 	if(!this.isSuccess) {
// 		this.slider.onmousedown = this.slider.ontouchstart = this.mousedownHandler;
// 	}
// }
// SlideHuaKuai.prototype.getEle = function(selector) {
// 	return document.querySelector(selector);
// }
// SlideHuaKuai.prototype.mousedownHandler = function() {
// 	this.bgColor.style.transition = "";
// 	this.slider.style.transition = "";
// 	var e = e || window.event || e.which;
// 	this.downX = e.clientX || e.targetTouches[0].clientX;
// 	//在鼠标按下时，分别给鼠标添加移动和松开事件
// 	window.addEventListener('touchmove', mousemoveHandler, { passive: false })
// 	document.onmousemove = mousemoveHandler;
// 	document.onmouseup = document.ontouchend = mouseupHandler;
// }
// SlideHuaKuai.prototype.getOffsetX = function() {
// 	if(offset < min) {
// 		offset = min;
// 	} else if(offset > max) {
// 		offset = max;
// 	}
// 	return offset;
// }
// SlideHuaKuai.prototype.mousemoveHandler = function() {
// 	var e = e || window.event || e.which;
// 	var moveX = e.clientX || e.targetTouches[0].clientX;
// 	var offsetX = getOffsetX(moveX - downX, 0, successMoveDistance);
// 	bgColor.style.width = offsetX + "px";
// 	slider.style.left = offsetX + "px";

import { inherits } from "util";

// 	if(offsetX == successMoveDistance) {
// 		success();
// 	}
// 	//如果不设置滑块滑动时会出现问题（目前还不知道为什么）
// 	e.preventDefault();
// }
// SlideHuaKuai.prototype.mouseupHandler = function() {
// 	if(!isSuccess) {
// 		bgColor.style.width = 0 + "px";
// 		slider.style.left = 0 + "px";
// 		bgColor.style.transition = "width 0.8s linear";
// 		slider.style.transition = "left 0.8s linear";
// 	}
// 	document.ontouchmove = null
// 	window.removeEventListener('touchmove', mousemoveHandler)
// 	document.onmousemove = null;
// 	document.ontouchend = null
// 	document.onmouseup = null;
// }
// SlideHuaKuai.prototype.success = function() {
// 	isSuccess = true;
// 	txt.innerHTML = "解锁成功";
// 	bgColor.style.backgroundColor = "lightgreen";
// 	slider.className = "slider active";
// 	icon.className = "iconfont iconchenggong";
// 	//滑动成功时，移除鼠标按下事件和鼠标移动事件
// 	slider.onmousedown = null
// 	slider.ontouchstart = null;
// 	document.onmousemove = null 
// 	document.ontouchmove = null;
// }

//一、定义了一个获取元素的方法
function getEle(selector) {
	return document.querySelector(selector);
}
//二、获取到需要用到的DOM元素
var box = getEle("#box"), //容器
	bgColor = getEle(".bgColor"), //背景色
	txt = getEle(".txt"), //文本
	slider = getEle(".slider"), //滑块
	icon = getEle(".slider>i"),
	successMoveDistance = box.offsetWidth - slider.offsetWidth, //解锁需要滑动的距离
	downX, //用于存放鼠标按下时的位置
	isSuccess = false; //是否解锁成功的标志，默认不成功

//三、给滑块添加鼠标按下事件
if(!isSuccess) slider.onmousedown = slider.ontouchstart = mousedownHandler;

//3.1鼠标按下事件的方法实现
function mousedownHandler(e) {
	bgColor.style.transition = "";
	slider.style.transition = "";
	var e = e || window.event || e.which;
	downX = e.clientX || e.targetTouches[0].clientX;
	//在鼠标按下时，分别给鼠标添加移动和松开事件
	window.addEventListener('touchmove', mousemoveHandler, { passive: false })
	document.onmousemove = mousemoveHandler;
	document.onmouseup = document.ontouchend = mouseupHandler;
};

//四、定义一个获取鼠标当前需要移动多少距离的方法
function getOffsetX(offset, min, max) {
	if(offset < min) {
		offset = min;
	} else if(offset > max) {
		offset = max;
	}
	return offset;
}

//3.1.1鼠标移动事件的方法实现
function mousemoveHandler(e) {
	var e = e || window.event || e.which;
	var moveX = e.clientX || e.targetTouches[0].clientX;
	var offsetX = getOffsetX(moveX - downX, 0, successMoveDistance);
	bgColor.style.width = offsetX + "px";
	slider.style.left = offsetX + "px";

	if(offsetX == successMoveDistance) {
		success();
	}
	//如果不设置滑块滑动时会出现问题（目前还不知道为什么）
	e.preventDefault();
};

//3.1.2鼠标松开事件的方法实现
function mouseupHandler(e) {
	// console.log('up')
	if(!isSuccess) {
		bgColor.style.width = 0 + "px";
		slider.style.left = 0 + "px";
		bgColor.style.transition = "width 0.8s linear";
		slider.style.transition = "left 0.8s linear";
	}
	document.ontouchmove = null
	window.removeEventListener('touchmove', mousemoveHandler)
	document.onmousemove = null;
	document.ontouchend = null
	document.onmouseup = null;
};

//五、定义一个滑块解锁成功的方法
function success() {
	isSuccess = true;
	txt.innerHTML = "认证成功";
	bgColor.style.backgroundColor = "lightgreen";
	slider.className = "slider active";
	icon.className = "iconfont iconchenggong";
	//滑动成功时，移除鼠标按下事件和鼠标移动事件
	slider.onmousedown = null
	slider.ontouchstart = null;
	document.onmousemove = null 
	document.ontouchmove = null;
};

export {
	isSuccess
}