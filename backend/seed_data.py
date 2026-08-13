"""Seed content for Nomyra Travels. Editable via the admin CMS after first seed."""

IMG = {
    "hero": "https://images.unsplash.com/photo-1752543523383-6563710b0e34?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
    "misty_forest": "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "village_hills": "https://images.unsplash.com/photo-1633323773493-71920ed75215?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "rolling_hills": "https://images.unsplash.com/photo-1568644559664-e4a5735c37ea?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "waterfall_cliff": "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "waterfall_tall": "https://images.unsplash.com/photo-1610044847457-f6aabcbb67d3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "waterfall_gorge": "https://images.unsplash.com/photo-1518996261636-5801e989cc22?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "waterfall_forest": "https://images.unsplash.com/photo-1444290679983-dd3aabf671ec?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "waterfall_trees": "https://images.unsplash.com/photo-1564460549828-f0219a31bf90?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "waterfall_valley": "https://images.unsplash.com/photo-1519830103773-4bdc5166a0db?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "river_aerial": "https://images.pexels.com/photos/20011421/pexels-photo-20011421.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "river_boat": "https://images.unsplash.com/photo-1620746680106-9e6f7751d620?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "river_green": "https://images.unsplash.com/photo-1771992723680-a32b72e580f2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "river_mountain": "https://images.unsplash.com/photo-1762178905226-48b825d0fb3f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "camp_river": "https://images.pexels.com/photos/7689148/pexels-photo-7689148.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "camp_field": "https://images.unsplash.com/photo-1637505275770-8cbf37f4c928?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "camp_dome": "https://images.unsplash.com/photo-1510312305653-8ed496efae75?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "camp_night": "https://images.unsplash.com/photo-1599753642061-84495820669f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "trek_hills": "https://images.pexels.com/photos/10151003/pexels-photo-10151003.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "trek_jungle": "https://images.unsplash.com/photo-1580088233933-cb1db21c608d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "trek_trail": "https://images.unsplash.com/photo-1586957469525-7850e7bef283?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "trek_forest": "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "pines_fog": "https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "snow_peak": "https://images.pexels.com/photos/32261635/pexels-photo-32261635.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "snow_range": "https://images.unsplash.com/photo-1642870776984-f808ed7acc14?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "snow_ridge": "https://images.unsplash.com/photo-1575143367176-df82a0d4ff48?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "snow_layers": "https://images.unsplash.com/photo-1716746023060-d6dc0b1dcbb2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "snow_road": "https://images.unsplash.com/photo-1676607968711-b887ff6028e9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "rhino_pair": "https://images.pexels.com/photos/37623729/pexels-photo-37623729.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "rhino_egret": "https://images.pexels.com/photos/37654954/pexels-photo-37654954.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "pool_valley": "https://images.pexels.com/photos/18310406/pexels-photo-18310406.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "pool_mist": "https://images.unsplash.com/photo-1761442663511-2558e561f15e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "monoliths": "https://static.prod-images.emergentagent.com/jobs/98a77621-5d9d-419a-b5a6-462a35c63ca7/images/a6306b6aceb20da283c63a16cd79b9893e2c83dc771a87d541d288382707407e.jpeg",
    "shillong_street": "https://static.prod-images.emergentagent.com/jobs/98a77621-5d9d-419a-b5a6-462a35c63ca7/images/4c6e85e14619e7ec7be3afd2e2e4d0136af1e8df8fcce52adbb3e623080edd84.jpeg",
    "tea_garden": "https://static.prod-images.emergentagent.com/jobs/98a77621-5d9d-419a-b5a6-462a35c63ca7/images/c6ca76754cc8991d36dacfb805fdaa24b8d95e6cec41c4ecbcbff74af5f06e21.jpeg",
    "root_bridge": "https://static.prod-images.emergentagent.com/jobs/98a77621-5d9d-419a-b5a6-462a35c63ca7/images/15f2172c99a08103beb529a5b58009559f020ae9e42a73627a3687d7a6a73ea9.jpeg",
    "founder": "https://static.prod-images.emergentagent.com/jobs/98a77621-5d9d-419a-b5a6-462a35c63ca7/images/e07f5b656b61b4784e0c577d328d8b73d0d0b95ed6c7d0f9fed6659226398056.jpeg",
}

PACKAGES = [
    {
        "slug": "meghalaya-assam",
        "order": 1,
        "code": "01",
        "title": "Meghalaya + Assam",
        "subtitle": "Misty hills, living root bridges and wild Assam",
        "description": "From misty hills and living root bridges to crystal-clear rivers, villages and the wild landscapes of Assam.",
        "image": IMG["waterfall_valley"],
        "image_alt": "Waterfall falling into a green Meghalaya valley on the Meghalaya and Assam tour package",
        "highlights": ["Shillong", "Sohra / Cherrapunji", "Dawki", "Jowai", "Meghalaya waterfalls", "Assam", "Wildlife and nature experiences"],
        "cta_label": "Explore Meghalaya + Assam",
        "duration": "6-8 Days (flexible)",
        "featured": True,
        "variant": "standard",
    },
    {
        "slug": "assam-arunachal",
        "order": 2,
        "code": "02",
        "title": "Assam + Arunachal Pradesh",
        "subtitle": "Wildlife plains into high mountain passes",
        "description": "Journey from Assam's wildlife and landscapes into the mountains, valleys and cultural heart of Arunachal Pradesh.",
        "image": IMG["snow_peak"],
        "image_alt": "Snow covered eastern Himalayan peak on the Assam and Arunachal Pradesh tour package",
        "highlights": ["Assam", "Kaziranga", "Bomdila", "Dirang", "Tawang", "Sela Pass", "Ziro"],
        "cta_label": "Explore Assam + Arunachal",
        "duration": "9-12 Days (flexible)",
        "featured": True,
        "variant": "standard",
    },
    {
        "slug": "custom-northeast-india",
        "order": 3,
        "code": "03",
        "title": "Custom Northeast India",
        "subtitle": "Your Northeast. Your Way.",
        "description": "Tell us what you want to experience and Nomyra Travels will create a personalized Northeast India journey around you.",
        "image": IMG["misty_forest"],
        "image_alt": "Aerial view of mist rolling over forested hills for a customized Northeast India tour",
        "highlights": ["Adventure", "Trekking", "Camping", "Wildlife", "Culture", "Food", "Photography", "Waterfalls", "Offbeat destinations", "Luxury stays", "Road trips"],
        "cta_label": "Create My Trip",
        "duration": "You decide",
        "featured": True,
        "variant": "custom",
    },
]

