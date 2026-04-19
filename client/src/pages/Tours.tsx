import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/JsonLd";
import { SEO } from "@/components/SEO";
import { Calendar, Users, MapPin, Star, ArrowRight, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

// Philippines is not yet in the CMS so we keep it as a static fallback
const philippinesFallback = {
  id: 99,
  slug: "philippines-paradise",
  name: "Philippines Paradise",
  destination: "Philippines",
  duration: "10 days",
  price: "£999",
  deposit: "£60",
  groupSize: "15-30",
  ageRange: "18-35",
  heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/gMgbXqqaIFwmNoLk.webp",
  highlights: JSON.stringify(["Sardine Run", "Canyoneering", "Whale Sharks", "El Nido Island Tour", "Siargao Surf", "Chocolate Hills"]),
  rating: "4.9",
  reviews: 167,
  nextDeparture: "19th January 2027",
  description: "10 days across the Philippines' most breathtaking islands. Swim with whale sharks, surf Cloud 9, kayak El Nido's lagoons, and discover Bohol's Chocolate Hills.",
  published: true,
  sortOrder: 5,
};

const destinations = ["All", "Thailand", "Bali", "Philippines"];

export default function Tours() {
  const [selectedDestination, setSelectedDestination] = useState<string>("All");

  const { data: cmsToursRaw, isLoading } = trpc.cms.tours.listPublic.useQuery();

  // Merge CMS tours with the Philippines fallback (not yet in CMS)
  const allTours = cmsToursRaw
    ? [...cmsToursRaw, philippinesFallback]
    : [philippinesFallback];

  const filteredTours = selectedDestination === "All"
    ? allTours
    : allTours.filter(tour => tour.destination === selectedDestination);

  return (
    <div className="animate-fade-in min-h-screen bg-background">
      <SEO
        title="Group Tours to Thailand & Bali | 18-35s"
        description="Browse all ACE Travel group tours to Thailand and Bali for 18–35 year olds. Small groups of 15–30, expert trip managers, and just a £60 deposit to secure your place."
        canonical="/tours"
      />
      <JsonLd schema={webPageSchema({ name: "All Tours — ACE Travel Experiences", description: "Browse all ACE Travel group tours to Thailand, Bali and the Philippines. Small groups, big adventures, £60 deposit.", path: "/tours" })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tours", path: "/tours" }])} />
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
          {isLoading && (
            <div className="space-y-8">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-72 w-full rounded-none" />
              ))}
            </div>
          )}
          {!isLoading && filteredTours.map((tour, index) => (
            <div
              key={tour.slug}
              className="group grid grid-cols-1 lg:grid-cols-5 overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className={`relative lg:col-span-2 h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                <img
                  src={tour.heroImage}
                  alt={tour.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {(tour as any).badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 tracking-wide uppercase">
                      {(tour as any).badge}
                    </span>
                  </div>
                )}
                {(tour as any).availability === "Limited Spots" && (
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
                    {(Array.isArray(tour.highlights) ? tour.highlights : (typeof tour.highlights === 'string' ? JSON.parse(tour.highlights) : [])).slice(0, 6).map((highlight: any) => (
                      <span
                        key={typeof highlight === 'string' ? highlight : highlight.title}
                        className="text-xs px-2.5 py-1 bg-muted text-muted-foreground border border-border font-medium"
                      >
                        {typeof highlight === 'string' ? highlight : highlight.title}
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
