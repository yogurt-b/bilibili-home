//图片列表
var carousel = document.querySelector('.carousel-area')
var items = document.getElementById('image')

// 文字列表
var text_list = document.querySelectorAll('#text_list>li')

// 圆点列表
var location_list = document.querySelectorAll('#location_list>li')

// 左右按钮
var prev = document.querySelector('#prev')
var next = document.querySelector('#next')

// 将第一张图片加到最后一张，方便循环
var oli = document.querySelector("#image li:first-child")
items.innerHTML += oli.innerHTML
console.log(items)

// 当前显示的图片定位
var img_location = 0
// 当前的圆点定位
var dot_location = 0
// 定义一个全局定时器变量
var timer = null

// 默认不上锁，该状态为了保证点击过快时过渡效果能完整呈现
var islock = false

console.log('js start')

// 定义一个全局函数，自动跳到下一张，方便鼠标移入移出时调用
function move() {
    timer = setInterval(function () {
        // 每隔1s点击向右按钮 
        next.click()
    }, 3000)
}
// 页面加载后自动调用，实现自动跳转下一张
move();

// 鼠标移入，清除定时器
carousel.onmouseenter = function () {
    clearInterval(timer)
}
// 鼠标移出，调用自动播放
carousel.onmouseleave = function () {
    move()
}

// 点击按钮切换下一张
next.onclick = function () {
    if(islock) { return }
    islock = true
    // 最后一张图时，清除过渡效果，跳转到第一张相同的图片
    if(img_location === 9)
    {
        items.style.transition = "none"
        items.style.left = "0px"
        img_location = 0
    }
    // 由于代码执行过快，所以需要放到异步执行语句里
    // 虽然setTimeout的延时设为0毫秒，实际上并不是立即执行，
    // 而是等到当前执行栈清空后再执行。这样的操作可以确保
    // 在DOM进行布局和渲染之后再执行相应的操作，
    // 避免在短时间内连续执行多个DOM操作，
    // 导致浏览器性能问题或者视觉上的闪烁等问题。
    setTimeout(function () {
        img_location++
        dot_location++
        items.style.left = -555 * img_location + "px"
        items.style.transition = "left 0.5s ease 0s"
        
        // 更改圆点激活状态和文字透明度
        if (img_location === 9) {
            dot_location = 0
            location_list[dot_location].className = "active"
            location_list[8].className = "none"
            text_list[dot_location].className = "active-text"
            text_list[8].className = "none"
        } else {
            // 激活当前定位的圆点
            location_list[dot_location].className = "active"
            // 上一个圆点取消激活状态
            location_list[dot_location - 1].className = "none"
            text_list[dot_location].className = "active-text"
            text_list[dot_location - 1].className = "none"
        }
    },0)

    setTimeout(function() {
        islock = false
    }, 500)
}

prev.onclick = function () {
    if(islock) { return }
    islock = true
    // 第一张图时，清除过渡效果，跳转到最后一张相同的图片
    if(img_location === 0)
    {
        items.style.transition = "none"
        img_location = 9
        items.style.left = -555 * img_location + "px"
    }
    // 由于代码执行过快，所以需要放到异步执行语句里
    // 虽然setTimeout的延时设为0毫秒，实际上并不是立即执行，
    // 而是等到当前执行栈清空后再执行。这样的操作可以确保
    // 在DOM进行布局和渲染之后再执行相应的操作，
    // 避免在短时间内连续执行多个DOM操作，
    // 导致浏览器性能问题或者视觉上的闪烁等问题。
    setTimeout(function () {
        img_location--
        dot_location--
        items.style.left = -555 * img_location + "px"
        items.style.transition = "left 0.5s ease 0s"
        
        // 更改圆点激活状态和文字透明度
        if (img_location === 8) {
            dot_location = 8
            location_list[dot_location].className = "active"
            location_list[0].className = "none"
            text_list[dot_location].className = "active-text"
            text_list[0].className = "none"
        } else {
            // 激活当前定位的圆点
            location_list[dot_location].className = "active"
            // 上一个圆点取消激活状态
            location_list[dot_location + 1].className = "none"
            text_list[dot_location].className = "active-text"
            text_list[dot_location + 1].className = "none"
        }
    },0)

    setTimeout(function() {
        islock = false
    }, 500)
}

