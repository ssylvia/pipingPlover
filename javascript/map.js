dojo.require("esri.map");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.arcgis.utils");
dojo.require("esri.IdentityManager");
dojo.require("dijit.dijit"); // optimize: load dijit layer
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");

var urlObject,
    map;

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

    createMap();

    $("#title").html(configOptions.title);
    $("#subtitle").html(configOptions.subtitle);

    $("#sectionTitle").html(sectionData[0].title);
    $("#sectionText").html(sectionData[0].text);

    dojo.forEach(sectionData[0].images,function(img){
        $("#fader").append("<li><img src='"+img.src+"' caption='"+img.copyright+"' class='galleryImg' alt=''></li>");
        $("#imgSelector").append("<span class='selectionBullet'>&bull;</span>");
    });
    $("#imgSelector").css("left",($("#leftPane").width() - $("#imgSelector").width())/2);
    $(".selectionBullet").eq(0).addClass("selectionBulletSelected");

    $("#fader").imageFader({
        captions : true,
        captionAttr : "caption"
    });

};

var createMap = function(){
    var mapDeferred = esri.arcgis.utils.createMap(configOptions.webmap,"mapPane",{
        mapOptions: {
            slider : true,
            nav : false,
            wrapAround180 : true
        }
    });

    mapDeferred.addCallback(function(response){
        map = response.map;

        dojo.connect(dijit.byId("mapPane"),"resize",map,map.resize);

        var layers = response.itemInfo.itemData,operationalLayers;

    });
    mapDeferred.addErrback(function(error) {
        console.log("Map creation failed: ", dojo.toJson(error));
    });
};