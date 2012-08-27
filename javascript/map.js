dojo.require("esri.map");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.arcgis.utils");
dojo.require("esri.IdentityManager");
dojo.require("dijit.dijit"); // optimize: load dijit layer
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");

var urlObject;

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

};

var createMap = function(){
};