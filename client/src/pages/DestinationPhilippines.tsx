import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Calendar, Users, Star, Shield, MapPin, Clock, Heart } from "lucide-react";

const tours = [
  {
    id: "philippines-paradise",
    name: "Philippines Paradise",
    slug: "philippines-paradise",
    duration: "10 Days",
    price: "£999",
    image: "/philippines-hero.webp",
    badge: "New for 2027",
    badgeColour: "bg-accent",
    description: "Discover the hidden paradise of the Philippines. From Cebu to El Nido, explore secret lagoons, swim with whale sharks, surf in Siargao, and island-hop through some of the world's most beautiful islands.",
    highlights: ["El Nido Lagoons", "Whale Shark Snorkelling", "Siargao Surfing", "Chocolate Hills", "Gili-style Beaches", "Island Hopping"]
  }
];

const highlights = [
  {
    image: "/philippines-hero.webp",
    title: "El Nido Lagoons",
    description: "El Nido in Palawan is home to some of the most dramatic scenery in the world. Towering limestone karsts, hidden lagoons, and crystal-clear turquoise water make it a bucket-list destination."
  },
  {
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/IMutWpLXypOxxteu.jpg",
    title: "Siargao Surfing",
    description: "Siargao is the surfing capital of the Philippines. Cloud 9 is one of the world's most famous waves, but even beginners can learn to surf on the gentler breaks around the island."
  },
  {
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/wolbzhDEinkirHmb.jpg",
    title: "Chocolate Hills",
    description: "Bohol's famous Chocolate Hills are one of the Philippines' most unique natural wonders — over 1,200 perfectly cone-shaped hills that turn chocolate-brown in the dry season."
  },
  {
    image: "/philippines-lagoon.jpg",
    title: "Island Life",
    description: "The Philippines has over 7,000 islands. Our tour takes you to the very best of them — from the cosmopolitan energy of Cebu to the laid-back paradise of Port Barton."
  }
];

const trustSignals = [
  { icon: Star, value: "4.9/5", label: "Average rating", sub: "From 500+ reviews" },
  { icon: Users, value: "18-35", label: "Age range", sub: "Like-minded travellers" },
  { icon: Shield, value: "ATOL", label: "Protected", sub: "Your money is safe" },
  { icon: Heart, value: "100%", label: "Repeat bookers", sub: "Come back every year" }
];

export default function DestinationPhilippines() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/philippines-hero.webp"
            alt="Philippines El Nido limestone cliffs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="relative z-10 container pb-14 md:pb-20 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">Southeast Asia</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            Philippines
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
            7,000 islands. Secret lagoons. Whale sharks. Surfing. The Philippines is one of the most underrated destinations on earth — and ACE is taking you there.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8">
              <a href="#tours">
                View Philippines Tours <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20 h-12 px-8 bg-white/10">
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-accent text-white py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="flex flex-col items-center gap-1">
                <signal.icon className="w-6 h-6 mb-1 opacity-80" />
                <div className="text-2xl font-black">{signal.value}</div>
                <div className="text-sm font-semibold">{signal.label}</div>
                <div className="text-xs opacity-70">{signal.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Philippines */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Why the Philippines?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The Philippines is one of Southeast Asia's best-kept secrets. Fewer crowds than Thailand, more dramatic scenery than Bali, and some of the friendliest people you will ever meet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((item) => (
              <div key={item.title} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-white text-2xl font-black">{item.title}</h3>
                </div>
                <div className="p-6 bg-card">
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Philippines Tours
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our Philippines Paradise tour launches in January 2027. Be one of the first to experience it.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {tours.map((tour) => (
              <div key={tour.id} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-card border border-border hover:border-primary">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full ${tour.badgeColour}`}>
                    {tour.badge}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </div>
                    <div className="text-white font-black text-2xl">
                      {tour.price}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black mb-2">{tour.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{tour.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tour.highlights.map((h) => (
                      <span key={h} className="text-xs bg-muted px-3 py-1 rounded-full font-medium">{h}</span>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/tour/${tour.slug}`}>
                      View Tour Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ACE */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Why Book With ACE?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: "Your Own ACE Rep",
                    desc: "An experienced ACE rep joins your group for the entire trip. They handle logistics, know the best spots, and make sure everyone has the time of their life."
                  },
                  {
                    icon: Shield,
                    title: "Flexible Payment Plans",
                    desc: "Secure your spot with a small deposit and spread the cost over time. No need to pay everything upfront."
                  },
                  {
                    icon: Calendar,
                    title: "Everything Included",
                    desc: "Accommodation, activities, internal transport, and a private WhatsApp group are all included. Just book your flights and show up."
                  },
                  {
                    icon: Heart,
                    title: "18-35 Only",
                    desc: "Every person on your tour is aged 18-35. You will meet people at the same stage of life, and friendships made on ACE tours last years."
                  }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/mHpHRfsSMXkVOXLL.jpg"
                alt="Philippines El Nido lagoon"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-sm">4.9 out of 5</p>
                  <p className="text-xs text-muted-foreground">500+ verified reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Philippines FAQs
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Everything you need to know before you go
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="visa">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do I need a visa for the Philippines?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                UK, EU, US, Canadian, and Australian passport holders can enter the Philippines visa-free for up to 30 days. This can be extended to 59 days at a local immigration office for a small fee. Your passport must be valid for at least 6 months beyond your return date.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-time">
              <AccordionTrigger className="text-left text-lg font-semibold">
                When is the best time to visit the Philippines?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                The dry season (November to May) is the best time to visit, with warm sunny days and calm seas. Our January 2027 tour is perfectly timed for the best weather. June to October is typhoon season, which is why we do not run tours during this period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="currency">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What currency does the Philippines use?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                The Philippines uses the Philippine Peso (PHP). £1 is approximately 70-75 Pesos. ATMs are available in cities and larger towns, but it is worth carrying cash when visiting more remote islands. The Philippines is very affordable — street food costs around £1-2, and a cold beer is about £1.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Is the Philippines safe for travellers?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                The tourist areas of the Philippines (Cebu, Bohol, Siargao, Palawan) are very safe and welcoming to tourists. The Filipino people are renowned for their warmth and hospitality. Our ACE reps are with you throughout the trip and know the safest routes and areas to visit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="flights">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do flights come with the tour?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Flights are not included in the tour price, but our team provides full flight assistance to help you find the best routes and prices. We recommend flying into Cebu (Mactan-Cebu International Airport) and flying home from El Nido or Puerto Princesa. We will share all the flight details in your welcome pack.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/mHpHRfsSMXkVOXLL.jpg"
            alt="Philippines El Nido"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Ready for the Philippines?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Be one of the first to experience the Philippines with ACE. Launching January 2027 — secure your spot now.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 text-lg">
              <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20 h-14 px-10 text-lg bg-white/10">
              <Link href="/contact">Ask a Question</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
