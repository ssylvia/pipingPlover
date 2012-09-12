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
};

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
    resetLayout();
};

var setSection = function(sec){

    popup.hide();
    section = sec;

    setLayers(sec);

};

var setLayers = function(sec){
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