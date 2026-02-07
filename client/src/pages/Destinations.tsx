import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";

export default function Destinations() {
  const destinations = [
    {
      name: "Thailand",
      slug: "thailand",
      tagline: "Island Paradise Awaits",
      description: "From the bustling streets of Bangkok to the pristine beaches of Phi Phi Islands, Thailand offers the perfect mix of culture, adventure, and tropical paradise. Experience floating markets, ancient temples, full moon parties, and some of the world's most beautiful islands.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-1_1770480741000_na1fn_dGhhaWxhbmQtaGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTFfMTc3MDQ4MDc0MTAwMF9uYTFmbl9kR2hoYVd4aGJtUXRhR1Z5YncuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uyKUllkux1JDYBMmYN1fJZmo5CWMGnYtZMZGLQGwnz35GO26ykP8ztTt8GeeX2sfIDAsa9udPZ17mYxtse7THSchl4HqvthaEW~HSbu0dMqisZAaAq6TxtIe6Z0o~FebXsYMFNPbx2L~9qWgx00hI2LW6M5OOSMC0jhcAeNrLJDwavCuAplgD-huY3EO2rjP56TWniPplk0DK6VuhuCmRtr-xMnovu-9Ca8HUP~GRex68DmfKroIwVk~jpMruXiE5cuG~NGeExV8FGPNAm-3jn59-6jDX3S29SCz4FWlcaoBywTywv~LIIIHc57k6FIFS~wvxbEDVAgHC2qXRRSw1A__",
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
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-2_1770480747000_na1fn_YmFsaS1oZXJv.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTJfMTc3MDQ4MDc0NzAwMF9uYTFmbl9ZbUZzYVMxb1pYSnYuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=djpDHUto6V6VOMTeh~xnral1i2NndKjfoxSl9Bi-k9yTBACl7uQBKLEpmUL4QqnvpCRa8etzcfbB1Qju2lAyhoLsmgODv4oWPq2w0jc1YA87qMDC4rxF6AiyBIv7iHEYj8-wX4KDPVQDpX3XF8J3Tm~nb3drPEEAXBUhJWwqACccnJsxGBwZBh0TFoYkZE06FzYkxQ0WpfrCnk9gnut0m6CvVjAPltvSfvbx6FLmpxs0nJvJdgVE2rWtrRKEAhbC23AWyfzASQedlWHLaU7Q~lRS6tEt52aE9IKpJa2CyPTEf4mDlYQVb1i4uPxcvtF9cDwzz1vtvNNbieAaEcZ4zg__",
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
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-3_1770480733000_na1fn_cGhpbGlwcGluZXMtaGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTNfMTc3MDQ4MDczMzAwMF9uYTFmbl9jR2hwYkdsd2NHbHVaWE10YUdWeWJ3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=o1-~ZrDvTVMA3Z97TqUylN9PWsajDn3w0LDqBI6e-zMBUGlHUPoxZTihwq92JZvpfwuGso4s8gJnVMu2YsaERbp~JLu3yyb7mlfooHkY-k0Srjvk1x1TnGpr3kBYoYUFjFpi0fkXVnk081jlQNxpqgU9w5AkZa40HNTl5LngSOK16xtIak7nddyK2t4YTgnjyVG3eaumcjrr5nXV0pR8VHP-xRWaSGnf5uJubug0jNObI-nCA5WpmJ4lGX0F2XO1TAKuHonK4DLnWEpqsFwdDppPszzBKMbhZt4JhqGsXGPZqq6Hzz08kRWXqofkkpsMUcYXg7HWrfwZMW8VghPljw__",
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
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
            alt="World map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container text-center text-background">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Explore Our Destinations
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Three incredible countries. Countless unforgettable moments.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="container py-16 md:py-24">
        <div className="space-y-24">
          {destinations.map((dest, index) => (
            <div key={dest.slug} className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}>
              {/* Image */}
              <div className={`md:col-span-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden animate-fade-in">
                  <img 
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`md:col-span-6 space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    {dest.name}
                  </h2>
                  <div className="h-1 w-16 bg-primary" />
                  <p className="text-xl text-accent font-medium">{dest.tagline}</p>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dest.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Tours</span>
                    </div>
                    <div className="text-2xl font-bold">{dest.tours}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <div className="text-2xl font-bold">{dest.duration}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">From</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{dest.fromPrice}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dest.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Travel Info */}
                <Card className="p-4 bg-muted">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold mb-1">Best Time to Visit</div>
                      <div className="text-muted-foreground">{dest.bestTime}</div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Climate</div>
                      <div className="text-muted-foreground">{dest.climate}</div>
                    </div>
                  </div>
                </Card>

                <Button 
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight"
                >
                  <Link href={`/destinations/${dest.slug}`}>
                    <a className="flex items-center gap-2">
                      View {dest.name} Tours
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Can't Decide?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse all our tours or get in touch with our team. We'll help you find the perfect adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight"
            >
              <Link href="/tours">
                <a>View All Tours</a>
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="font-medium tracking-tight border-2"
            >
              <Link href="/contact">
                <a>Contact Us</a>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
