import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Calendar, Users, MapPin } from "lucide-react";

export default function DestinationThailand() {
  const tours = [
    {
      id: "thailand-intro",
      name: "Thailand Intro",
      slug: "thailand-intro",
      duration: "12 days",
      price: "£999",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-1_1770480741000_na1fn_dGhhaWxhbmQtaGVybw.jpg",
      description: "The perfect introduction to Thailand. Journey from Bangkok's vibrant streets to Chiang Mai's temples and Pai's laid-back mountain vibes.",
      highlights: ["Elephant Sanctuary", "Bangkok City Tour", "Pai Sunsets", "Temple Visits"]
    },
    {
      id: "thailand-island-hopper",
      name: "Thailand Island Hopper",
      slug: "thailand-island-hopper",
      duration: "21 days",
      price: "£1,899",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-1_1770480741000_na1fn_dGhhaWxhbmQtaGVybw.jpg",
      description: "The ultimate Thailand adventure. Explore Bangkok, Chiang Mai, Pai, and island-hop through Koh Phangan, Koh Tao, and Koh Samui.",
      highlights: ["Full Moon Party", "Island Hopping", "Scuba Diving", "Beach Paradise"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-1_1770480741000_na1fn_dGhhaWxhbmQtaGVybw.jpg"
            alt="Thailand beaches and temples"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            THAILAND
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Temples, beaches, and unforgettable adventures in the Land of Smiles
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white font-bold">
            <a href="#tours">
              View Thailand Tours <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Why Visit Thailand */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Why Visit Thailand?
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            From bustling Bangkok to serene mountain towns and pristine islands, Thailand offers the perfect mix of culture, adventure, and relaxation
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🏯</div>
                <h3 className="text-xl font-bold mb-2">Ancient Temples</h3>
                <p className="text-muted-foreground">
                  Explore ornate Buddhist temples, from Bangkok's Grand Palace to Chiang Mai's mountain sanctuaries
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🏝️</div>
                <h3 className="text-xl font-bold mb-2">Tropical Islands</h3>
                <p className="text-muted-foreground">
                  Crystal-clear waters, white sand beaches, and legendary Full Moon Parties on paradise islands
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🍜</div>
                <h3 className="text-xl font-bold mb-2">Street Food Heaven</h3>
                <p className="text-muted-foreground">
                  Pad Thai, mango sticky rice, and endless flavors from bustling night markets
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🐘</div>
                <h3 className="text-xl font-bold mb-2">Elephant Sanctuaries</h3>
                <p className="text-muted-foreground">
                  Ethical encounters with rescued elephants in their natural habitat
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Thailand Tours
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            Choose your Thailand adventure - from quick intro trips to epic island-hopping journeys
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl">
                <div className="relative h-64">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                    {tour.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black mb-2">{tour.name}</h3>
                  <p className="text-muted-foreground mb-4">{tour.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tour.highlights.map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-muted px-3 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="text-3xl font-black text-primary">{tour.price}</p>
                    </div>
                    <Button asChild>
                      <Link href={`/tour/${tour.slug}`}>
                        View Tour <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Thailand Travel FAQs
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Everything you need to know about traveling to Thailand
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="visa">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do I need a visa for Thailand?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                UK, EU, US, Canadian, and Australian passport holders receive a free 30-day visa on arrival in Thailand. Your passport must be valid for at least 6 months beyond your return date. If you plan to stay longer than 30 days, you'll need to apply for a tourist visa before traveling.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-time">
              <AccordionTrigger className="text-left text-lg font-semibold">
                When is the best time to visit Thailand?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                November to March is peak season with cooler, dry weather perfect for exploring. April-May is hot season (great for islands!), and June-October is monsoon season with occasional rain but fewer crowds and lower prices. Thailand is amazing year-round - it just depends on your preferences!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="currency">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What currency does Thailand use?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Thailand uses the Thai Baht (THB). £1 = approximately 42-45 Baht. ATMs are everywhere and accept international cards (small fees apply). Credit cards are widely accepted in cities, but bring cash for markets, street food, and rural areas. Thailand is very affordable - budget £20-30/day for meals and activities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Is Thailand safe for travellers?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Thailand is very safe for travellers and welcomes millions of tourists annually. Standard travel precautions apply: watch your belongings in crowded areas, avoid unlicensed taxis, and drink responsibly. Our experienced reps are with you throughout the trip and know the safest spots. Solo travellers and first-timers feel completely comfortable on our tours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="weather">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What's the weather like in Thailand?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Thailand is tropical year-round with temperatures 25-35°C (77-95°F). Bangkok and central Thailand are hot and humid. Chiang Mai and northern mountains are cooler, especially evenings. Islands have sea breezes. Pack light, breathable clothes, sunscreen, and a light rain jacket. Air conditioning is everywhere, so bring a light layer for buses and restaurants.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="food">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What's Thai food like?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                Thai food is incredible - fresh, flavorful, and affordable. Expect Pad Thai, green curry, mango sticky rice, and endless street food. Most dishes can be made vegetarian or vegan. Spice levels vary (always ask for "not spicy" if you're sensitive!). Street food is safe and delicious. Our tours include some meals, plus you'll have plenty of time to explore local restaurants and night markets.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
