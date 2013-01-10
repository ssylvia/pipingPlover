$(window).resize(function(){
    resetLayout();
    changeSidePanel();
});

$(document).ready(function(){

    $("#loader").css({
        left:($(document).width()/2 - 50),
        top:($(document).height()/2 - 50)
    });
    $("#loader").fadeIn();
    $("#zoomIn").click(function(){
        map.setLevel(map.getLevel()+1);
    });
    $("#zoomOut").click(function(){
        map.setLevel(map.getLevel()-1);
    });
    $("#zoomExtent").click(function(){
        map.setExtent(seasonExtent);
    });
    if(navigator.userAgent.match(/iPad/i) != null){
        iPad = true;
        $("#banner").css("height",125);
    }
    $("#legendToggle").click(function(){
        if ($(this).html() === "LEGEND ▼"){
            $(this).html("LEGEND ▲");
            $("#legend").stop(true,true).slideDown("fast");
        }
        else{
            $(this).html("LEGEND ▼");
            $("#legend").stop(true,true).slideUp("fast");
        }
    });
    $("#learnMore").click(function(){
        window.open("http://bit.ly/UUiPDT");
    });
    $("#slider").draggable({
    	axis : "x",
		containment : "#tabArea",
        drag: function(){
            if($.browser.mozilla){
                $("#sliderRightArrow").show();
            }
        },
        stop: function(){
            if ($("#slider").position().left <= $(".tab").first().width()/2){
                $("#slider").animate({
                    "left" : $(".tab").eq(0).position().left - 13
                },100);
                setSection(0);
            }
            else if ($("#slider").position().left <= $(".tab").first().width()+($(".tab").first().width()/2)){
                $("#slider").animate({
                    "left" : $(".tab").eq(1).position().left - 13
                },100);
                setSection(1);
            }
            else if ($("#slider").position().left <= ($(".tab").first().width()*2)+($(".tab").first().width()/2)){
                $("#slider").animate({
                    "left" : $(".tab").eq(2).position().left - 13
                },100);
                setSection(2);
            }
            else if ($("#slider").position().left <= ($(".tab").first().width()*3)+($(".tab").first().width()/2)){
                $("#slider").animate({
                    "left" : $(".tab").eq(3).position().left - 13
                },100);
                setSection(3);
            }
            else{
                $("#slider").animate({
                    "left" : $(".tab").eq(4).position().left - 13
                },100);
                setSection(4);
                if($.browser.mozilla){
                    $("#sliderRightArrow").hide();
                }
            }
        }
    });
});

var getWidth = function(){
    if ($(document).width() <= 1024){
        return 350;
    }
    else{
        return 450;
    }
};

var changeSidePanel = function(){
    $("#leftPane").css("width",getWidth());
    $(".contentSlide").css("width",getWidth());
    if(getWidth() === 350){
        $(".fader").css("height",245);
        $(".tabTitle").css("font-size",16);
        $(".popupTitle").css("font-size",16);
        $(".textContent").css("font-size",13);
    }
    else{
        $(".fader").css("height",315);
        $(".tabTitle").css("font-size",24);
        $(".popupTitle").css("font-size",24);
        $(".textContent").css("font-size",15);
    }
    dijit.byId("mainWindow").layout();
    $("#contentSlider").animate({
        "left" : -$(".currentSlide").position().left
    },0);

    if($.browser.msie && $.browser.version === "9.0"){
        $("#sliderMid").css({
            "height" : 34
        });
    }
    if($.browser.msie && $.browser.version === "7.0"){
        $("#sliderMid").css({
            "height" : 40
        });
        $(".zoomExtent").css("margin-top","-3px");
    }
    if($.browser.mozilla){
        $("#sliderMid").css({
            "height" : 37
        });
        $(".zoomExtent").css("margin-top","-5px");
    }
    if(iPad == true){
        $(".zoomExtent").css("margin-top","-5px");
        $(".zoomOut").css("margin-top","-5px");
    }
};

