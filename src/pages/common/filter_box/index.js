import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "@/assets/global.pcss";
import "./index.pcss";

$('#filterList, #mfilterList').on('click', '.filter_title', function (event) {
    let targetDom = $(event.target);
    // let domType = targetDom.prop('type') 
    let domName = targetDom.prop('tagName')
    if (domName == 'INPUT' || domName == 'LABEL') return
    let listItem = null;
    let listMore = null;
    // target.css("background-color", "red");
    // console.log(1)
    if (targetDom.hasClass('filter_list_item')) {
        listItem = targetDom
    } else {
        listItem = targetDom.closest('.filter_list_item')
    }
    listMore = listItem.contents('.filter_list_more')
    // console.log(listItem, listMore)
    if (listItem.hasClass('active')) {
        listItem.removeClass('active')
        listMore.slideUp()
    } else {
        listItem.addClass('active')
        listMore.slideDown()
    }
})
$('#filterList, #mfilterList').on('change', 'input[type=checkbox]', function (event) {  
    if (!$(this).parent().parent().hasClass('filter_list_more')) {
        let listMore = $(this).closest('.filter_list_item').children('.filter_list_more');
        let boxChildren = listMore.find('input[type=checkbox]') 
        let flag = true
        boxChildren.each((index, ele) => {
            if(!$(ele).prop("checked")) {
                flag = false
            }
        })
        boxChildren.prop("checked", !flag)
    }else {
        let parentCheckbox = $(this).closest('.filter_list_item').children('.filter_title').find('input[type=checkbox]')
        let listMore = $(this).parent().parent()
        let boxChildren = listMore.find('input[type=checkbox]') 
        let flag = false
        let arr = $.makeArray(boxChildren)
        flag = arr.every(ele => $(ele).prop('checked'));
        if(flag) {
            //当 列表全部checkbox选中，列表其父元素checkbox 为 true
            parentCheckbox.prop('indeterminate', false)
            parentCheckbox.prop('checked', true)
        }else {
            parentCheckbox.prop('checked', false)
            flag = arr.some(ele => $(ele).prop('checked')); 
            if(flag) {
                parentCheckbox.prop('indeterminate', true)
            }else {
                parentCheckbox.prop('indeterminate', false) 
            }
        } 
    }

})

$('#backBtn').on('click', function() {
    $('#mFilterBox').removeClass('active')
    $('body').removeClass('no-scroll')
})

$('#confirmBtn').on('click', function() {
    $('#backBtn').trigger('click')
})
$('#resetBtn').on('click', function() {
    $('#backBtn').trigger('click')
})