import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function migrateFullContent() {
  console.log('=== CITYCABS24 COMPLETE CONTENT MIGRATION SCRIPT ===')
  const payload = await getPayload({ config: configPromise })

  // ==========================================
  // 1. SEED / UPDATE HOMEPAGE DOCUMENT
  // ==========================================
  console.log('\n[1/4] Seeding Homepage in Pages collection...')

  const homeLayout = [
    {
      blockType: 'hero',
      title: 'Affordable & Reliable Cabs in Mumbai',
      subtitle: 'Doorstep pickup, expert drivers who act as guides, and transparent pricing for local and outstation trips.',
      banner: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
    },
    {
      blockType: 'tourGrid',
      title: 'Explore Mumbai & Beyond',
    },
    {
      blockType: 'whyChooseUs',
      title: 'Why Choose CityCabs24?',
      subtitle: 'Premium service with zero hidden charges & 24/7 dedicated assistance',
    },
    {
      blockType: 'fleet',
      title: 'Our Cabs Gallery',
    },
    {
      blockType: 'testimonials',
      title: 'What Our Customers Say',
    },
    {
      blockType: 'gallery',
      title: 'Memories from Our Tours',
    },
    {
      blockType: 'about',
      title: 'About CityCabs24',
      subtitle: 'Mumbai’s Trusted Travel Partner Since 2018',
    },
    {
      blockType: 'faq',
      title: 'Frequently Asked Questions',
    },
    {
      blockType: 'bookingContactForm',
      title: 'Book Your Cab or Contact Us',
    },
  ]

  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })

  if (existingHome.docs.length > 0) {
    const homeDoc = existingHome.docs[0]
    await payload.update({
      collection: 'pages',
      id: homeDoc.id,
      data: {
        title: 'Home',
        slug: 'home',
        layout: homeLayout as any,
        seo: {
          title: 'CityCabs24 - Best Cab & Taxi Service in Mumbai',
          description: 'Book sanitized, affordable cabs for Mumbai Darshan, Outstation trips & Airport transfers. Expert guide-drivers, transparent pricing, 24/7 support.',
          canonical: 'https://citycabs24.com',
        },
      },
    })
    console.log(`✓ Updated existing Homepage doc (ID: ${homeDoc.id}) with 9 complete blocks.`)
  } else {
    const createdHome = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        layout: homeLayout as any,
        seo: {
          title: 'CityCabs24 - Best Cab & Taxi Service in Mumbai',
          description: 'Book sanitized, affordable cabs for Mumbai Darshan, Outstation trips & Airport transfers. Expert guide-drivers, transparent pricing, 24/7 support.',
          canonical: 'https://citycabs24.com',
        },
      },
    })
    console.log(`✓ Created new Homepage doc (ID: ${createdHome.id}) with 9 complete blocks.`)
  }

  // ==========================================
  // 2. SEED / UPDATE ALL 10 TOUR DOCUMENTS
  // ==========================================
  console.log('\n[2/4] Seeding 10 Complete Tour Documents in Tours collection...')

  const toursData = [
    {
      slug: 'mumbai-darshan',
      title: 'Mumbai Darshan',
      subtitle: 'Discover Mumbai\'s iconic landmarks with expert local driver-guides',
      heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
      description: 'Explore Mumbai\'s iconic landmarks with expert drivers who know every historic corner, scenic seaside view, and hidden culinary gem.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        '(Flexible pick-up timing and doorstep pick up)',
        'You can add or skip places of your choice.',
        'You can take your own time at each spot.',
        'Cancellation charge of Rs 500/- will be applicable if the booking is Cancelled after arrival of driver',
        'Night Allowance of Rs.500/- will be applicable after 11pm (Only for Tempo Traveller)',
        'All bookings are charged for the full package duration. For eg, if you book 8 hours and 80 km, even if you return the car in 6 hrs, you still must pay for the full 8 you booked (Applicable on all packages)',
        'Time and kilometres are calculated from your pickup point to pickup point (if the drop location is different then extra charges might applicable)',
      ],
      attractionTitle: 'Tour Highlights points to visit',
      attractions: [
        { name: 'Gateway of India', desc: 'Historic 20th-century monument overlooking the Arabian Sea' },
        { name: 'Taj Mahal Palace Hotel', desc: 'Legendary luxury hotel with iconic heritage architecture' },
        { name: 'Marine Drive', desc: 'Queen\'s Necklace promenade with stunning seaside views' },
        { name: 'Girgaon Chowpatty Viewing Deck', desc: 'Famous beach known for Mumbai street food and scenic sunset' },
        { name: 'Kamla Nehru Park', desc: 'Lush park on Malabar Hill with the Old Woman\'s Shoe' },
        { name: 'Hanging Gardens', desc: 'Terraced gardens perched at the top of Malabar Hill' },
        { name: 'Taraporewala Aquarium', desc: 'India\'s oldest aquarium featuring marine life' },
        { name: 'Chhatrapati Shivaji Maharaj Museum', desc: 'Premier art and history museum in Mumbai' },
        { name: 'Flora Fountain', desc: 'Historic architectural landmark at Hutatma Chowk' },
        { name: 'Elephanta Caves', desc: 'Ancient rock-cut cave temples on Elephanta Island' },
        { name: 'Haji Ali Dargah', desc: 'Iconic mosque and tomb situated on an islet in Worli Bay' },
        { name: 'Mahalaxmi Temple', desc: 'Celebrated Hindu temple dedicated to Goddess Lakshmi' },
        { name: 'Mahalaxmi Racecourse', desc: 'Historic horse-racing track spanning 225 acres' },
        { name: 'Chhatrapati Shivaji Maharaj Terminus', desc: 'UNESCO World Heritage railway terminus' },
        { name: 'Colaba Causeway', desc: 'Vibrant street shopping hub with cafes and boutiques' },
        { name: 'Worli Sea Face', desc: 'Picturesque coastal promenade with waves crashing on rocks' },
        { name: 'Nehru Planetarium Science Centre', desc: 'Famous astronomical and interactive science museum' },
        { name: 'Siddhivinayak Temple', desc: 'Renowned temple dedicated to Lord Shri Ganesha' },
        { name: 'Bandra-Worli Sea Link', desc: 'Modern 8-lane cable-stayed bridge spanning Mahim Bay' },
        { name: 'Bandra Bandstand', desc: 'Celebrity residences and scenic rocky shoreline walk' },
        { name: 'Mount Mary Basilica', desc: 'Centuries-old Roman Catholic basilica in Bandra' },
        { name: 'Juhu Beach', desc: 'Sprawling sandy beach famous for sunsets and Mumbai snacks' },
        { name: 'ISKCON Temple, Juhu', desc: 'Grand spiritual complex dedicated to Lord Krishna' },
      ],
      rateColumns: ['8 Hrs / 80 Kms', '10 Hrs / 100 Kms', '12 Hrs / 120 Kms', 'Extra Kms / Extra Hrs'],
      rates: [
        { vehicle: 'WagonR', h8: '₹2300', h10: '₹2800', h12: '₹3400', extra: '₹12/km\n₹120/hr' },
        { vehicle: 'Sedan', h8: '₹2500', h10: '₹3200', h12: '₹3800', extra: '₹14/km\n₹140/hr' },
        { vehicle: 'Ertiga', h8: '₹3200', h10: '₹3800', h12: '₹4400', extra: '₹16/km\n₹160/hr' },
        { vehicle: 'Kia Carens', h8: '₹3500', h10: '₹4200', h12: '₹4800', extra: '₹18/km\n₹180/hr' },
        { vehicle: 'Crysta', h8: '₹3800', h10: '₹4500', h12: '₹5200', extra: '₹20/km\n₹200/hr' },
      ],
      tempoTraveller13Rate: 'Rs.8500/-',
      tempoTraveller17Rate: 'Rs.9500/-',
      coverageDetails: 'In the 8 Hrs / 80 Kms package, around 8–10 places can be covered.\nIn the 10 Hrs / 100 Kms package, around 10–12 places can be covered.\nIn the 12 Hrs / 120 Kms package, around 14 or more places can be covered.\nFor Tempo Traveller only ( 12 hrs 100 kms ) packages are available.\n(The mentioned numbers may vary depending on traffic conditions and time spent at each location.)',
      tripType: 'Mumbai Darshan',
      seoTitle: 'Mumbai Darshan Cab Service | Sightseeing Taxi Fare @ ₹2,299',
      seoDescription: 'Book Mumbai Darshan cab service with professional driver guides. AC hatchback, sedan, Ertiga & Innova Crysta for Mumbai city sightseeing.',
    },
    {
      slug: 'lonavala-trip',
      title: 'Lonavala Trip',
      subtitle: 'Weekend Gateway to the Sahyadri Hills',
      heroImage: 'https://images.unsplash.com/photo-1568824432553-9f7de742c24d?auto=format&fit=crop&w=1920&q=80',
      description: 'Lonavala is a charming hill station nestled in the Western Ghats, just 83 km from Mumbai. Famous for its misty valleys, scenic viewpoints, ancient caves, and the sweetest chikki, it\'s the perfect weekend escape from city life.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Lonavala → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Top Attractions',
      attractions: [
        { emoji: '🌊', name: 'Tiger\'s Leap (Tiger Point)', desc: 'A dramatic cliff edge resembling a tiger\'s leap with breathtaking valley views.' },
        { emoji: '🌊', name: 'Bhushi Dam', desc: 'Popular water cascades over stepped stone embankments — a monsoon favourite.' },
        { emoji: '🦁', name: 'Lion\'s Point', desc: 'Sunset viewpoint overlooking the twin valleys of Lonavala and Khandala.' },
        { emoji: '💎', name: 'Rajmachi Point', desc: 'Panoramic viewpoint with views of Rajmachi Fort.' },
        { emoji: '💧', name: 'Kune Falls', desc: 'One of Maharashtra\'s highest waterfalls, spectacular during monsoon.' },
        { emoji: '🏊', name: 'Lonavala Lake', desc: 'Peaceful lake surrounded by hills, great for picnics and morning walks.' },
        { emoji: '🏛️', name: 'Karla & Bhaja Caves', desc: 'Ancient Buddhist rock-cut cave temples from the 2nd century BCE.' },
        { emoji: '🍬', name: 'Lonavala Chikki & Fudge', desc: 'Famous local sweets — don\'t leave without buying the iconic chikki!' },
      ],
      rateColumns: ['Same-Day Return (300 Kms)', '2 Days, 1 Night (500 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹4500', col2: '₹7600' },
        { vehicle: 'Ertiga', col1: '₹5200', col2: '₹8800' },
        { vehicle: 'Kia Carens', col1: '₹5800', col2: '₹9800' },
        { vehicle: 'Crysta', col1: '₹6400', col2: '₹10800' },
      ],
      tripType: 'Lonavala Trip',
      seoTitle: 'Mumbai to Lonavala Cab Service | One Way & Return Taxi',
      seoDescription: 'Book Mumbai to Lonavala taxi with CityCabs24. Comfortable AC cabs, doorstep pickup, transparent pricing with no hidden charges.',
    },
    {
      slug: 'alibaug-sightseeing',
      title: 'Alibaug Sightseeing',
      subtitle: 'Coastal Charm — Beaches, Sea Forts & Seafood',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
      description: 'Alibaug is a coastal town just 95 km from Mumbai, known for its beautiful beaches, historic sea forts, and laid-back coastal vibe. Often called the \'Goa of Maharashtra\', it\'s the perfect quick getaway for a sun, sea and seafood experience.',
      rules: [
        'Toll parking, ferry charges, and entry tickets are not included in car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Alibaug → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Must-Visit Places',
      attractions: [
        { emoji: '🏖️', name: 'Alibaug Beach', desc: 'Clean and serene beach perfect for relaxation.' },
        { emoji: '🏰', name: 'Kolaba Fort', desc: 'Historic sea fort accessible during low tide.' },
        { emoji: '🏖️', name: 'Nagaon Beach', desc: 'Popular for water sports and activities.' },
        { emoji: '🏛️', name: 'Kanakeshwar Temple', desc: 'Ancient temple with panoramic views.' },
        { emoji: '🏖️', name: 'Varsoli Beach', desc: 'Serene and clean beach.' },
        { emoji: '🏖️', name: 'Kihim Beach', desc: 'Largest beach with usual vendors and rides.' },
        { emoji: '🐆', name: 'Phansad Wildlife Sanctuary', desc: 'Wildlife sanctuary near Mumbai.' },
        { emoji: '🏖️', name: 'Akshi Beach', desc: 'Lesser-known beach near Alibaug.' },
        { emoji: '🏛️', name: 'Vikram Vinayak Temple (Birla Temple)', desc: 'Temple dedicated to Lord Vishnu and Goddess Lakshmi.' },
        { emoji: '🏰', name: 'Murud Janjira Fort', desc: 'Nearby historic fort, around 50 km from Alibaug.' },
      ],
      rateColumns: ['Same-Day Return (300 Kms)', '2 Days, 1 Night (500 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹4500', col2: '₹7600' },
        { vehicle: 'Ertiga', col1: '₹5200', col2: '₹8800' },
        { vehicle: 'Kia Carens', col1: '₹5800', col2: '₹9800' },
        { vehicle: 'Crysta', col1: '₹6400', col2: '₹10800' },
      ],
      tripType: 'Alibaug Sightseeing',
      seoTitle: 'Mumbai to Alibaug Cab Service | Tour Packages & Taxi Fare',
      seoDescription: 'Book Mumbai to Alibaug cab for sightseeing, beach trips & sea fort exploration. Verified drivers & affordable AC car rentals.',
    },
    {
      slug: 'matheran-sightseeing',
      title: 'Matheran Sightseeing',
      subtitle: 'India\'s Only No-Vehicle Hill Station',
      heroImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1920&q=80',
      description: 'Matheran is India\'s smallest and only eco-sensitive hill station where motor vehicles are banned. Located just 80 km from Mumbai, it offers red laterite roads, forested trails, and stunning viewpoints — a perfect digital detox.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Matheran → Drop',
        'Note: No motorized vehicles allowed inside Matheran — explore on foot or by horse',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Top Attractions',
      attractions: [
        { emoji: '🌅', name: 'Panorama Point', desc: 'The most popular viewpoint offering a 360° panoramic view of the surrounding hills.' },
        { emoji: '🌊', name: 'Charlotte Lake', desc: 'A serene lake and the main water source of Matheran, perfect for peaceful walks.' },
        { emoji: '🛤️', name: 'Toy Train Ride', desc: 'Iconic narrow-gauge heritage railway from Neral to Matheran through dense forests.' },
        { emoji: '🦅', name: 'Louisa Point', desc: 'Breathtaking views of the Prabal and Matheran valleys.' },
        { emoji: '🌿', name: 'Echo Point', desc: 'Famous for its natural echo effect with stunning valley views.' },
        { emoji: '🏇', name: 'Horse Riding', desc: 'Explore the no-vehicle zone on horseback — a unique Matheran experience.' },
        { emoji: '🌁', name: 'One Tree Hill Point', desc: 'A calm viewpoint with dramatic valley scenery, especially beautiful at dusk.' },
        { emoji: '🔭', name: 'Hart Point', desc: 'Offers spectacular views of Prabal Fort and the surrounding landscape.' },
      ],
      rateColumns: ['Same-Day Return (250 Kms)', '2 Days, 1 Night (500 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹3800', col2: '₹7600' },
        { vehicle: 'Ertiga', col1: '₹4400', col2: '₹8800' },
        { vehicle: 'Kia Carens', col1: '₹4900', col2: '₹9800' },
        { vehicle: 'Crysta', col1: '₹5400', col2: '₹10800' },
        { vehicle: 'A/C Tempo Traveller', col1: '₹7800', col2: '₹15600' },
      ],
      tripType: 'Matheran Sightseeing',
      seoTitle: 'Mumbai to Matheran Cab Service | Taxi Fares & Booking',
      seoDescription: 'Book Mumbai to Matheran (Dasturi Naka) taxi with CityCabs24. Reliable service, punctual drivers, and best rates for weekend getaways.',
    },
    {
      slug: 'shirdi-tour',
      title: 'Shirdi Tour',
      subtitle: 'Spiritual Journey to Sai Baba\'s Abode',
      heroImage: 'https://images.unsplash.com/photo-1604946114042-dafac5b93cc4?auto=format&fit=crop&w=1920&q=80',
      description: 'Shirdi is one of India\'s most revered pilgrimage destinations, home to the sacred shrine of Sai Baba. Experience divine peace and spirituality with our expert driver-guides.',
      rules: [
        'Toll charges, parking, and entry fees not included in car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Shirdi Tour → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Places to Visit',
      attractions: [
        { emoji: '🕉️', name: 'Sai Baba Temple', desc: 'Main shrine and spiritual center of Shirdi.' },
        { emoji: '🙏', name: 'Shani Shingnapur', desc: 'Famous temple village known for Lord Shani — can be included in the tour.' },
      ],
      rateColumns: ['Same-Day Return (550 Kms)', '2 Days, 1 Night (600 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹8000', col2: '₹9000' },
        { vehicle: 'Ertiga', col1: '₹9200', col2: '₹10400' },
        { vehicle: 'Kia Carens', col1: '₹10300', col2: '₹11600' },
        { vehicle: 'Crysta', col1: '₹11400', col2: '₹12800' },
      ],
      tripType: 'Shirdi Tour',
      seoTitle: 'Mumbai to Shirdi Cab Service | Same Day & Overnight Taxi',
      seoDescription: 'Reliable Mumbai to Shirdi Sai Baba darshan cab service. Doorstep pickup, clean vehicles, experienced highway drivers. Book online now.',
    },
    {
      slug: 'mahabaleshwar-sightseeing',
      title: 'Mahabaleshwar Sightseeing',
      subtitle: 'Queen of Hill Stations — Scenic Beauty & Cool Breeze',
      heroImage: 'https://images.unsplash.com/photo-1545158535-c3f7168c28b6?auto=format&fit=crop&w=1920&q=80',
      description: 'Mahabaleshwar is Maharashtra\'s premier hill station, located at 1,372 metres in the Western Ghats. Blessed with lush strawberry farms, colonial-era points, ancient temples, and cool misty weather, it\'s the perfect escape from the city.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Mahabaleshwar → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Top Attractions',
      attractions: [
        { emoji: '🌅', name: 'Wilson Point (Sunrise Point)', desc: 'The highest point in Mahabaleshwar offering stunning sunrise views.' },
        { emoji: '🏔️', name: 'Arthur\'s Seat', desc: 'Known as the "Queen of all Points" — dramatic cliffs with panoramic views.' },
        { emoji: '🌊', name: 'Venna Lake', desc: 'Serene lake perfect for boating and relaxation amidst nature.' },
        { emoji: '🛕', name: 'Mahabaleshwar Temple', desc: 'Ancient temple dedicated to Lord Shiva; the town\'s name derives from it.' },
        { emoji: '🍓', name: 'Strawberry Garden', desc: 'Mahabaleshwar is famous for its fresh strawberries — don\'t miss the farms!' },
        { emoji: '🌿', name: 'Pratapgad Fort', desc: 'Historic Maratha fort where Shivaji Maharaj defeated Afzal Khan.' },
        { emoji: '💧', name: 'Lingmala Waterfall', desc: 'Beautiful waterfall cascading down rocky cliffs; stunning during monsoon.' },
        { emoji: '🦋', name: 'Elephants Head Point', desc: 'A rocky outcrop resembling an elephant\'s head with scenic valley views.' },
        { emoji: '🔭', name: 'Kate\'s Point', desc: 'Overlooks the Krishna Valley and Dhom Dam — ideal for photography.' },
      ],
      rateColumns: ['2 Days, 1 Night (450 Kms)', '3 Days, 2 Nights (600 Kms)', 'Extra Km'],
      rates: [
        { vehicle: 'Sedan', col1: '₹6600', col2: '₹9000' },
        { vehicle: 'Ertiga', col1: '₹7600', col2: '₹10400' },
        { vehicle: 'Kia Carens', col1: '₹8500', col2: '₹10600' },
        { vehicle: 'Crysta', col1: '₹9400', col2: '₹12800' },
      ],
      tripType: 'Mahabaleshwar Sightseeing',
      seoTitle: 'Mumbai to Mahabaleshwar Cab Service | Weekend Taxi Package',
      seoDescription: 'Book Mumbai to Mahabaleshwar & Panchgani cabs. Enjoy scenic viewpoints, strawberry farms & Pratapgad Fort with safe outstation drivers.',
    },
    {
      slug: 'igatpuri-tour',
      title: 'Igatpuri Tour',
      subtitle: 'Hills, Waterfalls & Dams',
      heroImage: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80',
      description: 'Igatpuri is a small hill town in the Western Ghats, located in Nashik district of Maharashtra. It\'s best known for its scenic beauty, cool climate, and peaceful vibe — especially popular with travelers from Mumbai and Pune looking for a quick nature getaway.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Igatpuri tour → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Top Attractions',
      attractions: [
        { emoji: '🌄', name: 'Kasara Ghat', desc: 'Scenic mountain pass with breathtaking valley views, especially beautiful during monsoon.' },
        { emoji: '🕉️', name: 'Kapaleshwar Cave', desc: 'A peaceful cave temple dedicated to Lord Shiva.' },
        { emoji: '🙏', name: 'Ghatandevi Mata Mandir', desc: 'Surrounded by hills, perfect for a spiritual and nature-filled visit.' },
        { emoji: '🚪', name: 'Myanmar Gate', desc: 'A grand entrance near Vipassana, inspired by Burmese architecture.' },
        { emoji: '💧', name: 'Ashoka Waterfall Vihigaon', desc: 'A popular waterfall known for adventure activities like rappelling.' },
        { emoji: '🌊', name: 'Bhavali Dam', desc: 'Calm and scenic dam ideal for relaxing and photography.' },
        { emoji: '🏰', name: 'Tringalwadi Fort', desc: 'A trekking spot with panoramic views from the top.' },
        { emoji: '⛰️', name: 'Camel Valley', desc: 'Known for dramatic cliffs and seasonal waterfalls.' },
        { emoji: '🌿', name: 'Bhatsa River Valley', desc: 'A lush green valley with misty landscapes and river views.' },
        { emoji: '🧘', name: 'Vipassana International Academy', desc: 'World-famous meditation center offering a peaceful environment.' },
      ],
      rateColumns: ['Same-Day Return (350 Kms)', '2 Days, 1 Night (600 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹5200', col2: '₹9000' },
        { vehicle: 'Ertiga', col1: '₹6000', col2: '₹10400' },
        { vehicle: 'Kia Carens', col1: '₹6700', col2: '₹11600' },
        { vehicle: 'Crysta', col1: '₹7400', col2: '₹12800' },
      ],
      tripType: 'Igatpuri Tour',
      seoTitle: 'Mumbai to Igatpuri Cab Service | Nature & Waterfall Taxi',
      seoDescription: 'Book Mumbai to Igatpuri cab service. Experience Kasara Ghat, Vipassana, waterfalls and dams with top-rated drivers and comfortable cabs.',
    },
    {
      slug: 'ashtavinayak',
      title: 'Ashtavinayak',
      subtitle: 'Spiritual Trail of Lord Ganesha',
      heroImage: 'https://images.unsplash.com/photo-1546961342-ea5f62d951f0?auto=format&fit=crop&w=1920&q=80',
      description: 'Ashtavinayak refers to the sacred pilgrimage of eight Ganesha temples across Maharashtra. \'Ashta\' means eight and \'Vinayak\' is a name of Ganesha. Experience the divine grace of all eight swayambhu (self-manifest) Ganeshas.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Ashtavinayak → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'The 8 Sacred Temples',
      attractions: [
        { emoji: '🐘', name: 'Mayureshwar Temple (Morgaon)', desc: 'Starting & ending point of the yatra; Ganesha defeated the demon Sindhu here.' },
        { emoji: '🐘', name: 'Siddhivinayak Temple (Siddhatek)', desc: 'Known for granting wishes and success (siddhi).' },
        { emoji: '🐘', name: 'Ballaleshwar Temple (Pali)', desc: 'The only Ganesha temple named after a devotee (Ballal).' },
        { emoji: '🐘', name: 'Varadavinayak Temple (Mahad)', desc: 'Associated with blessings and boons (varada).' },
        { emoji: '🐘', name: 'Chintamani Temple (Theur)', desc: 'Believed to relieve worries (chinta).' },
        { emoji: '🐘', name: 'Girijatmaj Temple (Lenyadri)', desc: 'Located in caves; associated with Ganesha\'s childhood.' },
        { emoji: '🐘', name: 'Vighneshwar Temple (Ozar)', desc: 'Worshipped as the remover of obstacles (vighna).' },
        { emoji: '🐘', name: 'Mahaganapati Temple (Ranjangaon)', desc: 'Represents Ganesha in his most powerful form.' },
      ],
      rateColumns: ['3 Days, 2 Nights (900 Kms)', '4 Days, 3 Nights (1000 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹13500', col2: '₹15200' },
        { vehicle: 'Ertiga', col1: '₹15600', col2: '₹17600' },
        { vehicle: 'Kia Carens', col1: '₹17400', col2: '₹19600' },
        { vehicle: 'Crysta', col1: '₹19200', col2: '₹21600' },
      ],
      tripType: 'Ashtavinayak Tour',
      seoTitle: 'Ashtavinayak Darshan Cab from Mumbai | 8 Ganpati Tour Package',
      seoDescription: 'Complete Ashtavinayak yatra from Mumbai by private AC cab. Covering all 8 swayambhu Ganesha temples with experienced pilgrimage drivers.',
    },
    {
      slug: '3-jyotirlinga-in-maharashtra',
      title: '3 Jyotirlinga in Maharashtra',
      subtitle: 'Sacred Pilgrimage — Trimbakeshwar, Bhimashankar & Grishneshwar',
      heroImage: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1920&q=80',
      description: 'Maharashtra is blessed with 5 of the 12 sacred Jyotirlingas (divine abodes of Lord Shiva). Our popular 3 Jyotirlinga tour covers Trimbakeshwar, Bhimashankar, and Grishneshwar — a divine circuit through the heartland of Maharashtra.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → 3 Jyotirlinga → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Pilgrimage Stops',
      attractions: [
        { emoji: '🕉️', name: 'Trimbakeshwar (Nashik)', desc: 'One of the 12 Jyotirlingas; the source of the sacred Godavari river. Located near Nashik.' },
        { emoji: '🕉️', name: 'Bhimashankar (Pune)', desc: 'Located in the Sahyadri Hills; also a wildlife sanctuary. One of the most scenic Jyotirlingas.' },
        { emoji: '🕉️', name: 'Grishneshwar (Aurangabad)', desc: 'The last of the 12 Jyotirlingas; located near the UNESCO World Heritage Ellora Caves.' },
        { emoji: '🏛️', name: 'Ellora Caves (Optional)', desc: 'UNESCO World Heritage Site with remarkable rock-cut architecture near Grishneshwar.' },
        { emoji: '🛕', name: 'Nashik City Temples', desc: 'Explore the holy city of Nashik with its many ghats and ancient temples.' },
      ],
      rateColumns: ['2 Days, 1 Night (900 Kms)', '3 Days, 2 Nights (1000 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹13200', col2: '₹14900' },
        { vehicle: 'Ertiga', col1: '₹15200', col2: '₹17200' },
        { vehicle: 'Kia Carens', col1: '₹17000', col2: '₹19200' },
        { vehicle: 'Crysta', col1: '₹18800', col2: '₹21200' },
      ],
      tripType: '3 Jyotirlinga Tour',
      seoTitle: '3 Jyotirlinga Tour from Mumbai | Trimbakeshwar Bhimashankar Grishneshwar',
      seoDescription: 'Book 3 Jyotirlinga tour package from Mumbai. Private AC cab covering Trimbakeshwar, Bhimashankar & Grishneshwar temples with reliable driver.',
    },
    {
      slug: 'konkan-darshan',
      title: 'Konkan Darshan',
      subtitle: 'Coastal Paradise — Beaches, Forts & Seafood',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
      description: 'The Konkan coastline is Maharashtra\'s hidden treasure — a stretch of pristine beaches, ancient sea forts, tropical greenery, and the freshest Malvani seafood. Our Konkan Darshan tour takes you through the best of Sindhudurg, Ratnagiri, and beyond.',
      rules: [
        'Toll parking and entry tickets are not included in the car hire charges',
        'Remaining time and kms can\'t be used to cover local places in Mumbai',
        'The trip should be: Pickup → Konkan Darshan → Drop',
        'City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)',
        'You can add or skip places of your choice. You can take your own time at each spot',
        'Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver',
      ],
      attractionTitle: 'Places to Explore',
      attractions: [
        { emoji: '🏖️', name: 'Ganpatipule Beach', desc: 'Famous for its swayambhu Ganesh temple right on the beach; stunning coastal scenery.' },
        { emoji: '🏰', name: 'Sindhudurg Fort', desc: 'A magnificent sea fort built by Chhatrapati Shivaji Maharaj on a small island.' },
        { emoji: '🌊', name: 'Tarkarli Beach', desc: 'Known for crystal-clear water, scuba diving, and snorkeling opportunities.' },
        { emoji: '🐊', name: 'Malvan Marine Sanctuary', desc: 'Diverse marine life and coral reefs; ideal for water sports lovers.' },
        { emoji: '🛕', name: 'Sawantwadi Palace', desc: 'Royal palace of the Sawantwadi kingdom, famous for traditional wooden lacquerware.' },
        { emoji: '🌿', name: 'Amboli Ghat', desc: 'One of Maharashtra\'s highest ghats; stunning waterfalls and lush biodiversity.' },
        { emoji: '🐠', name: 'Vengurla Beach', desc: 'Quiet and pristine beach, perfect for peaceful relaxation and seafood.' },
        { emoji: '🍤', name: 'Ratnagiri', desc: 'Famous for Alphonso mangoes, Ratnadurg Fort, and the Konkan\'s coastal charm.' },
      ],
      rateColumns: ['3 Days, 2 Nights (900 Kms)', '4 Days, 3 Nights (1000 Kms)'],
      rates: [
        { vehicle: 'Sedan', col1: '₹13500', col2: '₹15200' },
        { vehicle: 'Ertiga', col1: '₹15600', col2: '₹17600' },
        { vehicle: 'Kia Carens', col1: '₹17400', col2: '₹19600' },
        { vehicle: 'Crysta', col1: '₹19200', col2: '₹21600' },
      ],
      tripType: 'Konkan Darshan',
      seoTitle: 'Mumbai to Konkan Darshan Cab Package | Ganpatipule Tarkarli Malvan',
      seoDescription: 'Explore the pristine Konkan coast from Mumbai with private AC cabs. Ganpatipule, Tarkarli scuba diving, Sindhudurg Fort & authentic Malvani food.',
    },
  ]

  for (const tour of toursData) {
    const existingTour = await payload.find({
      collection: 'tours',
      where: { slug: { equals: tour.slug } },
    })

    const tourLayout = [
      {
        blockType: 'tourDetails',
        tourName: tour.title,
        subtitle: tour.subtitle,
        heroImage: tour.heroImage,
        description: tour.description,
        rules: tour.rules.map((r) => ({ text: r })),
        attractionTitle: tour.attractionTitle,
        attractions: tour.attractions.map((a) => ({
          emoji: a.emoji || '📍',
          name: a.name,
          desc: a.desc || '',
        })),
        rateColumns: tour.rateColumns.map((c) => ({ colName: c })),
        rates: tour.rates.map((r: any) => ({
          vehicle: r.vehicle,
          h8: r.h8 || '',
          h10: r.h10 || '',
          h12: r.h12 || '',
          extra: r.extra || '',
          col1: r.col1 || '',
          col2: r.col2 || '',
        })),
        tempoTraveller13Rate: (tour as any).tempoTraveller13Rate || '',
        tempoTraveller17Rate: (tour as any).tempoTraveller17Rate || '',
        coverageDetails: (tour as any).coverageDetails || '',
        tripType: tour.tripType,
      },
    ]

    if (existingTour.docs.length > 0) {
      const tourDoc = existingTour.docs[0]
      await payload.update({
        collection: 'tours',
        id: tourDoc.id,
        data: {
          title: tour.title,
          slug: tour.slug,
          layout: tourLayout as any,
          seo: {
            title: tour.seoTitle,
            description: tour.seoDescription,
            canonical: `https://citycabs24.com/${tour.slug}`,
          },
        },
      })
      console.log(`✓ Updated Tour doc: "${tour.title}" (slug: ${tour.slug}, ID: ${tourDoc.id}) with complete tourDetails layout.`)
    } else {
      const createdTour = await payload.create({
        collection: 'tours',
        data: {
          title: tour.title,
          slug: tour.slug,
          displayOrder: (tour as any).displayOrder || 100,
          layout: tourLayout as any,
          seo: {
            title: tour.seoTitle,
            description: tour.seoDescription,
            canonical: `https://citycabs24.com/${tour.slug}`,
          },
        },
      })
      console.log(`✓ Created Tour doc: "${tour.title}" (slug: ${tour.slug}, ID: ${createdTour.id}) with complete tourDetails layout.`)
    }
  }

  // ==========================================
  // 3. SEED / UPDATE SITE SETTINGS GLOBALS
  // ==========================================
  console.log('\n[3/4] Seeding SiteSettings global...')
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        businessName: 'CityCabs24',
        phone: '9833309061',
        helpPhone: '8380803217',
        email: 'mumbaicitycabs24@gmail.com',
        whatsapp: '9833309061',
      },
    })
    console.log('✓ Updated site-settings global with primary phone and email.')
  } catch (err) {
    console.warn('Site settings update notice:', err)
  }

  console.log('\n[4/4] COMPLETE CONTENT MIGRATION FINISHED SUCCESSFULLY!')
  process.exit(0)
}

migrateFullContent().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
