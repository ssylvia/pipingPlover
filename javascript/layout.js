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

    popup.hide();
    section = sec;

    $(".seasonButton").html();

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
            //captions : true,
            //captionAttr : "caption",
            animationEnd : function(obj){
                $(".selectionBullet").removeClass("selectionBulletSelected");
                $(".selectionBullet").eq(obj.index).addClass("selectionBulletSelected");
            }
        });
    }
    else{
        $("#fader").imageFader("update");
    }

    setLayers(sec);

};

var setLayers = function(sec){
    map.getLayer(findLayerName("Lifecycle")).hide();
    map.getLayer(findLayerName("Story_points")).show();
    if(sec === 1){
        //map.getLayer(findLayerName("MigrationArrows")).hide();
        map.getLayer(findLayerName("summer")).show();
        map.getLayer(findLayerName("winter")).hide();
        dojo.forEach(map.getLayer(findLayerName("Story_points")).graphics,function(grp){
            if(grp.attributes.Season === sec){
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
        //map.getLayer(findLayerName("MigrationArrows")).setVisibleLayers([0]);
        //map.getLayer(findLayerName("MigrationArrows")).show();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).hide();
        dojo.forEach(map.getLayer(findLayerName("Story_points")).graphics,function(grp){
            if(grp.attributes.Season === sec){
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
        //map.getLayer(findLayerName("MigrationArrows")).hide();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).show();
        dojo.forEach(map.getLayer(findLayerName("Story_points")).graphics,function(grp){
            if(grp.attributes.Season === sec){
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
        //map.getLayer(findLayerName("MigrationArrows")).setVisibleLayers([1]);
        //map.getLayer(findLayerName("MigrationArrows")).show();
        map.getLayer(findLayerName("summer")).hide();
        map.getLayer(findLayerName("winter")).hide();
        dojo.forEach(map.getLayer(findLayerName("Story_points")).graphics,function(grp){
            if(grp.attributes.Season === sec){
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
        //map.getLayer(findLayerName("MigrationArrows")).hide();
        map.getLayer(findLayerName("Story_points")).hide();
        map.getLayer(findLayerName("Lifecycle")).show();
        map.getLayer(findLayerName("summer")).show();
        map.getLayer(findLayerName("winter")).show();

        map.setExtent(new esri.geometry.Extent({"xmin":-13762659.286841381,"ymin":652183.1697834609,"xmax":-5641989.401826414,"ymax":8606526.081249928,
  "spatialReference":{"wkid":102100}}));
    }
};