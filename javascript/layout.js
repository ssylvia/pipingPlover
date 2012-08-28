var setUpTabs = function(){
    dojo.forEach(configOptions.tabTitles,function(tab,i){
        $("#tabArea").append("<div id='tab"+i+"' class='tab'><p id='tabText"+i+"' class='tabText'>"+configOptions.tabTitles[i].title+"</p></div>");
    });
    //$(".tab").eq(section).addClass("selected");
};

var setSection = function(sec){

    $("#sectionTitle").html(sectionData[sec].title);
    $("#sectionText").html(sectionData[sec].text);

    $(".selectionBullet").remove();
    dojo.forEach(sectionData[sec].images,function(img){
        $("#fader").append("<li><img src='"+img.src+"' caption='"+img.copyright+"' class='galleryImg' alt=''></li>");
        $("#imgSelector").append("<span class='selectionBullet'>&bull;</span>");
    });
    $("#imgSelector").css("left",($("#leftPane").width() - $("#imgSelector").width())/2);
    $(".selectionBullet").eq(0).addClass("selectionBulletSelected");

    $(".selectionBullet").click(function(){
        $("#fader").imageFader("goTo",$(this).index());
    });

};