var resetLayout = function(){
    var lastWidth = 0;
    $(".tab").each(function(){
        if($(this).index() !== $(".tab").length - 1){
            $(this).css("width",$("#mapPane").width()/5);
            lastWidth = lastWidth+$(this).width();
        }
        else{
            $(this).css("width",$("#mapPane").width() - lastWidth - 1);
        }
    });

    $("#sliderMid").css("width",$("#tabText0").width()+7);

    $("#contentSlider").css("width",$("#contentSlider").children(".contentSlide").length * getWidth());

    $(".nextArrow").first().css("border-top","20px solid transparent").css("border-bottom","20px solid transparent").css("border-left","20px solid #fff").css("margin-bottom",5).css("margin-left",($(".nextArrowCon").first().width() - 20)/2);

    $(".singlePhoto").each(function(){
        if($(this)[0].complete){
            $(this).css("margin-left",($(this).parent(".fader").width() - $(this).width())/2).css("margin-top",($(this).parent(".fader").height() - $(this).height())/2);
            $(this).show();
        }
        else{
            $(this).load(function(){
                $(this).css("margin-left",($(this).parent(".fader").width() - $(this).width())/2).css("margin-top",($(this).parent(".fader").height() - $(this).height())/2);
                $(this).show();
            });
        }
    });
    $(".contentSlide").each(function(){
        $(this).children(".textContent").css("height",$("#leftPane").height() - $(this).children(".fader").height() - $(this).children(".photoMargin").height() - $(this).children(".photoCreditCon").height() - $(this).children(".titleBar").height()-37);
    });

    if($(".currentSlide").length > 0){
        $("#slider").css({
            "left" : $(".tab").eq(parseFloat($(".currentSlide").attr("season"))).position().left - 13
        });
    }

    positionCredit();
};

var addStart = function(i){
    if (i === 0){
        return "START";
    }
    else{
        return "";
    }
};

var setUpTabs = function(){
    dojo.forEach(configOptions.tabTitles,function(tab,i){
        $("#tabArea").append("<div id='tab"+i+"' class='tab'><p id='tabText"+i+"' class='tabText'>"+tab.title+"</p></div>");
        //Content Slider
        $("#contentSlider").append("<div class='contentSlide tabSlide "+tab.season+"Slide "+tab.season+"' season='"+i+"'><div class='photoMargin'></div><div class='tabPhoto fader "+tab.season+"'><img class='tabPhoto singlePhoto' src='"+sectionData[i].images[0].src+"' alt=''></div><div class='tabPhoto photoCreditCon "+tab.season+"' style='color:#ccc;'><p class='photoCredit'>"+sectionData[i].images[0].copyright+"</p></div><table class='titleBar "+tab.season+"'><tbody><tr><td class='prevArrowCon "+tab.season+" arrowCon tabArrow' style='width:10px; padding:10px;'><div class='prevArrow'></div></td><td class='tabTitle "+tab.season+"title'>"+sectionData[i].title+"</td><td class='nextArrowCon "+tab.season+" arrowCon tabArrow' style='width:10px; padding:10px;'><div class='nextArrow'></div>"+addStart(i)+"</td></tr></tbody></table><div class='textContent "+tab.season+"'>"+sectionData[i].text+"</div></div>");
    });

    $(".nextArrow").first().addClass("blinking").addClass("white");
    startBlinking();

    $(".tab").eq(section).addClass("selected");
    $(".tab").click(function(){
        setSection($(this).index());
        $(".tab").removeClass("selected");
        $(this).addClass("selected");
    });
    resetLayout();
};

var setSection = function(sec){

    hideInfo($("#hoverInfoSlide"),$("#hoverInfoArrowSlide"));
    hideInfo($("#hoverInfo"),$("#hoverInfoArrow"));
    section = sec;

    $(".contentSlide").removeClass("currentSlide");
    $(".tabSlide").eq(sec).addClass("currentSlide");
    $("#contentSlider").animate({
        "left" : -$(".currentSlide").position().left
    },0);


    if($.browser.mozilla){
        if(sec === 4){
            $("#sliderRightArrow").hide();
        }
        else{
            $("#sliderRightArrow").show();
        }
    }
    if($.browser.msie){
        $("#slider").css({
            "left" : $(".tab").eq(sec).position().left - 13
        });
    }
    else{
        $("#slider").animate({
            "left" : $(".tab").eq(sec).position().left - 13
        },200);
    }

    setLayers(sec);

};