DESTINATIONS = [
    {
        "slug": "shillong-police-bazaar", "order": 1, "state": "Meghalaya", "region": "East Khasi Hills",
        "name": "Shillong — Police Bazaar",
        "tagline": "The buzzing heart of the Khasi Hills",
        "description": "Shillong is where most Meghalaya journeys begin. Police Bazaar stays awake with cafes, bakeries, street food and shops, while the pine-lined roads around the city lead to viewpoints, lakes and live music you will not find in a guidebook.",
        "image": IMG["shillong_street"],
        "image_alt": "Evening street scene in Police Bazaar Shillong Meghalaya with lit shopfronts and mist",
        "highlights": ["Shillong city", "Police Bazaar", "Cafés and bakeries", "Khasi local food", "Shopping", "Local culture and live music"],
        "span": "wide",
    },
    {
        "slug": "nongriat-double-decker-living-root-bridge", "order": 2, "state": "Meghalaya", "region": "East Khasi Hills",
        "name": "Nongriat — Double Decker Living Root Bridge",
        "tagline": "A bridge grown, not built",
        "description": "A steep descent of around 3,000 steps through rainforest brings you to Nongriat, home of the famous double decker living root bridge — rubber fig roots trained across a stream by Khasi families over generations. Natural pools and smaller root bridges sit further along the trail.",
        "image": IMG["root_bridge"],
        "image_alt": "Double decker living root bridge of intertwined roots over a jungle stream in Nongriat Meghalaya",
        "highlights": ["Double decker living root bridge", "Rainforest trek", "Natural swimming pools", "Village homestays", "Rainbow Falls trail"],
        "span": "tall",
    },
    {
        "slug": "mawsynram", "order": 3, "state": "Meghalaya", "region": "East Khasi Hills",
        "name": "Mawsynram",
        "tagline": "One of the wettest places on earth",
        "description": "Mawsynram is green in a way that is hard to describe — moss on every stone, water everywhere, clouds moving through villages. Come for Mawjymbuin cave, roadside waterfalls and an offbeat, deeply local side of Meghalaya.",
        "image": IMG["waterfall_forest"],
        "image_alt": "Rain soaked green landscape and waterfall near Mawsynram Meghalaya",
        "highlights": ["Green landscapes", "Khasi villages", "Rain and cloud country", "Mawjymbuin cave", "Offbeat Meghalaya"],
        "span": "standard",
    },
    {
        "slug": "sohra-cherrapunji", "order": 4, "state": "Meghalaya", "region": "East Khasi Hills",
        "name": "Sohra / Cherrapunjee",
        "tagline": "Cliffs, caves and falling water",
        "description": "Sohra is a plateau of dramatic edges — Nohkalikai Falls dropping into a gorge, Seven Sisters spilling over the cliff line, Mawsmai and Arwah caves, and viewpoints that open straight onto the plains of Bangladesh when the clouds allow.",
        "image": IMG["waterfall_cliff"],
        "image_alt": "Waterfall pouring over a cliff into a green gorge at Sohra Cherrapunji Meghalaya",
        "highlights": ["Nohkalikai Falls", "Seven Sisters Falls", "Mawsmai and Arwah caves", "Cliff viewpoints", "Rainforest canyons"],
        "span": "large",
    },
    {
        "slug": "dawki-umngot-river", "order": 5, "state": "Meghalaya", "region": "West Jaintia Hills",
        "name": "Dawki — Umngot River",
        "tagline": "Water so clear the boats look airborne",
        "description": "The Umngot at Dawki is famously transparent in the dry season — you can see the riverbed metres below the boat. Add a suspension bridge, the India-Bangladesh border viewpoint and quiet riverside afternoons.",
        "image": IMG["river_aerial"],
        "image_alt": "Wooden boats floating on the crystal clear emerald Umngot river at Dawki Meghalaya",
        "highlights": ["Crystal-clear Umngot river", "Boating", "Suspension bridge", "Riverside landscapes", "India-Bangladesh border viewpoint"],
        "span": "wide",
    },
    {
        "slug": "jowai-krang-shuri", "order": 6, "state": "Meghalaya", "region": "West Jaintia Hills",
        "name": "Jowai — Krang Shuri",
        "tagline": "Blue water inside the forest",
        "description": "Krang Shuri near Jowai is a wide waterfall dropping into a pool of surreal blue. The Jaintia Hills around it hold canyons, sacred forests and some of the friendliest villages in Meghalaya.",
        "image": IMG["waterfall_trees"],
        "image_alt": "Krang Shuri waterfall falling into a blue pool surrounded by forest near Jowai Meghalaya",
        "highlights": ["Krang Shuri waterfall", "Swimming in blue water", "Jaintia Hills forests", "Local villages", "Nartiang monoliths nearby"],
        "span": "standard",
    },
    {
        "slug": "tawang", "order": 7, "state": "Arunachal Pradesh", "region": "West Kameng / Tawang",
        "name": "Tawang",
        "tagline": "High valleys and the great monastery",
        "description": "At over 10,000 feet, Tawang holds one of the largest monasteries in the country, alpine lakes, prayer flags on ridgelines and a mountain silence that stays with you long after you leave.",
        "image": IMG["snow_range"],
        "image_alt": "Snow covered mountain range near Tawang Arunachal Pradesh",
        "highlights": ["Tawang Monastery", "Alpine lakes", "Nuranang Falls", "High altitude valleys", "Monpa culture"],
        "span": "large",
    },
    {
        "slug": "sela-pass", "order": 8, "state": "Arunachal Pradesh", "region": "West Kameng",
        "name": "Sela Pass",
        "tagline": "13,700 feet of open sky",
        "description": "The road to Tawang climbs over Sela Pass, past a frozen lake and switchbacks that disappear into cloud. One of the most spectacular drives in the Eastern Himalaya.",
        "image": IMG["snow_road"],
        "image_alt": "Snow lined mountain road climbing towards Sela Pass in Arunachal Pradesh",
        "highlights": ["Sela Lake", "High mountain road", "Snow in season", "Photography stops"],
        "span": "wide",
    },
    {
        "slug": "dirang", "order": 9, "state": "Arunachal Pradesh", "region": "West Kameng",
        "name": "Dirang",
        "tagline": "Hot springs and a river valley",
        "description": "A relaxed valley stop between Bomdila and Tawang — apple orchards, hot springs, an old Dirang Dzong village and kiwi farms along the river.",
        "image": IMG["river_mountain"],
        "image_alt": "River flowing through a forested mountain valley near Dirang Arunachal Pradesh",
        "highlights": ["Hot springs", "Dirang Dzong", "Orchards and kiwi farms", "River valley walks"],
        "span": "standard",
    },
    {
        "slug": "bomdila", "order": 10, "state": "Arunachal Pradesh", "region": "West Kameng",
        "name": "Bomdila",
        "tagline": "Where the Himalaya first appears",
        "description": "Bomdila sits on a ridge with wide views of the Kameng valley and, on clear mornings, the snow line beyond. A calm halt with a monastery, craft centre and apple country around it.",
        "image": IMG["snow_layers"],
        "image_alt": "Layered mountain ridges seen from Bomdila Arunachal Pradesh",
        "highlights": ["Bomdila Monastery", "Ridge viewpoints", "Craft centre", "Apple orchards"],
        "span": "standard",
    },
    {
        "slug": "ziro", "order": 11, "state": "Arunachal Pradesh", "region": "Lower Subansiri",
        "name": "Ziro Valley",
        "tagline": "Pine ridges and paddy fields",
        "description": "Ziro is a wide, gentle valley of Apatani rice fields ringed by pine hills — a place for slow days, village walks and, in season, one of India's best-loved music festivals.",
        "image": IMG["pines_fog"],
        "image_alt": "Pine trees in fog on the hills around Ziro valley Arunachal Pradesh",
        "highlights": ["Apatani villages", "Rice and fish fields", "Pine ridges", "Ziro Festival season", "Talley Valley trek"],
        "span": "wide",
    },
    {
        "slug": "kaziranga", "order": 12, "state": "Assam", "region": "Golaghat / Nagaon",
        "name": "Kaziranga National Park",
        "tagline": "Grasslands of the one-horned rhino",
        "description": "Kaziranga holds the largest population of greater one-horned rhinoceros in the world, along with wild elephants, swamp deer and tigers, across floodplain grassland beside the Brahmaputra.",
        "image": IMG["rhino_pair"],
        "image_alt": "Two one horned rhinoceros grazing in the grasslands of Kaziranga National Park Assam",
        "highlights": ["One-horned rhinoceros", "Jeep and elephant safari", "Elephants and swamp deer", "Birdwatching", "Brahmaputra floodplains"],
        "span": "large",
    },
    {
        "slug": "assam-tea-country", "order": 13, "state": "Assam", "region": "Upper Assam",
        "name": "Assam Tea Country",
        "tagline": "Green rows and river mornings",
        "description": "Assam's tea belt is a landscape of its own — estate bungalows, shade trees, factory tours and the wide Brahmaputra never far away. An easy, beautiful counterpoint to the hills.",
        "image": IMG["tea_garden"],
        "image_alt": "Rows of Assam tea garden at golden hour with misty hills behind",
        "highlights": ["Tea estate walks", "Tea tasting", "Brahmaputra sunsets", "Rural Assam", "Majuli river island"],
        "span": "wide",
    },
]

