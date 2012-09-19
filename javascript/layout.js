$(window).resize(function(){
    resetLayout();
    changeSidePanel();
});

$(document).ready(function(){
    $("#slider").draggable({
    	axis : "x",
		containment : "#tabArea",
        stop: function(){
            if ($("#slider").position().left <= $(".tab").first().width()/2){
                $("#slider").animate({
                    "left" : $(".tab").eq(0).position().left - 14
                },100);
                setSection(0);
            }
            else if ($("#slider").position().left <= $(".tab").first().width()+($(".tab").first().width()/2)){
                $("#slider").animate({
                    "left" : $(".tab").eq(1).position().left - 14
                },100);
                setSection(1);
            }
            else if ($("#slider").position().left <= ($(".tab").first().width()*2)+($(".tab").first().width()/2)){
                $("#slider").animate({
                    "left" : $(".tab").eq(2).position().left - 14
                },100);
                setSection(2);
            }
            else if ($("#slider").position().left <= ($(".tab").first().width()*3)+($(".tab").first().width()/2)){
                $("#slider").animate({
                    "left" : $(".tab").eq(3).position().left - 14
                },100);
                setSection(3);
            }
            else{
                $("#slider").animate({
                    "left" : $(".tab").eq(4).position().left - 14
                },100);
                setSection(4);
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
        $(".fader").css("height",200);
        $(".tabTitle").css("font-size",16);
        $(".popupTitle").css("font-size",16);
        $(".textContent").css("font-size",13);
    }
    else{
        $(".fader").css("height",310);
        $(".tabTitle").css("font-size",24);
        $(".popupTitle").css("font-size",24);
        $(".textContent").css("font-size",15);
    }
    dijit.byId("mainWindow").layout();
    $("#contentSlider").animate({
        "left" : -$(".currentSlide").position().left
    },0);

    $("#sliderMid").css({
        "left" : $(".tab").eq(parseFloat($(".currentSlide").attr("season"))).position().left
    });

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

    $("#sliderMid").css("width",$("#tabText0").width()+6);

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
        $(this).children(".textContent").css("height",$("#leftPane").height() - $(this).children(".fader").height() - $(this).children(".photoMargin").height() - $(this).children(".photoCredit").height() - $(this).children(".photoCaption").height() - $(this).children(".titleBar").height()-60);
    });
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
        $("#contentSlider").append("<div class='contentSlide tabSlide "+tab.season+"Slide "+tab.season+"' season='"+i+"'><div class='photoMargin'></div><div class='tabPhoto fader "+tab.season+"'><img class='tabPhoto singlePhoto' src='"+sectionData[i].images[0].src+"' alt=''></div><div class='tabPhoto photoCredit "+tab.season+"' style='color:#ccc;'>"+sectionData[i].images[0].copyright+"</div><div class='tabPhoto photoCaption "+tab.season+"'></div><table class='titleBar "+tab.season+"'><tbody><tr><td class='prevArrowCon "+tab.season+" arrowCon tabArrow' style='width:10px; padding:10px;'><div class='prevArrow'></div></td><td class='tabTitle "+tab.season+"title'>"+sectionData[i].title+"</td><td class='nextArrowCon "+tab.season+" arrowCon tabArrow' style='width:10px; padding:10px;'><div class='nextArrow'></div>"+addStart(i)+"</td></tr></tbody></table><div class='textContent "+tab.season+"'>"+sectionData[i].text+"</div></div>");
    });

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

    $("#slider").animate({
        "left" : $(".tab").eq(sec).position().left - 14
    },200);

    setLayers(sec);

};

