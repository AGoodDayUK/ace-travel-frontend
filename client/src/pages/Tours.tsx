import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Users, MapPin, Star, ArrowRight, Clock } from "lucide-react";

const tours = [
  {
    id: 1,
    slug: "thailand-island-hopper",
    name: "Thailand Island Hopper",
    destination: "Thailand",
    duration: "21 days",
    price: "£1,599",
    deposit: "£60",
    groupSize: "15-30",
    ageRange: "18-35",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg",
    highlights: ["Elephant Sanctuary", "Phi Phi Islands", "Full Moon Party", "Quad Biking", "Bangla Road", "Floating Bungalows"],
    rating: 4.9,
    reviews: 247,
    availability: "Limited Spots",
    nextDeparture: "1st April 2026",
    badge: "Most Popular",
    description: "The ultimate 21-day Thai adventure. Bangkok streets, Chiang Mai temples, Phi Phi's turquoise waters, and the legendary Full Moon Party on Koh Phangan."
  },
  {
    id: 2,
    slug: "bali-explorer",
    name: "Bali Explorer",
    destination: "Bali",
    duration: "14 days",
    price: "£1,199",
    deposit: "£60",
    groupSize: "15-30",
    ageRange: "18-35",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZyduANpQpBJQSfsk.jpeg",
    highlights: ["Mount Batur Trek", "Surf Lessons", "Nusa Lembongan", "Rice Terraces", "World Famous Beach Clubs", "Giant Manta Rays"],
    rating: 4.9,
    reviews: 203,
    availability: "Limited Spots",
    nextDeparture: "13th June 2026",
    badge: "Summer Special",
    description: "14 days of pure Bali magic. Trek an active volcano at sunrise, surf Kuta's waves, snorkel with manta rays, and dance at Seminyak's iconic beach clubs."
  },
  {
    id: 3,
    slug: "bali-island-hopper",
    name: "Bali Island Hopper",
    destination: "Bali",
    duration: "14 days",
    price: "£1,199",
    deposit: "£60",
    groupSize: "15-30",
    ageRange: "18-35",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FIusTznaFJxspxFF.jpeg",
    highlights: ["Surf Lessons", "Snorkelling with Turtles", "Nusa Penida Cliffs", "Giant Manta Rays", "Lombok Waterfalls", "Gili Trawangan"],
    rating: 4.9,
    reviews: 189,
    availability: "Available",
    nextDeparture: "23rd May 2026",
    badge: null,
    description: "Hop between Bali's most stunning islands over 14 days. Surf Kuta, snorkel Nusa Lembongan, hike Nusa Penida's cliffs, explore Lombok, and party on car-free Gili T."
  },
  {
    id: 4,
    slug: "thailand-intro",
    name: "Thailand Intro",
    destination: "Thailand",
    duration: "12 days",
    price: "£999",
    deposit: "£60",
    groupSize: "15-30",
    ageRange: "18-35",
    image: "/thailand-intro-hero.webp",
    highlights: ["Elephant Sanctuary", "Bangkok City Tour", "Pai Sunsets", "Tipsy Tubing", "Temple Visits", "Sticky Waterfalls"],
    rating: 5.0,
    reviews: 203,
    availability: "Available",
    nextDeparture: "22nd March 2026",
    badge: "5 Star Rated",
    description: "The perfect 12-day introduction to Thailand. Bangkok's temples, Chiang Mai's culture, and Pai's mountain paradise — with elephant sanctuaries and unforgettable sunsets."
  },
  {
    id: 5,
    slug: "philippines-paradise",
    name: "Philippines Paradise",
    destination: "Philippines",
    duration: "10 days",
    price: "£999",
    deposit: "£60",
    groupSize: "15-30",
    ageRange: "18-35",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/gMgbXqqaIFwmNoLk.webp",
    highlights: ["Sardine Run", "Canyoneering", "Whale Sharks", "El Nido Island Tour", "Siargao Surf", "Chocolate Hills"],
    rating: 4.9,
    reviews: 167,
    availability: "Available",
    nextDeparture: "19th January 2027",
    badge: "New Tour",
    description: "10 days across the Philippines' most breathtaking islands. Swim with whale sharks, surf Cloud 9, kayak El Nido's lagoons, and discover Bohol's Chocolate Hills."
  }
];

const destinations = ["All", "Thailand", "Bali", "Philippines"];

export default function Tours() {
  const [selectedDestination, setSelectedDestination] = useState<string>("All");

  const filteredTours = selectedDestination === "All"
    ? tours
    : tours.filter(tour => tour.destination === selectedDestination);

  return (
    <div className="animate-fade-in min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container py-20 md:py-28 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Find Your Adventure
          </h1>
          <p className="text-xl md:text-2xl text-background/75 max-w-3xl mx-auto leading-relaxed">
            All tours include accommodation, most meals, activities, and an expert trip manager.
            Just £60 deposits with flexible payment plans.
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-4 text-sm text-background/60">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>4.9 average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>800+ travellers</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>3 destinations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container py-4 flex flex-wrap gap-2 items-center">
          {destinations.map((dest) => (
            <Button
              key={dest}
              variant={selectedDestination === dest ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDestination(dest)}
              className="font-medium tracking-tight"
            >
              {dest === "All" ? "All Destinations" : dest}
            </Button>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">
            {filteredTours.length} tour{filteredTours.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Tour Cards */}
      <section className="container py-12 md:py-16">
        <div className="space-y-8">
          {filteredTours.map((tour, index) => (
            <div
              key={tour.id}
              className="group grid grid-cols-1 lg:grid-cols-5 overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className={`relative lg:col-span-2 h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {tour.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 tracking-wide uppercase">
                      {tour.badge}
                    </span>
                  </div>
                )}
                {tour.availability === "Limited Spots" && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-destructive/90 text-destructive-foreground text-xs font-bold px-3 py-1.5 tracking-wide uppercase">
                      Limited Spots
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-bold text-sm">{tour.rating}</span>
                  <span className="text-white/70 text-sm">({tour.reviews} reviews)</span>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-between gap-6 bg-card">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2">
                        <MapPin className="w-3 h-3" />
                        {tour.destination}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {tour.name}
                      </h2>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-muted-foreground mb-1">From</div>
                      <div className="text-3xl font-bold text-primary">{tour.price}</div>
                      <div className="text-xs text-muted-foreground">£60 deposit</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs px-2.5 py-1 bg-muted text-muted-foreground border border-border font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta + CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{tour.groupSize} people</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Next: {tour.nextDeparture}</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-tight px-6"
                  >
                    <Link href={`/tour/${tour.slug}`} className="flex items-center gap-2">
                      View Tour
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-muted border-t border-border py-14 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-5xl font-bold text-primary">£60</div>
              <h3 className="text-lg font-bold">Low Deposits</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Secure your spot with just £60 and spread the cost with flexible payment plans
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-bold text-primary">24/7</div>
              <h3 className="text-lg font-bold">Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Expert trip managers and 24/7 emergency support throughout your journey
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-bold text-primary">4.9★</div>
              <h3 className="text-lg font-bold">Rated by Travellers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hundreds of five-star reviews from real ACE travellers across every tour
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
        <div className="relative container text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-2">
            <Star className="w-4 h-4 fill-accent text-accent" />
            Rated 4.9/5 by 500+ travellers
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Got Questions? We're Here.
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Not sure which tour is right for you? Our team knows every trip inside out and would love to help you choose.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold tracking-tight text-lg h-14 px-10 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/70 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold tracking-tight text-lg h-14 px-10 rounded-full transition-all hover:scale-105"
            >
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
