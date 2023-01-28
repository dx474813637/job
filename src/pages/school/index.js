// 引入页面公共部分的js
import "../common/header";
import "../common/fixed_btn";
// import "../common/sections_box";
import "../common/footer";

// 引入公共css
import "bootstrap/dist/css/bootstrap.css";
import "swiper/swiper-bundle.css";
import "@/assets/animate.min.css";
import "../common/reset.css";
import "@/assets/global.pcss";

import "./index.pcss";

// 首页使用的js
// import $ from "jquery";
import "@/utils/common.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@/assets/jquery.eraser.js";
// import "jquery-lazyload";
import Swiper, {
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	Lazy,
} from "swiper";
// import { setTimeout } from "timers";

Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Lazy]); // 使用需要的功能

window.Swiper = Swiper;
import { debounce } from "@/utils/tools.js";
window.debounce = debounce;
var opt;
if ($("#headerSwiper .swiper-slide").length > 1) {
	opt = {
		delay: 9000,
		disableOnInteraction: false,
	};
} else {
	opt = false;
}
const mySwiper = new Swiper("#headerSwiper .swiper-container", {
	pagination: {
		el: "#headerSwiper .swiper-pagination", // 分页器
	},
	navigation: {
		nextEl: "#swiperNavi .swiper-button-next",
		prevEl: "#swiperNavi .swiper-button-prev",
	},
	allowTouchMove: false,
	// loop: true,
	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},
	autoplay: opt,
	on: {
		slideChangeTransitionStart: function () {
			console.log("Start", this.activeIndex); //切换结束时，告诉我现在是第几个slide
			const tarDom = $(
				"#headerSwiper .swiper-slide.swiper-slide-active .swiper-content"
			);

			tarDom.addClass("animated fadeIn");
			// setTimeout(function(){
			// 	tarDom.removeClass('flipInX');
			// }, 1000);
		},
	},
});
const joberSwiper = new Swiper("#joberSwiper", {
	pagination: {
		el: "#joberSwiper .swiper-pagination", // 分页器
		clickable: true,
	},
	navigation: {
		nextEl: "#joberSwiper .swiper-button-next",
		prevEl: "#joberSwiper .swiper-button-prev",
	},
	slidesPerView: 3,
	spaceBetween: 30,
	centeredSlides: true, 
	initialSlide: 1,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	on: {
		slideChangeTransitionStart: function () {
			console.log("Start", this.activeIndex); //切换结束时，告诉我现在是第几个slide
			const tarDom = $(
				"#joberSwiper .swiper-slide.swiper-slide-active .swiper-content"
			);

			tarDom.addClass("animated flipInX");
			setTimeout(function () {
				tarDom.removeClass("flipInX");
			}, 1000);
		},
	},
});

$("#searchInp").focus(function () {
	if (!$(this).val()) {
		$(this).parent().removeClass("inp-focus");
		return;
	}
	$(this).parent().addClass("inp-focus");
});
let handleInput = debounce(function (dom) {
	let keys = $(dom).val().trim();
	console.log(keys);

	if (keys) {
		$(dom).parent().addClass("inp-focus");
	} else {
		$(dom).parent().removeClass("inp-focus");
	}
}, 1000);
$("#searchInp").bind("input propertychange", function () {
	let self = this;
	handleInput(self);
});
$("#searchInp").blur(function () {
	setTimeout(() => {
		$(this).parent().removeClass("inp-focus");
	}, 500);
});

$("#searchBtn").on("click", function () {
	if (!$("#searchInp").val()) return;
	location.href =
		"searchRes.html?kw=" + encodeURIComponent($("#searchInp").val().trim());
});
$("#searchInp").on("keydown", function (e) {
	if (e.keyCode == 13 && $(this).val()) {
		location.href =
			"searchRes.html?kw=" +
			encodeURIComponent($("#searchInp").val().trim());
	}
});
// $(function () {
// 	$("#maskImg").eraser({ size: 400 });
// });
