window.onload=function(){
    var timer;//设置定时器
    //移去添加的className
    function removeClass(myid,mytag,myclass){
        timer=setTimeout(function(){
            var getPageId=document.getElementById(myid);
            var getTag=getPageId.getElementsByTagName(mytag)[0];
            getTag.className=myclass;
        },300);
    }
    //添加新的className
    function addClass(myid,mytag,myclass){
        var getPageId=document.getElementById(myid);
        var getTag=getPageId.getElementsByTagName(mytag)[0];
        getTag.className+=" "+myclass;
    }
    //阻止touchmove的默认事件
    document.body.addEventListener("touchmove",function(event){
        event=event?event:window.event;
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },false);
    var mypages=function(obj){
        var box=document.getElementById(obj.wrapper);
        var box2=document.getElementById(obj.pages);
        var len=obj.len;
        var n=obj.n;
        //开始位置,滑动的距离，屏幕高度
        var startY,moveY,cliH;

        //获取屏幕高度
        var getH=function(){
            cliH=document.body.clientHeight;
        }
        getH();
        window.addEventListener("resize",getH,false);

        //touchStart
        var touchstart=function(event){
            if(!event.touches.length){
                return;
            }
            startY=event.touches[0].pageY;
            move=0;    
        };
        //touchMove
        var touchmove=function(){
            if(!event.touches.length){
                return;
            }
            moveY=event.touches[0].pageY-startY;
            box2.style.transform = 'translateY(' + (-n * cliH + moveY) + 'px)'; //根据手指的位置移动页面
            //将下面的代码改为switch语句
            if(moveY>50||moveY<-50){
                switch(n){
                    case 1:
                    removeClass("page2","img","p2_anima1");
                    break;
                    case 2:
                    removeClass("page3","img","p3_anima1");
                    break;
                    case 3:
                    removeClass("page4","img","p4_anima1");
                    break;
                    case 4:
                    removeClass("page5","img","p5_anima1");
                    break;
                    case 5:
                    removeClass("page6","img","p6_anima1");
                    break;
                }
            }
}
        //touchEnd
        var touchend=function(event){
            //位移小于正负50则不翻页
            if(moveY<-50){n++;}
            if(moveY>50){n--;}
            //最后页和最前页控制
            if(n<0){n=0;}
            if(n>len-1) n=len-1;
            // console.log(n); 测试，待删除

            //将下面内容的实现改为switch条件语句
            switch(n){
                case 1:
                addClass("page2","img","p2_anima1_on");
                break;
                case 2:
                addClass("page3","img","p3_anima1_on");
                break;
                case 3:
                addClass("page4","img","p4_anima1_on");
                break;
                case 4:
                addClass("page5","img","p5_anima1_on");
                break;
                case 5:
                addClass("page6","img","p6_anima1_on");
                break;
            }
            //重定位
            box2.style.transform = 'translateY(' + (-n * 10) + '%)'; //根据百分比位置移动页面
        };
        //touch事件绑定
        box.addEventListener("touchstart", function(event) {
            touchstart(event)
        }, false);
        box.addEventListener("touchmove", function(event) {
            touchmove(event)
        }, false);
        box.addEventListener("touchend", function(event) {
            touchend(event)
        }, false);
    };
    mypages({
        wrapper: 'wrapper',
        pages: 'pages',
        len:10, //页数
        n: 0 //页面打开开始的页数
    });
}
