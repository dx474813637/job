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
import "@/assets/animate.min.css";
import "layui-laydate/dist/theme/default/laydate.css";
import laydate from "layui-laydate";
import "./index.pcss";

import "@/utils/common.js"; 
let modelNum = {
	school: 1,
	company: 1,
}
initModelDate(modelNum.company, 'company');
initModelDate(modelNum.school, 'school');

$("input[type=checkbox][name=working]").on("change", function () {
	let checkState = $(this).prop("checked");
	let checkboxId = $(this).prop("id");
	hideEndTimeDiv($(this), checkState);
	if (checkState) {
		removeOtherChecked(checkboxId);
	}
});

$("#addCompanyBtn").on("click", function () { 
	addNewModel("company");
});
$("#addSchoolBtn").on("click", function () {
	addNewModel("school");
});
$("#companyExp, #schoolExp").on("click", ".delet_btn", function () {
	$(this).parents(".content_model").remove();
}); 

function addNewModel(type) {  
	modelNum[type]++;
	let getDivStr = getDiv(modelNum[type], type);
	if (type == "company") {
		$("#addCompanyBtn").before(getDivStr);
	} else if (type == "school") {
		$("#addSchoolBtn").before(getDivStr);
	}
	initModelDate(modelNum[type], type);
}
function getDiv(index, type) {
	if (type == "company") {
		return `<div class="content_model ${type}_box shadow-sm animated fadeInLeft" id="${type}${index}">
	<div class="row">
		<div class="col dx-flex d-row-right">
			<div class="delet_btn text-danger mb-4" id="${type}_delet${index}" role="button"> 
				<i class="bi bi-clipboard-minus-fill"></i>
				<span>删除该工作经验</span>
			</div>
		</div>
	</div>				
	<div class="form-group">
		<label class="h6" for="position${index}">工作职位</label>
		<input type="text" class="form-control" name="position${index}" id="position${index}" placeholder=""
			required>
	</div>
	<div class="form-group">
		<label class="h6" for="company${index}">公司名称</label>
		<input type="text" class="form-control" name="company${index}" id="company${index}" placeholder=""
			required>
	</div>
	<div class="form-group">
		<div class="custom-control custom-checkbox mb-3">
			<input type="checkbox" class="custom-control-input" name="working" id="working${index}" required>
			<label class="custom-control-label h6" for="working${index}">我当前在这里工作</label>
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-md-6 begin_div">
			<label for="${type}_begin${index}">开始时间</label>
			<input type="text" class="form-control" readonly name="${type}_begin${index}" id="${type}_begin${index}" placeholder="点击选择">
		</div>
		<div class="form-group col-md-6 end_div">
			<label for="${type}_end${index}">结束时间</label>
			<input type="text" class="form-control" readonly name="${type}_end${index}" id="${type}_end${index}" placeholder="点击选择">
		</div>
	</div>
	<div class="form-group">
		<label class="h6" for="desc${index}">工作描述</label>
		<textarea class="form-control" id="desc${index}" name="desc${index}" rows="3" required></textarea> 
	</div>
</div>`;
	}
	else if (type == "school") {
		return `<div class="content_model ${type}_box shadow-sm animated fadeInLeft" id="${type}${index}"> 
		<div class="row">
			<div class="col dx-flex d-row-right">
				<div class="delet_btn text-danger mb-4" id="${type}_delet${index}" role="button"> 
					<i class="bi bi-clipboard-minus-fill"></i>
					<span>删除该教育经历</span>
				</div>
			</div>
		</div>		
		<div class="form-group">
			<label class="h6" for="${type}${index}">学校</label>
			<input type="text" class="form-control" name="${type}${index}" id="${type}${index}" placeholder=""
				required>
		</div> 
		<div class="form-group">
			<label class="h6" for="class${index}">专业</label>
			<input type="text" class="form-control" name="class${index}" id="class${index}" placeholder=""
				required>
		</div> 
		<div class="form-row">
			<div class="form-group col-md-6 begin_div">
				<label for="${type}_begin${index}">开始时间</label>
				<input type="text" class="form-control" readonly name="${type}_begin${index}" id="${type}_begin${index}" placeholder="点击选择">
			</div>
			<div class="form-group col-md-6 end_div">
				<label for="${type}_end${index}">结束时间</label>
				<input type="text" class="form-control" readonly name="${type}_end${index}" id="${type}_end${index}" placeholder="点击选择">
			</div>
		</div> 
	</div>`
	}
}

function hideEndTimeDiv(tar, isHide) {
	let box = tar.parents(".company_box");
	let endTimeDiv = box.find(".end_div");
	isHide ? endTimeDiv.hide() : endTimeDiv.show();
}
function removeOtherChecked(tarId) {
	$("input[type=checkbox][name=working]").each((index, ele) => {
		let id = $(ele).prop("id");
		if (id != tarId) {
			$(ele).prop("checked", false);
		}
	});
}

function initModelDate(index, t) {
	const theme = "#007aff";
	const type = "month";
	const format = "yyyy年MM月";
	laydate.render({
		elem: `#${t}_begin${index}`,
		type,
		theme,
		format,
	});
	laydate.render({
		elem: `#${t}_end${index}`,
		type,
		theme,
		format,
	});
}
