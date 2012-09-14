$(window).resize(function(){
    resetLayout();
});

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

    $("#contentSlider").css("width",$("#contentSlider").children(".contentSlide").length * 450);

    $(".nextArrow").first().css("border-top","20px solid transparent").css("border-bottom","20px solid transparent").css("border-left","20px solid #fff").css("margin-bottom",5).css("margin-left",($(".nextArrowCon").first().width() - 20)/2);
    
    $(".singlePhoto").each(function(){
        $(this).css("margin-left",($(this).parent(".fader").width() - $(this).width())/2).css("margin-top",($(this).parent(".fader").height() - $(this).height())/2);
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
        $("#contentSlider").append("<div class='contentSlide tabSlide "+tab.season+"Slide "+tab.season+"'><div class='tabPhoto photoCredit "+tab.season+"' style='color:#fff;'>"+sectionData[i].images[0].copyright+"</div><div class='tabPhoto fader "+tab.season+"'><img class='tabPhoto singlePhoto' src='"+sectionData[i].images[0].src+"' alt=''></div><div class='tabPhoto photoCaption "+tab.season+"'></div><table class='titleBar "+tab.season+"'><tbody><tr><td class='prevArrowCon "+tab.season+" arrowCon tabArrow' style='width:10px; padding:10px;'><div class='prevArrow'></div></td><td class='tabTitle "+tab.season+"title'>"+sectionData[i].title+"</td><td class='nextArrowCon "+tab.season+" arrowCon tabArrow' style='width:10px; padding:10px;'><div class='nextArrow'></div>"+addStart(i)+"</td></tr></tbody></table><div class='textContent "+tab.season+"'>"+sectionData[i].text+"</div></div>");
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

    popup.hide();
    section = sec;

    $(".contentSlide").removeClass("currentSlide");
    $(".tabSlide").eq(sec).addClass("currentSlide");
    $("#contentSlider").animate({
        "left" : -$(".currentSlide").position().left
    },"fast");

    setLayers(sec);

};

var setLayers = function(sec){

    if($(".contentSlide").length === sectionData.length){
        dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
            $(".contentSlide."+grp.attributes.Season.toLowerCase()).last().after("<div class='contentSlide popupSlide "+grp.attributes.Season.toLowerCase()+"Slide "+grp.attributes.Season.toLowerCase()+"'><div class='photoCredit "+grp.attributes.Season.toLowerCase()+"'></div><div class='fader "+grp.attributes.Season.toLowerCase()+"'></div><div class='photoCaption "+grp.attributes.Season.toLowerCase()+"'></div><table class='titleBar "+grp.attributes.Season.toLowerCase()+"'><tbody><tr><td class='prevArrowCon "+grp.attributes.Season.toLowerCase()+" arrowCon popupArrow' style='width:10px; padding:10px;'><div class='prevArrow'></div></td><td class='popupTitle "+grp.attributes.Season.toLowerCase()+"title'>"+grp.attributes.Point_name+"</td><td class='nextArrowCon "+grp.attributes.Season.toLowerCase()+" arrowCon popupArrow' style='width:10px; padding:10px;'><div class='nextArrow'></div></td></tr></tbody></table><div class='textContent "+grp.attributes.Season.toLowerCase()+"'>"+grp.attributes.Description+"</div></div>");
        });

        $(".contentSlide").last().children(".titleBar").children("tbody").children("tr").children(".nextArrowCon").hide();

        $(".nextArrowCon").click(function(){
            var current = undefined;
            $(".contentSlide").each(function(i){
                if($(this).hasClass("currentSlide")){
                    $(this).removeClass("currentSlide");
                    current = $(this).next();
                }
            });
            current.addClass("currentSlide");
            $("#contentSlider").animate({
                "left" : -$(".currentSlide").position().left
            },"fast");
            if(current.hasClass("tabSlide")){
                $(".tabSlide").each(function(i){
                    if($(this).hasClass("currentSlide")){
                        setSection(i);
                    }
                });
            }
        });

        $(".prevArrowCon").click(function(){
            var current = undefined;
            $(".contentSlide").each(function(i){
                if($(this).hasClass("currentSlide")){
                    $(this).removeClass("currentSlide");
                    current = $(this).prev();
                }
            });
            current.addClass("currentSlide");
            $("#contentSlider").animate({
                "left" : -$(".currentSlide").position().left
            },"fast");
            if(current.hasClass("tabSlide")){
                $(".tabSlide").each(function(i){
                    if($(this).hasClass("currentSlide")){
                        setSection(i);
                    }
                });
            }
        });
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