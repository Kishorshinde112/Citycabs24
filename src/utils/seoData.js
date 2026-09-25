import { FAQ_DATA } from '../data/faqData';
import { TOURS_DATA } from '../data/toursData';

export const SITE_URL = 'https://citycabs24.com';

export const DEFAULT_SEO = {
  title: 'CityCabs24 - Premium Cabs & Guided Sightseeing in Mumbai',
  description: 'Book comfortable outstation & local cabs with expert drivers who act as tour guides in Mumbai. Doorstep pickup, transparent fares & 24/7 service. Call +91 9833309061!',
  canonical: `${SITE_URL}/`,
  ogImage: `${SITE_URL}/logo.png`,
};

export const TOURS_SEO = {
  'mumbai-darshan': {
    title: 'Mumbai Darshan Cab Service & Sightseeing Tour | CityCabs24',
    description: 'Book Mumbai Darshan cabs with expert guide drivers. Cover Gateway of India, Marine Drive, Siddhivinayak & more. AC fleet from ₹2,499. Call 9833309061.',
    canonical: `${SITE_URL}/mumbai-darshan`,
    slug: 'mumbai-darshan',
  },
  'lonavala-trip': {
    title: 'Lonavala & Khandala Cab Tour from Mumbai | CityCabs24',
    description: 'Book Mumbai to Lonavala cab package with driver-cum-guide. Visit Tiger Point, Bhushi Dam & Karla Caves. AC cars from ₹3,200. Call +91 9833309061.',
    canonical: `${SITE_URL}/lonavala-trip`,
    slug: 'lonavala-trip',
  },
  'alibaug-sightseeing': {
    title: 'Alibaug Sightseeing Cab & Taxi from Mumbai | CityCabs24',
    description: 'Comfortable Mumbai to Alibaug cab service. Visit Kolaba Fort, Kashid & Kihim beaches with local driver guide. Fares from ₹4,000. Call +91 9833309061.',
    canonical: `${SITE_URL}/alibaug-sightseeing`,
    slug: 'alibaug-sightseeing',
  },
  'matheran-sightseeing': {
    title: 'Matheran Hill Station Cab from Mumbai | CityCabs24',
    description: 'Book private cab to Matheran Dasturi Naka from Mumbai. Enjoy peaceful hill station viewpoints with doorstep pickup & drop. Call +91 9833309061 now.',
    canonical: `${SITE_URL}/matheran-sightseeing`,
    slug: 'matheran-sightseeing',
  },
  'shirdi-tour': {
    title: 'Shirdi Sai Baba Temple Tour Cab from Mumbai | CityCabs24',
    description: 'Spiritual Mumbai to Shirdi cab package with doorstep pickup. Same-day & overnight darshan options with expert drivers. Rates from ₹8,000. Call 9833309061.',
    canonical: `${SITE_URL}/shirdi-tour`,
    slug: 'shirdi-tour',
  },
  'mahabaleshwar-sightseeing': {
    title: 'Mahabaleshwar & Panchgani Cab Tour | CityCabs24',
    description: 'Book Mumbai to Mahabaleshwar private taxi tour. Visit Arthur\'s Seat, Venna Lake & strawberry farms with local chauffeur guide. Call +91 9833309061.',
    canonical: `${SITE_URL}/mahabaleshwar-sightseeing`,
    slug: 'mahabaleshwar-sightseeing',
  },
  'igatpuri-tour': {
    title: 'Igatpuri Nature & Waterfall Tour Cab | CityCabs24',
    description: 'Scenic Mumbai to Igatpuri cab tour package. Explore misty Sahyadri valleys, Bhavali Dam & Vipassana center with expert drivers. Call +91 9833309061.',
    canonical: `${SITE_URL}/igatpuri-tour`,
    slug: 'igatpuri-tour',
  },
  'ashtavinayak': {
    title: 'Ashtavinayak 8 Ganpati Yatra Cab Package | CityCabs24',
    description: 'Complete Ashtavinayak Yatra by private AC cab from Mumbai. 3 to 4 days pilgrimage covering all 8 sacred Ganesha temples. Call +91 9833309061 today.',
    canonical: `${SITE_URL}/ashtavinayak`,
    slug: 'ashtavinayak',
  },
  '3-jyotirlinga-in-maharashtra': {
    title: '3 Jyotirlinga Maharashtra Cab Tour | CityCabs24',
    description: 'Book 3 Jyotirlinga pilgrimage tour by AC cab: Trimbakeshwar, Bhimashankar & Grishneshwar from Mumbai. Hassle-free darshan. Call +91 9833309061 now.',
    canonical: `${SITE_URL}/3-jyotirlinga-in-maharashtra`,
    slug: '3-jyotirlinga-in-maharashtra',
  },
  'konkan-darshan': {
    title: 'Konkan Darshan Coastal Road Trip Cab | CityCabs24',
    description: 'Explore scenic Konkan beaches, sea forts & coastal cuisine by private cab from Mumbai. Custom multi-day tour packages. Call +91 9833309061 for quotes.',
    canonical: `${SITE_URL}/konkan-darshan`,
    slug: 'konkan-darshan',
  },
  'tours': {
    title: 'All Sightseeing & Outstation Tour Packages | CityCabs24',
    description: 'Explore all guided sightseeing & outstation cab packages from Mumbai. Fixed rates, doorstep pickup & friendly guide drivers. Call +91 9833309061.',
    canonical: `${SITE_URL}/tours`,
    slug: 'tours',
  }
};

