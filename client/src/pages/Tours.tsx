import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, Users, MapPin, Star, ArrowRight } from "lucide-react";

export default function Tours() {
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  const tours = [
    {
      id: 1,
      slug: "thailand-island-hopper",
      name: "Thailand Island Hopper",
      destination: "Thailand",
      duration: "21 days",
      price: "£1,899",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      highlights: ["Bangkok", "Phi Phi Islands", "Full Moon Party", "Khao Sok"],
      rating: 4.9,
      reviews: 247,
      availability: "Limited Spots",
      nextDeparture: "15 Mar 2026"
    },
    {
      id: 2,
      slug: "thailand-intro",
      name: "Thailand Intro",
      destination: "Thailand",
      duration: "10 days",
      price: "£999",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/hCjqPFKzQfIcAvQa.jpg",
      highlights: ["Chiang Mai", "Yoga Retreats", "Wellness", "Temples"],
      rating: 4.8,
      reviews: 189,
      availability: "Available",
      nextDeparture: "22 Mar 2026"
    },
    {
      id: 3,
      slug: "bali-explorer",
      name: "Bali Explorer",
      destination: "Bali",
      duration: "14 days",
      price: "£1,399",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/bHljzvhImvBUkIgg.JPG",
      highlights: ["Mt. Batur Trek", "Ubud", "Canggu", "Nusa Islands"],
      rating: 4.9,
      reviews: 203,
      availability: "Limited Spots",
      nextDeparture: "12 Mar 2026"
    },
    {
      id: 4,
      slug: "bali-island-hopper",
      name: "Bali Island Hopper",
      destination: "Bali",
      duration: "10 days",
      price: "£1,199",
      deposit: "£60",
      groupSize: "15-30",
      ageRange: "18-35",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/GsVJxEVQBngZgOoI.JPG",
      highlights: ["Nusa Islands", "Ubud", "Seminyak", "Beach Clubs"],
      rating: 4.8,
      reviews: 156,
      availability: "Available",
      nextDeparture: "18 Mar 2026"
    }
  ];

  const destinations = ["all", "Thailand", "Bali"];

  const filteredTours = selectedDestination === "all" 
    ? tours 
    : tours.filter(tour => tour.destination === selectedDestination);

  return (
    <div className="animate-fade-in">
      <section className="bg-foreground text-background py-16 md:py-24">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Find Your Adventure
          </h1>
          <p className="text-xl md:text-2xl text-background/80 max-w-3xl mx-auto">
            All tours include accommodation, most meals, activities, and an expert trip manager. 
            Just £60 deposits with flexible payment plans.
          </p>
        </div>
      </section>

      <section className="container py-8 border-b border-border">
        <div className="flex flex-wrap gap-3">
          {destinations.map((dest) => (
            <Button
              key={dest}
              variant={selectedDestination === dest ? "default" : "outline"}
              onClick={() => setSelectedDestination(dest)}
              className="font-medium tracking-tight"
            >
              {dest === "all" ? "All Destinations" : dest}
            </Button>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <Card 
              key={tour.id}
              className="group overflow-hidden border-2 hover:border-primary transition-kinetic cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {tour.destination}
                  </Badge>
                  {tour.availability === "Limited Spots" && (
                    <Badge variant="destructive">
                      Limited Spots
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-kinetic">
                    {tour.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-accent">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{tour.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({tour.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tour.highlights.slice(0, 3).map((highlight) => (
                    <span 
                      key={highlight}
                      className="text-xs px-2 py-1 bg-muted text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{tour.ageRange} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{tour.nextDeparture}</span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">From</div>
                    <div className="text-3xl font-bold text-primary">{tour.price}</div>
                    <div className="text-xs text-muted-foreground">£60 deposit</div>
                  </div>
                  <Button 
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    <Link href={`/tour/${tour.slug}`} className="flex items-center gap-2">
                      View Tour
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary">£60</div>
              <h3 className="text-xl font-bold">Low Deposits</h3>
              <p className="text-muted-foreground">
                Secure your spot with just £60 and spread the cost with flexible payment plans
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary">24/7</div>
              <h3 className="text-xl font-bold">Support</h3>
              <p className="text-muted-foreground">
                Expert trip managers and 24/7 emergency support throughout your journey
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary">100%</div>
              <h3 className="text-xl font-bold">Protected</h3>
              <p className="text-muted-foreground">
                ATOL and ABTA protected for complete peace of mind when you book
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="bg-foreground text-background p-12 md:p-16 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-background/80 max-w-2xl mx-auto">
            Get in touch with our team and we'll help you find the perfect adventure
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium tracking-tight text-lg h-14 px-8"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