var getPhotoTags = function (attr) {
    if(attr.Photo_1_credit === "Lindsay Addison" && attr.Site_title === "Little Talbot Island, FL"){
        attr.Photo_1_credit = "Walker Golder";
    }
    if (attr.Photo_2_URL !== null && attr.Photo_3_URL !== null){
        return "<img src='images/photos/"+attr.Photo_1_URL+".jpg' credit='"+attr.Photo_1_credit+"' caption='"+attr.Photo_1_caption+"' alt=''><img src='images/photos/"+attr.Photo_2_URL+".jpg' credit='"+attr.Photo_2_credit+"' caption='"+attr.Photo_2_caption+"' alt=''><img src='images/photos/"+attr.Photo_3_URL+".jpg' credit='"+attr.Photo_3_credit+"' caption='"+attr.Photo_3_caption+"' alt=''>";
    }
    else if (attr.Photo_2_URL !== null){
        return "<img src='images/photos/"+attr.Photo_1_URL+".jpg' credit='"+attr.Photo_1_credit+"' caption='"+attr.Photo_1_caption+"' alt=''><img src='images/photos/"+attr.Photo_2_URL+".jpg' credit='"+attr.Photo_2_credit+"' caption='"+attr.Photo_2_caption+"' alt=''>";
    }
    else{
        return "<img src='images/photos/"+attr.Photo_1_URL+".jpg' credit='"+attr.Photo_1_credit+"' caption='"+attr.Photo_1_caption+"' alt=''>";
    }
};

var getImgLength = function(attr){
    if (attr.Photo_2_URL !== null && attr.Photo_3_URL !== null){
        return "</span><span class='imgSelector'><span class='selector selectedBull'>&bull;</span><span class='selector'>&bull;</span><span class='selector'>&bull;</span></span><span class='playPause'>";
    }
    else if (attr.Photo_2_URL !== null){
        return "</span><span class='imgSelector'><span class='selector selectedBull'>&bull;</span><span class='selector'>&bull;</span></span><span class='playPause'>";
    }
    else{
        return "";
    }
};

