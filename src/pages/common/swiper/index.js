import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/animate.min.css";
import "swiper/swiper-bundle.css";

import "@/assets/global.pcss";
import "./index.pcss";
import Swiper, { Navigation, Pagination, Autoplay, EffectFade, Lazy } from "swiper";

Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Lazy]); // 使用需要的功能


 
var opt;
if ($("#headerSwiper .swiper-slide").length > 1) {
	opt = {
		delay: 8000,
		disableOnInteraction: false,
	};
} else {
	opt = false;
}
const mySwiper = new Swiper("#headerSwiper .swiper-container", {
	pagination: {
		el: "#headerSwiper .swiper-pagination", // 分页器
	}, 
	loop: true,
	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},
	autoplay: opt,
	on: { 
		slideChangeTransitionStart: function () {
			// console.log('Start',this.activeIndex);//切换结束时，告诉我现在是第几个slide
			const tarDomWrap = $('#headerSwiper .swiper-slide.swiper-slide-active .slide-content-w')
			const tarDomTitle = $('#headerSwiper .swiper-slide.swiper-slide-active .slide-content .slide-content-title')
			const tarDomSub = $('#headerSwiper .swiper-slide.swiper-slide-active .slide-content .slide-content-sub')
			const tarDomBg1 = $('#headerSwiper .swiper-slide.swiper-slide-active .slide-content-bg1')
			const tarDomBg2 = $('#headerSwiper .swiper-slide.swiper-slide-active .slide-content-bg2')
			tarDomTitle.addClass('animated fadeInDown')
			tarDomSub.addClass('animated fadeIn')
			tarDomBg1.addClass('animated fadeInLeft')
			tarDomBg2.addClass('animated fadeInLeft')
			setTimeout(function(){
				tarDomTitle.removeClass('fadeInDown')
				tarDomSub.removeClass('fadeIn')
				tarDomBg1.removeClass('fadeInLeft')
				tarDomBg2.removeClass('fadeInLeft')
			}, 1500);
		},
	},
});