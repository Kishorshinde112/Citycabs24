// Server-Side SEO & Meta Pre-rendering Engine for CityCabs24
// Injects rich SEO tags, OpenGraph, Canonical, Schema.org JSON-LD and semantic crawlable HTML

export const SITE_URL = 'https://citycabs24.com';
export const BUSINESS_PHONE = '9833309061';
export const BUSINESS_EMAIL = 'mumbaicitycabs24@gmail.com';

export const ROUTES_SEO = {
  '/': {
    title: 'CityCabs24 - Premium Cabs & Guided Sightseeing Tours in Mumbai & Beyond',
    description: 'Book comfortable outstation & local cabs with expert guide-drivers in Mumbai. Mumbai Darshan, Lonavala, Shirdi, Alibaug, Mahabaleshwar. AC cabs from ₹2,499. Call +91 9833309061!',
    h1: 'Premium Cabs & Guided Sightseeing in Mumbai & Beyond',
    h2: 'Explore Maharashtra With Local Chauffeurs Who Know Every Spot',
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/logo.png`,
    highlights: [
      'Doorstep Pickup & Drop Anywhere Across Mumbai & Navi Mumbai',
      'Knowledgeable Driver-Guides with Deep City Insight',
      'Transparent Fixed Pricing with Zero Hidden Costs',
      'Well-Maintained AC Fleet: Swift Dzire, Ertiga, Innova Crysta, Tempo Traveller'
    ],
    pricing: 'Mumbai Darshan from ₹2,499 | Lonavala Trip from ₹3,200 | Shirdi Same-Day from ₹8,000',
    faqs: [
      {
        q: 'How do I book a tour cab with CityCabs24?',
        a: 'You can book instantly online by selecting your package and entering your pickup location, or call our 24/7 dispatch desk directly at +91 9833309061.'
      },
      {
        q: 'Are your drivers experienced with tourist sightseeing?',
        a: 'Yes! All CityCabs24 drivers are verified local chauffeurs who act as knowledgeable guides, helping you explore historical landmarks, scenic viewpoints, and local dining spots.'
      },
      {
        q: 'What types of cabs are available in your fleet?',
        a: 'We provide Sedan (Swift Dzire/Etios), 6-seater MUV (Maruti Ertiga/Kia Carens), 7-seater Luxury SUV (Innova Crysta), and 13-17 seater Tempo Travellers for groups.'
      }
    ]
  },

  '/mumbai-darshan': {
    title: 'Mumbai Darshan Cab Service & Sightseeing Tour | CityCabs24',
    description: 'Book private Mumbai Darshan cabs with expert guide-drivers. Visit Gateway of India, Marine Drive, Siddhivinayak, Bandra Bandstand & more. AC fleet from ₹2,499. Call +91 9833309061.',
    h1: 'Mumbai Darshan Cab Service & Private Sightseeing Tour',
    h2: 'Full Day Guided Sightseeing of Mumbai’s Iconic Landmarks',
    canonical: `${SITE_URL}/mumbai-darshan`,
    ogImage: `${SITE_URL}/assets/tours/mumbai-darshan-banner.webp`,
    highlights: [
      'Gateway of India & The Iconic Taj Mahal Palace Hotel',
      'Marine Drive, Nariman Point & Girgaon Chowpatty Viewing Deck',
      'Siddhivinayak Temple & Haji Ali Dargah Darshan',
      'Bandra-Worli Sea Link, Bandra Bandstand & Celebrities Homes',
      'Chhatrapati Shivaji Maharaj Terminus (CSMT) & Mani Bhavan'
    ],
    pricing: '8 Hrs / 80 Km: Sedan ₹2,499 | Ertiga ₹3,499 | Crysta ₹4,999 | Tempo Traveller ₹6,999',
    faqs: [
      {
        q: 'What are the charges for Mumbai Darshan cab service?',
        a: 'Mumbai Darshan package starts at ₹2,499 for Sedan (8 Hours / 80 Km), ₹3,499 for Ertiga SUV, and ₹4,999 for Innova Crysta with doorstep pickup and drop.'
      },
      {
        q: 'Can we customize our Mumbai Darshan itinerary?',
        a: 'Yes, absolutely! CityCabs24 offers 100% private customized tours. You can spend more time at your favorite spots or add/skip destinations according to your family’s preference.'
      },
      {
        q: 'Are toll and parking charges included in the fare?',
        a: 'Toll, parking, and monument entry tickets are pay-as-you-go as per actual receipts, ensuring complete transparency with zero hidden markups.'
      }
    ]
  },

  '/mumbai-darshan-cab-service': {
    title: 'Mumbai Darshan Cab Service & Sightseeing Tour | CityCabs24',
    description: 'Book private Mumbai Darshan cabs with expert guide-drivers. Visit Gateway of India, Marine Drive, Siddhivinayak & Bandra. AC cabs from ₹2,499. Call +91 9833309061.',
    h1: 'Mumbai Darshan Cab Service & Private Sightseeing Tour',
    h2: 'Complete City Tour by Private AC Cab',
    canonical: `${SITE_URL}/mumbai-darshan`,
    ogImage: `${SITE_URL}/logo.png`,
    highlights: [
      'Gateway of India & Marine Drive Sightseeing',
      'Siddhivinayak Temple & Mahalaxmi Temple',
      'Bandra-Worli Sea Link & Bandra Bandstand',
      'Haji Ali Dargah & Nehru Science Centre'
    ],
    pricing: 'Full Day Sightseeing starting from ₹2,499 (Sedan)',
    faqs: [
      {
        q: 'How to book Mumbai Darshan cab service?',
        a: 'Call +91 9833309061 or submit your online enquiry to book a chauffeur-driven cab with doorstep pickup.'
      }
    ]
  },

  '/lonavala-trip': {
    title: 'Mumbai to Lonavala Cab & Khandala Tour Package | CityCabs24',
    description: 'Book Mumbai to Lonavala cab package with driver-cum-guide. Visit Tiger Point, Bhushi Dam, Karla Caves & Wax Museum. AC cars from ₹3,200. Call +91 9833309061.',
    h1: 'Mumbai to Lonavala Cab Tour Package',
    h2: 'Day Trip & Weekend Gateway to Lonavala & Khandala',
    canonical: `${SITE_URL}/lonavala-trip`,
    ogImage: `${SITE_URL}/assets/tours/panvel_upscaled_image_2_HOyyQs2JHJ.webp`,
    highlights: [
      'Tiger Leap Point & Sunset Point Khandala',
      'Bhushi Dam & Pavana Lake Viewpoints',
      'Ancient Karla & Bhaja Buddhist Caves',
      'Celebrity Wax Museum & Lonavala Chikki Bazaar'
    ],
    pricing: 'Same-day return package from ₹3,200 (Sedan) / ₹4,500 (Ertiga)',
    faqs: [
      {
        q: 'What is the travel time from Mumbai to Lonavala by cab?',
        a: 'The drive via the Mumbai-Pune Expressway takes around 2 to 2.5 hours depending on your pickup location in Mumbai.'
      }
    ]
  },

  '/alibaug-sightseeing': {
    title: 'Mumbai to Alibaug Sightseeing Cab & Taxi Service | CityCabs24',
    description: 'Comfortable Mumbai to Alibaug cab service. Visit Kolaba Fort, Kashid & Kihim beaches with local driver guide. AC cab packages from ₹4,000. Call +91 9833309061.',
    h1: 'Mumbai to Alibaug Cab & Beach Sightseeing Tour',
    h2: 'Coastal Road Trip to Alibaug, Kashid & Murud Janjira',
    canonical: `${SITE_URL}/alibaug-sightseeing`,
    ogImage: `${SITE_URL}/assets/tours/alibag_rt4bWntlkB.webp`,
    highlights: [
      'Kolaba Sea Fort & Alibaug Main Beach',
      'Kashid White Sand Beach & Watersports',
      'Murud Janjira Historic Sea Fortress',
      'Kihim Beach & Authentic Konkani Seafood Stops'
    ],
    pricing: 'Day tour from ₹4,000 (Sedan) / ₹5,500 (Ertiga SUV)',
    faqs: [
      {
        q: 'Can we visit Murud Janjira Fort in a 1-day Alibaug cab tour?',
        a: 'Yes, an early morning departure from Mumbai allows you to explore both Alibaug beaches and the historic Murud Janjira fort comfortably.'
      }
    ]
  },

  '/matheran-sightseeing': {
    title: 'Mumbai to Matheran Hill Station Cab Service | CityCabs24',
    description: 'Book private cab to Matheran Dasturi Naka from Mumbai. Enjoy peaceful hill station viewpoints with doorstep pickup & drop. Call +91 9833309061 now.',
    h1: 'Mumbai to Matheran Private Cab Service',
    h2: 'Doorstep Pickup to Dasturi Car Park (Matheran)',
    canonical: `${SITE_URL}/matheran-sightseeing`,
    ogImage: `${SITE_URL}/assets/tours/matheran_82596VAAMO.webp`,
    highlights: [
      'Direct Chauffeur Drop to Dasturi Naka',
      'Scenic Western Ghats Drive via Neral',
      'Hassle-free Round Trip / Same Day Waiting Available'
    ],
    pricing: 'Round Trip from ₹3,000 (Sedan) / ₹4,200 (Ertiga)',
    faqs: [
      {
        q: 'Do cabs go all the way into Matheran?',
        a: 'Vehicles are permitted up to Dasturi Naka parking. From there, you can enjoy walking, horseback riding, or hand-pulled rickshaws inside the eco-sensitive town.'
      }
    ]
  },

  '/shirdi-tour': {
    title: 'Mumbai to Shirdi Sai Baba Temple Cab Package | CityCabs24',
    description: 'Spiritual Mumbai to Shirdi cab package with doorstep pickup. Same-day & overnight darshan options with expert highway drivers. Rates from ₹8,000. Call +91 9833309061.',
    h1: 'Mumbai to Shirdi Sai Baba Temple Cab Package',
    h2: 'Same-Day & Overnight Spiritual Darshan Tour via Samruddhi Mahamarg',
    canonical: `${SITE_URL}/shirdi-tour`,
    ogImage: `${SITE_URL}/assets/tours/shirdi_p7RAPbKB9X.jpeg`,
    highlights: [
      'Fast Drive via Samruddhi Mahamarg Expressway',
      'Doorstep Pickup Anywhere in Mumbai / Navi Mumbai',
      'Shirdi Samadhi Mandir, Dwarkamai & Chavadi Darshan',
      'Optional Extension to Shani Shingnapur'
    ],
    pricing: 'Same-day return from ₹8,000 (Sedan) / ₹10,500 (Ertiga)',
    faqs: [
      {
        q: 'How many hours does it take from Mumbai to Shirdi via Samruddhi Mahamarg?',
        a: 'With the Samruddhi Expressway, the travel time from Mumbai (Thane/Bhiwandi start) to Shirdi is now just 3.5 to 4 hours.'
      }
    ]
  },

  '/mahabaleshwar-sightseeing': {
    title: 'Mumbai to Mahabaleshwar & Panchgani Cab Tour | CityCabs24',
    description: 'Book Mumbai to Mahabaleshwar private taxi tour. Visit Arthur Seat, Venna Lake & strawberry farms with local chauffeur guide. Call +91 9833309061.',
    h1: 'Mumbai to Mahabaleshwar & Panchgani Cab Tour',
    h2: 'Multi-Day Hill Station Holiday Package',
    canonical: `${SITE_URL}/mahabaleshwar-sightseeing`,
    ogImage: `${SITE_URL}/assets/tours/mhabaleshwar_9KMZyI1jrD.webp`,
    highlights: [
      'Arthur’s Seat, Elephant’s Head Point & Wilson Point',
      'Venna Lake Boating & Mapro Garden Strawberry Farms',
      'Panchgani Table Land & Sydney Point',
      'Old Mahabaleshwar Mahadev Temple'
    ],
    pricing: '2-Day / 3-Day Custom Packages starting from ₹8,500',
    faqs: [
      {
        q: 'Do you provide cabs for multi-day stays in Mahabaleshwar?',
        a: 'Yes! We provide outstation cabs where the driver stays with you throughout the trip for local sightseeing and return transfer.'
      }
    ]
  },

  '/igatpuri-tour': {
    title: 'Mumbai to Igatpuri Nature & Waterfall Cab Tour | CityCabs24',
    description: 'Scenic Mumbai to Igatpuri cab tour package. Explore misty Sahyadri valleys, Bhavali Dam & Vipassana center with expert drivers. Call +91 9833309061.',
    h1: 'Mumbai to Igatpuri Nature & Waterfall Tour',
    h2: 'Monsoon Waterfalls & Sahyadri Valleys by Private Cab',
    canonical: `${SITE_URL}/igatpuri-tour`,
    ogImage: `${SITE_URL}/assets/tours/igatpuri_final_7NAxDp2jVq.jpg`,
    highlights: [
      'Bhavali Dam & Vaitarna Dam Waterfalls',
      'Global Vipassana Pagoda & Myanmar Gate Igatpuri',
      'Tringalwadi Fort Viewpoint & Camel Valley',
      'Ghatandevi Mandir with Kasara Ghat Panoramas'
    ],
    pricing: 'Day tour from ₹3,500 (Sedan) / ₹4,800 (Ertiga)',
    faqs: [
      {
        q: 'When is the best time to visit Igatpuri from Mumbai?',
        a: 'Monsoon (July to October) and winter (November to February) are the best seasons with lush green hills and cascading waterfalls.'
      }
    ]
  },

  '/ashtavinayak': {
    title: 'Ashtavinayak 8 Ganpati Yatra Cab Package from Mumbai | CityCabs24',
    description: 'Complete Ashtavinayak Yatra by private AC cab from Mumbai. 2 to 3 days pilgrimage covering all 8 sacred Ganesha temples. Call +91 9833309061 today.',
    h1: 'Ashtavinayak 8 Ganpati Yatra Cab Package',
    h2: 'Sacred Pilgrimage to All 8 Ganesha Temples in Maharashtra',
    canonical: `${SITE_URL}/ashtavinayak`,
    ogImage: `${SITE_URL}/assets/tours/astavinayak_final_lcm8iZIjgA.jpg`,
    highlights: [
      'Mayureshwar (Morgaon) & Siddhivinayak (Siddhatek)',
      'Ballaleshwar (Pali) & Varadavinayak (Mahad)',
      'Chintamani (Theur) & Girijatmaj (Lenyadri Caves)',
      'Vighneshwar (Ozar) & Mahaganapati (Ranjangaon)'
    ],
    pricing: '2-Day & 3-Day Complete Yatra Packages Available',
    faqs: [
      {
        q: 'How many days are required for complete Ashtavinayak Darshan?',
        a: 'A comfortable Ashtavinayak Yatra typically takes 2 days (fast-paced) or 3 days (relaxed family pace).'
      }
    ]
  },

  '/3-jyotirlinga-in-maharashtra': {
    title: '3 Jyotirlinga Maharashtra Cab Tour from Mumbai | CityCabs24',
    description: 'Book 3 Jyotirlinga pilgrimage tour by AC cab: Trimbakeshwar, Bhimashankar & Grishneshwar from Mumbai. Hassle-free darshan. Call +91 9833309061 now.',
    h1: '3 Jyotirlinga Maharashtra Cab Tour Package',
    h2: 'Sacred Shiva Darshan: Trimbakeshwar, Bhimashankar & Grishneshwar',
    canonical: `${SITE_URL}/3-jyotirlinga-in-maharashtra`,
    ogImage: `${SITE_URL}/assets/tours/jtyotirling_qDvKgpsz20.jpg`,
    highlights: [
      'Trimbakeshwar Shiva Temple (Nashik)',
      'Bhimashankar Jyotirlinga in Sahyadri Hills',
      'Grishneshwar Jyotirlinga & Ellora Caves (Chhatrapati Sambhajinagar)',
      'Experienced Chauffeurs with Temple Timings Knowledge'
    ],
    pricing: '3-Day Comprehensive Pilgrimage Package Available',
    faqs: [
      {
        q: 'Can we cover all 3 Jyotirlingas in 3 days?',
        a: 'Yes! Our custom 3-day itinerary smoothly covers Trimbakeshwar, Grishneshwar (with Ellora), and Bhimashankar with optimal resting stops.'
      }
    ]
  },

  '/konkan-darshan': {
    title: 'Konkan Darshan Coastal Road Trip Cab from Mumbai | CityCabs24',
    description: 'Explore scenic Konkan beaches, sea forts & coastal cuisine by private cab from Mumbai. Custom multi-day tour packages. Call +91 9833309061 for quotes.',
    h1: 'Konkan Darshan Coastal Road Trip Cab Package',
    h2: 'Explore Pristine Beaches, Historic Sea Forts & Konkani Culture',
    canonical: `${SITE_URL}/konkan-darshan`,
    ogImage: `${SITE_URL}/assets/tours/konkan_darshan_HkVaCpJLtu.jpg`,
    highlights: [
      'Harihareshwar, Diveagar & Shrivardhan Beaches',
      'Ganpatipule Beach & Sacred Temple',
      'Tarkarli Scuba Diving & Sindhudurg Fort',
      'Ratnagiri Alphonso Orchards & Coastal Drives'
    ],
    pricing: 'Custom 4-Day to 7-Day Coastal Road Trip Packages',
    faqs: [
      {
        q: 'Are toll and ferry crossing charges included?',
        a: 'Coastal ferry and state tolls are charged as per actual receipts.'
      }
    ]
  },

  '/tours': {
    title: 'All Sightseeing & Outstation Tour Packages | CityCabs24',
    description: 'Explore all guided sightseeing & outstation cab packages from Mumbai. Fixed rates, doorstep pickup & friendly guide drivers. Call +91 9833309061.',
    h1: 'Explore All Mumbai & Maharashtra Tour Cab Packages',
    h2: 'Local Sightseeing, Hill Stations, Pilgrimage & Coastal Road Trips',
    canonical: `${SITE_URL}/tours`,
    ogImage: `${SITE_URL}/logo.png`,
    highlights: [
      'Mumbai Darshan Sightseeing (from ₹2,499)',
      'Lonavala & Khandala Day Tours',
      'Spiritual Shirdi, Ashtavinayak & Jyotirlinga Yatras',
      'Alibaug, Mahabaleshwar & Konkan Beach Holidays'
    ],
    pricing: 'Packages from ₹2,499 with verified guide chauffeurs',
    faqs: [
      {
        q: 'Do you offer pickup from Mumbai Airport?',
        a: 'Yes, we provide 24/7 doorstep pickup from Mumbai International (T2) and Domestic (T1) airports for any tour package.'
      }
    ]
  }
};

/**
 * Builds the Schema.org JSON-LD scripts for a route
 */
export function buildSchemaScripts(routeData, path) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    'name': 'CityCabs24',
    'alternateName': ['City Cabs 24', 'CityCabs24 Mumbai'],
    'description': routeData.description,
    'url': SITE_URL,
    'logo': `${SITE_URL}/logo.png`,
    'image': `${SITE_URL}/logo.png`,
    'telephone': `+91-${BUSINESS_PHONE}`,
    'email': BUSINESS_EMAIL,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Mumbai',
      'addressRegion': 'Maharashtra',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '19.0760',
      'longitude': '72.8777'
    },
    'priceRange': '₹₹',
    'openingHoursSpecification': [{
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '00:00',
      'closes': '23:59'
    }],
    'areaServed': ['Mumbai', 'Navi Mumbai', 'Thane', 'Lonavala', 'Alibaug', 'Mahabaleshwar', 'Shirdi', 'Igatpuri']
  };

  const schemas = [localBusinessSchema];

  // Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': SITE_URL
      }
    ]
  };

  if (path !== '/' && path !== '') {
    breadcrumbSchema.itemListElement.push({
      '@type': 'ListItem',
      'position': 2,
      'name': routeData.h1 || 'Tour Package',
      'item': `${SITE_URL}${path}`
    });
  }
  schemas.push(breadcrumbSchema);

  // TouristTrip Schema
  if (path !== '/' && path !== '/tours') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      'name': routeData.h1,
      'description': routeData.description,
      'touristType': ['Family', 'Couples', 'Solo', 'Group'],
      'url': `${SITE_URL}${path}`,
      'image': routeData.ogImage,
      'provider': {
        '@type': 'TaxiService',
        'name': 'CityCabs24',
        'telephone': `+91-${BUSINESS_PHONE}`,
        'url': SITE_URL
      }
    });
  }

  // FAQPage Schema
  if (routeData.faqs && routeData.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': routeData.faqs.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.a
        }
      }))
    });
  }

  return schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n    ');
}

/**
 * Injects SEO metadata & pre-rendered crawlable content into the base template HTML
 */
export function injectSEO(htmlTemplate, rawPath, options = {}) {
  const { is404 = false } = options;
  const cleanPath = (rawPath || '/').split('?')[0].replace(/\/+$/, '') || '/';
  
  // 404 Not Found Page handling
  if (is404) {
    let output = htmlTemplate;
    output = output.replace(/<title>.*?<\/title>/is, '');
    output = output.replace(/<meta name="title" content=".*?"\s*\/?>/is, '');
    output = output.replace(/<meta name="description" content=".*?"\s*\/?>/is, '');
    
    const notFoundMeta = `
    <title>404 - Page Not Found | CityCabs24</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="The page you are looking for does not exist on CityCabs24. Explore our sightseeing tours and cab services." />
    `;
    output = output.replace('</head>', `${notFoundMeta}\n  </head>`);
    
    const notFoundShell = `
    <div id="prerendered-content" class="min-h-screen bg-zinc-950 text-white font-sans flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-3">404 - Page Not Found</h1>
      <p class="text-zinc-400 text-base max-w-md mx-auto mb-8">We couldn't find the page you were looking for. Explore our popular tour packages below.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="/tours" class="px-6 py-3 rounded-xl bg-yellow-400 text-black font-extrabold text-sm">Explore Tour Packages</a>
        <a href="/" class="px-6 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 text-sm font-bold">Back to Home</a>
        <a href="tel:+91${BUSINESS_PHONE}" class="px-6 py-3 rounded-xl bg-zinc-900 text-yellow-400 border border-yellow-400/40 text-sm font-bold">Call +91 ${BUSINESS_PHONE}</a>
      </div>
    </div>
    `;
    output = output.replace('<div id="root"></div>', `<div id="root">${notFoundShell}</div>`);
    return output;
  }

  // Non-indexable pages (Admin, Confirmation, etc.)
  if (cleanPath.startsWith('/admin') || cleanPath === '/booking-confirmed' || cleanPath === '/enquiry-received' || cleanPath === '/enquiry-confirmed') {
    return htmlTemplate.replace(
      '</head>',
      '  <meta name="robots" content="noindex, nofollow" />\n  </head>'
    );
  }

  const seo = ROUTES_SEO[cleanPath] || ROUTES_SEO['/'];
  const schemaScripts = buildSchemaScripts(seo, cleanPath);

  // 1. Build Meta Tags block
  const metaTags = `
    <!-- Dynamic Server-Side Injected SEO Meta Tags -->
    <title>${seo.title}</title>
    <meta name="title" content="${seo.title}" />
    <meta name="description" content="${seo.description}" />
    <link rel="canonical" href="${seo.canonical}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CityCabs24" />
    <meta property="og:url" content="${seo.canonical}" />
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:image" content="${seo.ogImage}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${seo.canonical}" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <meta name="twitter:image" content="${seo.ogImage}" />

    <!-- Structured Data (JSON-LD) -->
    ${schemaScripts}
  `;

  // 2. Build legitimate visible semantic HTML fallback matching the light theme
  const visiblePreRender = `
    <div id="prerendered-content" class="min-h-screen font-sans">
      <!-- EXACT Match of Navbar -->
      <div class="bg-black text-yellow-400 text-xs py-2 px-4 border-b border-yellow-500/20 hidden md:block font-bold">
        <div class="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <span class="text-zinc-300">Available 24/7 for your convenience</span>
          <div class="flex items-center space-x-4">
            <a href="tel:+91${BUSINESS_PHONE}" class="hover:text-yellow-300 flex items-center gap-1">
              <span class="text-zinc-700">|</span>
              +91 ${BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </div>
      <header class="sticky top-0 z-50 transition-all duration-300 bg-zinc-950 border-b border-zinc-800 text-white py-3.5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <a href="/" class="flex items-center gap-2.5 group">
                <img src="/assets/citycabs24-logo-80w.webp" alt="CityCabs24 Logo" class="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
                <div class="flex flex-col">
                  <span class="font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    CityCabs<span class="text-amber-500">24</span>
                  </span>
                  <span class="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest hidden sm:block">Mumbai Darshan & Outstation</span>
                </div>
              </a>
            </div>
            <div class="hidden md:flex items-center gap-5">
              <a href="/tours" class="text-sm font-semibold text-zinc-300 hover:text-white transition">Tour Packages</a>
              <a href="tel:+91${BUSINESS_PHONE}" class="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm rounded-xl transition">
                <span>+91 ${BUSINESS_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <!-- EXACT Match of Hero -->
      <main class="w-full">
        <div id="home" class="relative bg-slate-900 text-white min-h-[500px] sm:min-h-[580px] flex items-center justify-center overflow-hidden py-20 border-b border-slate-800">
          <picture class="absolute inset-0 w-full h-full pointer-events-none">
            <source media="(max-width: 639px)" type="image/webp" srcset="/assets/hero/mumbai-hero-480w.webp" />
            <source media="(max-width: 1024px)" type="image/webp" srcset="/assets/hero/mumbai-hero-768w.webp" />
            <source media="(min-width: 1025px)" type="image/webp" srcset="/assets/hero/mumbai-hero-1280w.webp 1280w, /assets/hero/mumbai-hero-1600w.webp 1600w" sizes="100vw" />
            <img src="/assets/hero/mumbai-hero.webp" alt="Mumbai Darshan Cab Service" class="w-full h-full object-cover opacity-40 transform scale-105" loading="eager" fetchpriority="high" width="1600" height="900">
          </picture>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/50"></div>
          
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div class="text-amber-400 font-serif italic text-lg sm:text-2xl tracking-wide font-normal">
              Discover the City of Dreams
            </div>
            <h1 class="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
              ${seo.h1}
            </h1>
            <p class="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              ${seo.description}
            </p>
            <div class="pt-4 flex flex-wrap justify-center items-center gap-4">
              <a href="/mumbai-darshan" class="px-7 py-3.5 rounded-xl bg-yellow-400 text-black font-extrabold text-sm shadow-xl shadow-yellow-400/20 flex items-center gap-2">
                <span>Explore Tours</span>
              </a>
              <a href="tel:+91${BUSINESS_PHONE}" class="px-7 py-3.5 rounded-xl bg-zinc-900/90 text-white font-bold text-sm border border-yellow-400/40 backdrop-blur-md flex items-center gap-2">
                <span>Call Now</span>
              </a>
            </div>
            <div class="flex justify-center items-center gap-2 pt-8">
              <span class="w-8 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/40"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/40"></span>
            </div>
          </div>
        </div>
        
        <!-- SEO Semantic Content below fold -->
        <div class="bg-slate-50 text-slate-900 max-w-7xl mx-auto px-4 py-12">
          <!-- Visually hidden but SEO crawlable content below the fold -->
          <div class="opacity-90">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">${seo.h2 || 'Tour Highlights'}</h2>
              <ul class="space-y-2 text-slate-700 list-disc list-inside">
                ${(seo.highlights || []).map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>
            
            ${(seo.faqs && seo.faqs.length > 0) ? `
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <div class="space-y-4">
                  ${seo.faqs.map(f => `
                    <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <h3 class="font-bold text-slate-900 text-base mb-2">${f.q}</h3>
                      <p class="text-slate-600 text-sm leading-relaxed">${f.a}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </main>
    </div>
  `;

  // Replace existing title and primary meta in template
  let output = htmlTemplate;
  output = output.replace(/<title>.*?<\/title>/is, '');
  output = output.replace(/<meta name="title" content=".*?"\s*\/?>/is, '');
  output = output.replace(/<meta name="description" content=".*?"\s*\/?>/is, '');
  
  // Inject new tags before </head>
  output = output.replace('</head>', `${metaTags}\n  </head>`);

  // Inject visible pre-rendered shell inside <div id="root">
  output = output.replace('<div id="root"></div>', `<div id="root">${visiblePreRender}</div>`);

  return output;
}
