export const TOURS_DATA = [
  {
    id: "mumbai-darshan",
    title: "Mumbai Darshan",
    category: "City Sightseeing",
    duration: "1 Day (8h/80km, 10h/100km, 12h/120km)",
    tagline: "Discover the City of Dreams with Expert Local Guides",
    shortDescription: "Explore Mumbai's iconic landmarks with expert drivers who know every historic corner, scenic seaside view, and hidden culinary gem.",
    banner: "/assets/tours/bd08021da8c244de8eafa9a4f86c4e2a30099151_yk3fsq4Dd4.png",
    startingPrice: "₹2,499",
    rating: 4.9,
    reviewsCount: 340,
    bookingPackages: [
      { name: "Half Day", duration: "8 hrs / 80 Km", price: "₹2,499" },
      { name: "Full Day", duration: "10 hrs / 100 Km", price: "₹2,999" },
      { name: "Extended Day", duration: "12 hrs / 120 Km", price: "₹3,499" }
    ],
    carTypes: ["WagonR (Hatchback)", "Swift Dzire (Sedan)", "Maruti Ertiga (6+1)", "Kia Carens (7 Seater)", "Innova Crysta (7+1)", "Tempo Traveller (13/17 Seater)"],
    highlights: [
      "Gateway of India & Taj Mahal Palace",
      "Marine Drive & Queen's Necklace",
      "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
      "Siddhi Vinayak Temple & Haji Ali Dargah",
      "Bandra-Worli Sea Link & Bandstand",
      "Juhu Beach & Girgaon Chowpatty",
      "Mani Bhavan (Gandhi Museum) & Hanging Gardens"
    ],
    inclusions: [
      "Doorstep pickup & drop anywhere in Mumbai",
      "Clean, sanitized air-conditioned vehicle",
      "Experienced driver-cum-guide with local expertise",
      "Fuel & driver allowance included",
      "Flexible schedule – spend your own time at each spot"
    ],
    exclusions: [
      "Toll charges & parking fees (to be paid actual)",
      "Monument entry tickets & camera permits",
      "Meals, snacks & personal expenses"
    ],
    rules: [
      "Flexible pick-up timing and doorstep pick-up from your home or hotel.",
      "You can customize, add, or skip spots according to your family's preferences.",
      "Driver guides you with parking, photo spots, and best local street food spots.",
      "Cancellation charge of ₹500 applicable if cancelled within 12 hours of departure."
    ]
  },
  {
    id: "lonavala-trip",
    title: "Lonavala & Khandala Weekend Getaway",
    category: "Hill Station",
    duration: "1 Day / 2 Days Tour",
    tagline: "Escape to the Misty Western Ghats & Scenic Viewpoints",
    shortDescription: "Experience lush green valleys, roaring waterfalls, misty hilltops, and famous chikki markets with our comfortable outstation cabs.",
    banner: "/assets/tours/panvel_upscaled_image_2_HOyyQs2JHJ.webp",
    startingPrice: "₹3,299",
    rating: 4.9,
    reviewsCount: 420,
    bookingPackages: [
      { name: "1 Day Same Day Return", duration: "Up to 300 Km", price: "₹3,299" },
      { name: "2 Days / 1 Night Stay", duration: "Up to 500 Km", price: "₹6,199" }
    ],
    carTypes: ["Swift Dzire / Etios", "Maruti Ertiga (6+1)", "Kia Carens", "Innova Crysta", "Tempo Traveller"],
    highlights: [
      "Tiger's Leap & Lion's Point panoramic view",
      "Bhushi Dam & Waterfall viewpoints",
      "Karla & Bhaja Ancient Buddhist Caves",
      "Lonavala Lake & Wax Museum",
      "Rajmachi Point & Khandala Ghats",
      "Authentic Lonavala Chikki & Fudge Shopping"
    ],
    inclusions: [
      "Private sanitized AC cab with driver-guide",
      "Pickup from Mumbai / Thane / Navi Mumbai / Pune",
      "Toll calculation assistance & scenic stopovers",
      "Driver overnight stay allowance (in 2-day pack)"
    ],
    exclusions: [
      "Toll plaza fees (Mumbai-Pune Expressway) & parking",
      "Cave entry tickets & adventure sports fees",
      "Hotel stay & food expenses"
    ],
    rules: [
      "Route: Pickup -> Mumbai-Pune Expressway -> Lonavala/Khandala Sightseeing -> Drop.",
      "AC may be regulated on steep ghat climbs for vehicle safety.",
      "Remaining kms/hours cannot be used for local Mumbai travel post-drop."
    ]
  },
  {
    id: "alibaug-sightseeing",
    title: "Alibaug Coastal Sightseeing",
    category: "Coastal & Beach",
    duration: "1 Day / 2 Days Tour",
    tagline: "Pristine Beaches, Sea Forts & Delicious Konkani Seafood",
    shortDescription: "A relaxed coastal retreat featuring pristine sandy beaches, historic water forts, watersports, and tranquil coastal villages.",
    banner: "/assets/tours/alibag_rt4bWntlkB.webp",
    startingPrice: "₹3,499",
    rating: 4.8,
    reviewsCount: 280,
    bookingPackages: [
      { name: "1 Day Alibaug Tour", duration: "Same Day Return", price: "₹3,499" },
      { name: "2 Days / 1 Night Tour", duration: "Overnight Beach Stay", price: "₹6,499" }
    ],
    carTypes: ["Sedan (Dzire / Etios)", "Ertiga (6+1)", "Kia Carens", "Innova Crysta", "Tempo Traveller"],
    highlights: [
      "Kolaba Fort (Sea Fort accessible during low tide)",
      "Varsoli Beach & Nagaon Beach (Watersports)",
      "Kashid White Sand Beach & Murud Janjira Fort",
      "Kanakeshwar Temple & Forest Trail",
      "Fresh Coastal Seafood & Coconut water stops"
    ],
    inclusions: [
      "Dedicated AC cab with chauffeur",
      "Door-to-door pickup & drop",
      "Fuel, driver allowance & state permits",
      "Customizable beach itinerary"
    ],
    exclusions: [
      "Toll charges & ferry / boat tickets to Janjira Fort",
      "Watersports activities & parking charges",
      "Meals & accommodation"
    ],
    rules: [
      "Pickup from Mumbai/Pune -> Alibaug beaches -> Drop back.",
      "Driver knows optimal tide timings for Kolaba Fort walk.",
      "Toll & parking extra as per actual receipts."
    ]
  },
  {
    id: "matheran-sightseeing",
    title: "Matheran Hill Station Tour",
    category: "Hill Station",
    duration: "1 Day / 2 Days Tour",
    tagline: "Asia's Only Automobile-Free Eco-Friendly Hill Station",
    shortDescription: "Breathe in pure mountain air, admire 360-degree valley views, ride horseback trails, and experience peace without vehicle pollution.",
    banner: "/assets/tours/matheran_82596VAAMO.webp",
    startingPrice: "₹2,799",
    rating: 4.8,
    reviewsCount: 190,
    bookingPackages: [
      { name: "1 Day Matheran Tour", duration: "Pickup & Dasturi Drop-Pick", price: "₹2,799" },
      { name: "2 Days Matheran Tour", duration: "Overnight Stay Package", price: "₹5,299" }
    ],
    carTypes: ["Sedan (Dzire)", "Ertiga (6+1)", "Kia Carens", "Innova Crysta"],
    highlights: [
      "Dasturi Naka scenic drive through Neral ghats",
      "Panorama Point (360-degree sunset/sunrise view)",
      "Echo Point & Louisa Point valley view",
      "Charlotte Lake & Lord Point",
      "Toy train experience & horse riding through forests",
      "Handmade leather footwear & chikki market"
    ],
    inclusions: [
      "AC cab from Mumbai to Dasturi Naka & return",
      "Waiting time during your hilltop exploration",
      "Driver allowance & fuel charges"
    ],
    exclusions: [
      "Vehicles are permitted only up to Dasturi Naka parking.",
      "Dasturi entry tax & parking charges",
      "Internal Matheran travel (horse, e-rickshaw or walk)",
      "Food and personal expenses"
    ],
    rules: [
      "Cab stays parked safely at Dasturi Naka while you explore top.",
      "Driver will coordinate pickup timing at Dasturi gate for return trip."
    ]
  },
  {
    id: "shirdi-tour",
    title: "Shirdi Spiritual Pilgrimage Tour",
    category: "Spiritual & Pilgrimage",
    duration: "1 Day / 2 Days Tour",
    tagline: "Seek Blessings at the Sacred Abode of Sai Baba",
    shortDescription: "Experience divine peace and hassle-free VIP darshan guidance with our reliable, punctual cabs to Shirdi and Shani Shingnapur.",
    banner: "/assets/tours/shirdi_p7RAPbKB9X.jpeg",
    startingPrice: "₹5,499",
    rating: 5.0,
    reviewsCount: 510,
    bookingPackages: [
      { name: "1 Day Same Day Darshan", duration: "Early Morning Departure", price: "₹5,499" },
      { name: "2 Days Shirdi + Shani Shingnapur", duration: "2D/1N Pilgrimage", price: "₹8,999" }
    ],
    carTypes: ["Swift Dzire", "Maruti Ertiga", "Kia Carens", "Innova Crysta", "Tempo Traveller"],
    highlights: [
      "Samadhi Mandir & Dwarkamai",
      "Chavadi, Gurusthan & Sai Heritage Village",
      "Shani Shingnapur (Temple of Lord Shani with no doors)",
      "Samruddhi Mahamarg smooth highway ride",
      "Hassle-free darshan queue guidance by driver"
    ],
    inclusions: [
      "AC cab with courteous devotional-friendly driver",
      "Early morning doorstep pickup in Mumbai/Thane",
      "Fuel, interstate permit, driver bata",
      "Free waiting during Aarti and temple darshan"
    ],
    exclusions: [
      "Samruddhi Mahamarg / Highway tolls & temple parking",
      "Special VIP pass or temple donation charges",
      "Hotel stay & prasadam meals"
    ],
    rules: [
      "Driver is familiar with temple schedule, Kakad Aarti, and Shej Aarti timings.",
      "Clean, non-smoking driver guaranteed for devotional tours."
    ]
  },
  {
    id: "mahabaleshwar-sightseeing",
    title: "Mahabaleshwar & Panchgani Holiday",
    category: "Hill Station",
    duration: "2 Days / 3 Days Tour",
    tagline: "Queen of Hill Stations, Strawberry Farms & Table Land",
    shortDescription: "Immerse yourself in cool mountain air, breathtaking views from Arthur's Seat, boating on Venna Lake, and farm-fresh strawberry delights.",
    banner: "/assets/tours/mhabaleshwar_9KMZyI1jrD.webp",
    startingPrice: "₹7,499",
    rating: 4.9,
    reviewsCount: 380,
    bookingPackages: [
      { name: "2 Days / 1 Night Tour", duration: "Cover Top 8 Attractions", price: "₹7,499" },
      { name: "3 Days / 2 Nights Tour", duration: "Mahabaleshwar + Panchgani + Pratapgad", price: "₹10,999" }
    ],
    carTypes: ["Sedan (Dzire / Etios)", "Ertiga", "Kia Carens", "Innova Crysta"],
    highlights: [
      "Arthur's Seat & Elphinstone Point",
      "Venna Lake boating & horse riding",
      "Mapro Garden strawberry tasting & factory tour",
      "Panchgani Table Land & Sydney Point",
      "Pratapgad Historic Hill Fort & Shivaji Maharaj statue",
      "Old Mahabaleshwar Lord Shiva Temple"
    ],
    inclusions: [
      "Private AC cab with experienced Ghat driver",
      "Doorstep pickup & drop in Mumbai / Pune",
      "Driver night stay & daily allowance",
      "Inter-city sightseeing covering all major points"
    ],
    exclusions: [
      "Tolls, parking fees & pollution tax (Panchgani/Mahabaleshwar entry)",
      "Boating tickets & Pratapgad guide charges",
      "Accommodation & meals"
    ],
    rules: [
      "AC will be switched off on steep uphill ghat sections for safety.",
      "Sightseeing points can be modified as per weather and traffic."
    ]
  },
  {
    id: "igatpuri-tour",
    title: "Igatpuri Nature & Waterfall Tour",
    category: "Hill Station",
    duration: "1 Day / 2 Days Tour",
    tagline: "Misty Valleys, Vipassana Pagoda & Majestic Waterfalls",
    shortDescription: "A serene hidden gem in the Sahyadri mountains famous for lush green valleys, Bhatsa River Valley, ancient forts, and Vipassana centre.",
    banner: "/assets/tours/igatpuri_final_7NAxDp2jVq.jpg",
    startingPrice: "₹3,499",
    rating: 4.8,
    reviewsCount: 165,
    bookingPackages: [
      { name: "1 Day Igatpuri Escape", duration: "Same Day Return", price: "₹3,499" },
      { name: "2 Days / 1 Night Nature Tour", duration: "Relaxed Weekend Stay", price: "₹6,499" }
    ],
    carTypes: ["Sedan (Dzire)", "Ertiga", "Kia Carens", "Innova Crysta"],
    highlights: [
      "Vipassana International Academy (Dhamma Giri)",
      "Bhavali Dam & Vaitarna Dam viewpoints",
      "Bhatsa River Valley & Camel Valley",
      "Tringalwadi Fort & Ghatandevi Temple",
      "Scenic Kasara Ghat road drive"
    ],
    inclusions: [
      "Round trip AC cab with driver-guide",
      "Doorstep pickup anywhere in MMR / Mumbai",
      "Fuel & driver allowance",
      "Photogenic viewpoint halts"
    ],
    exclusions: [
      "Highway toll charges & parking tickets",
      "Meals & resort expenses"
    ],
    rules: [
      "Ideal monsoon and winter nature getaway.",
      "Driver will assist with safe viewpoint parking."
    ]
  },
  {
    id: "ashtavinayak",
    title: "Ashtavinayak Sacred 8 Ganpati Yatra",
    category: "Spiritual & Pilgrimage",
    duration: "3 Days / 4 Days Tour",
    tagline: "Complete 8 Swayambhu Ganesha Temples Pilgrimage",
    shortDescription: "A soul-enriching pilgrimage covering all eight self-manifested Lord Ganesha temples across Maharashtra in canonical sacred order.",
    banner: "/assets/tours/astavinayak_final_lcm8iZIjgA.jpg",
    startingPrice: "₹12,999",
    rating: 5.0,
    reviewsCount: 460,
    bookingPackages: [
      { name: "3 Days / 2 Nights Yatra", duration: "Classic 8 Temple Circuit", price: "₹12,999" },
      { name: "4 Days / 3 Nights Yatra", duration: "Relaxed Senior Citizen Special", price: "₹16,499" }
    ],
    carTypes: ["Swift Dzire", "Maruti Ertiga (6+1)", "Kia Carens", "Innova Crysta", "Tempo Traveller (13/17)"],
    highlights: [
      "Mayureshwar (Morgaon) & Siddhivinayak (Siddhatek)",
      "Ballaleshwar (Pali) & Varadavinayak (Mahad)",
      "Chintamani (Theur) & Girijatmaj (Lenyadri Mountain Cave)",
      "Vighnahar (Ozar) & Mahaganapati (Ranjangaon)",
      "Senior citizen friendly driving with frequent rest halts"
    ],
    inclusions: [
      "Dedicated comfortable AC cab for all 3/4 days",
      "Devotional, courteous driver familiar with temple pujas",
      "Driver night stay, food allowance, and all fuel included",
      "Doorstep pickup & drop in Mumbai / Thane / Navi Mumbai"
    ],
    exclusions: [
      "Highway toll charges & parking fees",
      "Temple VIP pass, Abhishek puja & Doli/Palanquin at Lenyadri",
      "Hotel stays & meals"
    ],
    rules: [
      "Canonical temple visit order followed: Morgaon -> Siddhatek -> Theur -> Lenyadri -> Ozar -> Ranjangaon -> Mahad -> Pali -> Return to Morgaon.",
      "Specially designed for families and senior citizens with comfortable pacing."
    ]
  },
  {
    id: "jyotirlinga-maharashtra",
    title: "3 Jyotirlinga in Maharashtra",
    category: "Spiritual & Pilgrimage",
    duration: "2 Days / 3 Days Tour",
    tagline: "Holy Yatra to Trimbakeshwar, Bhimashankar & Grishneshwar",
    shortDescription: "Pay homage to three sacred Shiva Jyotirlingas along with Shirdi Sai Baba and Ellora Caves in one seamless spiritual circuit.",
    banner: "/assets/tours/jtyotirling_qDvKgpsz20.jpg",
    startingPrice: "₹9,999",
    rating: 4.9,
    reviewsCount: 390,
    bookingPackages: [
      { name: "2 Days / 1 Night Circuit", duration: "Bhimashankar + Trimbakeshwar + Shirdi", price: "₹9,999" },
      { name: "3 Days / 2 Nights Grand Tour", duration: "All 3 Jyotirlingas + Shirdi + Ellora Caves", price: "₹14,499" }
    ],
    carTypes: ["Sedan (Dzire / Etios)", "Ertiga (6+1)", "Kia Carens", "Innova Crysta", "Tempo Traveller"],
    highlights: [
      "Trimbakeshwar (Nashik - Source of Godavari)",
      "Bhimashankar (Sahyadri Forests near Pune)",
      "Grishneshwar (Near Ellora Caves, Aurangabad)",
      "Shirdi Sai Baba Samadhi Mandir darshan inclusion",
      "Panchavati & Ramkund in Nashik"
    ],
    inclusions: [
      "Dedicated commercial tourist cab with experienced highway driver",
      "Driver night charges, food allowance & fuel included",
      "Doorstep pickup & drop"
    ],
    exclusions: [
      "Toll taxes & parking receipts",
      "Special VIP Darshan / Puja receipts",
      "Hotel accommodations & food"
    ],
    rules: [
      "Clean vehicles with water bottle provision and emergency assistance.",
      "Driver assists with optimum morning darshan queue timings."
    ]
  },
  {
    id: "konkan-darshan",
    title: "Grand Konkan Coastal Tour",
    category: "Coastal & Beach",
    duration: "3 Days / 4 Days Tour",
    tagline: "720km Coastal Paradise: Forts, White Beaches & Alphonso Country",
    shortDescription: "Explore breathtaking coastal highways, pristine secluded beaches, historic sea bastions (Sindhudurg, Vijaydurg), Ganpatipule, and Malvan water sports.",
    banner: "/assets/tours/konkan_darshan_HkVaCpJLtu.jpg",
    startingPrice: "₹14,999",
    rating: 4.9,
    reviewsCount: 230,
    bookingPackages: [
      { name: "3 Days / 2 Nights Coastal Tour", duration: "Ganpatipule + Ratnagiri + Guhagar", price: "₹14,999" },
      { name: "4 Days / 3 Nights Grand Konkan", duration: "Ganpatipule + Malvan + Tarkarli + Sindhudurg", price: "₹19,499" }
    ],
    carTypes: ["Sedan (Dzire)", "Maruti Ertiga", "Kia Carens", "Innova Crysta", "Tempo Traveller"],
    highlights: [
      "Ganpatipule Swayambhu Ganesha Beach Temple",
      "Tarkarli Beach Scuba Diving & Snorkeling",
      "Sindhudurg & Vijaydurg Sea Forts",
      "Ratnagiri Thibaw Palace & Mango Orchards",
      "Coastal Ferry crossings & scenic Sagari Mahamarg drive",
      "Authentic Malvani curry & Sol Kadhi food trails"
    ],
    inclusions: [
      "Comfortable long-haul AC cab with experienced coastal driver",
      "Driver night stay, meals & fuel included",
      "Doorstep pickup & drop"
    ],
    exclusions: [
      "Toll charges, vehicle ferry tickets & parking",
      "Water sports, scuba diving & fort boat rides",
      "Hotel stay & food expenses"
    ],
    rules: [
      "Coastal highway speeds are regulated for safety and scenic enjoyment.",
      "Customizable stopovers for scenic photo points and fresh coconut water."
    ]
  }
];
