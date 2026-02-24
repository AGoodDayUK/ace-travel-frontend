import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Users, Calendar, Heart, Shield, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const destinations = [
    {
      name: "Thailand",
      tagline: "Island Paradise Awaits",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BJGrLpWkZZByQqyU.JPG",
      href: "/destinations/thailand",
      tours: "5 Tours",
      from: "£899"
    },
    {
      name: "Bali",
      tagline: "Volcanic Adventures",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/aZaCGhQegNtphLSK.JPG",
      href: "/destinations/bali",
      tours: "3 Tours",
      from: "£1,099"
    },
    {
      name: "Philippines",
      tagline: "Hidden Lagoons",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nfzqJSNUdoFmwGhl.JPG",
      href: "/destinations/philippines",
      tours: "3 Tours",
      from: "£1,199"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Solo Travel, Group Vibes",
      description: "Join 18-35 year olds from around the world. Come solo, leave with lifelong friends.",
      color: "text-primary"
    },
    {
      icon: Calendar,
      title: "£60 Deposits",
      description: "Secure your spot with just £60 and spread the cost with flexible payment plans.",
      color: "text-accent"
    },
    {
      icon: Heart,
      title: "Ace Moments",
      description: "Signature experiences you won't find anywhere else. Curated for maximum memories.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Trip Managers",
      description: "Expert guides who handle the logistics so you can focus on the adventure.",
      color: "text-accent"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Full-Width Video Hero Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZJEyhramabXQATmY.MOV" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        
        <div className="container relative z-10 text-center text-background px-4">
          <div className="space-y-4 md:space-y-8 max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-tight">
              EPIC TRIPS. LIFELONG FRIENDS.
            </h1>
            <div className="flex gap-2 md:gap-4 justify-center">
              <div className="h-2 md:h-3 w-16 md:w-24 bg-primary" />
              <div className="h-2 md:h-3 w-10 md:w-16 bg-accent" />
              <div className="h-2 md:h-3 w-8 md:w-12 bg-primary" />
            </div>
            
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold max-w-3xl mx-auto leading-relaxed px-4">
              Group travel experiences in Thailand, Bali, and the Philippines for 18-35 year olds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6">
              <Button 
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-tight text-sm sm:text-base md:text-xl h-14 md:h-20 px-6 md:px-12 border-2 md:border-4 border-background transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(255,255,255,0.3)] md:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.3)]"
              >
                <Link href="/tours">
                  EXPLORE TOURS <ArrowRight className="w-4 h-4 md:w-6 md:h-6 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="bg-background hover:bg-background/90 text-foreground font-black tracking-tight text-sm sm:text-base md:text-xl h-14 md:h-20 px-6 md:px-12 border-2 md:border-4 border-background transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(255,255,255,0.3)] md:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.3)]"
              >
                <Link href="/how-it-works">HOW IT WORKS</Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 sm:gap-8 md:gap-12 justify-center pt-6 md:pt-12 text-background">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)' }}>£60</div>
                <div className="font-black mt-1 md:mt-2 text-xs sm:text-sm md:text-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>DEPOSITS</div>
              </div>
              <div className="h-12 sm:h-16 md:h-20 w-0.5 md:w-1 bg-background/80" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)' }}>18-35</div>
                <div className="font-black mt-1 md:mt-2 text-xs sm:text-sm md:text-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>AGE RANGE</div>
              </div>
              <div className="h-12 sm:h-16 md:h-20 w-0.5 md:w-1 bg-background/80" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)' }}>3</div>
                <div className="font-black mt-1 md:mt-2 text-xs sm:text-sm md:text-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>DESTINATIONS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute top-8 right-8 sticker-badge bg-accent text-accent-foreground px-8 py-4 font-black text-base hidden lg:flex items-center gap-2 z-20 animate-wiggle">
          <Sparkles className="w-5 h-5" />
          18-35 ONLY
        </div>
        <div className="absolute bottom-8 left-8 sticker-badge bg-primary text-primary-foreground px-8 py-4 font-black text-base hidden lg:block z-20 animate-bounce-subtle">
          £60 DEPOSITS
        </div>
      </section>

      {/* Destinations Section with Sticker Style */}
      <section className="container py-16 md:py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
              WHERE WILL YOU GO?
            </h2>
            <div className="flex gap-3 justify-center">
              <div className="h-2 w-16 bg-primary" />
              <div className="h-2 w-16 bg-accent" />
              <div className="h-2 w-16 bg-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <Link key={dest.name} href={dest.href}>
                <Card className="group cursor-pointer overflow-hidden border-4 border-foreground transition-all duration-200 hover:translate-y-[-8px] hover:shadow-[10px_10px_0px_rgba(238,47,109,0.4)] p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={dest.image}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                      <div className="space-y-3">
                        <h3 className="text-4xl font-black tracking-tight ">{dest.name.toUpperCase()}</h3>
                        <p className="text-background/90 font-bold text-lg">{dest.tagline}</p>
                        <div className="flex items-center justify-between pt-4">
                          <span className="text-sm font-bold bg-accent text-accent-foreground px-3 py-1">{dest.tours}</span>
                          <span className="text-2xl font-black">FROM {dest.from}</span>
                        </div>
                      </div>
                    </div>
                    {/* Floating badge */}
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 font-black text-xs sticker-badge">
                      HOT!
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Icons */}
      <section className="bg-secondary py-16 md:py-24 border-y-4 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-6">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">
                WHY CHOOSE ACE?
              </h2>
              <div className="flex gap-3">
                <div className="h-2 w-16 bg-primary" />
                <div className="h-2 w-12 bg-accent" />
              </div>
              <p className="text-lg text-foreground leading-relaxed font-medium">
                We're not just another tour company. We're building a community of adventurers who believe travel should be accessible, social, and unforgettable.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="space-y-4 bg-background p-6 border-4 border-foreground transition-all duration-200 hover:translate-y-[-6px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.15)]"
                >
                  <div className={`w-16 h-16 flex items-center justify-center border-4 border-foreground ${feature.color} bg-background`}>
                    <feature.icon className="w-8 h-8" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">{feature.title.toUpperCase()}</h3>
                  <p className="text-foreground/80 leading-relaxed font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Bold Design */}
      <section className="container py-16 md:py-24">
        <div className="bg-foreground text-background p-12 md:p-20 border-6 border-foreground relative overflow-hidden transition-all duration-200 hover:shadow-[12px_12px_0px_rgba(68,197,195,0.4)]">
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-32 h-32 border-4 border-primary opacity-20 rotate-12" />
          <div className="absolute bottom-8 left-8 w-24 h-24 border-4 border-accent opacity-20 -rotate-12" />
          
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter ">
              READY FOR YOUR FIRST ADVENTURE?
            </h2>
            <p className="text-2xl text-background/90 leading-relaxed font-bold">
              Join thousands of solo travellers who've found their tribe with ACE. 
              Secure your spot with just £60 today.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-tight text-xl h-20 px-12 border-4 border-background transition-all duration-200 hover:translate-y-[-6px] hover:shadow-[10px_10px_0px_rgba(244,162,97,0.5)]"
            >
              <Link href="/tours">
                VIEW ALL TOURS <Zap className="w-6 h-6 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