EXPERIENCES = [
    {
        "slug": "camping-shnongpdeng", "order": 1, "category": "Camping", "location": "Shnongpdeng, West Jaintia Hills",
        "title": "Camping in Shnongpdeng",
        "summary": "Wake up beside one of Meghalaya's most beautiful rivers.",
        "description": "Riverside tents on the Umngot at Shnongpdeng, a short drive upstream from Dawki. Days are for kayaking, cliff jumping, snorkelling and zip lines; evenings are for a fire, local food and a river that goes completely quiet after dark.",
        "image": IMG["camp_river"],
        "image_alt": "Tents pitched beside a clear river surrounded by forest at Shnongpdeng Meghalaya",
        "highlights": ["Riverside tents", "Kayaking and snorkelling", "Cliff jumping and zip line", "Bonfire evenings", "Sunrise over the Umngot"],
        "cta_label": "Explore Camping",
        "difficulty": "Easy",
        "best_time": "October to April",
    },
    {
        "slug": "chaw-pau-trek", "order": 2, "category": "Trekking", "location": "South West Khasi Hills",
        "title": "Chaw Pau Trek",
        "summary": "Walk deeper into Meghalaya through remote landscapes and village trails.",
        "description": "A trail through the South West Khasi Hills that very few travellers reach — forest paths, stream crossings, open grassland ridges and villages where the trek is simply the way people get around. Best walked with a local guide from the area.",
        "image": IMG["trek_hills"],
        "image_alt": "Trekkers walking a green ridge trail through the South West Khasi Hills of Meghalaya",
        "highlights": ["Remote forest trails", "Village stops", "Stream crossings", "Grassland ridges", "Local guides"],
        "cta_label": "Explore Trek",
        "difficulty": "Moderate",
        "best_time": "October to April",
    },
    {
        "slug": "mawkyrwat-monoliths", "order": 3, "category": "Culture", "location": "Mawkyrwat, South West Khasi Hills",
        "title": "Mawkyrwat Monoliths",
        "summary": "Discover the stories written into Meghalaya's ancient stones.",
        "description": "Standing stones raised generations ago sit in clearings and village edges around Mawkyrwat. Walking between them with someone who knows the clan stories turns a field of rocks into a living record of Khasi history.",
        "image": IMG["monoliths"],
        "image_alt": "Ancient Khasi standing stone monoliths in a green clearing near Mawkyrwat Meghalaya",
        "highlights": ["Khasi monoliths", "Village surroundings", "Cultural landscape", "Hills and viewpoints"],
        "cta_label": "Discover Mawkyrwat",
        "difficulty": "Easy",
        "best_time": "All year",
    },
    {
        "slug": "infinity-pool-nognah", "order": 4, "category": "Offbeat", "location": "Nognah Village, South West Khasi Hills",
        "title": "Infinity Pool — Nognah Village",
        "summary": "A hidden escape overlooking the green hills of South West Khasi Hills.",
        "description": "A natural infinity edge above deep green valleys near Nognah village — the kind of place you sit at for an hour without saying much. Pair it with a night in the village for the full effect.",
        "image": IMG["pool_valley"],
        "image_alt": "Infinity edge pool looking out over green hills and valleys in South West Khasi Hills Meghalaya",
        "highlights": ["Infinity pool viewpoint", "Green valleys", "Quiet village stay", "Sunset views"],
        "cta_label": "Explore Experience",
        "difficulty": "Easy",
        "best_time": "September to April",
    },
    {
        "slug": "nongriat-root-bridge-trek", "order": 5, "category": "Trekking", "location": "Nongriat, East Khasi Hills",
        "title": "Nongriat Root Bridge Trek",
        "summary": "Three thousand steps down into rainforest and a bridge made of living roots.",
        "description": "The classic Meghalaya trek — down from Tyrna to Nongriat, across the double decker living root bridge, then on to Rainbow Falls if legs allow. Stay a night in the village to enjoy it without rushing.",
        "image": IMG["trek_jungle"],
        "image_alt": "Jungle trail leading down towards the living root bridge at Nongriat Meghalaya",
        "highlights": ["Double decker root bridge", "Rainbow Falls", "Natural pools", "Village homestay"],
        "cta_label": "Explore Trek",
        "difficulty": "Challenging",
        "best_time": "October to April",
    },
    {
        "slug": "kaziranga-safari", "order": 6, "category": "Wildlife", "location": "Kaziranga, Assam",
        "title": "Kaziranga Jeep Safari",
        "summary": "Morning grassland, mist and the world's largest rhino population.",
        "description": "Early jeep safaris through Kaziranga's ranges, when the grassland is still wet and rhino, wild buffalo and elephant are out in the open. Add an evening by the Brahmaputra to finish the day.",
        "image": IMG["rhino_egret"],
        "image_alt": "One horned rhinoceros with an egret in the grasslands of Kaziranga Assam",
        "highlights": ["Jeep safari", "One-horned rhinoceros", "Elephants and swamp deer", "Birdwatching", "Brahmaputra sunset"],
        "cta_label": "Explore Safari",
        "difficulty": "Easy",
        "best_time": "November to April",
    },
]

