$(document).ready(function(){
    $("#playPause").click(function(){
        if($(this).hasClass("icon-pause")){
            $("#playPause").removeClass("icon-pause");
            $("#playPause").addClass("icon-play");
            $("#fader").imageFader("pause");
        }
        else{
            $("#playPause").removeClass("icon-play");
            $("#playPause").addClass("icon-pause");
            $("#fader").imageFader("play");
        }
    });
    $("#faderCon").mouseenter(function(){
        if($("#fader").children("li").length > 1){
            if($("#fader").children("li").first().hasClass("playingAnimation")){
                $("#playPause").removeClass("icon-play");
                $("#playPause").addClass("icon-pause");
            }
            else{
                $("#playPause").removeClass("icon-pause");
                $("#playPause").addClass("icon-play");
            }
            $("#playPause").stop(true,true).fadeTo("fast","0.75");
        }
    });
    $("#faderCon").mouseleave(function(){
        $("#playPause").stop(true,true).fadeOut();
    });
    $(".skip").click(function(){
        if($(this).hasClass("icon-right-open")){
            $("#fader").imageFader("next");
        }
        else{
            $("#fader").imageFader("prev");
        }
    });
    $("#prevCon").mouseenter(function(){
        if($("#fader").children("li").length > 1){
            $("#prev").stop(true,true).fadeTo("fast","0.75");
        }
    });
    $("#prevCon").mouseleave(function(){
        $("#prev").stop(true,true).fadeOut();
    });
    $("#nextCon").mouseenter(function(){
        if($("#fader").children("li").length > 1){
            $("#next").stop(true,true).fadeTo("fast","0.75");
        }
    });
    $("#nextCon").mouseleave(function(){
        $("#next").stop(true,true).fadeOut();
    });
});

var setUpTabs = function(){
    dojo.forEach(configOptions.tabTitles,function(tab,i){
        $("#tabArea").append("<div id='tab"+i+"' class='tab'><p id='tabText"+i+"' class='tabText'>"+configOptions.tabTitles[i].title+"</p></div>");
    });
    $(".tab").eq(section).addClass("selected");
    $(".tab").click(function(){
        setSection($(this).index());
        $(".tab").removeClass("selected");
        $(this).addClass("selected");
    });
};

var setSection = function(sec){

    $("#sectionTitle").html(sectionData[sec].title);
    $("#sectionText").html(sectionData[sec].text);

    $(".selectionBullet").remove();
    $(".gallerySlide").remove();
    dojo.forEach(sectionData[sec].images,function(img){
        $("#fader").append("<li class='gallerySlide'><img src='"+img.src+"' caption='"+img.copyright+"' class='galleryImg' alt=''></li>");
        $("#imgSelector").append("<span class='selectionBullet'>&bull;</span>");
    });
    $("#imgSelector").css("left",($("#leftPane").width() - $("#imgSelector").width())/2);
    $(".selectionBullet").eq(0).addClass("selectionBulletSelected");
    if(sectionData[sec].images.length === 1){
        $("#imgSelector").hide();
    }
    else{
        $("#imgSelector").show();
    }

    $(".selectionBullet").click(function(){
        $("#fader").imageFader("goTo",$(this).index());
    });

    if(firstLoad === false){
        firstLoad = true;
        $("#fader").imageFader({
            captions : true,
            captionAttr : "caption",
            animationEnd : function(obj){
                $(".selectionBullet").removeClass("selectionBulletSelected");
                $(".selectionBullet").eq(obj.index).addClass("selectionBulletSelected");
            }
        });
    }
    else{
        $("#fader").imageFader("update");
    }

    $(".galleryImg").click(function(){
        //$("#fader").imageFader("pause");
        //$("body").append("<img id='zoomImg' alt='' src='"+$(this).attr("src")+"'>");
        //$("#zoomImg").css("width",$(this).width()).css("height",$(this).height()).css("left",$(this).offset().left).css("top",$(this).offset().top);

    });

    setLayers(sec);

};

var setLayers = function(sec){
    if(sec === 1){
        map.getLayer(findLayerName("MigrationArrows")).hide();
        map.getLayer(findLayerName("PloverPoints")).hide();
        map.getLayer(findLayerName("PloverPoints")).setVisibleLayers([2]);
        map.getLayer(findLayerName("PloverPoints")).show();
        map.getLayer(findLayerName("summer")).show();
        map.getLayer(findLayerName("winter")).hide();
    }
    else if(sec === 2){
        map.getLayer(findLayerName("MigrationArrows")).setVisibleLayers([0]);
        map.getLayer(findLayerName("MigrationArrows")).show();
        map.getLayer(findLayerName("PloverPoints")).setVisibleLayers([0]);
        map.getLayer(findLayerName("PloverPoints")).show();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).hide();
    }
    else if(sec === 3){
        map.getLayer(findLayerName("MigrationArrows")).hide();
        map.getLayer(findLayerName("PloverPoints")).setVisibleLayers([3]);
        map.getLayer(findLayerName("PloverPoints")).show();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).show();
    }
    else if(sec === 4){
        map.getLayer(findLayerName("MigrationArrows")).setVisibleLayers([1]);
        map.getLayer(findLayerName("MigrationArrows")).show();
        map.getLayer(findLayerName("PloverPoints")).setVisibleLayers([1]);
        map.getLayer(findLayerName("PloverPoints")).show();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).hide();
    }
    else{
        map.getLayer(findLayerName("MigrationArrows")).hide();
        map.getLayer(findLayerName("PloverPoints")).hide();
        map.getLayer(findLayerName("summer")).show();
        map.getLayer(findLayerName("winter")).show();
    }
};