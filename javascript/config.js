var configOptions,sectionData;

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

    sectionData = [
        //INTRODUCTION
        {
        "title" : "A diminutive beachcomber's life on the edge",
        "text" : "The Piping Plover, a federally-threatened and endangered shorebird, inhabits wide, open beaches, shorelines, and dry lakebeds in North America.The global population of these sparrow-sized birds is only about 8,000 individuals. It breeds primarily along the Atlantic coast from eastern Canada to North Carolina, on the shores of the Great Lakes, and along rivers, lakes, and wetlands of the northern Great Plains. In winter, the birds migrate to coastal beaches, sandflats, and mudflats from the Carolinas to the Gulf of Mexico, with some scattering to the Caribbean.<br><br>With this Map Story, Audubon, in partnership with ESRI, offers an up-close, interactive look at a year in the life of an Atlantic-coast plover. Discover the threats that the imperiled bird faces on its 4,000-mile odyssey from its breeding grounds in Canada to its winter grounds in the Bahamas, and back—and Audubon’s efforts to protect these charismatic birds every flap of the way.",
        "images" : [{
            "src" : "http://farm5.staticflickr.com/4149/4975374268_15df612823_b.jpg",
            "copyright" : "© Stephen Sylvia"
        },{
            "src" : "http://farm5.staticflickr.com/4085/4974756721_8a24cc8350_b.jpg",
            "copyright" : "© Stephen Sylvia"
        },{
            "src" : "http://farm5.staticflickr.com/4106/4974759279_e1b475a926_b.jpg",
            "copyright" : "© Stephen Sylvia"
        },{
            "src" : "http://farm5.staticflickr.com/4107/4974791109_57a51cbeb4_b.jpg",
            "copyright" : "© Stephen Sylvia"
        }]
        }
    ];


    initMap();

};

dojo.addOnLoad(init);