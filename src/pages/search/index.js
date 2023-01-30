// 引入页面公共部分的js
import "../common/header";
import "../common/fixed_btn";
// import "../common/sections_box";
// import "../common/user_info_box";
import "../common/filter_box";
import "../common/job_list";
import "../common/footer";

// 引入公共css
import "bootstrap/dist/css/bootstrap.css";
import "../common/reset.css";
import "@/assets/global.pcss";
import "./index.pcss";
 
import "@/utils/common.js";

let filterListMore = false; //true-展开 false-隐藏
$("#moreKeyBtn").on("click", function () {
  if (filterListMore) {
    filterListMore = false
    $(this).html('展开')
    $("#filterKeyList").removeAttr('style');
  } else {
    filterListMore = true
    $(this).html('隐藏')
    $("#filterKeyList").css({ height: "auto" });
  }
});


$('#mFilterBtn').on('click', function() {
  $('#mFilterBox').addClass('active')
  $('body').addClass('no-scroll')
})