WHY_US = [
    {"title": "Local Knowledge", "text": "We understand the roads, villages, trails and hidden corners.", "icon": "map"},
    {"title": "Flexible Journeys", "text": "Change the pace and build a trip around your interests.", "icon": "route"},
    {"title": "Authentic Experiences", "text": "Experience Northeast India beyond standard sightseeing.", "icon": "compass"},
    {"title": "Personal Support", "text": "Get support before and during your journey.", "icon": "headset"},
]

TESTIMONIALS = [
    {"order": 1, "name": "Customer name placeholder", "trip": "Meghalaya + Assam", "quote": "Placeholder review — replace this text with a real customer review from the admin dashboard once you have permission to publish it.", "photo": "", "is_placeholder": True},
    {"order": 2, "name": "Customer name placeholder", "trip": "Assam + Arunachal Pradesh", "quote": "Placeholder review — this card is editable from the Nomyra Travels admin dashboard. No review is published until you add a genuine one.", "photo": "", "is_placeholder": True},
    {"order": 3, "name": "Customer name placeholder", "trip": "Custom Northeast India", "quote": "Placeholder review — add the traveller's own words, their trip and, with consent, a photo.", "photo": "", "is_placeholder": True},
]

GALLERY = [
    {"order": 1, "category": "Meghalaya", "image": IMG["waterfall_cliff"], "caption": "Cliff waterfall, Sohra", "alt": "Waterfall dropping over a cliff in Sohra Cherrapunji Meghalaya"},
    {"order": 2, "category": "Waterfalls", "image": IMG["waterfall_tall"], "caption": "A long drop in the hills", "alt": "Tall thin waterfall falling through dense green forest in Meghalaya"},
    {"order": 3, "category": "Waterfalls", "image": IMG["waterfall_gorge"], "caption": "Gorge falls", "alt": "Wide waterfall in a mossy gorge in Northeast India"},
    {"order": 4, "category": "Meghalaya", "image": IMG["river_aerial"], "caption": "Umngot river, Dawki", "alt": "Aerial view of boats on the clear Umngot river at Dawki Meghalaya"},
    {"order": 5, "category": "Camping", "image": IMG["camp_river"], "caption": "Riverside camp, Shnongpdeng", "alt": "Riverside camping tents at Shnongpdeng on the Umngot river"},
    {"order": 6, "category": "Camping", "image": IMG["camp_dome"], "caption": "High camp", "alt": "Dome tent pitched on a mountain slope in Northeast India"},
    {"order": 7, "category": "Camping", "image": IMG["camp_night"], "caption": "Night under the hills", "alt": "Lit tent at night below a dark hillside"},
    {"order": 8, "category": "Mountains", "image": IMG["snow_peak"], "caption": "Eastern Himalaya", "alt": "Snow capped Eastern Himalayan peak in Arunachal Pradesh"},
    {"order": 9, "category": "Arunachal Pradesh", "image": IMG["snow_road"], "caption": "The road to Tawang", "alt": "Snow lined road climbing towards Sela Pass Arunachal Pradesh"},
    {"order": 10, "category": "Arunachal Pradesh", "image": IMG["pines_fog"], "caption": "Ziro pines", "alt": "Pine forest in fog near Ziro valley Arunachal Pradesh"},
    {"order": 11, "category": "Assam", "image": IMG["rhino_pair"], "caption": "Kaziranga grasslands", "alt": "Two rhinoceros grazing in Kaziranga National Park Assam"},
    {"order": 12, "category": "Assam", "image": IMG["tea_garden"], "caption": "Tea country", "alt": "Assam tea garden rows at golden hour"},
    {"order": 13, "category": "Villages", "image": IMG["village_hills"], "caption": "A village on the slope", "alt": "Small village on a lush green hillside in Northeast India"},
    {"order": 14, "category": "Villages", "image": IMG["shillong_street"], "caption": "Police Bazaar evening", "alt": "Evening in Police Bazaar Shillong Meghalaya"},
    {"order": 15, "category": "Adventure", "image": IMG["trek_hills"], "caption": "Ridge walking", "alt": "Trekkers on a green ridge in the Khasi Hills"},
    {"order": 16, "category": "Adventure", "image": IMG["trek_forest"], "caption": "Into the forest", "alt": "Hiker walking through dense forest in Northeast India"},
    {"order": 17, "category": "Meghalaya", "image": IMG["root_bridge"], "caption": "Living root bridge", "alt": "Living root bridge over a stream in Nongriat Meghalaya"},
    {"order": 18, "category": "Mountains", "image": IMG["rolling_hills"], "caption": "Endless green", "alt": "Rolling green hills under soft cloud in Northeast India"},
]