var setLayers = function(sec){

    popup.hide();
    section = sec;

    if($(".contentSlide").length === sectionData.length){
        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
            $(".contentSlide."+grp.attributes.Season.toLowerCase()).last().after("<div class='contentSlide popupSlide "+grp.attributes.Season.toLowerCase()+"Slide "+grp.attributes.Season.toLowerCase()+"' season='"+grp.attributes.Season_Number+"'><div class='photoMargin'></div><div class='popup fader "+grp.attributes.Season.toLowerCase()+"'>"+getPhotoTags(grp.attributes)+"</div><div class='photoCreditCon "+grp.attributes.Season.toLowerCase()+"' style='color:#ccc;'>"+getImgLength(grp.attributes)+"<p class='photoCredit'>"+grp.attributes.Photo_1_credit+"</p></div><table class='titleBar "+grp.attributes.Season.toLowerCase()+"'><tbody><tr><td class='prevArrowCon "+grp.attributes.Season.toLowerCase()+" arrowCon popupArrow' style='width:10px; padding:10px;'><div class='prevArrow'></div></td><td class='popupTitle "+grp.attributes.Season.toLowerCase()+"title'>"+grp.attributes.Point_name+"</td><td class='nextArrowCon "+grp.attributes.Season.toLowerCase()+" arrowCon popupArrow' style='width:10px; padding:10px;'><div class='nextArrow'></div></td></tr></tbody></table><div class='textContent "+grp.attributes.Season.toLowerCase()+"'><strong>"+grp.attributes.Site_title+"</strong><br>"+grp.attributes.Description+"</div></div>");
        });

        $(".contentSlide").last().children(".titleBar").children("tbody").children("tr").children(".nextArrowCon").hide();

        $(".playPause").click(function(){
            /*
            if($(this).hasClass("icon-pause")){
                $(this).removeClass("icon-pause");
                $(this).addClass("icon-play");
                $(".popup.fader").imageFader("pause");
            }
            else{
                $(this).removeClass("icon-play");
                $(this).addClass("icon-pause");
                $(".currentSlide").first().children(".fader").first().imageFader("play");
            }
            */
        });

        $(".selector").click(function(){
            if(!$(this).hasClass("selectedBull")){
                $(this).parent("span").parent("div").parent("div").children(".fader").imageFader("goTo",$(this).index());
            }
        });

        $(".popup.fader").imageFader({
            autoPlay : false,
            animationDelay : 3000,
            animationStart : function(data){
                var img = data.currentImg.jqueryElement;
                img.parent("div").parent("div").children(".photoCreditCon").children(".playPause").children(".photoCredit").fadeOut();
            },
            animationEnd : function(data){
                var img = data.currentImg.jqueryElement;
                /*
                var padding = ($(".currentSlide").width() - img.width() - img.offset().left);
                if(padding < 5){
                    img.parent("div").parent("div").children(".photoCreditCon").children(".photoCredit").css("padding-right",0);
                }
                else{
                    img.parent("div").parent("div").children(".photoCreditCon").children(".photoCredit").css("padding-right",padding - 5);
                }
                */
                img.parent("div").parent("div").children(".photoCreditCon").children(".playPause").children(".photoCredit").html(img.attr("credit"));
                img.parent("div").parent("div").children(".photoCreditCon").children(".playPause").children(".photoCredit").fadeIn();
                img.parent("div").parent("div").children(".photoCreditCon").children(".imgSelector").children(".selector").removeClass("selectedBull");
                img.parent("div").parent("div").children(".photoCreditCon").children(".imgSelector").children(".selector").eq(data.currentImg.index).addClass("selectedBull");

                resetLayout();
            }
        });

        $(".nextArrowCon").click(function(){
            if($(".nextArrow").first().hasClass("blinking")){
                $(".nextArrow").first().removeClass("blinking");
                $(".nextArrow").first().removeClass("white");
                $(".nextArrow").first().css("border-left-color","#fff");
            }
            hideInfo($("#hoverInfoSlide"),$("#hoverInfoArrowSlide"));
            var current = undefined;
            $(".contentSlide").each(function(i){
                if($(this).hasClass("currentSlide")){
                    $(this).removeClass("currentSlide");
                    current = $(this).next();
                    if($(this).attr("season") !== current.attr("season") || current.hasClass("tabSlide")){
                        setLayers(parseFloat(current.attr("season")));
                        $("#slider").animate({
                            "left" : $(".tab").eq(parseFloat(current.attr("season"))).position().left - 13
                        },200);
                        if($.browser.mozilla){
                            if(parseFloat(current.attr("season")) === 4){
                                $("#sliderRightArrow").hide();
                            }
                            else{
                                $("#sliderRightArrow").show();
                            }
                        }
                    }
                    if(current.hasClass("popupSlide")){
                        var title = current.children(".titleBar").children("tbody").children("tr").children(".popupTitle").html();
                        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
                            if (grp.attributes.Point_name === title){
                                map.centerAndZoom(grp.geometry,3);
                            }
                        });
                    }
                }
            });
            current.addClass("currentSlide");
            $("#contentSlider").animate({
                "left" : -$(".currentSlide").position().left
            },"fast");
            setTimeout(function() {
                positionCredit();
            }, 200);
        });

        $(".prevArrowCon").click(function(){
            hideInfo($("#hoverInfoSlide"),$("#hoverInfoArrowSlide"));
            var current = undefined;
            $(".contentSlide").each(function(i){
                if($(this).hasClass("currentSlide")){
                    $(this).removeClass("currentSlide");
                    current = $(this).prev();
                    if($(this).attr("season") !== current.attr("season") || current.hasClass("tabSlide")){
                        setLayers(parseFloat(current.attr("season")));
                        $("#slider").animate({
                            "left" : $(".tab").eq(parseFloat(current.attr("season"))).position().left - 13
                        },200);
                        if($.browser.mozilla){
                            if(parseFloat(current.attr("season")) === 4){
                                $("#sliderRightArrow").hide();
                            }
                            else{
                                $("#sliderRightArrow").show();
                            }
                        }
                    }
                    if(current.hasClass("popupSlide")){
                        var title = current.children(".titleBar").children("tbody").children("tr").children(".popupTitle").html();
                        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
                            if (grp.attributes.Point_name === title){
                                map.centerAndZoom(grp.geometry,3);
                            }
                        });
                    }
                }
            });
            current.addClass("currentSlide");
            $("#contentSlider").animate({
                "left" : -$(".currentSlide").position().left
            },"fast");
            setTimeout(function() {
                positionCredit();
            }, 200);
        });

        setTimeout(function() {
            setSection(sec);
        }, 10);
    }

    resetLayout();

    map.getLayer(findLayerName("csv")).show();
    map.getLayer(findLayerName("SpringMigration")).hide();
    map.getLayer(findLayerName("FallMigration")).hide();
    if(sec === 1){
        $("#legendImg").attr("src","images/legends/PloverSummer.jpg");
        map.getLayer(findLayerName("summer")).show();
        map.getLayer(findLayerName("winter")).hide();
        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
            if(grp.attributes.Season_Number === sec){
                grp.show();
            }
            else{
                grp.hide();
            }
        });
        seasonExtent = new esri.geometry.Extent({"xmin":-10079006.019723145,"ymin":3137303.833390451,"xmax":-6018671.077215662,"ymax":7114475.289123686,
  "spatialReference":{"wkid":102100}});
        map.setExtent(seasonExtent);
    }
    else if(sec === 2){
        $("#legendImg").attr("src","images/legends/PloverFall.jpg");
        map.getLayer(findLayerName("FallMigration")).show();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).hide();
        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
            if(grp.attributes.Season_Number === sec){
                grp.show();
            }
            else{
                grp.hide();
            }
        });

        seasonExtent = new esri.geometry.Extent({"xmin":-10504607.393214896,"ymin":2265310.214713391,"xmax":-6444272.450707414,"ymax":6242481.670446625,
  "spatialReference":{"wkid":102100}});
        map.setExtent(seasonExtent);
    }
    else if(sec === 3){
        $("#legendImg").attr("src","images/legends/PloverWinter.jpg");
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).show();
        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
            if(grp.attributes.Season_Number === sec){
                grp.show();
            }
            else{
                grp.hide();
            }
        });

        seasonExtent = new esri.geometry.Extent({"xmin":-11124556.508485924,"ymin":2306790.0257323366,"xmax":-7528958.697952189,"ymax":4322281.587555328,
  "spatialReference":{"wkid":102100}});
        map.setExtent(seasonExtent);
    }
    else if(sec === 4){
        $("#legendImg").attr("src","images/legends/PloverSpring.jpg");
        map.getLayer(findLayerName("SpringMigration")).show();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).hide();
        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
            if(grp.attributes.Season_Number === sec){
                grp.show();
            }
            else{
                grp.hide();
            }
        });

        seasonExtent = new esri.geometry.Extent({"xmin":-10504607.393214896,"ymin":2265310.214713391,"xmax":-6444272.450707414,"ymax":6242481.670446625,
  "spatialReference":{"wkid":102100}});
        map.setExtent(seasonExtent);
    }
    else{
        $("#legendImg").attr("src","images/legends/PloverIntro.jpg");
        map.getLayer(findLayerName("csv")).hide();
        map.getLayer(findLayerName("summer")).show();
        map.getLayer(findLayerName("winter")).show();

        seasonExtent = new esri.geometry.Extent({"xmin":-12202120.917371638,"ymin":2129558.052478955,"xmax":-5010925.296304167,"ymax":6160541.176124938,
  "spatialReference":{"wkid":102100}});
        map.setExtent(seasonExtent);
    }
};

