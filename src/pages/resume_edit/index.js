// 引入页面公共部分的js
import "../common/header";
import "../common/fixed_btn";
import "../common/sections_box";
// import "../common/user_info_box";
import "../common/footer";

// 引入公共css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-fileinput/css/fileinput.min.css";
import "../common/reset.css";
import "@/assets/global.pcss";
import "@/assets/animate.min.css";
import "layui-laydate/dist/theme/default/laydate.css";
import "./index.pcss";

import "@/utils/common.js";
import "bootstrap-fileinput"
import "bootstrap-fileinput/js/locales/zh.js";
import laydate from "layui-laydate";
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

// upload ========================================================== upload
let docArchives = {host: '', fileUrl: '', id: '', name: ''}
var fileUrl = `[[${docArchives.host+docArchives.fileUrl}]]`
var docId = `[[${docArchives.id}]]`
var docName = `[[${docArchives.name}]]`

// 生成预览文件链接，返回数组对象
function initialPreview() {
	console.log(`fileUrl = ${fileUrl}`)
	return [fileUrl]
}
// 预览文件配置，需要跟 initialPreview() 返回的数组一一对应
function initialPreviewConfig() {
	const ext = fileUrl.substr(fileUrl.lastIndexOf('.') + 1)
	let extType = 'object'

	if (/(pdf)$/i.test(ext)) {
		extType = 'pdf'
	}

	if (/(bmp|gif|jpg|jpeg|png)$/i.test(ext)) {
		extType = 'image'
	}

	return [
		{
			type: extType,
			// size: 8000,
			// caption: docName,
			filename: fileUrl,
			url: fileUrl,
			key: docId
		},

	]
}

const fileUploadOption = {
	language: 'zh',
	theme: 'explorer-fas',
	uploadUrl: "",
	language: 'zh',
	allowedFileExtensions: ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
		'html', 'htm', 'txt', 'rar', 'zip', 'gz', 'bz2', 'pdf', 'bpmn', 'bar'],
	dropZoneEnabled: true,
	maxFileCount: 1,
	minFileCount: 1,
	autoReplace: false,
	overwriteInitial: true,
	layoutTemplates: {
		actionUpload: '',//去除上传预览缩略图中的上传图片
		//actionZoom:'',   //去除上传预览缩略图中的查看详情预览的缩略图标
		//actionDownload:'' //去除上传预览缩略图中的下载图标
		actionDelete: '', //去除上传预览的缩略图中的删除图标
	},
	showUploadedThumbs: false,
	showUpload: true,
	fileDropZoneTitle: 'xxx',
	// previewFileType: ['image'],
	initialPreview: initialPreview(),
	initialPreviewConfig: initialPreviewConfig(),
	// initialPreviewAsData: true, // 默认为数据
	initialPreviewFileType: 'image', // 默认为`image`，在下面的配置中可以覆盖
	preferIconicPreview: false, // 这将强制缩略图按照以下文件扩展名的图标显示
	previewFileIconSettings: { // 配置你的文件扩展名对应的图标
		'doc': '<i class="fa fa-file-word-o text-primary"></i>',
		'xls': '<i class="fa fa-file-excel-o text-success"></i>',
		'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
		// 'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>', // 注释否则无法预览
		'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
		'htm': '<i class="fa fa-file-code-o text-info"></i>',
		'txt': '<i class="fa fa-file-text-o text-info"></i>',
		'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
		'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
		// 以下这些文件类型的注释未配置扩展名确定逻辑（键值本身会被用作扩展名）
		// has been configured (the keys itself will be used as extensions)
		// 'jpg': '<i class="fa fa-file-photo-o text-danger"></i>',
		// 'gif': '<i class="fa fa-file-photo-o text-muted"></i>',
		// 'png': '<i class="fa fa-file-photo-o text-primary"></i>'
	},
	previewFileExtSettings: { // 配置确定图标文件扩展名的逻辑代码
		'doc': function (ext) {
			return ext.match(/(doc|docx)$/i);
		},
		'xls': function (ext) {
			return ext.match(/(xls|xlsx)$/i);
		},
		'ppt': function (ext) {
			return ext.match(/(ppt|pptx)$/i);
		},
		'zip': function (ext) {
			return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
		},
		'htm': function (ext) {
			return ext.match(/(htm|html)$/i);
		},
		'txt': function (ext) {
			return ext.match(/(txt|ini|csv|java|php|js|css)$/i);
		},
		'mov': function (ext) {
			return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
		},
		'mp3': function (ext) {
			return ext.match(/(mp3|wav)$/i);
		},
	}

}

$(".fileUpload").fileinput(fileUploadOption)
	.on("filebatchselected", doUpload())
	.on("fileuploaded", function (event, data, previewId, index) {
		// 文件上传成功
		const result = data.response 
		if (+result.code == +web_status.SUCCESS) {
			$('input[name=fileUrl]').val(result.url)
			$('input[name=host]').val(result.host)
		} else {
			$.modal.alertError(result.msg);
		}
	}).on("filesuccessremove", function (event, data, previewId, index) {
		console.log('------filesuccessremove---')
		console.log(`${data},${previewId},${index}`)
		clearUploadFile()
	}).on("filebatchselected", function (event, data, previewId, index) {
		console.log('------filebatchselected---')
		console.log(data)
		console.log(index)
	});



function doUpload() {
	return function (event, data) {//选择即上传
		console.log(data)
		if (!!!data[0]) {
			$(this).fileinput("upload") // 上传文件
		}
	};
}

$('.kv-file-remove').on('click',function () {
	const title = $(this).parent().parent().parent().parent().find('.file-footer-caption').attr('title')

	console.log(`>>>>>>移除文件`)
	console.log(`fileUrl:${title}`)
})

$('.fileinput-remove-button').on('click',function () {
	console.log(`>>>>>>移除文件`)
	clearUploadFile()
})

function clearUploadFile() {
	$('input[name=fileUrl]').val("")
	$('input[name=host]').val("") 
}  

