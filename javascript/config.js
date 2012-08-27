var configOptions;

function init(){

    configOptions = {
        webmap : "e60268ba7a7b4ff38d3d9cc97ec0600a",
        title : "Beating the Odds: A Year in the Life of a Piping Plover",
        subtitle : "Piping Plovers flock to the same shores that attract people. With just 8,000 adult birds left in the world, the Piping Plover is one of our most at-risk species. From Canada to the Caribbean, Audubon is working to safeguard sandy reaches critical to the birds’ survival, and is spreading the message to share the beach.",
        tabTitles : [{
    		"title" : "Introduction"
		},{
			"title" : "<span style='font-size:20px; font-weight:bold;'>1</span>Summer Breeding"
		},{
			"title" : "<span style='font-size:20px; font-weight:bold;'>2</span> Fall Migration"
		},{
			"title" : "<span style='font-size:20px; font-weight:bold;'>3</span> Winter"
		},{
			"title" : "<span style='font-size:20px; font-weight:bold;'>4</span> Spring Migration"
		}],
        geometryserviceurl:"http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
        sharingurl :"http://arcgis.com/sharing/content/items"
    };

    initMap();

};

dojo.addOnLoad(init);