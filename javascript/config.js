var configOptions,sectionData;

function init(){

    configOptions = {
        webmap : "015f54544e0a49328adbdfe8dec58464",
        title : "Beating the Odds: A Year in the Life of a Piping Plover",
        subtitle : "Piping Plovers flock to the same shores that attract people. With just 8,000 adult birds left in the world, the Piping Plover is one of our most at-risk species. From Canada to the Caribbean, Audubon is working to safeguard sandy reaches critical to the birds’ survival, and is spreading the message to share the beach.",
        tabTitles : [{
    		"title" : "<span class='tabTextBig'>Intro</span>",
            "season" : "intro"
		},{
			"title" : "<span class='tabTextBig'>Summer</span>",
            "season" : "summer"
		},{
			"title" : "<span class='tabTextBig'>Fall</span>",
            "season" : "fall"
		},{
			"title" : "<span class='tabTextBig'>Winter</span>",
            "season" : "winter"
		},{
			"title" : "<span class='tabTextBig'>Spring</span>",
            "season" : "spring"
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
            "src" : "images/photos/PIPL_Goldenrod_chicks.jpg",
            "copyright" : "© Copyright goes here"
        }]
        },
        //SUMMER
        {
        "title" : "Summer: Risky Business",
        "text" : "When it comes to selecting a nesting site, Piping Plovers along the Atlantic Coast insist on waterfront property. In the reaches above the tide line, and near bunches of grass, males dig potential nest sites, or scrapes, in the sand or gravel.<br><br>As ground nesting birds, Piping Plovers are easy targets for raccoons, foxes, skunks, and other predators. Beachfront development has devoured their habitat, and unrestricted off-road vehicles, beach-goers, and unleashed pets can destroy nests and trample young. These threats exist throughout the summer grounds of the three eastern breeding populations: along the Atlantic coast from eastern Canada to North Carolina, on the shores of the Great Lakes.<br><br>To protect adult Piping Plovers and their young at this vulnerable stage, Audubon and partners are working to ensure that critical breeding grounds are fenced off and warning signs are posted to alert beach-goers to the presence of these nearly invisible birds.",
        "images" : [{
            "src" : "images/photos/adultchickwrackHA7P2218a_Sidney Maddock.jpg",
            "copyright" : "© Copyright goes here"
        }]
        },
        //FALL
        {
        "title" : "Fall: Hitting the Road",
        "text" : "Safe stopover sites are critical for resting and refueling as Piping Plovers make their perilous journey south, from July through October. Traveling in small groups, females generally take off first, followed by unpaired males, males with fledglings, and finally juveniles. The six-inch-long shorebirds may weigh a mere two ounces, but don’t underestimate them. Though small and undeniably adorable, they’re tough, too, fighting storms in the air and perils on the ground on their 2,000-mile flight to their winter homes.<br><br>On their journey south, the birds pause to rest and refuel. While some of these key stopover sites are plover-friendly, with protected habitat and strict leash laws, in other areas protections are lacking and the birds endure potentially deadly disturbance from off-road vehicles. Audubon is working to ensure plovers’ safe passage.",
        "images" : [{
            "src" : "images/photos/PIPL_6693Cropped.jpg",
            "copyright" : "© Copyright goes here"
        }]
        },
        //WINTER
        {
        "title" : "Winter: Snowbirds: Going South for Winter",
        "text" : "In the winter, Piping Plovers flock to the sandy beaches and mudflats of the Gulf of Mexico and Atlantic coasts where they dine on worms, tiny crustaceans, and other marine animals. At least, that’s what about half of the 8,000 or so Piping Plovers do. The whereabouts of the other half of the population has long been unknown, but now scientists are starting to solve the mystery. In 2011, an international team of shorebird biologists, including Audubon scientists, discovered more than 1,000 plovers wintering in the Bahamas.<br><br>While many conservation efforts have focused on safeguarding the birds’ breeding habitat, we now know that plovers spend nearly two-thirds of the year outside these areas. And research shows that even a small drop in the number of birds that survive the winter can threaten the recovery of the species. So Audubon is working to conserve healthy winter habitats in the United States, and extending its reach, partnering with conservation groups in the Bahamas to increase monitoring efforts and help spread local awareness about threatened birds.",
        "images" : [{
            "src" : "images/photos/16 March 2011 Bahamas_PIPL_LAddison.jpg",
            "copyright" : "© Copyright goes here"
        }]
        },
        //SPRING
        {
        "title" : "Spring: A Plover Super-Highway in the Sky",
        "text" : "Piping Plovers begin their return trip north in March and face a number of hazards along the way. The Atlantic Coast population follows the coastline, while birds heading to the Great Lakes to breed take a varied route.<br><br>Whatever their trajectory, all plovers need quality foraging and roosting habitat at spring stopover sites. Plovers depend on a variety of habitat types, including sand bars, tidal flats, and gently sloping beaches. During high tide, they rest above the water line, catching their breath before taking off for the next leg of their journey. When the tide recedes, plovers flock to the exposed sand flats and refuel on worms and crustaceans. As with their breeding sites, the primary threats are from habitat loss and disturbance. Providing healthy habitat at critical stopover sites is imperative to helping these imperiled birds on the road to recovery.",
        "images" : [{
            "src" : "images/photos/Assateague_piping_plover_ai_md_20091107_01[2].jpg",
            "copyright" : "© Copyright goes here"
        }]
        }
    ];


    initMap();
    setUpTabs();

};

dojo.addOnLoad(init);