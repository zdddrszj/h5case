var requestAnimationFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d')
canvas.setAttribute('width', 400)
canvas.setAttribute('height', 400)
// 刻画时钟
function clock () {
    ctx.clearRect(0, 0, 400, 400)
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds()
    
    // 定义一个从上到下的漂亮颜色渐变
    let gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, '#48d5ae')
    gradient.addColorStop(1, '#249ec2')

    // 画时钟边框
    ctx.beginPath()
    ctx.lineWidth = 10
    ctx.strokeStyle = gradient
    ctx.arc(200, 200, 195, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()

    // 画分针刻度
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = '#9c9ba0'
    for (let i = 0; i < 60; i++) {
        // 保存画布当前状态，对画布进行变换时需要save restore，否则影响后面画布上的元素
        ctx.save()
        // 移动画布，将坐标原点放在时钟中心点
        ctx.translate(200, 200)
        // 旋转画布，每次旋转6度，60次旋转一周
        ctx.rotate(i * 6 * Math.PI / 180)
        // 12点方向
        ctx.moveTo(0, -180)
        ctx.lineTo(0, -190)
        // 恢复画布之前的状态
        ctx.restore()
    }
    ctx.stroke()
    ctx.closePath()

    // 画时针刻度
    ctx.beginPath()
    ctx.lineWidth = 8
    ctx.strokeStyle = '#535257'
    for (let i = 0; i < 12; i++) {
        // 保存画布当前状态，对画布进行变换时需要save restore，否则影响后面画布上的元素
        ctx.save()
        // 移动画布，将坐标原点放在时钟中心点
        ctx.translate(200, 200)
        // 旋转画布，每次旋转30度，12次旋转一周
        ctx.rotate(i * 30 * Math.PI / 180)
        // 12点方向
        ctx.moveTo(0, -170)
        ctx.lineTo(0, -190)
        // 恢复画布之前的状态
        ctx.restore()
    }
    ctx.stroke()
    ctx.closePath()
    
    // 画时间点
    ctx.beginPath()
    ctx.save()
    ctx.translate(200, 200)
    ctx.font = '26px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (var n = 0; n < 12; n++) {
        // n * (Math.PI * 2) / 12 代表3点
        var theta = (n - 2) * (Math.PI * 2) / 12;
        var x = 150 * Math.cos(theta);
        var y = 150 * Math.sin(theta);
        ctx.fillText(n + 1, x, y);
    }
    ctx.restore()
    ctx.closePath()

    // 时针
    ctx.beginPath()
    ctx.save()
    ctx.lineWidth = 7
    ctx.strokeStyle = '#38383b'
    ctx.translate(200, 200)
    // 每小时30度
    ctx.rotate(hours % 12 * 30 * Math.PI / 180)
    ctx.moveTo(0, 20)
    // 12点方向
    ctx.lineTo(0, -80)
    ctx.stroke()
    ctx.restore()
    ctx.closePath()

    // 分针
    ctx.beginPath()
    ctx.save()
    ctx.lineWidth = 5
    ctx.translate(200, 200)
    // 每分钟6度
    ctx.rotate(minutes * 6 * Math.PI / 180)
    ctx.moveTo(0, 20)
    // 12点方向
    ctx.lineTo(0, -110)
    ctx.stroke()
    ctx.restore()
    ctx.closePath()

    // 秒针
    ctx.beginPath()
    ctx.save()
    ctx.lineWidth = 3
    ctx.strokeStyle = '#FD3351'
    ctx.translate(200, 200)
    // 每秒钟6度
    ctx.rotate(seconds * 6 * Math.PI / 180)
    ctx.moveTo(0, 20)
    // 12点方向
    ctx.lineTo(0, -130)
    ctx.stroke()
    ctx.restore()
    ctx.closePath()

    // 画时钟圆心
    ctx.beginPath()
    ctx.fillStyle = '#edb052'
    ctx.arc(200, 200, 10, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    ctx.beginPath()
    ctx.fillStyle = '#ff364e'
    ctx.arc(200, 200, 6, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()

    // 循环调用
    requestAnimationFrame(clock)
}