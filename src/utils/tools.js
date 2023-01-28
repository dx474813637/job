// 节流
export function throttle() {

}

// 防抖
export function debounce( func, wait = 500, immediate = false) {
    let timer = null
    let flag = immediate
    return function(...args) {
        
        if(timer) {
            clearTimeout(timer);
        }else if(flag) {
            func(...args);
            flag = false
        }
        timer = setTimeout(() => {
            
            func(...args);
            timer = null
        }, wait)
        
    }
}