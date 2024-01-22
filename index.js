//轮播图

//图片列表
var carousel = document.querySelector('.carousel-area')
var items = document.getElementById('image')

var imageTags = items.getElementsByTagName('img');
// console.log(imageTags[0])

//遮罩层
var mask = document.querySelector(".carousel-area .mask")
// console.log(mask)

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
// console.log(items)

// 当前显示的图片定位
var img_location = 0
// 当前的圆点定位
var dot_location = 0
// 定义一个全局定时器变量
var timer = null

// 默认不上锁，该状态为了保证点击过快时过渡效果能完整呈现
var islock = false

// console.log('js start')

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


function getMainColor(imagePath, i) {
    // console.log("start")
    var image=new Image()
    image.src=imagePath[i].src;
    // console.log(image)
    var canvas=document.getElementById("canvas")
    var ctx = canvas.getContext('2d');

    ctx.drawImage(image,0,0);
    image.style.display = 'none'
    let imgData = (ctx.getImageData(0, 150, image.width, image.height-150)).data  //x开始复制的左上角位置的 x 坐标。 y 开始复制的左上角位置的 y 坐标。 width 将要复制的矩形区域的宽度。 height 将要复制的矩形区域的高度。 
     // ImageData.data	类型为Uint8ClampedArray的一维数组，每四个数组元素代表了一个像素点的RGBA信息，每个元素数值介于0~255
    // var b = '(' + imgData[0] + ',' + imgData[1] + ',' + imgData[2] + ',' +  imgData[3] + ')'
    // var c = '(' + imgData[4] + ',' + imgData[5] + ',' + imgData[6]  + ',' +  imgData[7] + ')'
    // var d = '(' + 255 + ',' + 255 + ',' + 255  + ',' +  255 + ')'
    // var rescolor = 'linear-gradient( rgb' + b + ',rgb' + c + ',rgb' + d
    // mask.style.background = "linear-gradient(0," + rescolor + "23%, transparent 35%)"
    // var b = `(${imgData[0]}, ${imgData[1]}, ${imgData[2]}, ${imgData[3]})`;
    // var c = `(${imgData[4]}, ${imgData[5]}, ${imgData[6]}, ${imgData[7]})`;
    // var d = '(255, 255, 255, 255)';
    // var rescolor = `rgb${b}, rgb${c}, rgb${d}`;

    var rescolor = 'rgb(' + imgData[0] + ', ' + imgData[1] + ',' + imgData[2] + ')'    

    mask.style.background = `linear-gradient(0, ${rescolor} 23%, transparent 35%)`;
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
        items.style.transition = "left 0.4s ease 0s"
        getMainColor(imageTags, img_location)

        // 更改圆点激活状态和文字透明度
        if (img_location === 9) {
            dot_location = 0
            location_list[dot_location].className= "active"
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
        items.style.transition = "left 0.4s ease 0s"
        getMainColor(imageTags, img_location)
        
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


// 右侧频道变色

var channel_items = document.querySelectorAll('.channel-items_right a')
console.log(channel_items)

channel_items.forEach(function(right_item) {
    //鼠标悬停改变颜色
    right_item.addEventListener("mouseover", function () {
        right_item.querySelector('span').style.color = '#00aeec';
        right_item.querySelector('svg').style.fill = '#00aeec';
    })

    // 鼠标离开恢复颜色
    right_item.addEventListener("mouseout", function () {
        right_item.querySelector('span').style.color = '#61666d';
        right_item.querySelector('svg').style.fill = '#61666d';
    });
})
    


