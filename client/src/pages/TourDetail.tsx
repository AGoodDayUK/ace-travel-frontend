import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Star, Clock, Check, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function TourDetail() {
  const [, params] = useRoute("/tour/:id");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tours = {
    "thailand-island-hopper": {
      id: "thailand-island-hopper",
      name: "Thailand Island Hopper",
      destination: "Thailand",
      duration: "21 days",
      price: "£1,899",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.9,
      reviews: 247,
      nextDeparture: "15 Mar 2026",
      hero: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
        "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
        "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
      ],
      description: "The ultimate Thailand adventure. Explore bustling Bangkok, party on paradise islands, experience the legendary Full Moon Party, and discover hidden jungle gems. This 21-day journey takes you through the best of Thailand's culture, beaches, and nightlife.",
      highlights: [
        "Bangkok street food tour and temple exploration",
        "Phi Phi Islands boat parties and beach clubs",
        "Full Moon Party on Koh Phangan",
        "Jungle trekking in Khao Sok National Park",
        "Snorkeling and diving in crystal clear waters",
        "Floating markets and night markets",
        "Thai cooking class in Chiang Mai",
        "Elephant sanctuary visit (ethical, no riding)"
      ],
      itinerary: [
        {
          day: "Days 1-3",
          title: "Bangkok",
          description: "Arrive in Bangkok and meet your group. Explore the Grand Palace, Wat Pho, and experience the vibrant street food scene. Visit floating markets and enjoy rooftop bars with skyline views."
        },
        {
          day: "Days 4-7",
          title: "Koh Samui & Koh Phangan",
          description: "Ferry to the islands. Beach days, snorkeling, and preparing for the legendary Full Moon Party. Experience beach clubs, fire shows, and make memories that last forever."
        },
        {
          day: "Days 8-10",
          title: "Khao Sok National Park",
          description: "Jungle adventure time. Trek through ancient rainforest, swim in emerald pools, and stay in floating bungalows on Cheow Lan Lake. Spot wildlife and disconnect from the world."
        },
        {
          day: "Days 11-15",
          title: "Krabi & Phi Phi Islands",
          description: "Island hopping paradise. Visit Maya Bay, snorkel in turquoise lagoons, rock climb limestone cliffs, and party on the beach. Sunset boat cruises and beach bonfires."
        },
        {
          day: "Days 16-18",
          title: "Phuket",
          description: "Beach relaxation and water sports. Try surfing, paddleboarding, or just chill on the sand. Explore Old Town Phuket and enjoy the famous nightlife of Patong."
        },
        {
          day: "Days 19-21",
          title: "Chiang Mai",
          description: "Cultural immersion in the north. Visit temples, take a Thai cooking class, explore night markets, and visit an ethical elephant sanctuary. Farewell dinner with your new family."
        }
      ],
      included: [
        "20 nights accommodation (mix of hostels, beach bungalows, and jungle lodges)",
        "Daily breakfast and 12 group dinners",
        "All activities and entrance fees listed in itinerary",
        "Expert trip manager throughout",
        "Airport pickup on Day 1",
        "All inter-destination transport",
        "24/7 emergency support",
        "Pre-departure WhatsApp group access"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance (mandatory)",
        "Lunches and some dinners",
        "Personal expenses and souvenirs",
        "Optional activities",
        "Visa fees (if applicable)",
        "Tips for guides and drivers"
      ]
    },
    "bali-explorer": {
      id: "bali-explorer",
      name: "Bali Explorer",
      destination: "Bali",
      duration: "14 days",
      price: "£1,199",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.9,
      reviews: 203,
      nextDeparture: "12 Mar 2026",
      hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/bHljzvhImvBUkIgg.JPG",
      gallery: [
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/bHljzvhImvBUkIgg.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/uiTnSCvsOBtDlUMY.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/aZaCGhQegNtphLSK.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/rGxWzlFVFAOHdUwY.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/kyTvbTPGjActsIBg.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/mpDakhCkwHVjNNqd.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/qvVNpgeRyDtsGSbr.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/GsVJxEVQBngZgOoI.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/cAbbFXQZkcbhEkDU.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/xgPTVQkkzSGeYzDk.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/tOvtDmcHfUwaukLM.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/AVctsZxyffxrIbVN.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nfzqJSNUdoFmwGhl.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/qivcwmrDcckGwvru.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ujOcrPuepmZuwPMB.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/PXlQnTbTVcJJJjpj.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/UtZydstnoHgAJiUA.JPG"
      ],
      description: "The ultimate Bali adventure. Explore Canggu's surf scene and nightlife, immerse yourself in Ubud's cultural heart with rice terraces and temples, discover the pristine beaches of Nusa Lembongan, and finish in Uluwatu's surfer paradise. This 14-day journey takes you through the best of Bali's beaches, culture, and adventure.",
      highlights: [
        {
          title: "Surf lessons",
          description: "Experience the thrill of riding the waves with our expert-led surfing lessons! Whether you are a complete beginner or looking to hone your skills, our instructors will guide you every step of the way. Set against the backdrop of stunning beaches and crystal-clear waters, our surfing lessons offer an unforgettable adventure.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/AlpnMoPBGszdZZHg.jpg"
        },
        {
          title: "Mount Batur",
          description: "*ACE MOMENT* Embark on an unforgettable adventure to Mt. Batur, one of Bali's most iconic volcanoes. Begin your journey with a pre-dawn hike, reaching the summit just in time to witness a breathtaking sunrise over the island. The panoramic views from the top are spectacular, with the caldera lake and surrounding mountains creating a mesmerizing landscape.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/lGNRdnfktzUASiEC.jpg"
        },
        {
          title: "Nusa Lembongan tour",
          description: "Sail to a postcard island of turquoise bays, coral gardens, and cliffside drama; drift through the mangrove maze, beach-hop Mushroom Bay and Dream Beach, feel the spray at Devil's Tears, and cross the Yellow Bridge to Ceningan—an effortless day packed with island magic.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/OCTNMdDPIwINYUnL.jpg"
        },
        {
          title: "Snorkelling tours",
          description: "Dive into the crystal-clear waters of Bali with our exhilarating snorkelling tours. Explore vibrant coral reefs teeming with colourful marine life, from playful fish to graceful sea turtles. Our experienced guides will lead you to the best snorkelling spots, ensuring a safe and unforgettable underwater adventure.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/cRojyLsiDXxWQqzE.jpg"
        },
        {
          title: "Iconic viewpoints",
          description: "Discover Bali's most iconic viewpoints, from the lush terraces of Tegallalang to the majestic heights of Mount Batur, each viewpoint offers a unique perspective of the island's natural beauty. Marvel at the panoramic views of the coastline from Uluwatu Temple or take in the serene expanse of Lake Bratan with its picturesque temple setting.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/oSzURVcUCKZXqkJb.jpg"
        },
        {
          title: "Giant manta rays",
          description: "Encounter the awe-inspiring giant manta rays in their natural habitat. These majestic creatures glide gracefully through the crystal-clear waters, offering a mesmerising sight for snorkellers and divers alike. Witnessing their elegant movements up close is a truly unforgettable experience, making it a must-do activity for any marine life enthusiast.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BEBsUGvmQvVYgUsC.jpg"
        },
        {
          title: "World famous beach clubs",
          description: "Experience the vibrant energy of Bali's beach clubs, where sun-soaked days merge into lively nights. Relax on stylish loungers, sip on refreshing cocktails, and enjoy stunning ocean views. As the sun sets, these beach clubs transform into dynamic party spots with live music and DJ sets, offering an unforgettable blend of relaxation and excitement on Bali's picturesque shores.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EngoliYHRVMWhoJy.jpg"
        },
        {
          title: "Rice terraces",
          description: "Step into emerald staircases shaped by centuries-old subak canals; wander ridge paths at Tegallalang or UNESCO-listed Jatiluwih, meet local farmers, and linger over a coconut coffee as the paddies glow at sunrise or sunset—a calm, culture-soaked Bali must-do.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/uMFVZdbThVsRJNgG.jpg"
        }
      ],
      itinerary: [
        {
          day: "Days 1-3",
          title: "Canggu",
          description: "Dive into the energetic nightlife of Canggu, Bali's hotspot for party enthusiasts. With its buzzing beach clubs, trendy bars, and vibrant music scene, Canggu promises unforgettable nights filled with excitement. Dance the night away at popular spots like Old Man's and Finns Beach Club, and experience the unique bohemian vibe that makes Canggu the ultimate destination for a lively and unforgettable party experience.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/fUxUwdJKjfiBzxEo.jpg"
        },
        {
          day: "Days 4-7",
          title: "Ubud",
          description: "Immerse yourself in the cultural heart of Bali with a visit to Ubud, known for its enchanting temples and lush rice terraces. Explore the iconic Tegallalang Rice Terraces, where emerald-green paddies create a stunning landscape. Visit the sacred temples, each offering a glimpse into Bali's rich spiritual heritage. Ubud's serene atmosphere and breathtaking scenery make it a perfect destination for those seeking tranquility and cultural exploration.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/pgiPrslXXbJpmsOo.jpg"
        },
        {
          day: "Days 8-10",
          title: "Nusa Lembongan",
          description: "Discover the Nusa Islands, a duo of gems renowned for their spectacular snorkelling spots and breathtaking viewpoints. Dive into the crystal-clear waters around Nusa Lembongan and Nusa Penida to explore vibrant coral reefs teeming with marine life, including the famous Manta Rays. Hike to stunning viewpoints like Kelingking Beach and Angel's Billabong for panoramic vistas that will leave you in awe.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FNnmoOgjRdxkwjTo.jpg"
        },
        {
          day: "Days 11-14",
          title: "Uluwatu",
          description: "Discover the surfer's paradise of Uluwatu, renowned for its world-class waves and stunning coastal scenery. With legendary surf spots like Uluwatu Beach and Padang Padang, it's the perfect destination for both seasoned surfers and beginners looking to catch their first wave. After an exhilarating day on the water, relax at the cliffside bars and watch the sunset over the Indian Ocean.",
          image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/fxvwBSshNYtNUdKQ.jpg"
        }
      ],
      included: [
        "13 nights accommodation (hostels and beach bungalows)",
        "Daily breakfast and 8 group dinners",
        "All activities and entrance fees",
        "Expert trip manager",
        "Airport pickup",
        "All transport between destinations",
        "Surf lesson and board rental",
        "24/7 support"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Lunches and some dinners",
        "Personal expenses",
        "Optional activities",
        "Visa on arrival fee (approx $35 USD)",
        "Tips"
      ]
    },
    "philippines-paradise": {
      id: "philippines-paradise",
      name: "Philippines Paradise",
      destination: "Philippines",
      duration: "14 days",
      price: "£1,499",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.9,
      reviews: 167,
      nextDeparture: "8 Apr 2026",
      hero: "https://images.unsplash.com/photo-1580452735834-d1c8a3c1e4a8?w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&q=80",
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
        "https://images.unsplash.com/photo-1621277224630-81d9af65e40e?w=800&q=80",
        "https://images.unsplash.com/photo-1606490965834-e3f4e7c3e0f5?w=800&q=80"
      ],
      description: "Discover the hidden paradise of the Philippines. Explore the secret lagoons of El Nido, island hop in Coron, and camp on deserted beaches. This 14-day adventure takes you off the beaten path to some of the world's most beautiful islands.",
      highlights: [
        "El Nido island hopping tours (Big Lagoon, Secret Lagoon, Hidden Beach)",
        "Coron shipwreck diving and snorkeling",
        "Beach camping under the stars",
        "Kayaking through limestone cliffs",
        "Twin Lagoon and Barracuda Lake",
        "Underground river tour",
        "Sunset boat parties",
        "Fresh seafood BBQs on the beach"
      ],
      itinerary: [
        {
          day: "Days 1-2",
          title: "Manila",
          description: "Arrive in Manila and meet your group. Quick city tour including Intramuros (old walled city) and rooftop bars. Prepare for island adventure."
        },
        {
          day: "Days 3-7",
          title: "El Nido, Palawan",
          description: "Paradise found. Daily island hopping tours to secret lagoons, hidden beaches, and snorkeling spots. Kayak through limestone cliffs, cliff jump, and camp on a deserted beach for one night."
        },
        {
          day: "Days 8-12",
          title: "Coron",
          description: "Wreck diving capital. Snorkel Japanese shipwrecks from WWII, swim in Twin Lagoon, explore Barracuda Lake, and visit pristine beaches. Sunset boat parties and beach bonfires."
        },
        {
          day: "Days 13-14",
          title: "Return to Manila",
          description: "Ferry and flight back to Manila. Final night exploring the nightlife and farewell dinner with your crew. Depart the next day or extend your stay."
        }
      ],
      included: [
        "13 nights accommodation (hostels and beach bungalows)",
        "Daily breakfast and 9 group dinners",
        "All island hopping tours and activities",
        "Expert trip manager",
        "Airport pickup",
        "All ferries and domestic flights",
        "Snorkel gear rental",
        "24/7 support"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Lunches and some dinners",
        "Personal expenses",
        "Optional diving courses",
        "Environmental fees (approx £30 total)",
        "Tips"
      ]
    },
    "thailand-intro": {
      id: "thailand-intro",
      name: "Thailand Intro",
      destination: "Thailand",
      duration: "10 days",
      price: "£999",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.8,
      reviews: 189,
      nextDeparture: "22 Mar 2026",
      hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/hCjqPFKzQfIcAvQa.jpg",
      gallery: [
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/hCjqPFKzQfIcAvQa.jpg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/mirOuoHWMgcSDWGB.jpg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/QrYFhzyXjBuRJxLn.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BJGrLpWkZZByQqyU.JPG"
      ],
      description: "Perfect introduction to Thailand. Experience wellness retreats in Chiang Mai's mountains, practice yoga overlooking rice terraces, explore colorful flower gardens, and find your zen with sunrise meditation sessions. This 10-day journey balances cultural immersion with relaxation and adventure.",
      highlights: [
        "Daily yoga and meditation sessions in mountain retreats",
        "Chiang Mai temple exploration and cultural experiences",
        "Sunrise gatherings with mountain views",
        "Visit to stunning flower gardens and botanical parks",
        "Thai massage and wellness workshops",
        "Healthy farm-to-table meals",
        "Night market exploration",
        "Ethical elephant sanctuary visit"
      ],
      itinerary: [
        {
          day: "Days 1-2",
          title: "Chiang Mai Arrival",
          description: "Arrive in Chiang Mai and settle into your wellness retreat. Evening orientation, welcome dinner, and gentle yoga session to ease into the journey."
        },
        {
          day: "Days 3-5",
          title: "Mountain Wellness Retreat",
          description: "Daily yoga and meditation sessions with mountain views. Visit local temples, explore flower gardens, and enjoy healthy Thai cuisine. Evening sunset meditation and group bonding."
        },
        {
          day: "Days 6-7",
          title: "Cultural Immersion",
          description: "Explore Chiang Mai's old city, visit night markets, take a Thai cooking class, and experience traditional Thai massage. Balance activity with relaxation."
        },
        {
          day: "Day 8",
          title: "Elephant Sanctuary",
          description: "Visit an ethical elephant sanctuary. Learn about conservation, feed and bathe elephants in their natural habitat. No riding, just respectful interaction."
        },
        {
          day: "Days 9-10",
          title: "Final Reflections",
          description: "Sunrise meditation session, final yoga practice, and farewell ceremony. Depart with new friends and a refreshed mindset."
        }
      ],
      included: [
        "9 nights accommodation (wellness retreat and boutique hotels)",
        "Daily breakfast and 6 healthy group dinners",
        "All yoga and meditation sessions",
        "Temple entrance fees and activities",
        "Expert wellness guide throughout",
        "Airport pickup",
        "All local transport",
        "24/7 support"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Lunches and some dinners",
        "Personal expenses",
        "Optional spa treatments",
        "Tips for guides"
      ]
    },
    "bali-island-hopper": {
      id: "bali-island-hopper",
      name: "Bali Island Hopper",
      destination: "Bali",
      duration: "10 days",
      price: "£1,199",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.8,
      reviews: 156,
      nextDeparture: "18 Mar 2026",
      hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/GsVJxEVQBngZgOoI.JPG",
      gallery: [
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/GsVJxEVQBngZgOoI.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/cAbbFXQZkcbhEkDU.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/xgPTVQkkzSGeYzDk.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/tOvtDmcHfUwaukLM.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/AVctsZxyffxrIbVN.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nfzqJSNUdoFmwGhl.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/qivcwmrDcckGwvru.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ujOcrPuepmZuwPMB.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/PXlQnTbTVcJJJjpj.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/UtZydstnoHgAJiUA.JPG"
      ],
      description: "Fast-paced Bali island hopping adventure. Hit the highlights in 10 action-packed days - from Nusa Islands' crystal waters to Ubud's cultural heart. Perfect for travelers short on time but big on adventure.",
      highlights: [
        "Nusa Islands day trips (Nusa Lembongan & Nusa Penida)",
        "Snorkeling with manta rays",
        "Kelingking Beach (T-Rex cliff) visit",
        "Ubud rice terrace trekking",
        "Waterfall exploration",
        "Beach club parties in Seminyak",
        "Temple visits and cultural experiences",
        "Sunset beach dinners"
      ],
      itinerary: [
        {
          day: "Days 1-2",
          title: "Seminyak Beach Vibes",
          description: "Arrive in Bali and head to Seminyak. Beach club welcome party, explore the beach, and get to know your group. Sunset dinner on the sand."
        },
        {
          day: "Days 3-5",
          title: "Nusa Islands Adventure",
          description: "Ferry to Nusa Lembongan. Snorkel with manta rays, visit Kelingking Beach on Nusa Penida, cliff jump at Blue Lagoon, and relax on pristine beaches. Island paradise at its finest."
        },
        {
          day: "Days 6-8",
          title: "Ubud Culture & Nature",
          description: "Head to Ubud's cultural heart. Trek rice terraces, chase waterfalls, visit temples, explore the Monkey Forest, and experience traditional Balinese culture. Evening fire dance performance."
        },
        {
          day: "Days 9-10",
          title: "Back to Seminyak",
          description: "Return to Seminyak for final beach days. Optional surf lessons, spa treatments, or shopping. Farewell beach party and celebration dinner."
        }
      ],
      included: [
        "9 nights accommodation (beach hotels and island bungalows)",
        "Daily breakfast and 5 group dinners",
        "All island hopping tours and boat transfers",
        "Snorkel gear rental",
        "Expert trip manager",
        "Airport pickup",
        "All transport between destinations",
        "24/7 support"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Lunches and some dinners",
        "Personal expenses",
        "Optional activities (surfing, spa)",
        "Visa on arrival fee (approx $35 USD)",
        "Tips"
      ]
    }
  };

  const tourId = params?.id || "thailand-island-hopper";
  const tour = tours[tourId as keyof typeof tours] || tours["thailand-island-hopper"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
  };

  return (
    <div className="animate-fade-in">
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={tour.hero}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-3xl text-background">
              <Badge className="bg-primary text-primary-foreground mb-4">
                {tour.destination}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                {tour.name}
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                {tour.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{tour.groupSize} people</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{tour.ageRange} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{tour.rating} ({tour.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Highlights</h2>
              {typeof tour.highlights[0] === 'string' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>{highlight as string}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {tour.highlights.map((highlight, index) => {
                    const h = highlight as { title: string; description: string; image: string };
                    return (
                      <div key={index} className="flex flex-col md:flex-row gap-6">
                        <img 
                          src={h.image} 
                          alt={h.title}
                          className="w-full md:w-64 h-48 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-bold">{h.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{h.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((item, index) => {
                  const itineraryItem = item as { day: string; title: string; description: string; image?: string };
                  return (
                    <Card key={index} className="p-6 border-2">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        {itineraryItem.image && (
                          <img 
                            src={itineraryItem.image} 
                            alt={itineraryItem.title}
                            className="w-full md:w-48 h-48 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground font-bold flex-shrink-0 rounded">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold">{itineraryItem.title}</h3>
                          <Badge variant="outline">{itineraryItem.day}</Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{itineraryItem.description}</p>
                      </div>
                    </div>
                  </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Photo Gallery</h2>
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img 
                  src={tour.gallery[currentImageIndex]}
                  alt={`Gallery ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background flex items-center justify-center transition-kinetic"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background flex items-center justify-center transition-kinetic"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {tour.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 transition-kinetic ${
                        index === currentImageIndex ? 'bg-background' : 'bg-background/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {tour.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video overflow-hidden border-2 transition-kinetic ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Not Included</h3>
                <ul className="space-y-3">
                  {tour.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 border-2 sticky top-24 space-y-6">
              <div>
                <div className="text-sm text-muted-foreground">From</div>
                <div className="text-4xl font-bold text-primary">{tour.price}</div>
                <div className="text-sm text-muted-foreground">Just {tour.deposit} deposit</div>
              </div>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Next Departure</span>
                  <span className="font-medium">{tour.nextDeparture}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Group Size</span>
                  <span className="font-medium">{tour.groupSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Age Range</span>
                  <span className="font-medium">{tour.ageRange} years</span>
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg h-14"
              >
                Book Now
              </Button>

              <div className="space-y-2 text-center text-sm text-muted-foreground">
                <p>Secure your spot with just {tour.deposit}</p>
                <p>Flexible payment plans available</p>
                <p>ATOL & ABTA protected</p>
              </div>

              <Button 
                asChild
                variant="outline"
                className="w-full"
              >
                <Link href="/contact">Have Questions? Contact Us</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of travelers who have already experienced this incredible journey
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight text-lg h-14 px-8"
            >
              Book This Tour
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="font-medium tracking-tight text-lg h-14 px-8"
            >
              <Link href="/tours">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
