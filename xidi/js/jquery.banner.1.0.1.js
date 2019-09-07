;(function($){
    "use strict";

    $.fn.banner = function(options){
        var obj = {};
        var {items,left,right,list,autoPlay,moveTime,delayTime,index} = options;
        list = list === false ? false : true;
        autoPlay = autoPlay === false ? false :true;
        moveTime = moveTime || 200;
        delayTime = delayTime || 3000;
        index = index || 0;
        obj.iPrev = items.length-1;
        items.css({
            left:items.eq(0).width()
        }).eq(index).css({
            left:0
        });

        if(list){
            var str="";
            for(var i=0;i<items.length;i++){
                str+=`<li></li>`;
            }
            obj.ul = $("<ul>").html(str);
            this.append(obj.ul);
            obj.ul.css({
                width:"100%",
                height:8,
                lineHeight:"30px",
                display:"flex",
                justifyContent:"center",
                margin:0,
                padding:0,
                listStyle:"none",
                position:"absolute",
                left:0,
                right:0,
                bottom:"20px",
                textAlign:"center"
                
            }).children("li").css({
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                margin: "0 6px",
                background: "#a9a9a9",
                cursor: "pointer",
                opacity: .8,
            }).eq(index).css({
                background:"#4dd6d1",
                opacity: 1,
            })

            obj.ul.children("li").on(("click"),function(){
                if($(this).index() > index){
                    obj.listMove($(this).index(),1)
                }
                if($(this).index() < index){
                    obj.listMove($(this).index(),-1)
                }

                obj.ul.children("li").css({
                    background:"",
                    color:""
                }).eq($(this).index()).css({
                    background:"#4dd6d1",
                    opacity: 1,

                })
                index = $(this).index();
            })
        }
        
        obj.listMove = function(iNow,type){
            items.eq(index).css({
                left:0
            }).stop().animate({
                left:-items.eq(0).width() * type
            },moveTime).end().eq(iNow).css({
                left:items.eq(0).width() * type
            }).stop().animate({
                left:0
            },moveTime)
        }

        if(left != undefined && left.length > 0 && right != undefined && right.length > 0){
            left.on("click",function(){
                if(index == 0){
                    index = items.length-1;
                    obj.iPrev = 0;
                }else{
                    index --;
                    obj.iPrev = index+1;
                }
                obj.btnMove(1);
            })
            right.on("click",function(){
                if(index == items.length-1){
                    index = 0;
                    obj.iPrev = items.length-1
                }else{
                    index ++;
                    obj.iPrev = index-1
                }
                obj.btnMove(-1)
            })

        }

        obj.rightClick = function(){
                if(index == items.length-1){
                    index = 0;
                    obj.iPrev = items.length-1
                }else{
                    index ++;
                    obj.iPrev = index-1
                }
                obj.btnMove(-1)
        }

        obj.btnMove = function(type){
            items.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:items.eq(0).width() * type
            },moveTime).end().eq(index).css({
                left:-items.eq(0).width() * type
            }).stop().animate({
                left:0
            },moveTime)

            if(!list) return;
            this.ul.children("li").css({
                background:"",
                color:""
            }).eq(index).css({
                background:"#4dd6d1",
            })
        }

        if(autoPlay){
            var t = setInterval(()=>{
                obj.rightClick();
            },delayTime);

            this.hover(function(){
                clearInterval(t)
            },function(){
                t = setInterval(()=>{
                    obj.rightClick();
                },delayTime);
            })
        }


    }
})(jQuery);