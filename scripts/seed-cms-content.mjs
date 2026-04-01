/**
 * Seed script: populates the CMS database with all existing hardcoded content.
 * Run with: node scripts/seed-cms-content.mjs
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const db = await mysql.createConnection(process.env.DATABASE_URL);

// ─── Helper ──────────────────────────────────────────────────────────────────

async function upsertTour(tour) {
  const [rows] = await db.execute("SELECT id FROM tours WHERE slug = ?", [tour.slug]);
  if (rows.length) {
    console.log(`  Tour already exists: ${tour.slug}`);
    return;
  }
  await db.execute(
    `INSERT INTO tours (slug, name, destination, duration, price, deposit, groupSize, ageRange, rating, reviews,
      nextDeparture, heroImage, gallery, description, highlights, itinerary, included, notIncluded, published, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      tour.slug, tour.name, tour.destination, tour.duration, tour.price, tour.deposit,
      tour.groupSize, tour.ageRange, tour.rating, tour.reviews, tour.nextDeparture,
      tour.heroImage, JSON.stringify(tour.gallery), tour.description,
      JSON.stringify(tour.highlights), JSON.stringify(tour.itinerary),
      JSON.stringify(tour.included), JSON.stringify(tour.notIncluded),
      tour.published ? 1 : 0, tour.sortOrder,
    ]
  );
  console.log(`  Inserted tour: ${tour.slug}`);
}

async function upsertReview(r) {
  const [rows] = await db.execute(
    "SELECT id FROM reviews WHERE authorName = ? AND tourSlug = ?",
    [r.authorName, r.tourSlug ?? null]
  );
  if (rows.length) {
    console.log(`  Review already exists: ${r.authorName}`);
    return;
  }
  await db.execute(
    `INSERT INTO reviews (authorName, rating, reviewText, tourSlug, tourName, reviewDate, published, featured, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [r.authorName, r.rating, r.reviewText, r.tourSlug ?? null, r.tourName ?? null,
     r.reviewDate ?? null, r.published ? 1 : 0, r.featured ? 1 : 0, r.sortOrder ?? 0]
  );
  console.log(`  Inserted review: ${r.authorName}`);
}

async function upsertFaq(f) {
  const [rows] = await db.execute("SELECT id FROM faqs WHERE question = ?", [f.question]);
  if (rows.length) {
    console.log(`  FAQ already exists: ${f.question.substring(0, 50)}`);
    return;
  }
  await db.execute(
    `INSERT INTO faqs (question, answer, category, sortOrder, published) VALUES (?, ?, ?, ?, ?)`,
    [f.question, f.answer, f.category ?? "general", f.sortOrder ?? 0, f.published ? 1 : 0]
  );
  console.log(`  Inserted FAQ: ${f.question.substring(0, 50)}`);
}

async function upsertDeal(d) {
  const [rows] = await db.execute("SELECT id FROM deals WHERE title = ?", [d.title]);
  if (rows.length) {
    console.log(`  Deal already exists: ${d.title}`);
    return;
  }
  await db.execute(
    `INSERT INTO deals (title, description, discount, validUntil, image, active, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [d.title, d.description, d.discount, d.validUntil, d.image, d.active ? 1 : 0, d.sortOrder ?? 0]
  );
  console.log(`  Inserted deal: ${d.title}`);
}

// ─── Tours ───────────────────────────────────────────────────────────────────

console.log("\n=== Seeding Tours ===");

await upsertTour({
  slug: "thailand-island-hopper",
  name: "Thailand Island Hopper",
  destination: "Thailand",
  duration: "21 days",
  price: "£1,599",
  deposit: "£60",
  groupSize: "15-30",
  ageRange: "18-35",
  rating: "4.9",
  reviews: 247,
  nextDeparture: "1st April 2026",
  heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg",
  gallery: [
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/yKqEZpaSqHKvosnK.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/zTPsjJwySXWWKxgF.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/izClReorfgzKrRJI.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/dcmEfYFiTCNFNFTD.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/kxzKnAdYDUvaxraj.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/dkdFBMDfyqhCsCOC.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BTCHXrYOUjNvEuCV.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/wxynFITXCXvfCUUZ.jpeg"
  ],
  description: "The ultimate 21-day Thailand adventure. Island hop from Phuket to Phi Phi, explore the ancient rainforests of Khao Sok, party on Koh Samui and Koh Phangan, dive in Koh Tao, and experience quad biking through the jungle. This epic journey combines culture, adventure, and unforgettable island vibes.",
  highlights: [
    { title: "Elephant sanctuary", description: "Discover the heartwarming Elephant Sanctuary, where majestic creatures roam freely. Interact, feed, and connect with these gentle giants in a natural haven, fostering a deep bond with nature and promoting responsible tourism.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/tsHbOJIkOEbtvFOv.jpg" },
    { title: "Phi Phi boat tour", description: "A Phi Phi Island boat tour is the perfect way to explore the stunning beauty of Thailand's hidden Islands. Take in the breathtaking views of Maya Bay's white sand beaches and dive into surrounding crystal clear waters with your snorkel to see the incredible reefs and marine life below.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/pdezzlCaycGgtzKB.jpg" },
    { title: "Iconic viewpoints", description: "Ascend to new heights where Thailand's stunning landscapes unfold before your eyes. Hike to breathtaking summits, witness the beauty of lush valleys, and be captivated by the enchanting vistas, especially during the golden hues of a Thai sunset.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/txedNxPWRXoSZcIZ.jpg" },
    { title: "Famous Maya Bay", description: "Embark on a mesmerising Maya Bay Tour, sailing through turquoise waters to witness the iconic Phi Phi Islands. Explore hidden lagoons, pristine beaches, and the breathtaking beauty of Maya Bay featured in 'The Beach.'", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/CURNFcqETdjUqnUO.jpg" },
    { title: "Bangla Road bar crawl", description: "Immerse yourself in Phuket's nightlife with our Bangla Road Bar Crawl. Explore lively bars, sip exotic cocktails, and dance the night away along Patong's famous street for an unforgettable evening of camaraderie and entertainment.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/SGVqfZvbQUgGQlsf.jpg" },
    { title: "Quad biking", description: "Rev up for a thrilling drive through the jungle with stunning cliff-top views and exhilarating off-roading. Our guides will take you down some gnarly paths — either way, you're guaranteed to love this activity!", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ucCEgRZUBgbZdZRH.jpg" },
    { title: "Floating bungalows", description: "Take a long tail boat into the heart of Cheow Lan Lake where you'll stay on floating bungalows. Embark on an afternoon adventure to Diamond Cave, kayak on the pristine waters, and take an early morning boat safari to spot elephants, monkeys, and birds.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/UKHPnxRSgpKiJsFE.jpg" }
  ],
  itinerary: [
    { day: "Days 1-2", title: "Phuket", description: "Arrive in Thailand! Meet your trip manager and group at the hostel. Day 2: Visit the Elephant Sanctuary to feed and bathe these majestic creatures. In the evening, experience the thrills of Bangla Road — cocktails in buckets included!", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/OFnOfrZosxyQrcKw.jpg" },
    { day: "Days 3-5", title: "Phi Phi Islands", description: "Ferry to Koh Phi Phi! Day 4: Embark on a stunning boat tour visiting Bamboo Island, Viking Cave, Monkey Beach, Phi Leh Lagoon, and Maya Bay. Catch sunset from a long tail boat and snorkel with bio-luminescent plankton. Day 5: Free day to explore viewpoints or relax on the beach.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/MyGZjwRfoNhSkXSQ.jpg" },
    { day: "Days 6-7", title: "Khao Sok National Park", description: "Welcome to the jungle! Transfer through limestone karst mountains to Khao Sok village. Day 7: Float down the river on a traditional bamboo raft, then embark on a head-torch-lit night safari to spot monkeys and jungle creatures.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EITYUCsTgGnKhaze.jpg" },
    { day: "Day 8", title: "Floating Bungalows", description: "Take a long tail boat into Cheow Lan Lake and stay on floating bungalows. Explore Diamond Cave, kayak on the lake, and take an early morning boat safari to spot elephants, monkeys, and birds in their natural habitat.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/UKHPnxRSgpKiJsFE.jpg" },
    { day: "Days 9-11", title: "Koh Samui", description: "Arrive in Chaweng! Enjoy fire shows on the beach and nightlife at Sound Club, Arkbar, and Green Mango. Optional tours: Pig Island speedboat trip with snorkelling (Day 10) and zip lining through the jungle canopy (Day 11).", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/YrAHSXwpQBuOQuWL.jpg" },
    { day: "Days 12-15", title: "Koh Tao", description: "Welcome to Turtle Island! Perfect for scuba diving — complete your Open Water Qualification or try a discovery dive. Optional tours: Snorkelling boat tour to Koh Nang Yuan (Day 13) and Thai cooking class (Day 15). Day 14 is yours to explore viewpoints or enjoy a Thai massage.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/psViiqBNwbIATfSx.jpg" },
    { day: "Days 16-19", title: "Koh Phangan", description: "Arrive at Puk's Palace with its beachfront bar, 3 swimming pools, and friendly hostel dogs! Day 17: Quad biking adventure through the jungle with cliff-top views. Optional Muay Thai boxing class (Day 18). Day 19: Visit waterfalls and beaches, or catch sunset from the west coast.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/iaPveexGDHypAfLW.jpg" },
    { day: "Days 20-21", title: "Phuket Old Town", description: "Final journey back to Phuket by ferry. Explore Old Town's amazing restaurants, boutique shops, and famous architecture. Emotional farewell to your Thai guide. Day 21: Onward travel or fly home with memories for a lifetime!", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/OFnOfrZosxyQrcKw.jpg" }
  ],
  included: [
    "21 days accommodation included", "Activities packages included", "Iconic viewpoints",
    "Full access to the private members group", "Flight assistance",
    "Experienced ACE Rep travelling with you", "Local Thai guide"
  ],
  notIncluded: [
    "International flights", "Travel insurance", "Lunches and some dinners",
    "Personal expenses", "Optional activities", "Visa fees (if applicable)", "Tips"
  ],
  published: true,
  sortOrder: 1,
});

await upsertTour({
  slug: "bali-explorer",
  name: "Bali Explorer",
  destination: "Bali",
  duration: "14 days",
  price: "£1,199",
  deposit: "£60",
  groupSize: "15-30",
  ageRange: "18-35",
  rating: "4.9",
  reviews: 203,
  nextDeparture: "13th June 2026",
  heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZyduANpQpBJQSfsk.jpeg",
  gallery: [
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZyduANpQpBJQSfsk.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/RjnBBgrxjDrZVsFF.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/paULgtdZIEequrVD.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/eTWhNyzGgggTOzEg.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/DEGnaULciIgXiKKR.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FTeSbGcLCtbZzxAa.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/lztIeJwqzZLmQPKO.png",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BRnhNkhKkRVJyuuN.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ouvOUfBxeqfZYJMu.jpeg"
  ],
  description: "Explore Canggu's surf and nightlife, Ubud's rice terraces and temples, Nusa Lembongan's pristine beaches, and Uluwatu's surfer paradise. 14 days of Bali's best beaches, culture, and adventure.",
  highlights: [
    { title: "Surf lessons", description: "Experience the thrill of riding the waves with our expert-led surfing lessons! Whether you are a complete beginner or looking to hone your skills, our instructors will guide you every step of the way.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/AlpnMoPBGszdZZHg.jpg" },
    { title: "Mount Batur", description: "*ACE MOMENT* Embark on an unforgettable adventure to Mt. Batur, one of Bali's most iconic volcanoes. Begin your journey with a pre-dawn hike, reaching the summit just in time to witness a breathtaking sunrise over the island.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/lGNRdnfktzUASiEC.jpg" },
    { title: "Nusa Lembongan tour", description: "Sail to a postcard island of turquoise bays, coral gardens, and cliffside drama; drift through the mangrove maze, beach-hop Mushroom Bay and Dream Beach, feel the spray at Devil's Tears, and cross the Yellow Bridge to Ceningan.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/OCTNMdDPIwINYUnL.jpg" },
    { title: "Snorkelling tours", description: "Dive into the crystal-clear waters of Bali with our exhilarating snorkelling tours. Explore vibrant coral reefs teeming with colourful marine life, from playful fish to graceful sea turtles.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/cRojyLsiDXxWQqzE.jpg" },
    { title: "Iconic viewpoints", description: "Discover Bali's most iconic viewpoints, from the lush terraces of Tegallalang to the majestic heights of Mount Batur, each viewpoint offers a unique perspective of the island's natural beauty.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/oSzURVcUCKZXqkJb.jpg" },
    { title: "Giant manta rays", description: "Encounter the awe-inspiring giant manta rays in their natural habitat. These majestic creatures glide gracefully through the crystal-clear waters, offering a mesmerising sight for snorkellers and divers alike.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BEBsUGvmQvVYgUsC.jpg" },
    { title: "World famous beach clubs", description: "Experience the vibrant energy of Bali's beach clubs, where sun-soaked days merge into lively nights. Relax on stylish loungers, sip on refreshing cocktails, and enjoy stunning ocean views.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EngoliYHRVMWhoJy.jpg" },
    { title: "Rice terraces", description: "Step into emerald staircases shaped by centuries-old subak canals; wander ridge paths at Tegallalang or UNESCO-listed Jatiluwih, meet local farmers, and linger over a coconut coffee as the paddies glow at sunrise or sunset.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/uMFVZdbThVsRJNgG.jpg" }
  ],
  itinerary: [
    { day: "Days 1-3", title: "Canggu", description: "Day 1 - Arrive in Bali! Grab your bag at the airport and meet our airport rep who will get you into your pre-booked airport transfer. Arrive at the first hostel and meet your trip manager and the rest of the guests on the tour!\n\nDay 2 - Breakfast included. Bucket list memory number 1: The Turtle Sanctuary! Jump in a transfer to Serangan Island and see baby turtles in captivity before their release into the oceans!\n\nDay 3 - Surfs up! Get your swimsuits on and head to Double Six Beach for a 1-2-1 surf lesson.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/fUxUwdJKjfiBzxEo.jpg" },
    { day: "Days 4-7", title: "Ubud", description: "Day 4 - Breakfast Included. Check out and get your first private transfer up to Ubud! We'll break up the journey with a visit to a traditional Temple and Balinese House.\n\nDay 5 - Breakfast Included. Spend the day exploring and swimming in Ubud's beautiful waterfalls. You'll visit the famous rice terraces and have the opportunity to get a classic picture on one of their swings.\n\nDay 6 - *ACE MOMENT* Early start alert! Today you'll be hopping into an open top jeep to take you to the base of Mount Batur. The climb up will get the thighs burning but you'll get the most incredible view of the sunrise.\n\nDay 7 - Breakfast Included. Wake up to some yoga at the hostel. Explore Ubud's boutique shops or jump on one of our optional extras: Jewellery making class, Monkey Forest.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/pgiPrslXXbJpmsOo.jpg" },
    { day: "Days 8-10", title: "Nusa Lembongan", description: "Day 8 - Breakfast Included. Today you get a transfer and short ferry over to Nusa Lembongan. Check in at one of our top hostels with an infinity pool, gym, sauna, cold plunge and panoramic view over the island.\n\nDay 9 - Today you'll jump in a private transfer and head out for a tour of the island! We'll take you to the Devil's Tears, Dream Beach, Mahagiri Beach, Yellow Bridge and included a boat tour through some mangroves.\n\nDay 10 - Free day today! Optional manta ray snorkelling tour in the morning.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FNnmoOgjRdxkwjTo.jpg" },
    { day: "Days 11-14", title: "Uluwatu", description: "Day 11 - Breakfast Included. Back to the mainland today, and heading to the southern tip of Bali to Uluwatu! Another cracker of a hostel fit with pools, gym, sauna, Jacuzzi and cold plunge!\n\nDay 12 - Breakfast Included. In the evening you'll get to experience the Kecak fire dance — a famous tribal dance in Bali, performed at sunset.\n\nDay 13 - Breakfast Included. Free Day! Head down to the famous Padang Padang Beach or grab some souvenirs.\n\nDay 14 - The dreaded farewells! Give your new besties a big squeeze — you'll see them again!", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/eTWhNyzGgggTOzEg.jpeg" }
  ],
  included: [
    "14 days accommodation included", "Activities packages included",
    "Experienced ACE Rep & Local Guide", "Iconic viewpoints",
    "Private group WhatsApp", "Flight assistance", "Flexible payment plan", "14 meals"
  ],
  notIncluded: [
    "International flights", "Travel insurance", "Personal expenses",
    "Optional activities (scuba diving, spa)", "Visa on arrival fee (if applicable)", "Tips"
  ],
  published: true,
  sortOrder: 2,
});

await upsertTour({
  slug: "thailand-intro",
  name: "Thailand Intro",
  destination: "Thailand",
  duration: "12 days",
  price: "£999",
  deposit: "£60",
  groupSize: "15-30",
  ageRange: "18-35",
  rating: "4.9",
  reviews: 156,
  nextDeparture: "Dates Coming Soon",
  heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/tsHbOJIkOEbtvFOv.jpg",
  gallery: [],
  description: "12 days exploring the best of Thailand. From the buzzing streets of Bangkok to the mountain town of Chiang Mai and the laid-back paradise of Pai. Culture, adventure, and unforgettable friendships await.",
  highlights: [
    { title: "Elephant sanctuary", description: "Discover the heartwarming Elephant Sanctuary, where majestic creatures roam freely. Interact, feed, and connect with these gentle giants in a natural haven, fostering a deep bond with nature and promoting responsible tourism.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/tsHbOJIkOEbtvFOv.jpg" },
    { title: "Bangkok city tour", description: "Explore Bangkok's iconic temples, China Town, and MBK shopping mall. Experience the thrills of Khao San Road in the evening with cocktails in buckets and the city's legendary street food scene.", image: "/thailand-longtail-boat.jpg" },
    { title: "Pai sunsets", description: "Chase golden hour to Two Huts and Pai Canyon: hammocks, mellow tunes, and horizons painted pink. Wander the sandstone ridges, watch swallows dip, and stay for blue hour as the valley glows and stars blink on.", image: "/pai-canyon.jpg" },
    { title: "Tipsy tubing", description: "Float down the Pai River with a crew of new friends; gentle rapids, music, and riverside stops to keep the vibe high. A hectic afternoon that turns into stories for days.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/LRUcyMWFnlifpfyf.PNG" },
    { title: "Temple visits", description: "Step into incense-swirled courtyards and gilded halls; admire serene Buddhas, lotus ponds, and chanting monks. Temple time is a reset button that swaps noise for quiet awe.", image: "/thailand-temple-group.jpg" },
    { title: "Sticky waterfalls", description: "Climb the grippy limestone cascades barefoot — your feet stick like Velcro. Cool water, jungle shade, and the thrill of walking straight up a waterfall make this one of Chiang Mai's quirkiest natural wonders.", image: "/thailand-waterfall.webp" }
  ],
  itinerary: [
    { day: "Days 1-3", title: "Bangkok", description: "Day 1: Arrive in Thailand! Meet our airport rep for your pre-booked transfer to the hostel where you'll meet your trip manager and fellow travellers.\n\nDay 2: Breakfast included. Group briefing, then city tour of Bangkok covering Temples, China Town, and MBK shopping mall.\n\nDay 3: Free day to explore! Experience the thrills of Khao San road in the evening. Begin the night train journey north to Chiang Mai.", image: "/thailand-temple.jpg" },
    { day: "Days 4-6", title: "Chiang Mai", description: "Day 4: Arrive in the morning, check in and explore Chiang Mai's busy streets. Afternoon visit to Doi Suthep Temple with panoramic views.\n\nDay 5: *ACE MOMENT* Breakfast included. Elephant Sanctuary day! Visit majestic Asian Elephants in our ethically sourced sanctuary in the hills. Optional: Traditional Khatok Dinner.\n\nDay 6: Breakfast included. Journey to Pai, stopping at the sticky waterfalls. Finish at Two Huts for sunset with live music and ice cold drinks.", image: "/thailand-elephant.jpg" },
    { day: "Days 7-9", title: "Pai", description: "Day 7: Breakfast included. Tipsy Tubing — a massive floating party! Grab your inflatable ring and drift down Pai's River. Stop halfway for a foam party boogie on the riverbank.\n\nDay 8: Breakfast included. Relaxing morning to recover, or explore Pai's beautiful streets and cute coffee spots. Evening trip to Pai Canyon for glowing orange sunset.\n\nDay 9: Breakfast included. Free day to explore Pai's hidden gems or chill at the hostel. Optional: Pai Hot Springs & Nam Lod Cave.", image: "/pai-canyon.jpg" },
    { day: "Days 10-11", title: "Chiang Mai", description: "Day 10: Breakfast included. Bye bye Pai! Head south back to Chiang Mai, stopping at an authentic Thai umbrella factory and silk factory.\n\nDay 11: Breakfast included. Indulge in an authentic Thai cooking class — cook up a storm and enjoy your creations! Head back to Bangkok in the evening via train.", image: "/cooking-class.jpg" },
    { day: "Day 12", title: "Bangkok", description: "Breakfast included. The dreaded farewells! Give your new besties a big squeeze — you'll see them again, either in your own time or on another Ace Travel Experience! Chill at the hostel until your airport transfer arrives. Depart with unforgettable memories and lifelong friendships.", image: "/thailand-farewell-dinner.jpg" }
  ],
  included: [
    "11 nights accommodation (hostels and guesthouses)", "14 meals (breakfast and group dinners)",
    "Experienced Ace Rep & Local Guide",
    "Activities packages included (Elephant Sanctuary, Tipsy Tubing, Temple visits, Sticky Waterfalls)",
    "All activities and entrance fees", "Iconic viewpoints", "Private WhatsApp group",
    "Flight assistance", "Airport pickup", "All inter-destination transport including night train",
    "24/7 emergency support"
  ],
  notIncluded: [
    "International flights", "Travel insurance (mandatory)", "Lunches and some dinners",
    "Personal expenses and souvenirs", "Optional activities (Khatok Dinner, Hot Springs & Nam Lod Cave)",
    "Visa fees (if applicable)", "Tips for guides and drivers"
  ],
  published: true,
  sortOrder: 3,
});

await upsertTour({
  slug: "bali-island-hopper",
  name: "Bali Island Hopper",
  destination: "Bali",
  duration: "14 days",
  price: "£1,199",
  deposit: "£60",
  groupSize: "15-30",
  ageRange: "18-35",
  rating: "4.9",
  reviews: 189,
  nextDeparture: "23rd May 2026",
  heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FIusTznaFJxspxFF.jpeg",
  gallery: [
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/muVczEuHQyiGubqU.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FIusTznaFJxspxFF.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EPAgFMWiaLnoDdTL.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/RjnBBgrxjDrZVsFF.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/paULgtdZIEequrVD.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FjKohCZwuCXASCtk.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/wgwLfzZOtBxyrglu.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/eTWhNyzGgggTOzEg.jpeg"
  ],
  description: "The ultimate 14-day Bali island hopping adventure. Surf the legendary waves of Kuta, snorkel with giant manta rays in Nusa Lembongan, explore the dramatic cliffs of Nusa Penida, discover Lombok's wild beaches and waterfalls, and party on the car-free paradise of Gili Trawangan.",
  highlights: [
    { title: "Surf lessons", description: "Experience the thrill of riding the waves with our expert-led surfing lessons! Whether you are a complete beginner or looking to hone your skills, our instructors will guide you every step of the way.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/pgjBFhnsFhBdxVMb.jpg" },
    { title: "Snorkelling with turtles", description: "Slip into calm, crystal water and drift over coral gardens where turtles cruise unbothered. Join a morning boat to Turtle Point or swim from the east coast, float alongside these gentle icons, then rinse off with a beachside coconut.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/GrBbfpRZKijgNVMU.jpg" },
    { title: "Iconic viewpoints", description: "Chase horizons from hilltops and cliff edges: in Lombok, greet sunrise over Rinjani from Pergasingan and catch golden hour at Merese and Malimbu. On the Nusas, gaze down Kelingking's 'T-Rex,' Diamond Beach, Devil's Tears, and Blue Lagoon.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/kZBMVyuYtYulmbOo.jpg" },
    { title: "Giant manta rays", description: "Encounter the awe-inspiring giant manta rays in their natural habitat. These majestic creatures glide gracefully through the crystal-clear waters, offering a mesmerising sight for snorkellers and divers alike.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/TyaRKXcqzkCYorYC.jpg" }
  ],
  itinerary: [
    { day: "Day 1", title: "Kuta — Arrival", description: "Arrive in Bali! Grab your bag at the airport and meet our airport rep who will get you into your pre-booked airport transfer. Arrive at the first hostel and meet your trip manager and the rest of the guests on the tour!", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/budABBFlIjauFajf.jpg" },
    { day: "Days 2-4", title: "Nusa Lembongan & Nusa Penida", description: "Day 2 — Breakfast included. Transfer and short ferry over to Nusa Lembongan. Check in at one of our top hostels with an infinity pool, gym, sauna, cold plunge and panoramic views.\n\nDay 3 — Head out on a boat to Manta Bay for snorkelling with giant manta rays. Most are 3-4 metres wide — gentle giants that will make you feel very small!\n\nDay 4 — Breakfast included. Boat over to Nusa Penida for an island tour visiting Angel Billabong, Broken Beach, Kelingking Beach and Crystal Bay.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/VUEsCMqGAxiEopwZ.jpg" },
    { day: "Days 5-8", title: "Lombok — Beaches, Waterfalls & Sunsets", description: "Day 5 — Breakfast included. Ferry over to Lombok! Enjoy breathtaking scenery with rice terraces and Mount Rinjani in the background.\n\nDay 6 — Visit Lombok's most beautiful waterfalls hidden in the jungle. Evening dinner and a little boogie at local hotspots.\n\nDay 7 — Beach day! Mawun for body surfing, Are Guling for tanning, Selong Belanak for lunch, and Bukit Merese for a pastel sunset.\n\nDay 8 — Free day to explore Kuta Lombok. Optional surfing lessons available!", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/XYqLNHpEfBdUvWJD.jpg" },
    { day: "Days 9-12", title: "Gili Trawangan — Island Paradise", description: "Day 9 — Breakfast included. Welcome to THE island life. No cars, no motorbikes — just bicycles and your legs! Beachfront hostel with family BBQs, pool and beach volleyball.\n\nDay 10 — Snorkelling trip where you are 99.9% likely to swim with turtles! Visit the famous underwater statues and turtle sanctuary on Gili Air.\n\nDay 11 — Breakfast included. Free day to explore by bicycle. Grab a snorkel from street rentals, shop for souvenirs, or find a great spot for a boogie!\n\nDay 12 — Breakfast included. Chill at the hostel or beach. Group sunset, then beanbags and a film at the beach cinema.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZUYKUdylsrYrDeOq.jpg" },
    { day: "Days 13-14", title: "Kuta — Final Days", description: "Day 13 — Breakfast included. The last hop. Back to mainland Bali by ferry then a short transfer to Kuta. Grab a final sunset and family dinner together before packing your bags.\n\nDay 14 — The dreaded farewells! Give your new besties a big squeeze — we're positive you'll see them again, either in your own time or on another ACE Travel Experience!", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ElOPcITQITYxAUYp.jpg" }
  ],
  included: [
    "14 days accommodation included", "Activities packages included",
    "Experienced ACE Rep & Local Guide", "Iconic viewpoints",
    "Private group WhatsApp", "Flight assistance", "Flexible payment plan", "14 meals"
  ],
  notIncluded: [
    "International flights", "Travel insurance", "Personal expenses",
    "Optional activities (scuba diving, spa)", "Visa on arrival fee (if applicable)", "Tips"
  ],
  published: true,
  sortOrder: 4,
});

// ─── Reviews ─────────────────────────────────────────────────────────────────

console.log("\n=== Seeding Reviews ===");

const reviewsData = [
  // Bali Explorer
  { authorName: "Chloe", rating: 5, reviewText: "Second Ace trip and incredible again! Perfect for solo travellers. Met amazing people, hiked Mt Batur, released baby turtles! Clean, comfy stays. Can't wait for number three!", tourSlug: "bali-explorer", tourName: "Bali Explorer", reviewDate: "24 Sep 2025", published: true, featured: true, sortOrder: 1 },
  { authorName: "Ellie Heinsen", rating: 5, reviewText: "Absolutely incredible! Perfect balance of culture, exploring, and partying. Ace team was helpful from booking to end. Mt Batur hike was unforgettable! First solo trip and it boosted my confidence to travel more.", tourSlug: "bali-explorer", tourName: "Bali Explorer", reviewDate: "19 Sep 2025", published: true, featured: true, sortOrder: 2 },
  { authorName: "Maisie", rating: 5, reviewText: "Second trip with Ace! They do everything right. Never nervous because everything's covered. Bucket list activities like turtle conservation! Already planning trip three. Amazing support and instant friendships.", tourSlug: "bali-explorer", tourName: "Bali Explorer", reviewDate: "23 Sep 2025", published: true, featured: true, sortOrder: 3 },
  { authorName: "Charlotte", rating: 5, reviewText: "Best time of my life! Perfect for first-time travellers. Ace handles everything so you don't worry about a thing. Life changing experience!", tourSlug: "bali-explorer", tourName: "Bali Explorer", reviewDate: "24 Apr 2025", published: true, featured: true, sortOrder: 4 },
  { authorName: "Hannah Taylor", rating: 5, reviewText: "Trip of a lifetime! Released turtles, surfed, climbed Mt Batur for sunrise, made jewelry, quad biked through waterfalls, white water rafted! Jay, Ruby, and Nyoman were incredible guides. Best experience ever!", tourSlug: "bali-explorer", tourName: "Bali Explorer", reviewDate: "22 Sep 2025", published: true, featured: false, sortOrder: 5 },
  { authorName: "Dean Garrity", rating: 5, reviewText: "Amazing experience from start to finish. The reps were fantastic and the activities were perfectly balanced. Mt Batur sunrise was breathtaking and the turtle sanctuary was a highlight. Would definitely travel with Ace again!", tourSlug: "bali-explorer", tourName: "Bali Explorer", reviewDate: "18 Sep 2025", published: true, featured: false, sortOrder: 6 },
  // Bali Island Hopper
  { authorName: "Evelyn", rating: 5, reviewText: "I went on the Bali Island Hopper trip in September 2025 and I can honestly say that it was one of the best trips of my life. Having never flown outside of Europe, it was comforting to know that the reps Ruby and Jay were on hand to help with any questions.", tourSlug: "bali-island-hopper", tourName: "Bali Island Hopper", reviewDate: "05 Oct 2025", published: true, featured: true, sortOrder: 7 },
  { authorName: "Carly J", rating: 5, reviewText: "I did the Bali Island Hopper in September and absolutely loved the snorkelling, Gili T was amazing! Seeing the manta rays was probably the best experience I've ever had in my life! Jay and Ruby were incredible. Will absolutely be booking another tour with Ace!!", tourSlug: "bali-island-hopper", tourName: "Bali Island Hopper", reviewDate: "09 Oct 2025", published: true, featured: true, sortOrder: 8 },
  { authorName: "Jayden", rating: 5, reviewText: "Loved every minute of my trip, from the activities, organisation, communication and the friendliness of both Jay and Ruby!", tourSlug: "bali-island-hopper", tourName: "Bali Island Hopper", reviewDate: "09 Oct 2025", published: true, featured: false, sortOrder: 9 },
  { authorName: "Liberty Abbott", rating: 5, reviewText: "I can't thank Ace enough! Firstly, I was added into a group chat with everyone. This made things so much easier as it broke the ice before we met each other. From there everything was effortless as all the activities & accommodation were booked so I didn't have to lift a finger!", tourSlug: "bali-island-hopper", tourName: "Bali Island Hopper", reviewDate: "13 Oct 2025", published: true, featured: false, sortOrder: 10 },
  { authorName: "Lily-Mae", rating: 5, reviewText: "This was my second trip with Ace and once again, it was incredible! It's perfect if you want to travel but don't feel confident going solo. I met so many lovely people and had the best time. The places we stayed in were super clean and comfy too. Thanks again, Ace!", tourSlug: "bali-island-hopper", tourName: "Bali Island Hopper", reviewDate: "17 Oct 2025", published: true, featured: false, sortOrder: 11 },
  // Thailand Intro
  { authorName: "Ellie Heinsen", rating: 5, reviewText: "Absolutely Perfect! Mixture of culture, exploring, and partying. Ace team was helpful from booking to end. First solo trip and it boosted my confidence to travel more.", tourSlug: "thailand-intro", tourName: "Thailand Intro", reviewDate: "18 Sep 2025", published: true, featured: false, sortOrder: 12 },
  { authorName: "Maisie", rating: 5, reviewText: "Incredible trip with perfect balance of activities and free time. The group vibe was fantastic and our guides made everything seamless. Elephant sanctuary was the highlight!", tourSlug: "thailand-intro", tourName: "Thailand Intro", reviewDate: "15 Aug 2025", published: true, featured: false, sortOrder: 13 },
  { authorName: "Dean Garrity", rating: 5, reviewText: "Went solo and made friends for life. The itinerary was perfectly paced with incredible experiences every day. Tipsy tubing in Pai was absolutely wild!", tourSlug: "thailand-intro", tourName: "Thailand Intro", reviewDate: "03 Jul 2025", published: true, featured: false, sortOrder: 14 },
];

for (const r of reviewsData) {
  await upsertReview(r);
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

console.log("\n=== Seeding FAQs ===");

const faqsData = [
  // Booking
  { question: "How do I book a tour?", answer: "Booking is simple! Head to our booking page at booking.acetravelexperiences.com, choose your tour and departure date, and secure your place with a £60 deposit. You'll receive a confirmation email with all the details and be added to your tour's private WhatsApp group.", category: "booking", sortOrder: 1, published: true },
  { question: "How much is the deposit?", answer: "We require a £60 deposit to secure your place on any tour. The remaining balance is due 30 days before your departure date. We offer flexible payment plans so you can spread the cost — just get in touch if you'd like to set one up.", category: "booking", sortOrder: 2, published: true },
  { question: "When is the final payment due?", answer: "Your final balance is due 30 days before your departure date. We'll send you a reminder email in advance. If you book within 30 days of departure, the full amount is payable at the time of booking.", category: "booking", sortOrder: 3, published: true },
  { question: "What is your cancellation policy?", answer: "If you cancel more than 60 days before departure, you'll receive a full refund minus the £60 deposit. Cancellations between 30-60 days before departure will receive a 50% refund. Cancellations within 30 days of departure are non-refundable. We strongly recommend taking out comprehensive travel insurance.", category: "booking", sortOrder: 4, published: true },
  { question: "Can I transfer my booking to another date?", answer: "Yes! You can transfer your booking to another available departure date subject to availability. Please contact us at least 30 days before your original departure date. A £25 admin fee applies for date changes.", category: "booking", sortOrder: 5, published: true },
  // Travel
  { question: "Do I need travel insurance?", answer: "Yes, travel insurance is mandatory for all ACE Travel tours. You must have a policy that covers medical emergencies, trip cancellation, and repatriation. We recommend getting insured as soon as you book. We can recommend reputable providers if you need help finding cover.", category: "travel", sortOrder: 6, published: true },
  { question: "Do I need a visa?", answer: "Visa requirements depend on your nationality and destination. For Thailand, UK and EU passport holders currently receive a free 30-day visa on arrival. For Bali (Indonesia), most nationalities receive a free 30-day visa on arrival. We recommend checking the latest requirements with your country's foreign office before travelling.", category: "travel", sortOrder: 7, published: true },
  { question: "What vaccinations do I need?", answer: "We recommend consulting your GP or a travel health clinic at least 6-8 weeks before departure. Common vaccinations for Southeast Asia include Hepatitis A, Typhoid, and Tetanus. Malaria prophylaxis may be recommended for some areas. Your doctor will advise based on your personal health history.", category: "travel", sortOrder: 8, published: true },
  { question: "What should I pack?", answer: "Light, breathable clothing is key for Southeast Asia's tropical climate. Pack comfortable walking shoes, flip flops, a light rain jacket, sun cream, insect repellent, and a small day bag. We'll send you a full packing list when you book. Remember to pack modestly for temple visits — shoulders and knees should be covered.", category: "travel", sortOrder: 9, published: true },
  // Tours
  { question: "Can I join a tour on my own?", answer: "Absolutely! The majority of our travellers join solo. Our tours are specifically designed for solo travellers who want to meet like-minded people and explore the world together. You'll be added to a private WhatsApp group before departure to start getting to know your fellow travellers.", category: "tours", sortOrder: 10, published: true },
  { question: "What is the group size?", answer: "Our tours typically have between 15 and 30 travellers, which we've found is the perfect size. Large enough to always have someone to hang out with, but small enough to feel like a close-knit group rather than a coach tour.", category: "tours", sortOrder: 11, published: true },
  { question: "What age range are the tours for?", answer: "Our tours are designed for 18-35 year olds. This age range keeps the group energy consistent and ensures everyone is at a similar life stage. If you're slightly outside this range and feel the tours would be right for you, please get in touch and we'll do our best to accommodate.", category: "tours", sortOrder: 12, published: true },
  { question: "Are the tours suitable for first-time travellers?", answer: "Yes! Many of our travellers are heading overseas for the first time. Our experienced reps handle all the logistics, accommodation, and activities so you can focus on having the time of your life. We'll guide you through everything from airport arrivals to local customs.", category: "tours", sortOrder: 13, published: true },
  { question: "What is included in the tour price?", answer: "All accommodation, a full activities package, group transport between destinations, and most meals are included. You'll also get an experienced ACE rep with you throughout, a local guide, access to our private members group, and flight assistance. Check the individual tour pages for the full inclusions list.", category: "tours", sortOrder: 14, published: true },
  // Scuba
  { question: "Do you offer scuba diving on the tours?", answer: "Yes! We offer scuba diving as an optional add-on on our Thailand Island Hopper and Bali Island Hopper tours. We partner with certified local dive schools at each destination. You can choose from a Basic Diver course (£100) or a full Open Water certification (£350). No experience is necessary for either course.", category: "addons", sortOrder: 15, published: true },
  { question: "Do I need any experience to try scuba diving?", answer: "No experience is needed at all! Our Basic Diver course is perfect for complete beginners and takes place in shallow, calm waters with a fully qualified instructor. For the Open Water certification, you'll complete theory, pool sessions, and open water dives over 3-4 days. Our partner dive schools are fully certified and have excellent safety records.", category: "addons", sortOrder: 16, published: true },
];

for (const f of faqsData) {
  await upsertFaq(f);
}

// ─── Deals ───────────────────────────────────────────────────────────────────

console.log("\n=== Seeding Deals ===");

await upsertDeal({
  title: "Early Bird — Thailand Island Hopper",
  description: "Book your April 2026 Thailand Island Hopper departure before 31st March and save £100 off the tour price. Limited spaces available at this rate.",
  discount: "£100 off",
  validUntil: "31 March 2026",
  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg",
  active: true,
  sortOrder: 1,
});

await upsertDeal({
  title: "Summer Bali Explorer — Summer Holiday Friendly",
  description: "Our 31st July departure is perfectly timed for UK summer holidays. Grab your spot before it sells out — this is our most popular Bali Explorer date.",
  discount: "Limited spaces",
  validUntil: "While spaces last",
  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZyduANpQpBJQSfsk.jpeg",
  active: true,
  sortOrder: 2,
});

await upsertDeal({
  title: "Refer a Friend",
  description: "Get £50 off your next booking when you refer a friend who books a tour with ACE Travel Experiences. Your friend also gets £50 off their first booking!",
  discount: "£50 each",
  validUntil: "Ongoing",
  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/yKqEZpaSqHKvosnK.jpeg",
  active: true,
  sortOrder: 3,
});

// ─── Done ─────────────────────────────────────────────────────────────────────

console.log("\n✅ CMS content seeded successfully!");
await db.end();