var getPhotoTags = function (attr) {
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

var setLayers = function(sec){

    popup.hide();
    section = sec;

    if($(".contentSlide").length === sectionData.length){
        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
            $(".contentSlide."+grp.attributes.Season.toLowerCase()).last().after("<div class='contentSlide popupSlide "+grp.attributes.Season.toLowerCase()+"Slide "+grp.attributes.Season.toLowerCase()+"' season='"+grp.attributes.Season_Number+"'><div class='photoMargin'></div><div class='popup fader "+grp.attributes.Season.toLowerCase()+"'>"+getPhotoTags(grp.attributes)+"</div><div class='photoCredit "+grp.attributes.Season.toLowerCase()+"' style='color:#ccc;'>"+grp.attributes.Photo_1_credit+"</div><div class='photoCaption "+grp.attributes.Season.toLowerCase()+"' style='color:#fff;'>"+grp.attributes.Photo_1_caption+"</div><table class='titleBar "+grp.attributes.Season.toLowerCase()+"'><tbody><tr><td class='prevArrowCon "+grp.attributes.Season.toLowerCase()+" arrowCon popupArrow' style='width:10px; padding:10px;'><div class='prevArrow'></div></td><td class='popupTitle "+grp.attributes.Season.toLowerCase()+"title'>"+grp.attributes.Point_name+"</td><td class='nextArrowCon "+grp.attributes.Season.toLowerCase()+" arrowCon popupArrow' style='width:10px; padding:10px;'><div class='nextArrow'></div></td></tr></tbody></table><div class='textContent "+grp.attributes.Season.toLowerCase()+"'><strong>"+grp.attributes.Site_title+"</strong><br>"+grp.attributes.Description+"</div></div>");
        });

        $(".contentSlide").last().children(".titleBar").children("tbody").children("tr").children(".nextArrowCon").hide();

        $(".popup.fader").imageFader({
            autoPlay : false,
            animationEnd : function(data){
                var img = data.currentImg.jqueryElement;
                img.parent("div").parent("div").children(".photoCredit").html(img.attr("credit"));
                img.parent("div").parent("div").children(".photoCaption").html(img.attr("caption"));

                resetLayout();
            }
        });

        $(".nextArrowCon").click(function(){
            hideInfo($("#hoverInfoSlide"),$("#hoverInfoArrowSlide"));
            var current = undefined;
            $(".contentSlide").each(function(i){
                if($(this).hasClass("currentSlide")){
                    $(this).removeClass("currentSlide");
                    current = $(this).next();
                    if($(this).attr("season") !== current.attr("season") || current.hasClass("tabSlide")){
                        setLayers(parseFloat(current.attr("season")));
                        $("#slider").animate({
                            "left" : $(".tab").eq(parseFloat(current.attr("season"))).position().left
                        },200);
                    }
                    if(current.hasClass("popupSlide")){
                        var title = current.children(".titleBar").children("tbody").children("tr").children(".popupTitle").html();
                        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
                            if (grp.attributes.Point_name === title){
                                map.centerAndZoom(grp.geometry,7);
                            }
                        });
                    }
                }
            });
            current.addClass("currentSlide");
            $("#contentSlider").animate({
                "left" : -$(".currentSlide").position().left
            },"fast");
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
                            "left" : $(".tab").eq(parseFloat(current.attr("season"))).position().left
                        },200);
                    }
                    if(current.hasClass("popupSlide")){
                        var title = current.children(".titleBar").children("tbody").children("tr").children(".popupTitle").html();
                        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
                            if (grp.attributes.Point_name === title){
                                map.centerAndZoom(grp.geometry,7);
                            }
                        });
                    }
                }
            });
            current.addClass("currentSlide");
            $("#contentSlider").animate({
                "left" : -$(".currentSlide").position().left
            },"fast");
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

        map.setExtent(new esri.geometry.Extent({"xmin":-10079006.019723145,"ymin":3137303.833390451,"xmax":-6018671.077215662,"ymax":7114475.289123686,
  "spatialReference":{"wkid":102100}}));
    }
    else if(sec === 2){
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

        map.setExtent(new esri.geometry.Extent({"xmin":-10504607.393214896,"ymin":2265310.214713391,"xmax":-6444272.450707414,"ymax":6242481.670446625,
  "spatialReference":{"wkid":102100}}));
    }
    else if(sec === 3){
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

        map.setExtent(new esri.geometry.Extent({"xmin":-11297106.502475392,"ymin":1180515.909290458,"xmax":-7236771.559967909,"ymax":5157687.365023692,
  "spatialReference":{"wkid":102100}}));
    }
    else if(sec === 4){
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

        map.setExtent(new esri.geometry.Extent({"xmin":-10504607.393214896,"ymin":2265310.214713391,"xmax":-6444272.450707414,"ymax":6242481.670446625,
  "spatialReference":{"wkid":102100}}));
    }
    else{
        map.getLayer(findLayerName("csv")).hide();
        map.getLayer(findLayerName("summer")).show();
        map.getLayer(findLayerName("winter")).show();

        map.setExtent(new esri.geometry.Extent({"xmin":-13762659.286841381,"ymin":652183.1697834609,"xmax":-5641989.401826414,"ymax":8606526.081249928,
  "spatialReference":{"wkid":102100}}));
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