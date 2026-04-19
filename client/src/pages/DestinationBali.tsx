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
    id: "bali-explorer",
    name: "Bali Explorer",
    slug: "bali-explorer",
    duration: "14 Days",
    price: "£1,199",
    image: "/bali-island-hopper-hero.webp",
    badge: "Summer Holiday Friendly",
    badgeColour: "bg-[#00b4d8]",
    description: "Explore the best of Bali's iconic sights — Ubud's rice terraces, Uluwatu's clifftop temple, Seminyak's beach clubs, and the stunning Nusa Penida island.",
    highlights: ["Ubud Rice Terraces", "Uluwatu Temple", "Nusa Penida", "Seminyak Beach", "Cooking Class", "Waterfall Hike"]
  },
  {
    id: "bali-island-hopper",
    name: "Bali Island Hopper",
    slug: "bali-island-hopper",
    duration: "14 Days",
    price: "£1,199",
    image: "/bali-beach.webp",
    badge: "Island Adventure",
    badgeColour: "bg-accent",
    description: "Go beyond Bali and explore the neighbouring Gili Islands and Lombok. Snorkel with turtles, climb a volcano, and discover some of the most beautiful beaches in the world.",
    highlights: ["Gili Islands", "Lombok Volcano", "Turtle Snorkelling", "Bali Temples", "Sunset Sailing", "Beach Clubs"]
  }
];

const highlights = [
  {
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/bNROoWDCfWwuPcRn.jpg",
    title: "Rice Terraces",
    description: "The Tegalalang rice terraces near Ubud are one of Bali's most iconic sights. Walk through emerald-green paddies and learn about the ancient subak irrigation system."
  },
  {
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/jcWWuKjCrUcKCosk.jpg",
    title: "Clifftop Temples",
    description: "Uluwatu Temple perches dramatically on a 70-metre cliff above the Indian Ocean. Watch the famous Kecak fire dance at sunset for a truly magical Bali experience."
  },
  {
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/hanWFTxOSyBYBGGv.jpg",
    title: "Beach & Surf Culture",
    description: "From Seminyak's beach clubs to Canggu's surf breaks, Bali's coastline has something for everyone. Catch a surf lesson, sip a cocktail at sunset, or just relax on the sand."
  },
  {
    image: "/bali-island-hopper-hero.webp",
    title: "Island Life",
    description: "The Gili Islands are three tiny paradise islands off the coast of Lombok — no cars, no motorbikes, just white sand, turquoise water, and the sound of the ocean."
  }
];

const trustSignals = [
  { icon: Star, value: "4.9/5", label: "Average rating", sub: "From 500+ reviews" },
  { icon: Users, value: "18-35", label: "Age range", sub: "Like-minded travellers" },
  { icon: Heart, value: "100%", label: "Repeat bookers", sub: "Come back every year" }
];

export default function DestinationBali() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "calc(75dvh - 80px)" }}>
        <div className="absolute inset-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/FIusTznaFJxspxFF.jpeg"
            alt="Group at sunset cliff in Bali"
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
            Bali
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
            Volcanoes, rice terraces, clifftop temples, and paradise beaches. Bali is unlike anywhere else on earth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8">
              <a href="#tours">
                View Bali Tours <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20 h-12 px-8 bg-white/10">
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-[#00b4d8] text-white py-6">
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

      {/* Why Bali */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Why Bali?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bali is one of those places that gets under your skin. The combination of spiritual culture, dramatic landscapes, incredible food, and warm hospitality makes it a destination like no other.
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
              Bali Tours
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Both tours are 14 days and £1,199 — the difference is where you go beyond Bali itself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
            <div className="relative order-2 md:order-1">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/hanWFTxOSyBYBGGv.jpg"
                alt="ACE Travel group in Bali"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
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
            <div className="order-1 md:order-2">
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
                    desc: "Every person on your tour is aged 18-35. You'll meet people at the same stage of life, and friendships made on ACE tours last years."
                  }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00b4d8]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#00b4d8]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Bali FAQs
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Everything you need to know before you go
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="visa">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do I need a visa for Bali?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                UK, EU, US, Canadian, and Australian passport holders can enter Indonesia (Bali) visa-free for up to 30 days. For stays longer than 30 days, you can apply for a Visa on Arrival (around £25) which extends your stay to 60 days. Your passport must be valid for at least 6 months beyond your return date.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-time">
              <AccordionTrigger className="text-left text-lg font-semibold">
                When is the best time to visit Bali?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                The dry season (April to October) is the best time to visit Bali, with sunny days and low humidity. July and August are peak season. The wet season (November to March) brings daily rain showers, but it is still warm and the island is less crowded. Our summer tours (June and July) are perfectly timed for the best weather.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="currency">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What currency does Bali use?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Bali uses the Indonesian Rupiah (IDR). £1 is approximately 20,000 Rupiah. ATMs are widely available, and most tourist areas accept card payments. Bali is very affordable — you can eat a delicious meal for £2-3, and a beer costs around £1.50.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Is Bali safe for travellers?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Bali is very safe for tourists. The Balinese people are incredibly welcoming and friendly. Standard precautions apply: watch your belongings, use reputable transport, and be respectful of local customs at temples. Our ACE reps are with you throughout the trip to ensure everyone stays safe and has a great time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="flights">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do flights come with the tour?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Flights are not included in the tour price, but our team provides full flight assistance to help you find the best routes and prices. We recommend booking flights as early as possible once your tour place is confirmed. We will share all the flight details you need in your welcome pack.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/bNROoWDCfWwuPcRn.jpg"
            alt="Bali rice terraces"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Ready for Bali?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join hundreds of 18-35s who have already experienced Bali with ACE. Secure your spot today with a small deposit.
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
