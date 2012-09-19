dojo.require("esri.map");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.arcgis.utils");
dojo.require("esri.IdentityManager");
dojo.require("dijit.dijit"); // optimize: load dijit layer
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");

var urlObject,
    map,
    section = 0,
    popup,
    setPopup = true;

var findLayerName = function(name){
    var layerName;
    dojo.forEach(map.layerIds,function(lyr){
        if(lyr.search(name) !== -1){
            layerName = lyr;
        }
    });
    dojo.forEach(map.graphicsLayerIds,function(lyr){
        if(lyr.search(name) !== -1){
            layerName = lyr;
        }
    });
    return layerName;
};

var initMap = function(){

    if(configOptions.geometryserviceurl && location.protocol === "https:"){
        configOptions.geometryserviceurl = configOptions.geometryserviceurl.replace('http:','https:');
    }
    esri.config.defaults.geometryService = new esri.tasks.GeometryService(configOptions.geometryserviceurl);

    if(!configOptions.sharingurl){
        configOptions.sharingurl = location.protocol + '//' + location.host + "/sharing/content/items";
    }
    esri.arcgis.utils.arcgisUrl = configOptions.sharingurl;

    urlObject = esri.urlToObject(document.location.href);
    urlObject.query = urlObject.query || {};

    if(urlObject.query.season){
        if(urlObject.query.season.toLowerCase() === "summer"){
            section = 1;
        }
        else if(urlObject.query.season.toLowerCase() === "fall"){
            section = 2;
        }
        else if(urlObject.query.season.toLowerCase() === "winter"){
            section = 3;
        }
        else if(urlObject.query.season.toLowerCase() === "spring"){
            section = 4;
        }
        else{
            section = 0;
        }
    }

    createMap();

    $("#title").html(configOptions.title);
    $("#subtitle").html(configOptions.subtitle);

};

var createMap = function(){

    popup = new esri.dijit.Popup({
        highlight:false
    }, dojo.create("div"));

    var mapDeferred = esri.arcgis.utils.createMap(configOptions.webmap,"map",{
        mapOptions: {
            slider : true,
            nav : false,
            wrapAround180 : true,
            infoWindow : popup
        },
        ignorePopups:true
    });

    mapDeferred.addCallback(function(response){
        map = response.map;

        dojo.connect(dijit.byId("map"),"resize",map,map.resize);

        dojo.connect(map.getLayer(findLayerName("csv")),"onMouseOver",function(event){
            map.setCursor("pointer");
            $("#hoverInfo").html(event.graphic.attributes.Site_title);
            positionInfo(event.graphic.geometry,$("#hoverInfo"),$("#hoverInfoArrow"));
        });

        dojo.connect(map.getLayer(findLayerName("csv")),"onMouseOut",function(event){
            map.setCursor("default");
            hideInfo($("#hoverInfo"),$("#hoverInfoArrow"));
        });

        dojo.connect(map.getLayer(findLayerName("csv")),"onClick",function(event){
            $(".contentSlide").each(function(){
                if($(this).children(".titleBar").children("tbody").children("tr").children(".popupTitle").html() === event.graphic.attributes.Point_name){
                    $(".contentSlide").removeClass("currentSlide");
                    $(this).addClass("currentSlide");
                    $("#contentSlider").animate({
                        "left" : -$(".currentSlide").position().left
                    },"fast");
                    map.centerAndZoom(event.graphic.geometry,7);
                }
            });
        });

        dojo.connect(map,"onPanStart",function(){
            hideInfo($("#hoverInfoSlide"),$("#hoverInfoArrowSlide"));
            hideInfo($("#hoverInfo"),$("#hoverInfoArrow"));
        });

        dojo.connect(map,"onZoomStart",function(){
            hideInfo($("#hoverInfoSlide"),$("#hoverInfoArrowSlide"));
            hideInfo($("#hoverInfo"),$("#hoverInfoArrow"));
        });

        dojo.connect(map,"onExtentChange",function(){
            var title = $(".currentSlide").children(".titleBar").children("tbody").children("tr").children(".popupTitle").html();
            dojo.forEach(map.getLayer(findLayerName("csv")).graphics,function(grp){
                if (grp.attributes.Point_name === title){
                    $("#hoverInfoSlide").html(grp.attributes.Site_title);
                    positionInfo(grp.geometry,$("#hoverInfoSlide"),$("#hoverInfoArrowSlide"));
                }
            });
            if($(".currentSlide").first().hasClass("popupSlide")){
                $(".popup.fader").imageFader("pause");
                $(".currentSlide").first().children(".fader").first().imageFader("play");
            }
        });

        //var layers = response.itemInfo.itemData,operationalLayers;

        if(map.loaded){
            setSection(section);
            changeSidePanel();
        }
        else{
            dojo.connect(map,"onLoad",function(){
                setSection(section);
                changeSidePanel();
            });
        }

    });
    mapDeferred.addErrback(function(error) {
        console.log("Map creation failed: ", dojo.toJson(error));
    });

    dojo.connect(popup,"onSetFeatures",function(){
        if(section !== 0){
            var newFtr = [];
            dojo.forEach(popup.features,function(ftr){
                if(ftr.attributes.Season === section){
                    newFtr.push(ftr);
                }
            });
            if (setPopup === true){
                setPopup = false;
                popup.setFeatures(newFtr);
            }
            else{
                setPopup = true;
            }
        }
        else{
            //$(".actionList").html("<p id='seasonButton'>Go to "+popup.features[0].attributes.Season+"</p>");
        }
    });

};