import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Calendar, Users, Star, Shield, MapPin, Clock, Heart } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const tours = [
  {
    id: "thailand-intro",
    name: "Thailand Intro",
    slug: "thailand-intro",
    duration: "12 Days",
    price: "£999",
    image: "/thailand-intro-hero.webp",
    badge: "Perfect for First-Timers",
    badgeColour: "bg-primary",
    description: "The perfect introduction to Thailand. Journey from Bangkok's vibrant streets to Chiang Mai's temples, an elephant sanctuary, and Pai's laid-back mountain vibes.",
    highlights: ["Elephant Sanctuary", "Bangkok City Tour", "Pai Sunsets", "Temple Visits", "Night Markets", "Cooking Class"]
  },
  {
    id: "thailand-island-hopper",
    name: "Thailand Island Hopper",
    slug: "thailand-island-hopper",
    duration: "21 Days",
    price: "£1,599",
    image: "/thailand-island-hopper-hero.webp",
    badge: "Most Popular",
    badgeColour: "bg-accent",
    description: "The ultimate Thailand adventure. Explore Bangkok, Chiang Mai, Pai, then island-hop through Koh Samui, Koh Phangan, and Koh Tao. Full Moon Party included.",
    highlights: ["Full Moon Party", "Island Hopping", "Scuba Diving", "Elephant Sanctuary", "Bamboo Rafting", "Koh Tao Snorkelling"]
  }
];

const highlights = [
  {
    image: "/thailand-temple.jpg",
    title: "Ancient Temples",
    description: "Explore ornate Buddhist temples, from Bangkok's Grand Palace to Chiang Mai's mountain sanctuaries. Wat Phra That Doi Suthep at sunrise is unforgettable."
  },
  {
    image: "/thailand-waterfall.webp",
    title: "Tropical Islands",
    description: "Crystal-clear waters, white sand beaches, and legendary Full Moon Parties. Koh Tao, Koh Phangan, and Koh Samui are three of the world's most beautiful islands."
  },
  {
    image: "/thailand-elephant.jpg",
    title: "Elephant Sanctuary",
    description: "Spend a day with rescued elephants at an ethical sanctuary in Chiang Mai. Feed, bathe, and walk with these incredible animals in their natural habitat."
  },
  {
    image: "/thailand-farewell-dinner.jpg",
    title: "Group Experiences",
    description: "From night markets to cooking classes, every experience is shared with a brilliant group of like-minded 18-35s. Friendships made on ACE tours last a lifetime."
  }
];

const trustSignals = [
  { icon: Star, value: "4.9/5", label: "Average rating", sub: "From 500+ reviews" },
  { icon: Users, value: "18-35", label: "Age range", sub: "Like-minded travellers" },
  { icon: Heart, value: "100%", label: "Repeat bookers", sub: "Come back every year" }
];

export default function DestinationThailand() {
  const { formatPrice } = useCurrency();
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/thailand-island-hopper-hero.webp"
            alt="Thailand temples and beaches"
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
            Thailand
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
            Temples, islands, elephants, and the Full Moon Party. Thailand has it all — and ACE takes you to every bit of it.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8">
              <a href="#tours">
                View Thailand Tours <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20 h-12 px-8 bg-white/10">
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-primary text-primary-foreground py-6">
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

      {/* Why Thailand */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Why Thailand?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From the buzzing streets of Bangkok to the serene mountain town of Pai and the paradise islands of the Gulf — Thailand is one of the most diverse and rewarding destinations on earth.
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
              Thailand Tours
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you want a quick taste or the full adventure, we have the perfect Thailand tour for you.
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
                      {formatPrice(tour.price)}
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
                    desc: "Every person on your tour is aged 18-35. You'll meet people at the same stage of life, and friendships made on ACE tours last years."
                  }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
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
                src="/thailand-temple-group.jpg"
                alt="ACE Travel group in Thailand"
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
            Thailand FAQs
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Everything you need to know before you go
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="visa">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do I need a visa for Thailand?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                UK, EU, US, Canadian, and Australian passport holders receive a free 30-day visa on arrival in Thailand. Your passport must be valid for at least 6 months beyond your return date. If you plan to stay longer than 30 days, you will need to apply for a tourist visa before travelling.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-time">
              <AccordionTrigger className="text-left text-lg font-semibold">
                When is the best time to visit Thailand?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                November to March is peak season with cooler, dry weather perfect for exploring. April to May is hot season (great for islands), and June to October is monsoon season with occasional rain but fewer crowds and lower prices. Thailand is brilliant year-round.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="currency">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What currency does Thailand use?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Thailand uses the Thai Baht (THB). £1 is approximately 42-45 Baht. ATMs are everywhere and accept international cards. Credit cards are widely accepted in cities, but bring cash for markets, street food, and rural areas. Thailand is very affordable — budget around £20-30 per day for meals and activities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Is Thailand safe for travellers?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Thailand is very safe for travellers and welcomes millions of tourists annually. Standard travel precautions apply: watch your belongings in crowded areas, avoid unlicensed taxis, and drink responsibly. Our experienced ACE reps are with you throughout the trip and know the safest spots.
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
            src="/thailand-waterfall.webp"
            alt="Thailand adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Ready for Thailand?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join hundreds of 18-35s who have already experienced Thailand with ACE. Secure your spot today with a small deposit.
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
