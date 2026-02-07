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
    "bali-adventure": {
      id: "bali-adventure",
      name: "Bali Adventure",
      destination: "Bali",
      duration: "14 days",
      price: "£1,399",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      rating: 4.9,
      reviews: 203,
      nextDeparture: "12 Mar 2026",
      hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80"
      ],
      description: "Experience the magic of Bali. Trek to sunrise at Mount Batur, surf the waves of Canggu, explore ancient temples, and discover the rice terraces of Ubud. This 14-day adventure combines culture, adventure, and beach vibes.",
      highlights: [
        "Sunrise trek up Mount Batur volcano",
        "Surf lessons in Canggu",
        "Ubud rice terrace exploration",
        "Temple visits including Tanah Lot",
        "Nusa Islands day trip (snorkeling and cliff jumping)",
        "Traditional Balinese cooking class",
        "Waterfall chasing and jungle swings",
        "Beach club parties in Seminyak"
      ],
      itinerary: [
        {
          day: "Days 1-3",
          title: "Canggu",
          description: "Arrive in Bali and head straight to the surf town of Canggu. Learn to surf, explore beach clubs, and soak up the laid-back vibes. Visit nearby temples and enjoy sunset at Echo Beach."
        },
        {
          day: "Days 4-7",
          title: "Ubud",
          description: "Cultural heart of Bali. Trek through rice terraces, visit the Monkey Forest, take a cooking class, and explore waterfalls. Swing over the jungle and visit traditional markets."
        },
        {
          day: "Day 8",
          title: "Mount Batur Sunrise Trek",
          description: "Early morning trek to the summit of Mount Batur volcano. Watch the sunrise over the clouds and enjoy breakfast cooked by volcanic steam. Unforgettable experience."
        },
        {
          day: "Days 9-11",
          title: "Nusa Islands",
          description: "Ferry to Nusa Lembongan and Nusa Penida. Snorkel with manta rays, cliff jump at Blue Lagoon, visit Kelingking Beach (T-Rex cliff), and relax on pristine beaches."
        },
        {
          day: "Days 12-14",
          title: "Seminyak",
          description: "End your trip in style. Beach clubs, shopping, spa days, and farewell beach party. Visit Tanah Lot temple for sunset and celebrate your Bali adventure."
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((item, index) => (
                  <Card key={index} className="p-6 border-2">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <Badge variant="outline">{item.day}</Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
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
