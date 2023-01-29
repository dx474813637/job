// 头部的js代码

import $ from "@/assets/jquery-vender.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/global.pcss";
import "./index.pcss";


const btn = document.querySelector('#loginBtn')

btn.onmousemove = function (e) {
    const x = e.pageX - btn.offsetLeft
    const y = e.clientY - btn.offsetTop 
    btn.style.setProperty('--x', x + 'px')
    btn.style.setProperty('--y', y + 'px')
}
var position = $(window).scrollTop();
$(document).scroll(function (e) {
    var scroll = $(window).scrollTop();
    if (scroll > position && scroll > 30) {
        $('.header-fixed-w').addClass('scroll_down')
    } else {
        $('.header-fixed-w').removeClass('scroll_down')
    }
    position = scroll;

    let h = $(document).scrollTop();
    if (h <= 30) {
        $('#header').addClass('top_active')
    } else {
        $('#header').removeClass('top_active')
    }
})
var scrollFunc = function (e) {
    console.log(e)
    e = e || window.event;
    if (e.wheelDelta) {            //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {  //当滑轮向上滚动时
            console.log("滑轮向上滚动");
        }
        if (e.wheelDelta < 0) {          //当滑轮向下滚动时
            console.log("滑轮向下滚动");
        }
    } else if (e.detail) {             //Firefox滑轮事件
        if (e.detail > 0) {         //当滑轮向下滚动时
            console.log("滑轮向下滚动");
        }
        if (e.detail < 0) {            //当滑轮向上滚动时
            console.log("滑轮向上滚动");
        }
    }
}
//给页面绑定滑轮滚动事件
if (document.addEventListener) {//firefox
    document.addEventListener("DOMMouseScroll", scrollFunc, false);
} else {
    //滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = scrollFunc;
}


$('#mMenusBtn').on('click', function() {
    if($('.header-fixed-w.m').hasClass('active')) {
        $('.header-fixed-w.m').removeClass('active')
    }else {
        $('.header-fixed-w.m').addClass('active')
    }
})