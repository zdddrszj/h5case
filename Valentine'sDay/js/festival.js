// 动画结束事件
var animationEnd = (function() {
    var explorer = navigator.userAgent;
    if (~explorer.indexOf('WebKit')) {
        return 'webkitAnimationEnd';
    }
    return 'animationend';
})();

function Swipe(content){

    var swipe = {};
    var contentWrap = $(".content-wrap");

    var lis = contentWrap.find("li");

    var width = $(content).width();
    var height = $(content).height();

    contentWrap.css({
        width:lis.length*width,
        height:height
    });

    lis.each(function(){
        $(this).css({
            width:width,
            height:height
        });
    });

   swipe.scrollTo  = function(speed, x) {
        //执行动画移动
        contentWrap.css({
            'transition-timing-function' : 'linear',
            'transition-duration'        : speed + 'ms',
            'transform'                  : 'translate3d(-' + x*width + 'px,0px,0px)'
        });
        return this;
    };

    return swipe;
}
function girlTurn() {
    $girl = $(".girl");
    // 页面可视区域
    var visualWidth = $(".content").width();
    var visualHeight = $(".content").height();
    //计算女孩位置
   $girl.css({
       top:$(".c_background_middle").offset().top-$girl.height(),
       left:visualWidth/2
   });

    return{
        rotate:function(){
            $(".girl").addClass("girl-rotate");
        }
    }
}
function BoyWalk() {

    $boy = $(".boy");
    // 页面可视区域
    var visualWidth = $(".content").width();
    var visualHeight = $(".content").height();
    //计算男孩位置
    var pathY = function () {
        var top = $(".a_background_middle").offset().top;
        var height = $(".a_background_middle").height();
        return top + height / 2;
    }

    $('.boy').css({
        top: pathY() - $(".boy").height() + 25
    });

    //开始走路
    function slowWalk() {
        $(".boy").addClass("slowWalk");
    }
    function stopWalk() {
        $(".boy").removeClass("slowWalk");
    }
    //暂停走路
    function pauseWalk() {
        $(".boy").addClass("pauseWalk");
    }

    //恢复走路
    function restoreWalk() {
        $(".boy").removeClass("pauseWalk");
    }

    function startRun(time,options){
        var dfd = $.Deferred();
        restoreWalk();
        $(".boy").transition(options,time,'linear',function(){
            dfd.resolve();
        });
        return dfd;
    }
    function walkRun(time,distX,distY){
        time = time || 3000;
        slowWalk();
        var dl = startRun(time,{left:distX,top:distY});
        return dl;
    }
    var instancex;
    function walkToShop(time){

        var dfd = $.Deferred();
         var boyLeft = $(".boy").offset().left;
        var doorLeft = $(".door").offset().left;

        instancex = (doorLeft+$(".door").width()/2)-(boyLeft+$(".boy").width()/2);
        var walkPlay = startRun(time,{
            transform:'translateX('+instancex+'px),scale(0.3,0.3)',
           opacity:0.1
        });
        walkPlay.done(function(){
            $(".boy").css({opacity:0});
            dfd.resolve();
        });
        return dfd;
    }
    function walkOutShop(time){
        var dfd = $.Deferred();
       // restoreWalk();
        var walkPlay = startRun(time,{
            transform:'translateX('+(instancex)+'px),scale(1,1)',
            opacity:1
        });
        walkPlay.done(function(){
            dfd.resolve();
        });
        return dfd;
    }
    function getFlower(){
        var dfd = $.Deferred();
        setTimeout(function () {
            $(".boy").addClass("slowFlolerWalk");
            dfd.resolve();
        },1000);
        return dfd;
    }
    return{
        walkTo: function (time,proportionX,proportionY) {
            var distX = visualWidth * proportionX;
            var distY = visualHeight * proportionY;
            return walkRun(time,distX,distY);
        },
        pauseWalk: function () {
            pauseWalk();
        },
        restoreWalk: function () {
            restoreWalk();
        },
        toShop:function(time){
           return walkToShop(time);
        },
        outShop:function(time){
           return walkOutShop(time);
        },
        talkFlower:function(){
            return getFlower();
        },
        resetOriginal: function () {
            $(".boy").removeClass("slowWalk slowFlolerWalk").addClass("boy_reset");
        },
        rotate: function(callback) {
            restoreWalk();
            $boy.addClass('boy-rotate');
            // 监听转身完毕
            if (callback) {
                $boy.on(animationEnd, function() {
                    callback();
                   // $(this).off();
                })
            }
        }
    }
}

