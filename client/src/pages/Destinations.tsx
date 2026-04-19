import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/JsonLd";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Clock, Users, ArrowRight, Sparkles } from "lucide-react";

export default function Destinations() {
  const destinations = [
    {
      name: "Thailand",
      slug: "thailand",
      tagline: "Island Paradise Awaits",
      description: "From the bustling streets of Bangkok to the pristine beaches of Phi Phi Islands, Thailand offers the perfect mix of culture, adventure, and tropical paradise. Experience floating markets, ancient temples, full moon parties, and some of the world's most beautiful islands.",
      video: "https://cdn.pixabay.com/video/2022/06/28/122374-726445269_large.mp4",
      tours: 5,
      fromPrice: "£899",
      duration: "10-21 days",
      highlights: [
        "Bangkok's vibrant street food scene",
        "Phi Phi Islands boat tours",
        "Full Moon Party on Koh Phangan",
        "Elephant sanctuaries in Khao Sok",
        "Floating bungalow stays",
        "Island hopping adventures"
      ],
      bestTime: "November to March",
      climate: "Tropical, hot year-round with monsoon season July-October"
    },
    {
      name: "Bali",
      slug: "bali",
      tagline: "Volcanic Adventures",
      description: "Bali combines spiritual culture with natural beauty. Watch sunrise from Mount Batur volcano, explore ancient temples, surf world-class waves, and immerse yourself in rice terrace landscapes. This Indonesian paradise offers adventure, relaxation, and cultural richness in equal measure.",
      video: "https://cdn.pixabay.com/video/2023/08/29/177795-859908050_large.mp4",
      tours: 3,
      fromPrice: "£1,099",
      duration: "10-14 days",
      highlights: [
        "Mt. Batur sunrise trek",
        "Ubud rice terraces and monkey forest",
        "Traditional Balinese temples",
        "Surfing in Canggu",
        "Nusa Islands day trips",
        "Balinese cooking classes"
      ],
      bestTime: "April to October",
      climate: "Tropical, dry season April-October, wet season November-March"
    },
    {
      name: "Philippines",
      slug: "philippines",
      tagline: "Hidden Lagoons",
      description: "The Philippines is Southeast Asia's best-kept secret. Discover hidden lagoons in El Nido, pristine white sand beaches in Palawan, and vibrant marine life perfect for snorkeling and diving. With over 7,000 islands, every day brings a new paradise to explore.",
      video: "https://cdn.pixabay.com/video/2020/06/14/42466-431798969_large.mp4",
      tours: 3,
      fromPrice: "£1,199",
      duration: "10-14 days",
      highlights: [
        "El Nido island hopping",
        "Secret lagoons and beaches",
        "Snorkeling with sea turtles",
        "Coron shipwreck diving",
        "Underground river tours",
        "Beach camping under stars"
      ],
      bestTime: "December to May",
      climate: "Tropical, dry season December-May, typhoon season June-November"
    }
  ];

  return (
    <div className="animate-fade-in">
      <SEO
        title="Travel Destinations | Thailand & Bali Group Tours"
        description="Explore ACE Travel destinations: Thailand and Bali. Group tours for 18–35 year olds with expert trip managers, small groups, and just a £60 deposit."
        canonical="/destinations"
      />
      <JsonLd schema={webPageSchema({ name: "Destinations — ACE Travel Experiences", description: "Explore ACE Travel destinations: Thailand, Bali, and the Philippines. Group tours for 18–35 year olds with expert trip managers.", path: "/destinations" })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }])} />
      <Header />
      
      {/* Video Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ height: 'calc(70dvh - 80px)', minHeight: '400px' }}>
        <div className="absolute inset-0">
          <video 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2024/02/21/201271-915031695_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        
        <div className="container relative z-10 text-center text-background">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              WHERE WILL YOU GO?
            </h1>
            <div className="flex gap-3 justify-center">
              <div className="h-2 w-20 bg-primary" />
              <div className="h-2 w-20 bg-accent" />
              <div className="h-2 w-20 bg-primary" />
            </div>
            <p className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto">
              Thailand, Bali, Philippines. Three epic destinations. Endless adventures.
            </p>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute top-8 right-8 bg-accent text-accent-foreground px-6 py-3 font-black text-sm sticker-badge flex items-center gap-2 z-20">
          <Sparkles className="w-5 h-5" />
          3 DESTINATIONS
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="container py-16 md:py-24">
        <div className="space-y-16">
          {destinations.map((dest, index) => (
            <div 
              key={dest.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Video */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:col-start-7' : ''}`}>
                <div className="relative aspect-video overflow-hidden border-6 border-foreground transition-all duration-200 hover:translate-y-[-8px] hover:shadow-[12px_12px_0px_rgba(238,47,109,0.4)]">
                  <video 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={dest.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  
                  {/* Sticker badge */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 font-black text-xs sticker-badge z-10">
                    HOT!
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} space-y-6`}>
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-primary">
                    {dest.name.toUpperCase()}
                  </h2>
                  <p className="text-2xl font-bold text-accent">{dest.tagline}</p>
                  <div className="flex gap-3">
                    <div className="h-2 w-16 bg-primary" />
                    <div className="h-2 w-12 bg-accent" />
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-foreground/80">
                  {dest.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-bold">{dest.tours} Tours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="font-bold">{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-bold">18-35 Years</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h3 className="text-xl font-black">HIGHLIGHTS:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dest.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-black border-4 border-foreground transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                  >
                    <Link href={`/destinations/${dest.slug}`}>
                      EXPLORE {dest.name.toUpperCase()}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground/60">FROM</span>
                    <span className="text-3xl font-black text-primary">{dest.fromPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-8 right-8 w-32 h-32 border-4 border-primary opacity-20 rotate-12" />
        <div className="absolute bottom-8 left-8 w-24 h-24 border-4 border-accent opacity-20 -rotate-12" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              CAN'T DECIDE?
            </h2>
            <p className="text-2xl font-bold text-background/90">
              Browse all our tours or get in touch with our team. We'll help you find the perfect adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-black border-4 border-background transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(255,255,255,0.3)]"
              >
                <Link href="/tours">
                  VIEW ALL TOURS
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-background/10 text-background border-4 border-background font-black transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(255,255,255,0.3)]"
              >
                <Link href="/contact">CONTACT US</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
