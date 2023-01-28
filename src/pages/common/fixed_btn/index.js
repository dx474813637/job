// 头部的js代码

import $ from "@/assets/jquery-vender.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import "@/assets/global.pcss";
import "./index.pcss";



$(document).scroll(function() {
    let scroH  = $(document).scrollTop();
    if(scroH > 400) {
        $('#toTopBtn').fadeIn()
    }else {
        $('#toTopBtn').hide()
    }
})
$('#toTopBtn').on('click', function() {
    $('html, body').animate({scrollTop: '0px'}, 400);
})