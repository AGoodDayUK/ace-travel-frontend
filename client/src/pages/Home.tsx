import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Users, Calendar, Heart, Shield, Star, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

const MOMENTS_PHOTOS = [
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/AfrqckRqZWYBfsZI.jpg", alt: "ACE group on tour" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/PVcTxhBeHMSxsxaM.jpg", alt: "Bar crawl night out" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/eOGfHFdwzhjprocw.jpg", alt: "Elephant sanctuary" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/PsQGqtplQJVjngak.jpg", alt: "ACE travellers" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/XjlZbktLFblnlapI.jpg", alt: "Quad biking adventure" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/yVIviyKVphfQFQvW.jpg", alt: "Phi Phi boat tour" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ElOPcITQITYxAUYp.jpg", alt: "Group adventure" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/eZucBmIINTLQzkWf.jpg", alt: "Koh Phangan beach" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/SkkkXQebmyXdVeku.jpg", alt: "Koh Tao diving" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/HzkAzSiHHurpNQTN.jpg", alt: "ACE moments" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nGhdDzGbDHyRBopl.jpg", alt: "Tour group fun" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/xwBrCzYTGUOSKoiY.jpg", alt: "Thailand scenery" },
];

const COLS_PER_ROW = 4;

function AceMomentsGallery() {
  const [visibleRows, setVisibleRows] = useState(2);
  const visibleCount = visibleRows * COLS_PER_ROW;
  const visiblePhotos = MOMENTS_PHOTOS.slice(0, visibleCount);
  const hasMore = visibleCount < MOMENTS_PHOTOS.length;

  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Real People. Real Trips.</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            #ACEMoments
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Memories made on every tour. Captured by the people who live them.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {visiblePhotos.map((photo, i) => (
            <div key={i} className="aspect-square overflow-hidden group cursor-pointer">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleRows(r => r + 1)}
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-200"
            >
              Load More <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Share your moments using <span className="text-primary font-bold">#acemoments</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { user } = useAuth();

  const destinations = [
    {
      name: "Thailand",
      tagline: "Island Paradise Awaits",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BJGrLpWkZZByQqyU.JPG",
      href: "/destinations/thailand",
      tours: "5 Tours",
      from: "£899",
    },
    {
      name: "Bali",
      tagline: "Volcanic Adventures",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/aZaCGhQegNtphLSK.JPG",
      href: "/destinations/bali",
      tours: "3 Tours",
      from: "£1,099",
    },
    {
      name: "Philippines",
      tagline: "Hidden Lagoons",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nfzqJSNUdoFmwGhl.JPG",
      href: "/destinations/philippines",
      tours: "1 Tour",
      from: "£999",
    },
  ];

  const featuredTours = [
    {
      slug: "thailand-island-hopper",
      name: "Thailand Island Hopper",
      destination: "Thailand",
      duration: "21 days",
      price: "£1,599",
      rating: 4.9,
      reviews: 247,
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg",
      badge: "Most Popular",
    },
    {
      slug: "bali-explorer",
      name: "Bali Explorer",
      destination: "Bali",
      duration: "14 days",
      price: "£1,199",
      rating: 4.9,
      reviews: 203,
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZyduANpQpBJQSfsk.jpeg",
      badge: "Summer Special",
    },
    {
      slug: "philippines-paradise",
      name: "Philippines Paradise",
      destination: "Philippines",
      duration: "10 days",
      price: "£999",
      rating: 4.9,
      reviews: 167,
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/gMgbXqqaIFwmNoLk.webp",
      badge: "New Tour",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Solo Travel, Group Vibes",
      description: "Join 18-35 year olds from around the world. Come solo, leave with lifelong friends.",
    },
    {
      icon: Calendar,
      title: "£60 Deposits",
      description: "Secure your spot with just £60 and spread the cost with flexible payment plans.",
    },
    {
      icon: Heart,
      title: "Ace Moments",
      description: "Signature experiences you won't find anywhere else. Curated for maximum memories.",
    },
    {
      icon: Shield,
      title: "Expert Trip Managers",
      description: "Dedicated guides who handle the logistics so you can focus on the adventure.",
    },
  ];

  return (
    <div className="animate-fade-in">

      {/* Full-Screen Video Hero */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/MmWOyVBmFOzzDhQL.MP4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 container pb-16 md:pb-24 text-white">
          <div className="max-w-4xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Group Travel for 18-35s
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              Epic Trips.<br />Lifelong Friends.
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Group travel experiences in Thailand, Bali, and the Philippines. Just £60 to secure your spot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold tracking-tight text-lg h-14 px-10 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105"
              >
                <Link href="/tours" className="flex items-center gap-2">
                  Explore Tours <ArrowRight className="w-5 h-5" />
                </Link>
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

            {/* Stats */}
            <div className="flex items-center gap-5 sm:gap-8 pt-6 text-white/90">
              <div className="flex-shrink-0">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">£60</div>
                <div className="text-xs sm:text-sm text-white/60 mt-0.5">Deposits</div>
              </div>
              <div className="h-10 w-px bg-white/20 flex-shrink-0" />
              <div className="flex-shrink-0">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">4.9★</div>
                <div className="text-xs sm:text-sm text-white/60 mt-0.5">Avg Rating</div>
              </div>
              <div className="h-10 w-px bg-white/20 flex-shrink-0" />
              <div className="flex-shrink-0">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">800+</div>
                <div className="text-xs sm:text-sm text-white/60 mt-0.5">Travellers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 text-white/50 text-xs font-medium tracking-widest uppercase">
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Destinations */}
      <section className="container py-16 md:py-24">
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Where We Go</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Choose Your Destination
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link key={dest.name} href={dest.href}>
                <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest font-medium mb-2">
                      <MapPin className="w-3 h-3" />
                      {dest.tours}
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight">{dest.name}</h3>
                    <p className="text-white/80 mt-1">{dest.tagline}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold">From {dest.from}</span>
                      <span className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="bg-muted border-y border-border py-16 md:py-24">
        <div className="container space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Featured Tours</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Pick Your Adventure
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden md:flex items-center gap-2 font-semibold">
              <Link href="/tours">
                View All Tours <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTours.map((tour) => (
              <Link key={tour.slug} href={`/tour/${tour.slug}`}>
                <div className="group relative overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-card cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
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
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-bold text-sm">{tour.rating}</span>
                      <span className="text-white/70 text-sm">({tour.reviews})</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-medium">
                      <MapPin className="w-3 h-3" />
                      {tour.destination} · {tour.duration}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {tour.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">From</div>
                        <div className="text-2xl font-bold text-primary">{tour.price}</div>
                      </div>
                      <span className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        View Tour <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Button asChild variant="outline" className="font-semibold">
              <Link href="/tours">View All Tours <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why ACE */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why ACE?</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Travel Done Right
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're not just another tour company. We build communities of adventurers who believe travel should be accessible, social, and unforgettable.
            </p>
            <Button asChild size="lg" className="rounded-full font-semibold px-8">
              <Link href="/how-it-works" className="flex items-center gap-2">
                How It Works <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="space-y-3 p-6 border border-border hover:border-primary/40 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                <h3 className="text-lg font-bold tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACE Moments Gallery */}
      <AceMomentsGallery />

      {/* Final CTA */}
      <section
        className="relative py-24 md:py-40 overflow-hidden"
        style={{
          backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EkbTwtPubGBZnpjI.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative container text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium">
            <Star className="w-4 h-4 fill-accent text-accent" />
            Rated 4.9/5 by 500+ travellers
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Ready for Your<br className="hidden md:block" /> First Adventure?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join hundreds of travellers who've had the adventure of a lifetime with ACE. Your group is waiting.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold tracking-tight text-lg h-14 px-10 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105"
            >
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/70 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold tracking-tight text-lg h-14 px-10 rounded-full transition-all hover:scale-105"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
