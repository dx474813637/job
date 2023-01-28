// 引入页面公共部分的js
import "../common/header";
import "../common/fixed_btn";
import "../common/sections_box";
// import "../common/user_info_box";
import "../common/footer";

// 引入公共css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../common/reset.css";
import "@/assets/global.pcss";
// import "@/utils/laydate/theme/default/laydate.css";
import laydate from "layui-laydate";
import "./index.pcss";


import "@/utils/common.js";
laydate.render({
    elem: '#begin1' //指定元素
  });