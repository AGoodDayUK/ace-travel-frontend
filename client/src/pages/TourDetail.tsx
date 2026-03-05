import { useState, useRef } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Users, MapPin, Star, Clock, Check, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { PaymentCalculator } from "@/components/PaymentCalculator";
import { parseDepartureDate, parsePrice } from "@/lib/dateUtils";

export default function TourDetail() {
  const [, params] = useRoute("/tour/:id");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tours = {
    "thailand-island-hopper": {
      id: "thailand-island-hopper",
      name: "Thailand Island Hopper",
      destination: "Thailand",
      duration: "21 days",
      price: "£1,599",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.9,
      reviews: 247,
      nextDeparture: "1st April 2026",
      departureDates: [
        { date: "1st - 21st April 2026", price: "£1,599", duration: "21 Days", badge: "Songkran Included!" },
        { date: "1st - 21st October 2026", price: "£1,599", duration: "21 Days" },
        { date: "1st - 21st November 2026", price: "£1,599", duration: "21 Days" },
        { date: "1st - 21st December 2026", price: "£1,599", duration: "21 Days" },
        { date: "7th - 27th January 2027", price: "£1,799", duration: "21 Days" },
        { date: "30th Jan - 19th Feb 2027", price: "£1,799", duration: "21 Days", badge: "Full Moon Party +£150" },
        { date: "28th Feb - 20th Mar 2027", price: "£1,799", duration: "21 Days", badge: "Full Moon Party +£150" },
        { date: "30th Mar - 19th Apr 2027", price: "£1,799", duration: "21 Days", badge: "Full Moon Party +£150" }
      ],
      hero: "/thailand-island-hopper-hero.webp",
      gallery: [
        "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
        "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
        "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
      ],
      description: "The ultimate 21-day Thailand adventure. Island hop from Phuket to Phi Phi, explore the ancient rainforests of Khao Sok, party on Koh Samui and Koh Phangan, dive in Koh Tao, and experience quad biking through the jungle. This epic journey combines culture, adventure, and unforgettable island vibes.",
      highlights: [
        {
          title: "Elephant sanctuary",
          description: "Discover the heartwarming Elephant Sanctuary, where majestic creatures roam freely. Interact, feed, and connect with these gentle giants in a natural haven, fostering a deep bond with nature and promoting responsible tourism.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/21d450f7-c5e4-485e-ad72-8613f34a05c2/elephant-sanctuary.jpg"
        },
        {
          title: "Phi Phi boat tour",
          description: "A Phi Phi Island boat tour is the perfect way to explore the stunning beauty of Thailand's hidden Islands. Take in the breathtaking views of Maya Bay's white sand beaches and dive into surrounding crystal clear waters with your snorkel to see the incredible reefs and marine life below.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/8d413e46-a264-4eb0-8b20-ffa94aeec178/phi-phi-boat-tour.jpg"
        },
        {
          title: "Iconic viewpoints",
          description: "Ascend to new heights where Thailand's stunning landscapes unfold before your eyes. Hike to breathtaking summits, witness the beauty of lush valleys, and be captivated by the enchanting vistas, especially during the golden hues of a Thai sunset. Our reps will take you to those Insta-worthy spots!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/b3464952-6035-4cd3-8997-6f24cf67697c/unsplash-image-2CjOnwJCMJM.jpg"
        },
        {
          title: "Famous Maya Bay",
          description: "Embark on a mesmerising Maya Bay Tour, sailing through turquoise waters to witness the iconic Phi Phi Islands. Explore hidden lagoons, pristine beaches, and the breathtaking beauty of Maya Bay featured in 'The Beach.'",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755256682519-BUHLSCMNAGI42LXHRXF6/unsplash-image-pUYxB1CxbSY.jpg"
        },
        {
          title: "Bangla Road bar crawl",
          description: "Immerse yourself in Phuket's nightlife with our Bangla Road Bar Crawl. Explore lively bars, sip exotic cocktails, and dance the night away along Patong's famous street for an unforgettable evening of camaraderie and entertainment.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/43f20e77-9aae-4ad7-b2bf-0d592502ba0e/bar-crawl.jpg"
        },
        {
          title: "Quad biking",
          description: "Rev up for a thrilling drive through the jungle with stunning cliff-top views and exhilarating off-roading. Our guides will take you down some gnarly paths, so if you want to be a passenger, that's totally fine! Either way, you're guaranteed to love this activity!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/a7e36531-4017-474f-b36b-f809863012f1/quad-bikes.jpg"
        },
        {
          title: "Floating bungalows",
          description: "Take a long tail boat into the heart of Cheow Lan Lake where you'll stay on floating bungalows. Embark on an afternoon adventure to Diamond Cave, kayak on the pristine waters, and take an early morning boat safari to spot elephants, monkeys, and birds.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722869565399-BCEDJD8XCBSRYXGFNLJ3/unsplash-image-YcXOWbWk8-U.jpg"
        }
      ],
      itinerary: [
        {
          day: "Days 1-2",
          title: "Phuket",
          description: "Arrive in Thailand! Meet your trip manager and group at the hostel. Day 2: Visit the Elephant Sanctuary to feed and bathe these majestic creatures. In the evening, experience the thrills of Bangla Road—cocktails in buckets included!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722873195633-2KNTRWRP39CRP34JVS7X/unsplash-image-7pEPjI1rJKA.jpg"
        },
        {
          day: "Days 3-5",
          title: "Phi Phi Islands",
          description: "Ferry to Koh Phi Phi! Day 4: Embark on a stunning boat tour visiting Bamboo Island, Viking Cave, Monkey Beach, Phi Leh Lagoon, and Maya Bay. Catch sunset from a long tail boat and snorkel with bio-luminescent plankton. Day 5: Free day to explore viewpoints or relax on the beach.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/2b1eea8d-5844-4951-a9aa-1ddcc7c11c4c/unsplash-image-pMIlNaeJvr0.jpg"
        },
        {
          day: "Days 6-7",
          title: "Khao Sok National Park",
          description: "Welcome to the jungle! Transfer through limestone karst mountains to Khao Sok village. Day 7: Float down the river on a traditional bamboo raft, then embark on a head-torch-lit night safari to spot monkeys and jungle creatures.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/954b6dc0-2c04-49e3-8bce-c7fefb30abd0/unsplash-image-chnSOB50-Ro.jpg"
        },
        {
          day: "Day 8",
          title: "Floating Bungalows",
          description: "Take a long tail boat into Cheow Lan Lake and stay on floating bungalows. Explore Diamond Cave, kayak on the lake, and take an early morning boat safari to spot elephants, monkeys, and birds in their natural habitat.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722869565399-BCEDJD8XCBSRYXGFNLJ3/unsplash-image-YcXOWbWk8-U.jpg"
        },
        {
          day: "Days 9-11",
          title: "Koh Samui",
          description: "Arrive in Chaweng! Enjoy fire shows on the beach and nightlife at Sound Club, Arkbar, and Green Mango. Optional tours: Pig Island speedboat trip with snorkelling (Day 10) and zip lining through the jungle canopy (Day 11).",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722868969591-ROD61KFKSFP3FOA4XP6B/unsplash-image-xa-fv2RQCPY.jpg"
        },
        {
          day: "Days 12-15",
          title: "Koh Tao",
          description: "Welcome to Turtle Island! Perfect for scuba diving—complete your Open Water Qualification or try a discovery dive. Optional tours: Snorkelling boat tour to Koh Nang Yuan (Day 13) and Thai cooking class (Day 15). Day 14 is yours to explore viewpoints or enjoy a Thai massage.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/8e29ce02-4b4e-44b2-9d56-6d76495b549e/Koh-Tao.jpg"
        },
        {
          day: "Days 16-19",
          title: "Koh Phangan",
          description: "Arrive at Puk's Palace with its beachfront bar, 3 swimming pools, and friendly hostel dogs! Day 17: Quad biking adventure through the jungle with cliff-top views. Optional Muay Thai boxing class (Day 18). Day 19: Visit waterfalls and beaches, or catch sunset from the west coast.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/292afbb5-f398-4e04-a739-51e2c1a9c795/Koh-Phangan.jpg"
        },
        {
          day: "Days 20-21",
          title: "Phuket Old Town",
          description: "Final journey back to Phuket by ferry. Explore Old Town's amazing restaurants, boutique shops, and famous architecture. Emotional farewell to your Thai guide. Day 21: Onward travel or fly home with memories for a lifetime!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722873195633-2KNTRWRP39CRP34JVS7X/unsplash-image-7pEPjI1rJKA.jpg"
        }
      ],
      included: [
        "21 days accommodation included",
        "Activities packages included",
        "Iconic viewpoints",
        "Full access to the private members group",
        "Flight assistance",
        "Experienced ACE Rep travelling with you",
        "Local Thai guide"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance (mandatory)",
        "Lunches and some dinners",
        "Personal expenses and souvenirs",
        "Optional activities",
        "Visa fees (if applicable)",
        "Tips for guides and drivers"
      ],
      accommodation: {
        description: "Experience the best of Thailand's accommodation scene. From social hostels in Bangkok perfect for meeting your travel crew, to beachfront bungalows on the islands where you'll wake up to ocean views, and unique floating lodges in Khao Sok's jungle. Every stay is carefully selected for comfort, atmosphere, and that perfect balance of adventure and relaxation.",
        images: [
          "/thailand-hostel-pod.jpg",
          "/thailand-hostel-dorm.jpg",
          "/thailand-hostel-social.jpg",
          "/thailand-hostel-rooftop.jpg"
        ]
      },
      reviewsList: []
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
      departureDates: [
        { date: "13th - 26th June 2026", duration: "14 Days", price: "£1199" },
        { date: "31st Jul - 13th Aug 2026", duration: "14 Days", price: "£1199", badge: "Summer Holiday Friendly!" }
      ],
      accommodation: [
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/bHljzvhImvBUkIgg.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/kyTvbTPGjActsIBg.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/mpDakhCkwHVjNNqd.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/qvVNpgeRyDtsGSbr.JPG"
      ],
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
      description: "Explore Canggu's surf and nightlife, Ubud's rice terraces and temples, Nusa Lembongan's pristine beaches, and Uluwatu's surfer paradise. 14 days of Bali's best beaches, culture, and adventure.",
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
      reviewsList: [
        {
          name: "Chloe",
          date: "24 Sep 2025",
          rating: 5,
          title: "Thanks Ace for another amazing trip",
          content: "Second Ace trip and incredible again! Perfect for solo travellers. Met amazing people, hiked Mt Batur, released baby turtles! Clean, comfy stays. Can't wait for number three!"
        },
        {
          name: "Ellie Heinsen",
          date: "19 Sep 2025",
          rating: 5,
          title: "My trip to Bali was absolutely incredible",
          content: "Absolutely incredible! Perfect balance of culture, exploring, and partying. Ace team was helpful from booking to end. Mt Batur hike was unforgettable! First solo trip and it boosted my confidence to travel more."
        },
        {
          name: "Maisie",
          date: "23 Sep 2025",
          rating: 5,
          title: "BOOK WITH ACE you won't regret it",
          content: "Second trip with Ace! They do everything right. Never nervous because everything's covered. Bucket list activities like turtle conservation! Already planning trip three. Amazing support and instant friendships."
        },
        {
          name: "Charlotte",
          date: "24 Apr 2025",
          rating: 5,
          title: "I couldn't recommend Ace more",
          content: "Best time of my life! Perfect for first-time travellers. Ace handles everything so you don't worry about a thing. Life changing experience!"
        },
        {
          name: "Hannah Taylor",
          date: "22 Sep 2025",
          rating: 5,
          title: "Bali explorer",
          content: "Trip of a lifetime! Released turtles, surfed, climbed Mt Batur for sunrise, made jewelry, quad biked through waterfalls, white water rafted! Jay, Ruby, and Nyoman were incredible guides. Best experience ever!"
        },
        {
          name: "Dean Garrity",
          date: "18 Sep 2025",
          rating: 5,
          title: "Unforgettable Bali adventure",
          content: "Amazing experience from start to finish. The reps were fantastic and the activities were perfectly balanced. Mt Batur sunrise was breathtaking and the turtle sanctuary was a highlight. Would definitely travel with Ace again!"
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
        "Visa fees",
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
      departureDates: [],
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
      ],
      reviewsList: []
    },
    "thailand-intro": {
      id: "thailand-intro",
      name: "Thailand Intro",
      destination: "Thailand",
      duration: "12 days",
      price: "£999",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 5.0,
      reviews: 203,
      nextDeparture: "22 Mar 2026",
      departureDates: [],
      hero: "/thailand-intro-hero.webp",
      gallery: [
        "/thailand-intro-hero.webp",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/mirOuoHWMgcSDWGB.jpg",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/QrYFhzyXjBuRJxLn.JPG",
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BJGrLpWkZZByQqyU.JPG",
        "/thailand-elephant.jpg",
        "/thailand-temple.jpg",
        "/pai-canyon.jpg"
      ],
      description: "The perfect introduction to Thailand. Journey from Bangkok's bustling streets to Chiang Mai's cultural heart, then escape to Pai's mountain paradise. Experience elephant sanctuaries, temple visits, tipsy tubing, and unforgettable sunsets. 12 days of culture, adventure, and new friendships.",
      highlights: [
        {
          title: "Elephant sanctuary",
          description: "Discover the heartwarming Elephant Sanctuary, where majestic creatures roam freely. Interact, feed, and connect with these gentle giants in a natural haven, fostering a deep bond with nature and promoting responsible tourism.",
          image: "/thailand-elephant.jpg"
        },
        {
          title: "Bangkok city tour",
          description: "Glide along the Chao Phraya by long-tail boat, hop between the Grand Palace, Wat Pho's Reclining Buddha and Wat Arun's spires, weave through Chinatown's alleys, ride the Skytrain, and finish on a rooftop as the skyline lights up.",
          image: "/bangkok-longtail-boat.jpg"
        },
        {
          title: "Pai sunsets",
          description: "Chase golden hour to Two Huts and Pai Canyon: hammocks, mellow tunes, and horizons painted pink. Wander the sandstone ridges, watch swallows dip, and stay for blue hour as the valley glows and stars blink on.",
          image: "/pai-canyon.jpg"
        },
        {
          title: "Tipsy tubing",
          description: "Float down the Pai River with a crew of new friends; gentle rapids, music, and riverside stops to keep the vibe high. Dry bag zipped, hydrate between sips, for a hectic afternoon that turns into stories for days.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/a6ec7466-cdfa-4846-9c16-f89fe1c5b116/IMG_1336.PNG"
        },
        {
          title: "Temple visits",
          description: "Step into incense-swirled courtyards and gilded halls; admire serene Buddhas, lotus ponds, and chanting monks. Dress modestly, slip off your shoes, and move slow—temple time is a reset button that swaps noise for quiet awe.",
          image: "/thailand-temple-group.jpg"
        },
        {
          title: "Sticky waterfalls",
          description: "Climb the grippy limestone cascades barefoot—your feet stick like Velcro. Cool water, jungle shade, and the thrill of walking straight up a waterfall make this one of Chiang Mai's quirkiest natural wonders.",
          image: "/thailand-waterfall.webp"
        }
      ],
      itinerary: [
        {
          day: "Days 1-3",
          title: "Bangkok",
          description: "Day 1: Arrive in Thailand! Meet our airport rep for your pre-booked transfer to the hostel where you'll meet your trip manager and fellow travellers.\n\nDay 2: Breakfast included. Group briefing, then city tour of Bangkok covering Temples, China Town, and MBK shopping mall.\n\nDay 3: Free day to explore! Experience the thrills of Khao San road in the evening - cocktails in buckets and scorpion on a stick? Begin the night train journey north to Chiang Mai.",
          image: "/thailand-temple.jpg"
        },
        {
          day: "Days 4-6",
          title: "Chiang Mai",
          description: "Day 4: Arrive in the morning, check in and explore Chiang Mai's busy streets. Afternoon visit to Doi Suthep Temple with panoramic views.\n\nDay 5: *ACE MOMENT* Breakfast included. Elephant Sanctuary day! Visit majestic Asian Elephants in our ethically sourced sanctuary in the hills. Optional: Traditional Khatok Dinner.\n\nDay 6: Breakfast included. Journey to Pai, stopping at the sticky waterfalls. Finish at Two Huts for sunset with live music and ice cold drinks.",
          image: "/thailand-elephant.jpg"
        },
        {
          day: "Days 7-9",
          title: "Pai",
          description: "Day 7: Breakfast included. Tipsy Tubing - a massive floating party! Grab your inflatable ring and drift down Pai's River. Stop halfway for a foam party boogie on the riverbank. Hangovers guaranteed!\n\nDay 8: Breakfast included. Relaxing morning to recover, or explore Pai's beautiful streets and cute coffee spots. Evening trip to Pai Canyon for glowing orange sunset.\n\nDay 9: Breakfast included. Free day to explore Pai's hidden gems or chill at the hostel. Optional: Pai Hot Springs & Nam Lod Cave.",
          image: "/pai-canyon.jpg"
        },
        {
          day: "Days 10-11",
          title: "Chiang Mai",
          description: "Day 10: Breakfast included. Bye bye Pai! Head south back to Chiang Mai, stopping at an authentic Thai umbrella factory and silk factory.\n\nDay 11: Breakfast included. Indulge in an authentic Thai cooking class - cook up a storm and enjoy your creations! Learn how Thai cuisine hits the spot every time. Head back to Bangkok in the evening via train.",
          image: "/cooking-class.jpg"
        },
        {
          day: "Day 12",
          title: "Bangkok",
          description: "Breakfast included. The dreaded farewells! Give your new besties a big squeeze - you'll see them again, either in your own time or on another Ace Travel Experience! Chill at the hostel until your airport transfer arrives. Depart with unforgettable memories and lifelong friendships.",
          image: "/thailand-farewell-dinner.jpg"
        }
      ],
      included: [
        "11 nights accommodation (hostels and guesthouses)",
        "14 meals (breakfast and group dinners)",
        "Experienced Ace Rep & Local Guide",
        "Activities packages included (Elephant Sanctuary, Tipsy Tubing, Temple visits, Sticky Waterfalls)",
        "All activities and entrance fees",
        "Iconic viewpoints",
        "Private WhatsApp group",
        "Flight assistance",
        "Airport pickup",
        "All inter-destination transport including night train",
        "24/7 emergency support"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance (mandatory)",
        "Lunches and some dinners",
        "Personal expenses and souvenirs",
        "Optional activities (Khatok Dinner, Hot Springs & Nam Lod Cave)",
        "Visa fees (if applicable)",
        "Tips for guides and drivers"
      ],
      reviewsList: [
        {
          title: "Thanks Ace for another amazing trip",
          content: "Second Ace trip and incredible again! Perfect for solo travellers. Met amazing people, hiked Mt Batur, released baby turtles! Clean, comfy stays. Can't wait for number three!",
          name: "Chloe",
          date: "24 Sep 2025"
        },
        {
          title: "My trip to Thailand was absolutely incredible",
          content: "Absolutely Perfect! Mixture of culture, exploring, and partying. Ace team was helpful from booking to end. Mt Batur hike was unforgettable! First solo trip and it boosted my confidence to travel more.",
          name: "Ellie Heinsen",
          date: "18 Sep 2025"
        },
        {
          title: "I couldn't recommend Ace more",
          content: "Best time of my life! Perfect for first-time travellers. Ace handles everything so you don't worry about a thing. Life changing experience!",
          name: "Charlotte",
          date: "24 Apr 2025"
        },
        {
          title: "Thailand explorer",
          content: "Trip of a lifetime! Released turtles, surfed, climbed Mt Batur for sunrise, made jewelry, quad biked through waterfalls, white water rafted! Jay, Ruby, and Nyoman were incredible guides. Best experience ever!",
          name: "Hannah Taylor",
          date: "22 Sep 2025"
        },
        {
          title: "Incredible experience from start to finish",
          content: "Amazing trip with perfect balance of activities and free time. The group vibe was fantastic and our guides made everything seamless. Elephant sanctuary was the highlight!",
          name: "Maisie",
          date: "15 Aug 2025"
        },
        {
          title: "Best decision I ever made",
          content: "Went solo and made friends for life. The itinerary was perfectly paced with incredible experiences every day. Tipsy tubing in Pai was absolutely wild!",
          name: "Dean Garrity",
          date: "03 Jul 2025"
        }
      ]
    },
    "bali-island-hopper": {
      id: "bali-island-hopper",
      name: "Bali Island Hopper",
      destination: "Bali",
      duration: "14 days",
      price: "£1,199",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.9,
      reviews: 189,
      nextDeparture: "23rd May 2026",
      departureDates: [
        { date: "23rd May - 5th June 2026", price: "£1,199", duration: "14 Days" },
        { date: "4th - 17th July 2026", price: "£1,199", duration: "14 Days" },
        { date: "1st - 14th September 2026", price: "£1,199", duration: "14 Days" },
        { date: "29th May - 11th June 2027", price: "£1,199", duration: "14 Days" },
        { date: "17th - 30th July 2027", price: "£1,199", duration: "14 Days" },
        { date: "28th August - 10th September 2027", price: "£1,199", duration: "14 Days" }
      ],
      hero: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/4d19dbe1-0cf3-4ed7-8b3a-b19f118abfff/WhatsApp+Image+2024-07-17+at+10.05.01_76a2fd1c.jpg?format=1500w",
      gallery: [
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/794b172f-bebd-45f4-9575-a700255e954f/WhatsApp+Image+2024-07-17+at+10.11.52_f402bd63.jpg?format=1000w",
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755266310015-JHHRSV9OIO9RZFZJHDF1/unsplash-image-OizacLd_W7I.jpg?format=1000w",
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755266197128-MWHRSGMUQRYPXR80S74B/unsplash-image-7RvPpfof4P4.jpg?format=1000w",
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722874636424-EV6KRAF5P4C4T0L8SZ8B/unsplash-image-wbhgIkk2vMM.jpg?format=1000w",
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/b3836b89-fea5-4d4f-8da1-eacd66288c48/WhatsApp+Image+2024-07-17+at+10.36.26_97a7e4d1.jpg?format=750w",
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/eb06e9c2-bdea-42bf-adeb-db17690df642/WhatsApp+Image+2024-07-17+at+10.06.39_680c7cbd.jpg?format=750w",
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722786414203-CM1RQ59Y51IQ4UTE6GTX/unsplash-image-AZMmUy2qL6A.jpg?format=1000w",
        "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755265503266-6BVPJ5X0ITM6HUHL2OUF/unsplash-image-p1aFK6ayTYg.jpg?format=1000w"
      ],
      description: "The ultimate 14-day Bali island hopping adventure. Surf the legendary waves of Kuta, snorkel with giant manta rays in Nusa Lembongan, explore the dramatic cliffs of Nusa Penida, discover Lombok's wild beaches and waterfalls, and party on the car-free paradise of Gili Trawangan.",
      routeMap: "/bali-island-hopper-map.webp",
      highlights: [
        {
          title: "Surf lessons",
          description: "Experience the thrill of riding the waves with our expert-led surfing lessons! Whether you are a complete beginner or looking to hone your skills, our instructors will guide you every step of the way. Set against the backdrop of stunning beaches and crystal-clear waters, our surfing lessons offer an unforgettable adventure. Dive in, catch your first wave, and embrace the excitement of surfing!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/794b172f-bebd-45f4-9575-a700255e954f/WhatsApp+Image+2024-07-17+at+10.11.52_f402bd63.jpg?format=750w"
        },
        {
          title: "Snorkelling with turtles",
          description: "Slip into calm, crystal water and drift over coral gardens where turtles cruise unbothered. Join a morning boat to Turtle Point or swim from the east coast, float alongside these gentle icons, then rinse off with a beachside coconut. Keep your distance, don't touch, and use reef-safe sunscreen — pure island magic, done right.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755266310015-JHHRSV9OIO9RZFZJHDF1/unsplash-image-OizacLd_W7I.jpg?format=750w"
        },
        {
          title: "Iconic viewpoints",
          description: "Chase horizons from hilltops and cliff edges: in Lombok, greet sunrise over Rinjani from Pergasingan and catch golden hour at Merese and Malimbu. On the Nusas, gaze down Kelingking's \"T-Rex,\" Diamond Beach, Devil's Tears, and Blue Lagoon. On the Gilis, wander to Sunset Point for sea-pink skies and silhouettes of Bali and Rinjani — views that stop you mid-sentence.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755266197128-MWHRSGMUQRYPXR80S74B/unsplash-image-7RvPpfof4P4.jpg?format=750w"
        },
        {
          title: "Giant manta rays",
          description: "Encounter the awe-inspiring giant manta rays in their natural habitat. These majestic creatures glide gracefully through the crystal-clear waters, offering a mesmerising sight for snorkellers and divers alike. Witnessing their elegant movements up close is a truly unforgettable experience, making it a must-do activity for any marine life enthusiast.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722874636424-EV6KRAF5P4C4T0L8SZ8B/unsplash-image-wbhgIkk2vMM.jpg?format=750w"
        }
      ],
      itinerary: [
        {
          day: "Day 1",
          title: "Kuta — Arrival",
          description: "Arrive in Bali! Grab your bag at the airport and meet our airport rep who will get you into your pre-booked airport transfer. Arrive at the first hostel and meet your trip manager and the rest of the guests on the tour!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755265503266-6BVPJ5X0ITM6HUHL2OUF/unsplash-image-p1aFK6ayTYg.jpg?format=750w"
        },
        {
          day: "Days 2-4",
          title: "Nusa Lembongan & Nusa Penida",
          description: "Day 2 — Breakfast included. Transfer and short ferry over to Nusa Lembongan. Check in at one of our top hostels with an infinity pool, gym, sauna, cold plunge and panoramic views.\n\nDay 3 — Head out on a boat to Manta Bay for snorkelling with giant manta rays. Most are 3-4 metres wide — gentle giants that will make you feel very small!\n\nDay 4 — Breakfast included. Boat over to Nusa Penida for an island tour visiting Angel Billabong, Broken Beach, Kelingking Beach and Crystal Bay. Bring your cameras!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1755265674810-T86SUHW3F1DDMVCOS17A/unsplash-image-2ZJxGgv-Hww.jpg?format=750w"
        },
        {
          day: "Days 5-8",
          title: "Lombok — Beaches, Waterfalls & Sunsets",
          description: "Day 5 — Breakfast included. Ferry over to Lombok! Enjoy breathtaking scenery with rice terraces and Mount Rinjani in the background.\n\nDay 6 — Visit Lombok's most beautiful waterfalls hidden in the jungle. Evening dinner and a little boogie at local hotspots.\n\nDay 7 — Beach day! Mawun for body surfing, Are Guling for tanning, Selong Belanak for lunch, and Bukit Merese for a pastel sunset.\n\nDay 8 — Free day to explore Kuta Lombok. Optional surfing lessons available!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722786414203-CM1RQ59Y51IQ4UTE6GTX/unsplash-image-AZMmUy2qL6A.jpg?format=750w"
        },
        {
          day: "Days 9-12",
          title: "Gili Trawangan — Island Paradise",
          description: "Day 9 — Breakfast included. Welcome to THE island life. No cars, no motorbikes — just bicycles and your legs! Beachfront hostel with family BBQs, pool and beach volleyball.\n\nDay 10 — Snorkelling trip where you are 99.9% likely to swim with turtles! Visit the famous underwater statues and turtle sanctuary on Gili Air.\n\nDay 11 — Breakfast included. Free day to explore by bicycle. Grab a snorkel from street rentals, shop for souvenirs, or find a great spot for a boogie!\n\nDay 12 — Breakfast included. Chill at the hostel or beach. Group sunset, then beanbags and a film at the beach cinema.",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/eb06e9c2-bdea-42bf-adeb-db17690df642/WhatsApp+Image+2024-07-17+at+10.06.39_680c7cbd.jpg?format=750w"
        },
        {
          day: "Days 13-14",
          title: "Kuta — Final Days",
          description: "Day 13 — Breakfast included. The last hop. Back to mainland Bali by ferry then a short transfer to Kuta. Grab a final sunset and family dinner together before packing your bags.\n\nDay 14 — The dreaded farewells! Give your new besties a big squeeze — we're positive you'll see them again, either in your own time or on another ACE Travel Experience!",
          image: "https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/b3836b89-fea5-4d4f-8da1-eacd66288c48/WhatsApp+Image+2024-07-17+at+10.36.26_97a7e4d1.jpg?format=750w"
        }
      ],
      included: [
        "14 days accommodation included",
        "Activities packages included",
        "Experienced ACE Rep & Local Guide",
        "Iconic viewpoints",
        "Private group WhatsApp",
        "Flight assistance",
        "Flexible payment plan",
        "14 meals"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities (scuba diving, spa)",
        "Visa on arrival fee (approx $35 USD)",
        "Tips"
      ],
      reviewsList: [
        {
          name: "Evelyn",
          rating: 5,
          date: "05/10/25",
          title: "I went to Bali with Ace Travel Experiences",
          text: "I went on the Bali Island Hopper trip in September 2025 and I can honestly say that it was one of the best trips of my life. Having never flown outside of Europe, it was comforting to know that the reps Ruby and Jay were on hand to help with any questions. I couldn't thank Jay enough for encouraging me to face my fear to scuba dive for the first time, and Ruby for being so warm and welcoming and treating me as a friend, rather than just a guest on the trip. Thank you Ace for such an amazing experience!"
        },
        {
          name: "Carly J",
          rating: 5,
          date: "09/10/25",
          title: "Just book it, no regrets!",
          text: "I did the Bali Island Hopper in September and absolutely loved the snorkelling, Gili T was amazing! Seeing the manta rays was probably the best experience I've ever had in my life! Jay and Ruby were incredible. Will absolutely be booking another tour with Ace!! All the accommodations were impeccable and everything was so so so well organised!"
        },
        {
          name: "Charlotte",
          rating: 5,
          date: "24/04/25",
          title: "I couldn't recommend Ace more...",
          text: "I couldn't recommend Ace more! From start till end it was the best time of my life! I decided to go with a group to start my travels as booking/organising can be overwhelming and I'm so glad I went with Ace. They do absolutely everything for you and you don't have to worry about a thing which is what I loved about it. Life changing experience!"
        },
        {
          name: "Jayden",
          rating: 5,
          date: "09/10/25",
          title: "Bali Island Hopper",
          text: "Loved every minute of my trip, from the activities, organisation, communication and the friendliness of both Jay and Ruby!"
        }
      ]
    }
  };

  const tourId = params?.id || "thailand-island-hopper";
  const tour = tours[tourId as keyof typeof tours] || tours["thailand-island-hopper"];

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return;
    const scrollAmount = galleryRef.current.clientWidth * 0.8;
    galleryRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
    galleryRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (galleryRef.current) {
        galleryRef.current.style.cursor = 'grab';
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
        <img 
          src={tour.hero}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="flex items-start justify-between gap-8">
            <div className="max-w-3xl text-background">
              <Badge className="bg-primary text-primary-foreground mb-4">
                {tour.destination}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                {tour.name}
              </h1>
              <p className="text-sm md:text-lg mb-8 leading-relaxed">
                {tour.description}
              </p>
              <div className="flex flex-wrap gap-6 text-sm md:text-base">
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
            <a 
              href="https://uk.trustpilot.com/review/www.acetravelexperiences.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block flex-shrink-0"
            >
              <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-md hover:shadow-lg transition-shadow">
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 leading-none">4.9</div>
                  <div className="text-xs font-semibold text-gray-900 mt-0.5">Excellent</div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                    ))}
                  </div>
                </div>
                <div className="border-l border-gray-300 pl-2">
                  <div className="text-xs font-semibold text-gray-900 leading-tight">Trusted by 500+</div>
                  <div className="text-xs font-semibold text-gray-900 leading-tight">travellers from all</div>
                  <div className="text-xs font-semibold text-gray-900 leading-tight">over the world</div>
                </div>
              </div>
            </a>
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
                          style={h.title === 'Tipsy tubing' ? { objectPosition: 'center 70%' } : undefined}
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
              <h2 className="text-3xl font-bold tracking-tight mb-6">Your Journey</h2>
              <div className="mb-8 bg-accent/10 p-8 rounded-lg">
                <img 
                  src={
                    tourId === 'thailand-intro' ? '/thailand-intro-map.webp' : 
                    tourId === 'thailand-island-hopper' ? '/thailand-island-hopper-map.webp' :
                    tourId === 'bali-island-hopper' ? '/bali-island-hopper-map.webp' :
                    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/trjSBWQKzHaQYLlx.webp'
                  }
                  alt={`${tour.name} Route Map`}
                  className="w-full max-w-3xl mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-6">Day by Day</h3>
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
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {itineraryItem.description.split('\n').map((line, i) => {
                            const dayMatch = line.match(/^(Day \d+:)(.*)$/);
                            if (dayMatch) {
                              return (
                                <span key={i}>
                                  <span className="font-bold text-primary">{dayMatch[1]}</span>
                                  {dayMatch[2]}
                                  {i < itineraryItem.description.split('\n').length - 1 && <br />}
                                </span>
                              );
                            }
                            return (
                              <span key={i}>
                                {line}
                                {i < itineraryItem.description.split('\n').length - 1 && <br />}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  </Card>
                  );
                })}
              </div>
            </div>

            {tour.reviewsList && Array.isArray(tour.reviewsList) && tour.reviewsList.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold">5.0</span>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 fill-current"
                            style={{ color: '#00B67A' }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Based on hundreds of traveller reviews</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div 
                    ref={reviewsRef}
                    className="flex gap-4 overflow-x-scroll pb-4 snap-x snap-mandatory scrollbar-hide touch-pan-x"
                  >
                    {tour.reviewsList.map((review: any, index: number) => (
                        <Card key={index} className="flex-shrink-0 w-[85vw] md:w-[400px] snap-start p-6 border">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 fill-current"
                                style={{ color: '#00B67A' }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <h3 className="font-bold mb-2">{review.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 flex-grow">{review.content}</p>
                          <div className="text-sm text-muted-foreground border-t pt-3">
                            <p className="font-semibold text-foreground">{review.name}</p>
                            <p className="text-xs">{review.date}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (reviewsRef.current) {
                        reviewsRef.current.scrollBy({ left: -420, behavior: 'smooth' });
                      }
                    }}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => {
                      if (reviewsRef.current) {
                        reviewsRef.current.scrollBy({ left: 420, behavior: 'smooth' });
                      }
                    }}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

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

          <div className="lg:col-span-1 hidden lg:block">
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

              {(!tour.departureDates || tour.departureDates.length === 0) ? (
                <Button 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base h-14"
                  onClick={() => {
                    const leadForm = document.getElementById('lead-capture-form');
                    leadForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  Dates Coming Soon! Register Interest
                </Button>
              ) : (
                <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg h-14"
                  >
                    Book Now
                  </Button>
                </a>
              )}

              <div className="space-y-2 text-center text-sm text-muted-foreground">
                <p>Secure your spot with just {tour.deposit}</p>
                <p>Flexible payment plans available</p>

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

      {/* Accommodation Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">Your Home Away From Home</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            We carefully select comfortable, social hostels that strike the perfect balance between rest and connection. 
            Each accommodation features modern amenities, clean facilities, and vibrant common areas where you'll meet 
            fellow travellers and create lasting friendships. From cozy dorm rooms to relaxing social spaces, 
            your accommodation is designed to enhance your adventure experience.
          </p>
          
          <div className="w-full overflow-hidden">
            <div className="relative">
              <div 
                className="flex gap-4 px-4 md:px-8 overflow-x-scroll snap-x snap-mandatory scrollbar-hide" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                <div className="flex-shrink-0 snap-start w-[85vw] md:w-[calc(25%-12px)] aspect-[4/3] overflow-hidden rounded-lg">
                  <img 
                    src="/hostel-pod.jpg"
                    alt="Modern hostel pod beds with privacy curtains"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-shrink-0 snap-start w-[85vw] md:w-[calc(25%-12px)] aspect-[4/3] overflow-hidden rounded-lg">
                  <img 
                    src="/hostel-dorm.jpg"
                    alt="Comfortable hostel dorm room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-shrink-0 snap-start w-[85vw] md:w-[calc(25%-12px)] aspect-[4/3] overflow-hidden rounded-lg">
                  <img 
                    src="/hostel-common.webp"
                    alt="Vibrant hostel common area"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-shrink-0 snap-start w-[85vw] md:w-[calc(25%-12px)] aspect-[4/3] overflow-hidden rounded-lg">
                  <img 
                    src="/hostel-rooftop.webp"
                    alt="Hostel rooftop terrace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departure Dates Section */}
      {tour.departureDates && tour.departureDates.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">Choose Your Dates</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">Select your preferred departure date and secure your spot</p>
            
            {/* Payment Calculator - shown for first departure date as example */}
            {tour.departureDates[0] && (
              <div className="max-w-lg mx-auto mb-12">
                <PaymentCalculator 
                  tourPrice={parsePrice(tour.departureDates[0].price)}
                  departureDate={parseDepartureDate(tour.departureDates[0].date)}
                  tourName={tour.name}
                />
              </div>
            )}
            
            <div className="max-w-2xl mx-auto space-y-3">
              {tour.departureDates.map((departure, index) => (
                <Card key={index} className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-lg font-bold">{departure.date}</span>
                        {(departure as any).spotsLeft && (departure as any).spotsLeft <= 5 && (
                          <Badge variant="destructive" className="text-xs ml-2">
                            Only {(departure as any).spotsLeft} left!
                          </Badge>
                        )}
                        {(departure as any).badge && (
                          <Badge className="text-xs ml-2 bg-accent text-accent-foreground">
                            {(departure as any).badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {(departure as any).duration && (
                          <span className="font-medium">{(departure as any).duration}</span>
                        )}
                        <span className="font-semibold text-primary text-base">{departure.price}</span>
                      </div>
                    </div>
                    <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-primary hover:bg-primary/90">
                        Book Now
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-sell to shorter tour */}
      {tour.id === "thailand-island-hopper" && (
        <section className="py-16 bg-gradient-to-br from-accent/5 to-accent/10">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Want a shorter trip?</h2>
              <p className="text-lg text-muted-foreground">Try our 10-day Thailand Intro for the perfect introduction</p>
            </div>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img 
                    src="https://images.squarespace-cdn.com/content/v1/66ae11327f818049cb25651b/1722873195633-2KNTRWRP39CRP34JVS7X/unsplash-image-7pEPjI1rJKA.jpg"
                    alt="Thailand Intro"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">10 Days</Badge>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Thailand Intro</h3>
                    <p className="text-muted-foreground mb-4">
                      Perfect for first-timers or those with limited time. Experience Bangkok's culture, 
                      Chiang Mai's temples, and the stunning beaches of Krabi in just 10 days.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Bangkok temples & street food</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Chiang Mai cultural immersion</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Krabi beaches & island hopping</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Perfect for 18-35 year olds</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">£899</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                    <Link href="/tour/thailand-intro">
                      <Button size="lg" className="gap-2">
                        View Tour <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Cross-sell to longer tour */}
      {tour.id === "thailand-intro" && (
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Want to go for longer?</h2>
              <p className="text-lg text-muted-foreground">Extend your adventure with our 21-day Thailand Island Hopper</p>
            </div>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80"
                    alt="Thailand Island Hopper"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">21 Days</Badge>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Thailand Island Hopper</h3>
                    <p className="text-muted-foreground mb-4">
                      The ultimate Thailand adventure. Everything from Thailand Intro plus paradise islands, 
                      the legendary Full Moon Party, jungle trekking, and island hopping in Phi Phi and Krabi.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Full Moon Party on Koh Phangan</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Phi Phi Islands & Maya Bay</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Jungle trekking in Khao Sok National Park</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>All Thailand Intro highlights included</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">From</div>
                      <div className="text-3xl font-bold text-primary">£1,899</div>
                    </div>
                    <Link href="/tour/thailand-island-hopper">
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        View Tour
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Lead Capture for Tours Without Dates */}
      {(!tour.departureDates || tour.departureDates.length === 0) && (
        <section id="lead-capture-form" className="py-16 bg-muted/30">
          <div className="container max-w-3xl">
            <Card className="p-8 md:p-12 text-center">
              <div className="mb-6">
                <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold tracking-tight mb-2">Dates Coming Soon!</h2>
                <p className="text-lg text-muted-foreground">
                  We're finalising departure dates for this tour. Register your interest and we'll notify you as soon as dates are released.
                </p>
              </div>
              
              <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest! We\'ll notify you when dates are available.'); }}>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <select
                    className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Preferred Month</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                  </select>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Notify Me When Dates Are Available
                </Button>
              </form>
              
              <p className="text-sm text-muted-foreground mt-6">
                Have questions? <a href="tel:+447450996347" className="text-primary hover:underline font-semibold">Call us at +44 7450 996 347</a>
              </p>
            </Card>
          </div>
        </section>
      )}

      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Photo Gallery</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="relative">
            <div 
              ref={galleryRef}
              className="flex gap-4 px-4 md:px-8 overflow-x-scroll snap-x snap-mandatory scrollbar-hide cursor-grab select-none" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {tour.gallery.map((img, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 snap-start w-[85vw] md:w-[calc(25%-12px)] aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <img 
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollGallery('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 hover:bg-background flex items-center justify-center transition-kinetic rounded-full shadow-lg z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollGallery('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 hover:bg-background flex items-center justify-center transition-kinetic rounded-full shadow-lg z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Everything you need to know before booking your adventure
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="solo">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Can I join solo?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Absolutely! Over 70% of our travellers join solo. Our group tours are specifically designed to help you make friends from day one. You'll share accommodation with other travellers, and our experienced trip managers create a welcoming atmosphere where everyone feels included. Many of our solo travellers tell us they made lifelong friends on their ACE adventure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How do I book and pay?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                To secure your place, a non-refundable deposit of £60 is required. The balance is due no later than 30 days before departure, unless you are on a pre-agreed installment plan. All payments are processed in GBP (£) and we accept all major credit and debit cards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancellation">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What if I need to cancel?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                If you need to cancel, please let us know as soon as possible. If you have paid £60 or more of the total package price, you may have the option to carry your place over to another trip date (must be requested at least 2 months before departure, subject to our discretion). Due to commitments with our accommodation partners, we cannot offer refunds on payments made once terms are accepted, except for mistakes on our part or duplicate payments. We strongly recommend comprehensive travel insurance that covers cancellations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Can I change my booking?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Date or trip changes may be requested up to 45 days before departure, subject to availability and a £50 admin fee. Bookings are not transferable to another person without our written approval.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="insurance">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Is travel insurance required?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Yes, comprehensive travel insurance covering medical treatment, repatriation, theft, cancellation, and personal liability is mandatory. Proof of insurance must be provided before departure. We recommend purchasing insurance as soon as you book to ensure maximum coverage.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="visa">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do I need a visa?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                You are responsible for arranging correct visas and entry permits for your trip. We provide guidance but cannot guarantee approval. Your passport must be valid for at least 6 months beyond your return date. UK, EU, US, Canadian, and Australian passport holders typically receive a free visa on arrival for Thailand, Bali, and the Philippines (30 days each). Always check current requirements with your local embassy before traveling.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="included">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What's included in the price?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Inclusions are listed in your chosen trip itinerary and typically include accommodation, some meals, excursions, transfers, and your tour leader. Exclusions usually include flights, travel insurance, visas, vaccinations, personal spending money, optional extras, and meals not listed in the itinerary.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="group">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What's the group dynamic like?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Our tours are social, group-based experiences for ages 18-35. Groups typically range from 15-30 travellers. The vibe is social, adventurous, and inclusive. We attract open-minded people who love to explore, try new things, and make friends. There's a perfect balance of organized group activities and free time to do your own thing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section 
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${tour.hero})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
            Ready for Your Adventure?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Join hundreds of travellers on this incredible journey
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
              className="font-medium tracking-tight text-lg h-14 px-8 text-white border-white hover:bg-white/10"
            >
              <Link href="/tours">View All Tours</Link>
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/90 mb-4">Have questions before booking?</p>
            <a href="tel:+447450996347" className="inline-block">
              <Button 
                size="lg"
                variant="outline"
                className="font-medium tracking-tight text-lg h-14 px-8 text-white border-white hover:bg-white/10"
              >
                📞 Speak to a Travel Expert: +44 7450 996 347
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Book Now CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border shadow-lg">
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold text-primary">{tour.price}</div>
              <div className="text-xs text-muted-foreground">{tour.deposit} deposit</div>
            </div>
            {(!tour.departureDates || tour.departureDates.length === 0) ? (
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 text-sm"
                onClick={() => {
                  const leadForm = document.getElementById('lead-capture-form');
                  leadForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                Register Interest
              </Button>
            ) : (
              <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
                >
                  Book Now
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