export function getFullImageUrl(imagePath) {
  if (!imagePath) return `${SITE_URL}/logo.png`;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${SITE_URL}${cleanPath}`;
}

export function getLocalBusinessSchema(phone = '9833309061') {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    'name': 'CityCabs24',
    'alternateName': ['City Cabs 24', 'CityCabs24 Mumbai'],
    'description': 'Professional cab service offering drivers who act as tour guides. Explore Mumbai, Lonavala, Alibaug, Mahabaleshwar, Matheran, Shirdi, Igatpuri, Konkan, Ashtavinayak, and Jyotirlinga with comfortable and reliable cab services.',
    'url': SITE_URL,
    'logo': `${SITE_URL}/logo.png`,
    'image': `${SITE_URL}/logo.png`,
    'telephone': `+91-${phone}`,
    'email': 'mumbaicitycabs24@gmail.com',
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
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '00:00',
        'closes': '23:59'
      }
    ],
    'priceRange': '₹₹',
    'areaServed': [
      'Mumbai',
      'Navi Mumbai',
      'Thane',
      'Lonavala',
      'Alibaug',
      'Mahabaleshwar',
      'Matheran',
      'Shirdi',
      'Igatpuri',
      'Konkan',
      'Ashtavinayak',
      'Jyotirlinga'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Tour Services',
      'itemListElement': TOURS_DATA.map((t) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': t.title,
          'description': t.shortDescription || t.tagline,
          'url': `${SITE_URL}/${t.slug || t.id}`
        }
      }))
    }
  };
}

export function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

export function getTouristTripSchema({ tourName, description, slug, banner, rates = [], startingPrice }) {
  const tripOffers = rates.length > 0 ? rates.map((r) => ({
    '@type': 'Offer',
    'name': `${r.vehicle} Package`,
    'price': (r.cols?.[0] || startingPrice || '₹2,499').replace(/[^0-9]/g, ''),
    'priceCurrency': 'INR',
    'availability': 'https://schema.org/InStock',
    'url': `${SITE_URL}/${slug}`
  })) : [
    {
      '@type': 'Offer',
      'price': (startingPrice || '₹2,499').replace(/[^0-9]/g, ''),
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'url': `${SITE_URL}/${slug}`
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    'name': tourName,
    'description': description,
    'touristType': ['Family', 'Couples', 'Solo', 'Group'],
    'url': `${SITE_URL}/${slug}`,
    'image': getFullImageUrl(banner),
    'provider': {
      '@type': 'TaxiService',
      'name': 'CityCabs24',
      'telephone': '+91-9833309061',
      'url': SITE_URL
    },
    'offers': tripOffers
  };
}