var bird_fly = function (){
    var bird = $(".bird");
    bird.transition({
        right:"100%"
    },15000,"linear");
}
/*开门*/
function openDoor(){
    return doorAction("-50%","100%",1000);
}
/*关门*/
function closeDoor(){
    return doorAction("0%","50%",1000);
}
function doorAction(left,right,time){
    var dfd = $.Deferred();
    var doorLeft = $(".door-left");
    var doorRight = $(".door-right");

    var count = 2;
    var complish = function(){
        if(count==1){
            dfd.resolve();
        }
        count--;
        return;
    }
    doorLeft.transition({left:left},time,"linear",complish);
    doorRight.transition({left:right},time,"linear",complish);
    return dfd;
}
/*飘花*/
function snowflake() {
    var snowflakeURl = [
        'images/snowflake/snowflake1.png',
        'images/snowflake/snowflake2.png',
        'images/snowflake/snowflake3.png',
        'images/snowflake/snowflake4.png',
        'images/snowflake/snowflake5.png',
        'images/snowflake/snowflake6.png'
    ];
    var snowflake = $(".snowflake");

    function getImagesName(){
        var index = parseInt(Math.floor(Math.random()*6));
        return snowflakeURl[index];
    }

    function createSnowBox(){
        var div = $('<div class="snowbox"></div>');
        div.css({
            width:41,
            height:41,
            position:"absolute",
            backgroundSize:"cover",
            zIndex:2,
            backgroundImage:"url("+getImagesName()+")",
            top: '-41px'
        }).addClass('snowRoll');
        return div;
    }
    var visualWidth = $(".content").width();
    var visualHeight = $(".content").height();
    setInterval(function(){
        var startPositionLeft = Math.random()*visualWidth,
            startOpacity = 1,
            endPositionTop = visualHeight-40,
            endPositionLeft = startPositionLeft -100 + Math.random() * 200,
            duration        = visualHeight * 10 + Math.random() * 5000;

        // 随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;

        // 创建一个雪花
        var $flake = createSnowBox();
        // 设计起点位置
        $flake.css({
            left: startPositionLeft,
            opacity : randomStart
        });

        // 加入到容器
        $('.snowflake').append($flake);
        $flake.transition({
            top:endPositionTop,
            left:endPositionLeft,
            opacity: 0.7
        },duration,'ease-out',function(){
            $(this).remove();
        });

    },200);
}
/*音乐*/
var audioConfig = {
    playURL : "music/happy.wav",
    cycleURL : "music/circulation.wav",
    enable : true
}
function html5Audio(url,isLoop){
   var audio = new Audio(url);
    audio.loop = isLoop ? isLoop : false;
    audio.play();
     return {
         end:function(callback){
             audio.addEventListener('ended', function() {
                 callback();
             }, false);
         }
     }
}

/*灯*/
var lamp = {
    elem : $(".b_background_preload"),
    light : function(){
        this.elem.addClass('lamp-light');
    },
    dark : function(){
        this.elem.removeClass('lamp-light');
    }
}
/*logo*/
var logo = {
    elem: $('.logo'),
    run: function() {
        this.elem.addClass('logolightSpeedIn')
            .on(animationEnd, function() {
                $(this).addClass('logoshake').off();
            });
    }
};