BLOG = [
    {
        "slug": "best-places-to-visit-in-meghalaya",
        "title": "Best Places to Visit in Meghalaya",
        "excerpt": "A practical, honest list of the places in Meghalaya worth your days — and how to string them together without spending your holiday in a car.",
        "cover_image": IMG["waterfall_cliff"],
        "cover_alt": "Waterfall over a cliff in Meghalaya, one of the best places to visit in the state",
        "category": "Meghalaya",
        "read_time": "8 min read",
        "tags": ["Meghalaya", "Itinerary", "First timers"],
        "meta_title": "Best Places to Visit in Meghalaya (Local Guide) | Nomyra Travels",
        "meta_description": "Shillong, Sohra, Dawki, Nongriat, Jowai and the offbeat South West Khasi Hills — a local guide to the best places to visit in Meghalaya and how to plan the route.",
        "published": True,
        "body": """Meghalaya is small on a map and slow on the ground. Roads wind, clouds sit on the tarmac, and the drive between two places on the same page of an atlas can take three hours. The travellers who enjoy it most pick fewer places and stay longer.

## Shillong
Most journeys start here. Shillong is not a sightseeing city — it is a place to eat well, drink good coffee, listen to live music and pick up anything you forgot to pack. Give it an evening at the start and, if you can, an evening at the end.

## Sohra (Cherrapunji)
The plateau of cliffs and waterfalls. Nohkalikai Falls drops into a gorge from a great height, the Seven Sisters spill over the escarpment after rain, and Mawsmai and Arwah caves take you inside the limestone. Sunrise from the cliff edge, before the tour buses, is the best hour of the day.

## Nongriat
The double decker living root bridge is reached on foot — roughly 3,000 steps down from Tyrna and the same back up. Do not attempt it as a rushed day trip from Shillong. Stay a night in Nongriat, swim in the pools, walk to Rainbow Falls in the morning.

## Dawki and Shnongpdeng
The Umngot river runs remarkably clear from roughly November to March. Dawki gets the crowds; Shnongpdeng, a little upstream, gets the camps, kayaks and quiet mornings. Camp here if you can.

## Jowai and Krang Shuri
The Jaintia Hills are underrated. Krang Shuri falls into a blue pool you can swim in, Nartiang holds a field of towering monoliths, and the villages are wonderfully unbothered by tourism.

## Mawsynram
Among the wettest inhabited places on earth. Come for the extreme green, Mawjymbuin cave and the sense of living inside a cloud.

## South West Khasi Hills
Mawkyrwat, Nognah, the Chaw Pau trail — this is where Meghalaya still feels undiscovered. Roads are rougher and stays are simpler, and that is exactly the point.

## A sensible route
Shillong → Sohra (2 nights) → Nongriat (1 night) → Shnongpdeng (1-2 nights) → Jowai → Shillong. Add two days for the South West Khasi Hills if you want the offbeat version.

Tell us which of these you are drawn to and we will build the route around your dates and pace."""
    },
    {
        "slug": "meghalaya-hidden-gems",
        "title": "Meghalaya Hidden Gems: 9 Places Most Travellers Miss",
        "excerpt": "Beyond Sohra and Dawki there is a whole other Meghalaya — monoliths, valley viewpoints, sacred forests and villages that see a handful of visitors a year.",
        "cover_image": IMG["monoliths"],
        "cover_alt": "Ancient Khasi monoliths standing in a green clearing, a hidden gem of Meghalaya",
        "category": "Offbeat",
        "read_time": "7 min read",
        "tags": ["Offbeat", "Meghalaya", "South West Khasi Hills"],
        "meta_title": "Meghalaya Hidden Gems: 9 Offbeat Places to Visit | Nomyra Travels",
        "meta_description": "Offbeat Meghalaya beyond Cherrapunji and Dawki: Mawkyrwat monoliths, Nognah, Krang Shuri, sacred forests, Laitlum and more hidden gems worth the detour.",
        "published": True,
        "body": """Meghalaya's famous places deserve their reputation. But the state rewards anyone willing to drive an extra two hours on a worse road.

## 1. Mawkyrwat monoliths
Standing stones raised generations ago, still part of village life in the South West Khasi Hills. Go with someone who can tell you whose clan raised which stone.

## 2. Nognah village infinity pool
A natural edge above layered green valleys. Very little infrastructure, very large view.

## 3. Laitlum Canyons
Forty five minutes from Shillong and often empty on weekdays. The path down to Rasong village is one of the best short walks in the state.

## 4. Krang Shuri
A wide waterfall into water so blue it looks filtered. Life jackets available; go early.

## 5. Mawphlang sacred forest
A grove protected by Khasi tradition for centuries. Nothing may be taken out of it — not a leaf. Walk it with a village guide.

## 6. Nartiang monoliths
The tallest cluster of monoliths in Meghalaya, in the Jaintia Hills near Jowai.

## 7. Wei Sawdong Falls
A three-tiered fall reached by a steep bamboo ladder descent near Sohra. Slippery in rain — sensible shoes only.

## 8. Chaw Pau trail
A genuinely remote trek through the South West Khasi Hills. Villages, streams, grassland ridges, no crowds.

## 9. Kongthong
The village where families are called by whistled melodies rather than names. Visit respectfully; this is a home, not an attraction.

Most of these need a local driver who knows the roads and a guide who knows the people. That is the part we handle."""
    },
    {
        "slug": "best-time-to-visit-meghalaya",
        "title": "Best Time to Visit Meghalaya: A Month by Month Guide",
        "excerpt": "Clear rivers, big waterfalls or empty roads — you cannot have all three at once. Here is what each season actually gives you.",
        "cover_image": IMG["misty_forest"],
        "cover_alt": "Mist rolling across forested hills in Meghalaya during the monsoon season",
        "category": "Planning",
        "read_time": "6 min read",
        "tags": ["Planning", "Weather", "Meghalaya"],
        "meta_title": "Best Time to Visit Meghalaya — Month by Month | Nomyra Travels",
        "meta_description": "When to visit Meghalaya: clear Dawki river months, peak waterfall season, monsoon realities and the quiet shoulder weeks, explained month by month.",
        "published": True,
        "body": """There is no single best time to visit Meghalaya. There is only the version of Meghalaya you want to see.

## October to November — the sweet spot
Rain has eased, waterfalls are still strong, the hills are at their greenest and the Umngot begins to clear. Best all-round window. Book stays early around the festival weeks.

## December to February — clear water, cold nights
The Umngot at Dawki and Shnongpdeng is at its most transparent. Days are pleasant, nights at altitude are genuinely cold. Waterfalls are thinner but the light is beautiful.

## March to April — warm and quiet
Comfortable trekking weather before the rain arrives, fewer travellers, good rates. Some falls are reduced to a trickle by late April.

## May to September — monsoon
This is Meghalaya at full volume: Nohkalikai thundering, cloud inside the villages, roads occasionally blocked by landslides. Photographers and rain lovers adore it. Dawki boating and camping are usually off, and plans need flexibility.

## Quick answers
- Clear river and boating: December to March
- Biggest waterfalls: June to September
- Best balance: October to November
- Best trekking: October to April
- Camping at Shnongpdeng: October to April

Tell us your travel dates and we will tell you honestly what will and will not be worth doing."""
    },
    {
        "slug": "meghalaya-camping-guide",
        "title": "Meghalaya Camping Guide: Shnongpdeng and Beyond",
        "excerpt": "Where to camp in Meghalaya, what a riverside night actually involves, what to pack and how to choose a camp that is safe.",
        "cover_image": IMG["camp_river"],
        "cover_alt": "Tents beside a clear river at Shnongpdeng in Meghalaya, riverside camping",
        "category": "Camping",
        "read_time": "7 min read",
        "tags": ["Camping", "Shnongpdeng", "Adventure"],
        "meta_title": "Meghalaya Camping Guide — Shnongpdeng Riverside Camps | Nomyra Travels",
        "meta_description": "A practical Meghalaya camping guide: Shnongpdeng riverside camps, activities, season, packing list and safety checks before you book.",
        "published": True,
        "body": """Sleeping next to the Umngot is the single experience most travellers remember from Meghalaya.

## Shnongpdeng
About 8 km upstream from Dawki, this is the main riverside camping base. Tents sit on the bank; the river is clear enough to see the bed from a boat. Days fill with kayaking, snorkelling, cliff jumping, zip lines and boat rides. Evenings are a fire, grilled food and a very dark sky.

## Other options
- **Sohra plateau camps** — cooler, cliff-edge views, good in shoulder season.
- **South West Khasi Hills village camps** — basic, remote, unforgettable.
- **Umiam / Ri Bhoi lakeside** — closest to Shillong for a short first night.

## Season
October to April. During heavy monsoon the river rises and riverside camping stops — anyone offering it in July is worth questioning.

## What to pack
Quick-dry clothes, a fleece or light jacket (nights drop), sandals with grip, a torch, power bank, sunscreen, mosquito repellent, and a dry bag for your phone.

## Choosing a camp
Ask three questions: are life jackets provided for every water activity, are the guides from the village, and is there a plan if the weather turns. A good operator answers all three without hesitating.

## Being a good guest
The river is the community's livelihood. Carry your waste out, skip loud speakers after dark and pay the local rates without haggling them down.

We book camps we have stayed at ourselves and match the camp to who is travelling — couples, families and groups want very different nights."""
    },
    {
        "slug": "things-to-do-in-dawki",
        "title": "Things to Do in Dawki and the Umngot River",
        "excerpt": "Boating on glass-clear water, the suspension bridge, the border viewpoint — and why you should sleep upstream instead.",
        "cover_image": IMG["river_aerial"],
        "cover_alt": "Boats on the clear Umngot river at Dawki Meghalaya seen from above",
        "category": "Meghalaya",
        "read_time": "5 min read",
        "tags": ["Dawki", "Umngot", "Meghalaya"],
        "meta_title": "Things to Do in Dawki — Umngot River Guide | Nomyra Travels",
        "meta_description": "Dawki travel guide: Umngot river boating, best season for clear water, the suspension bridge, border viewpoint and staying at Shnongpdeng.",
        "published": True,
        "body": """Dawki sits on the India-Bangladesh border, about 80 km from Shillong, on a river that has made it famous.

## Boat on the Umngot
Between roughly November and March the water is startlingly clear. Boats are shared or private; go at first light for still water, empty frames and no queue.

## The Dawki suspension bridge
A colonial-era single-lane bridge over the river, still in use and a good spot for photographs.

## Border viewpoint
From the ridge you look straight out over the Bangladesh plains — a striking contrast after days of hills.

## Sleep at Shnongpdeng instead
Dawki town is busy and functional. Shnongpdeng, upstream, has the riverside camps, the water activities and the calm. Most travellers wish they had booked here.

## Practical notes
- Two hours from Shillong on a good day, longer on a weekend.
- Combine with Krang Shuri or Mawlynnong on the way back.
- Carry cash; connectivity is patchy.
- Wear a life jacket, even if you swim well. The current is stronger than the clarity suggests.

Ask us to build Dawki into a Meghalaya route so you arrive early and leave before the crowds."""
    },
    {
        "slug": "double-decker-living-root-bridge-trek-guide",
        "title": "Double Decker Living Root Bridge Trek Guide (Nongriat)",
        "excerpt": "Three thousand steps down, three thousand back up. What the Nongriat trek is really like and how to do it properly.",
        "cover_image": IMG["root_bridge"],
        "cover_alt": "Double decker living root bridge over a stream in the Nongriat rainforest Meghalaya",
        "category": "Trekking",
        "read_time": "7 min read",
        "tags": ["Trekking", "Nongriat", "Root bridge"],
        "meta_title": "Double Decker Living Root Bridge Trek Guide, Nongriat | Nomyra Travels",
        "meta_description": "Nongriat double decker living root bridge trek guide: route from Tyrna, difficulty, steps, timings, homestays, Rainbow Falls and what to carry.",
        "published": True,
        "body": """The double decker living root bridge at Nongriat is not a viewpoint you drive to. You earn it.

## The route
Drive to Tyrna village, past Sohra. From the trailhead it is a descent of roughly 3,000 concrete steps, two suspension bridges and about 2 to 3 hours down to Nongriat. The bridge itself — two levels of rubber fig roots trained across the stream over generations — sits beside the village.

## Difficulty
Downhill destroys knees; uphill destroys lungs. It is not technical, but it is relentless. Reasonable fitness and honest self-assessment required. Porters can carry bags from Tyrna.

## Stay the night
Day-tripping means climbing back up in the afternoon heat, exhausted, having seen the bridge for twenty minutes. Sleep in a Nongriat homestay instead: swim in the natural pools, eat with the family, and walk to Rainbow Falls (about 90 minutes further) the next morning.

## What to carry
Grippy shoes, 2 litres of water, light rain shell, quick-dry clothes, swimwear, torch, cash, and as little else as possible. Leave the big bag in Shillong or the car.

## Best time
October to April. In monsoon the steps are slick and leeches appear; it is still done, but go slow and take a guide.

## Respect
Nongriat is a working village, not a resort. The bridge is maintained by families who live there. Pay entry fees, ask before photographing people, and carry out your plastic.

We arrange homestays, porters and a local guide, and pair the trek with a rest day at the river."""
    },
    {
        "slug": "meghalaya-road-trip-guide",
        "title": "Meghalaya Road Trip Guide: Routes, Roads and Timings",
        "excerpt": "Distances in Meghalaya lie. Here are realistic driving times, the best stretches and a route that does not exhaust you.",
        "cover_image": IMG["rolling_hills"],
        "cover_alt": "Rolling green hills of Meghalaya on a road trip route",
        "category": "Road Trip",
        "read_time": "6 min read",
        "tags": ["Road trip", "Meghalaya", "Planning"],
        "meta_title": "Meghalaya Road Trip Guide — Routes and Driving Times | Nomyra Travels",
        "meta_description": "Meghalaya road trip guide with realistic driving times from Guwahati, Shillong, Sohra, Dawki and Jowai, plus a 7 day route that is not exhausting.",
        "published": True,
        "body": """Meghalaya is a driving state. The roads are the experience — which also means every day has a car in it.

## Realistic driving times
- Guwahati → Shillong: 3.5 to 4 hours
- Shillong → Sohra: 2 to 2.5 hours
- Sohra → Dawki / Shnongpdeng: 3 hours
- Shnongpdeng → Jowai: 2 hours
- Jowai → Shillong: 2.5 hours
- Shillong → Mawkyrwat: 4 hours on rougher road

Weekends and monsoon add time. So does stopping, which you will do constantly.

## A 7 day route that works
1. Guwahati to Shillong
2. Shillong to Sohra, cliffs and caves
3. Sohra, Wei Sawdong, Nohkalikai, trek down to Nongriat
4. Nongriat to Shnongpdeng
5. Shnongpdeng, river day
6. Krang Shuri and Jowai to Shillong
7. Shillong to Guwahati

## Practical
- Hire a driver who knows the hills; self-drive here is harder than it looks.
- Fuel up in towns — pumps are far apart in the south west.
- Start early. Cloud builds after midday and light fades by 5 pm.
- Keep one buffer day. Landslides and long lunches both happen.

Give us your arrival and departure flights and we will build the route backwards from them."""
    },
    {
        "slug": "arunachal-pradesh-travel-guide",
        "title": "Arunachal Pradesh Travel Guide: Permits, Routes and Seasons",
        "excerpt": "Tawang, Sela Pass, Dirang and Ziro — what to see, when to go and the permit you must not forget.",
        "cover_image": IMG["snow_peak"],
        "cover_alt": "Snow covered peak in Arunachal Pradesh, eastern Himalaya travel guide",
        "category": "Arunachal Pradesh",
        "read_time": "8 min read",
        "tags": ["Arunachal Pradesh", "Tawang", "Permits"],
        "meta_title": "Arunachal Pradesh Travel Guide — Tawang, Ziro, Permits | Nomyra Travels",
        "meta_description": "Arunachal Pradesh travel guide: Inner Line Permit, Tawang and Sela Pass route, Ziro valley, Dirang, Bomdila, best seasons and altitude advice.",
        "published": True,
        "body": """Arunachal is the largest state in Northeast India and the least travelled. Distances are long, mountains are serious, and the reward is scale you will not find elsewhere in the country.

## Permits
Indian nationals need an Inner Line Permit (ILP). Foreign nationals need a Protected Area Permit and usually must travel in a group with a registered operator. Apply in advance — this is not something to sort out at the gate. We handle the paperwork for our travellers.

## The Tawang circuit
Guwahati or Tezpur → Bhalukpong → Dirang → Bomdila → Sela Pass (about 13,700 ft) → Tawang. Allow 2 days each way; the road is spectacular and slow. In Tawang: the monastery, Nuranang Falls, alpine lakes, high valleys.

## Ziro
A completely different Arunachal — a wide valley of Apatani rice fields ringed by pine ridges. Slow days, village walks, and the Ziro Festival of Music in September.

## Season
- October to April: clear skies, snow on the passes in winter
- March to May: rhododendrons and pleasant days
- June to September: heavy rain, landslides, avoid the high road

## Altitude
Sela Pass is high. Do not rush from the plains to Tawang in one day. Sleep at Dirang or Bomdila, drink water, skip alcohol on the climbing days.

## Combine with Assam
Most Arunachal routes begin in Assam, which makes Kaziranga an easy and worthwhile addition at the start or end.

Ask us for the Assam + Arunachal itinerary with permit support included."""
    },
    {
        "slug": "assam-arunachal-road-trip",
        "title": "Assam + Arunachal Road Trip: Rhinos to High Passes",
        "excerpt": "An 8 to 10 day route from Kaziranga's grasslands to the monasteries and mountain passes of Arunachal Pradesh.",
        "cover_image": IMG["snow_road"],
        "cover_alt": "Mountain road climbing towards Sela Pass on an Assam Arunachal road trip",
        "category": "Road Trip",
        "read_time": "7 min read",
        "tags": ["Assam", "Arunachal Pradesh", "Road trip"],
        "meta_title": "Assam + Arunachal Road Trip Itinerary (8-10 Days) | Nomyra Travels",
        "meta_description": "Assam and Arunachal Pradesh road trip itinerary covering Kaziranga, Nameri, Dirang, Bomdila, Sela Pass and Tawang with permits and driving times.",
        "published": True,
        "body": """This is the Northeast's great contrast trip: floodplain grassland one morning, snow on a mountain pass three days later.

## Suggested route
1. **Guwahati to Kaziranga** — afternoon by the park.
2. **Kaziranga** — morning jeep safari, rhino, elephant, swamp deer.
3. **Kaziranga to Nameri or Bhalukpong** — cross into Arunachal, permits checked.
4. **To Dirang** — hot springs, Dzong village, river valley.
5. **Dirang to Tawang via Sela Pass** — the big driving day.
6. **Tawang** — monastery, Nuranang Falls, high lakes.
7. **Tawang to Dirang or Bomdila**.
8. **Back to Guwahati** or extend to Ziro.

## Why this order
You gain altitude gradually, which matters. Doing it in reverse means hitting Sela Pass on day two from the plains.

## Practical
- ILP for Indian travellers, PAP for foreign nationals.
- 4x4 or a high-clearance vehicle with a hill driver.
- Cash for the mountain sections; ATMs are unreliable.
- Layers. Kaziranga can be warm while Sela is below freezing on the same trip.

## Best season
October to April, with November and March the most reliable. Avoid peak monsoon on the mountain road.

We run this as a flexible 8 to 12 day journey and can add Ziro, Majuli or Meghalaya on either end."""
    },
    {
        "slug": "northeast-india-travel-guide",
        "title": "Northeast India Travel Guide: How to Plan Your First Trip",
        "excerpt": "Eight states, one region, and far more than one trip. How to choose where to go, how long you need and what it actually costs you in time.",
        "cover_image": IMG["village_hills"],
        "cover_alt": "Village on a green hillside in Northeast India travel guide",
        "category": "Planning",
        "read_time": "9 min read",
        "tags": ["Northeast India", "Planning", "First timers"],
        "meta_title": "Northeast India Travel Guide — Plan Your First Trip | Nomyra Travels",
        "meta_description": "A first-timer's Northeast India travel guide: choosing states, realistic itineraries, permits, seasons, transport and how many days you really need.",
        "published": True,
        "body": """The most common mistake travellers make in Northeast India is trying to see all of it. Eight states, mountain roads, and a monsoon that rewrites plans — the region rewards depth, not coverage.

## Pick two states, not five
For 7 to 10 days, choose one hill state and one plains state. Meghalaya + Assam and Assam + Arunachal are the two combinations that work best logistically.

## How long you need
- Meghalaya alone: 6 to 8 days
- Meghalaya + Assam: 8 to 10 days
- Assam + Arunachal (Tawang): 9 to 12 days
- Anything with Ziro added: 12+ days

## Getting there
Guwahati is the main gateway, with good flight connections and onward road access to Meghalaya and Arunachal. Shillong, Dibrugarh and Jorhat also have airports.

## Permits
Arunachal Pradesh, Nagaland, Mizoram and Manipur require permits (ILP for Indians; PAP for foreign nationals in some areas). Meghalaya and Assam do not.

## Seasons
October to April is broadly the best window. Monsoon (June to September) is spectacular in Meghalaya and difficult in the mountains.

## Transport
Hire a vehicle with a local driver. Public transport exists but eats days, and the shared-taxi network assumes you know the region.

## Money and connectivity
Carry cash for villages and camps. Jio and Airtel work in towns; expect blank spots in the hills.

## Travel well
Ask before photographing people. Many communities are matrilineal, deeply hospitable and quietly private. Carry your waste out of villages — waste management is limited.

Tell us your dates, your pace and what you want to feel, and we will design the trip around that instead of a fixed package."""
    },
    {
        "slug": "best-offbeat-places-in-meghalaya",
        "title": "Best Offbeat Places in Meghalaya",
        "excerpt": "If you have already done Sohra and Dawki, this is the Meghalaya to come back for.",
        "cover_image": IMG["pool_valley"],
        "cover_alt": "Infinity pool overlooking green valleys in offbeat South West Khasi Hills Meghalaya",
        "category": "Offbeat",
        "read_time": "6 min read",
        "tags": ["Offbeat", "Meghalaya", "Villages"],
        "meta_title": "Best Offbeat Places in Meghalaya to Visit | Nomyra Travels",
        "meta_description": "Offbeat Meghalaya: Mawkyrwat, Nognah, Chaw Pau trek, Kongthong, Wei Sawdong, Nartiang and other quiet places worth the extra drive.",
        "published": True,
        "body": """Offbeat in Meghalaya rarely means far. It usually means one worse road and one fewer signboard.

## South West Khasi Hills
The heart of offbeat Meghalaya. Mawkyrwat as a base, monoliths in the fields, the Chaw Pau trail, and Nognah's valley-edge infinity pool. Stays are simple homestays; the welcome is not.

## Kongthong
The whistling village, where each person has a melody instead of a called name. Visit with a local guide and treat it as someone's home.

## Wei Sawdong
Three tiers of falling water below a steep bamboo ladder near Sohra. Early morning, dry shoes, no rush.

## Nartiang
A field of enormous monoliths in the Jaintia Hills, plus one of Meghalaya's oldest temples.

## Laitlum and Rasong
A canyon rim near Shillong and a footpath down to a village that receives its supplies on foot.

## Siju and Balpakram (Garo Hills)
Far west Meghalaya, barely on the tourist map — limestone caves, bat colonies and a national park wrapped in Garo legend. Needs extra days.

## How to do it well
Go slow, stay in villages rather than day-tripping, hire guides from the community, and accept that plans change with the weather. Offbeat Meghalaya pays back patience, not schedules.

We build offbeat routes that keep drive times sane and put the money into village stays and local guides."""
    },
    {
        "slug": "south-west-khasi-hills-travel-guide",
        "title": "South West Khasi Hills Travel Guide",
        "excerpt": "Mawkyrwat, Nognah, monoliths and the Chaw Pau trail — a full guide to the least-travelled corner of Meghalaya.",
        "cover_image": IMG["trek_hills"],
        "cover_alt": "Trekkers on a green ridge in the South West Khasi Hills of Meghalaya",
        "category": "Offbeat",
        "read_time": "7 min read",
        "tags": ["South West Khasi Hills", "Trekking", "Offbeat"],
        "meta_title": "South West Khasi Hills Travel Guide (Mawkyrwat, Nognah) | Nomyra Travels",
        "meta_description": "South West Khasi Hills travel guide: how to reach Mawkyrwat, Nognah infinity pool, monoliths, Chaw Pau trek, stays, season and what to expect.",
        "published": True,
        "body": """The South West Khasi Hills district is where Meghalaya stops performing for visitors. Fewer homestays, fewer cafes, far fewer cars — and landscape that holds its own against anything in Sohra.

## Getting there
Mawkyrwat, the district headquarters, is roughly 4 hours from Shillong via Mawkyrwat road, or reachable from the Sohra side on rougher stretches. A high-clearance vehicle and a driver who has done the route are both worth paying for.

## What to do
- **Mawkyrwat monoliths** — standing stones in village clearings, best understood with a local guide.
- **Nognah infinity pool** — a natural edge above deep green valleys, ideal at sunset.
- **Chaw Pau trek** — forest paths, streams and grassland ridges, moderate difficulty, guided.
- **Village evenings** — the real reason to come. Food, stories, and no phone signal.

## Where to stay
Homestays and community guesthouses. Clean, basic, warm. Book ahead, because there are not many rooms.

## Season
September to April. The monsoon here is heavy and roads can be affected.

## What to bring
Cash, a torch, a power bank, warm layers for the evening, sturdy shoes, and a slower pace than usual.

## Travelling responsibly
Community tourism here is young. Pay local rates, hire local guides, ask before photographing, and take your plastic back out with you.

This is the region we most enjoy planning. Tell us how much comfort you need and we will find the right village to base you in."""
    },
]

ABOUT = {
    "heading": "Travel With People Who Know the Northeast",
    "story": [
        "Nomyra Travels was created for a simple reason: too many people were leaving Northeast India having only seen the outside of it. Three viewpoints, a rushed waterfall stop, and back on a bus.",
        "We plan journeys the way we travel ourselves — fewer places, longer stays, local drivers and guides, village homestays alongside good hotels, and enough space in the day for the unplanned part that ends up being the best part.",
        "Everything on this website is a starting point, not a fixed product. Tell us what you want your days to feel like and we will build the route around it.",
    ],
    "mission": "To make Northeast India travel personal, local and genuinely worth the distance — and to keep as much of the value as possible with the villages, drivers, cooks and guides who make it possible.",
    "founder_photo": IMG["founder"],
    "founder_photo_alt": "Placeholder image of a traveller on a misty ridge in Northeast India, to be replaced with the founder photograph",
    "founder_note": "[Editable placeholder — add founder name, photograph and a short personal note from the admin dashboard.]",
    "team_note": "[Editable placeholder — add photographs and short introductions for the Nomyra Travels team and local guides.]",
    "image": IMG["trek_trail"],
    "image_alt": "Forest trail in Northeast India walked with local guides",
}