var positionInfo = function(pt,element,arrow){
    var scrPt = map.toScreen(pt);
    element.show();
    arrow.show()
    if(scrPt.x < $("#mapPane").width()/2 + 100){
        element.css({
            top: (scrPt.y - (element.height()/2) - 5),
            left:scrPt.x + 27
        });
        arrow.css({
            top: (scrPt.y - 7),
            left:scrPt.x + 19,
            "border-right": "8px solid #777",
            "border-left": "none"
        });
    }
    else{
        element.css({
            top: (scrPt.y - (element.height()/2) - 5),
            left:scrPt.x - 37 - element.width()
        });
        arrow.css({
            top: (scrPt.y - 7),
            left:scrPt.x - 25,
            "border-left": "8px solid #777",
            "border-right": "none"
        });
    };
};

var hideInfo = function(element, arrow){
    element.hide();
    arrow.hide();
};

var positionCredit = function(){
    /*
    $(".contentSlide").each(function(){
        var img = $(this).children(".fader").children("img").first();
        if(img[0].complete){
            var padding = ($("#leftPane").width() - img.width() - img.offset().left);
            if(padding < 5){
                img.parent("div").parent("div").children(".photoCreditCon").children(".photoCredit").css("padding-right",0);
            }
            else{
                img.parent("div").parent("div").children(".photoCreditCon").children(".photoCredit").css("padding-right",padding - 5);
            }
        }
        else{
            img.load(function(){
                var padding = ($("#leftPane").width() - img.width() - img.offset().left);
                if(padding < 5){
                    img.parent("div").parent("div").children(".photoCreditCon").children(".photoCredit").css("padding-right",0);
                }
                else{
                    img.parent("div").parent("div").children(".photoCreditCon").children(".photoCredit").css("padding-right",padding - 5);
                }
            });
        }
    });
    */
};

var startBlinking = function(){
    setTimeout(function() {
        if($(".nextArrow").first().hasClass("blinking")){
            if($(".nextArrow").first().hasClass("white")){
                $(".nextArrow").first().removeClass("white")
                $(".nextArrow").first().css("border-left-color","#d81e05");
            }
            else{
                $(".nextArrow").first().addClass("white")
                $(".nextArrow").first().css("border-left-color","#fff");
            }
        }
        startBlinking();
    }, 500);
}