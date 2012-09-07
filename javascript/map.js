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
    firstLoad = false,
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
        if(urlObject.query.season === "summer"){
            section = 1;
        }
        else if(urlObject.query.season === "fall"){
            section = 2;
        }
        else if(urlObject.query.season === "winter"){
            section = 3;
        }
        else if(urlObject.query.season === "spring"){
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

    var mapDeferred = esri.arcgis.utils.createMap(configOptions.webmap,"mapPane",{
        mapOptions: {
            slider : true,
            nav : false,
            wrapAround180 : true,
            infoWindow : popup
        }
    });

    mapDeferred.addCallback(function(response){
        map = response.map;

        dojo.connect(dijit.byId("mapPane"),"resize",map,map.resize);

        var layers = response.itemInfo.itemData,operationalLayers;

        setSection(section);

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
    });

};