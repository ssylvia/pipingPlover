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

};