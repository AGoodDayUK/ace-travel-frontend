import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Users, Calendar, Heart, Shield } from "lucide-react";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const destinations = [
    {
      name: "Thailand",
      tagline: "Island Paradise Awaits",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-1_1770480741000_na1fn_dGhhaWxhbmQtaGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTFfMTc3MDQ4MDc0MTAwMF9uYTFmbl9kR2hoYVd4aGJtUXRhR1Z5YncuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uyKUllkux1JDYBMmYN1fJZmo5CWMGnYtZMZGLQGwnz35GO26ykP8ztTt8GeeX2sfIDAsa9udPZ17mYxtse7THSchl4HqvthaEW~HSbu0dMqisZAaAq6TxtIe6Z0o~FebXsYMFNPbx2L~9qWgx00hI2LW6M5OOSMC0jhcAeNrLJDwavCuAplgD-huY3EO2rjP56TWniPplk0DK6VuhuCmRtr-xMnovu-9Ca8HUP~GRex68DmfKroIwVk~jpMruXiE5cuG~NGeExV8FGPNAm-3jn59-6jDX3S29SCz4FWlcaoBywTywv~LIIIHc57k6FIFS~wvxbEDVAgHC2qXRRSw1A__",
      href: "/destinations/thailand",
      tours: "5 Tours",
      from: "£899"
    },
    {
      name: "Bali",
      tagline: "Volcanic Adventures",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-2_1770480747000_na1fn_YmFsaS1oZXJv.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTJfMTc3MDQ4MDc0NzAwMF9uYTFmbl9ZbUZzYVMxb1pYSnYuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=djpDHUto6V6VOMTeh~xnral1i2NndKjfoxSl9Bi-k9yTBACl7uQBKLEpmUL4QqnvpCRa8etzcfbB1Qju2lAyhoLsmgODv4oWPq2w0jc1YA87qMDC4rxF6AiyBIv7iHEYj8-wX4KDPVQDpX3XF8J3Tm~nb3drPEEAXBUhJWwqACccnJsxGBwZBh0TFoYkZE06FzYkxQ0WpfrCnk9gnut0m6CvVjAPltvSfvbx6FLmpxs0nJvJdgVE2rWtrRKEAhbC23AWyfzASQedlWHLaU7Q~lRS6tEt52aE9IKpJa2CyPTEf4mDlYQVb1i4uPxcvtF9cDwzz1vtvNNbieAaEcZ4zg__",
      href: "/destinations/bali",
      tours: "3 Tours",
      from: "£1,099"
    },
    {
      name: "Philippines",
      tagline: "Hidden Lagoons",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-3_1770480733000_na1fn_cGhpbGlwcGluZXMtaGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTNfMTc3MDQ4MDczMzAwMF9uYTFmbl9jR2hwYkdsd2NHbHVaWE10YUdWeWJ3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=o1-~ZrDvTVMA3Z97TqUylN9PWsajDn3w0LDqBI6e-zMBUGlHUPoxZTihwq92JZvpfwuGso4s8gJnVMu2YsaERbp~JLu3yyb7mlfooHkY-k0Srjvk1x1TnGpr3kBYoYUFjFpi0fkXVnk081jlQNxpqgU9w5AkZa40HNTl5LngSOK16xtIak7nddyK2t4YTgnjyVG3eaumcjrr5nXV0pR8VHP-xRWaSGnf5uJubug0jNObI-nCA5WpmJ4lGX0F2XO1TAKuHonK4DLnWEpqsFwdDppPszzBKMbhZt4JhqGsXGPZqq6Hzz08kRWXqofkkpsMUcYXg7HWrfwZMW8VghPljw__",
      href: "/destinations/philippines",
      tours: "3 Tours",
      from: "£1,199"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Solo Travel, Group Vibes",
      description: "Join 18-35 year olds from around the world. Come solo, leave with lifelong friends."
    },
    {
      icon: Calendar,
      title: "£60 Deposits",
      description: "Secure your spot with just £60 and spread the cost with flexible payment plans."
    },
    {
      icon: Heart,
      title: "Ace Moments",
      description: "Signature experiences you won't find anywhere else. Curated for maximum memories."
    },
    {
      icon: Shield,
      title: "Trip Managers",
      description: "Expert guides who handle the logistics so you can focus on the adventure."
    }
  ];

  return (
    <div className="animate-fade-in">
      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
                Your First Epic Adventure
              </h1>
              <div className="h-1 w-24 bg-primary" />
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Group travel experiences in Thailand, Bali, and the Philippines for 18-35 year olds. 
              Come solo, leave with your future best friends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight text-lg h-14 px-8"
              >
                <Link href="/tours">Explore Tours <ArrowRight className="w-5 h-5" /></Link>
              </Button>
              
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="font-medium tracking-tight text-lg h-14 px-8 border-2"
              >
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm">
              <div>
                <div className="text-3xl font-bold text-primary">£60</div>
                <div className="text-muted-foreground">Deposits</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">18-35</div>
                <div className="text-muted-foreground">Age Range</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-muted-foreground">Destinations</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 animate-slide-in-right">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-4_1770480744000_na1fn_Z3JvdXAtdHJhdmVsLWhlcm8.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTRfMTc3MDQ4MDc0NDAwMF9uYTFmbl9aM0p2ZFhBdGRISmhkbVZzTFdobGNtOC5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pWclah8wEL29jJrqhhVyZbo-dPKLMCPSioZB-AgrlpHNAfnbOMjUn1HxFPeSzIhjUUvhHrzggwIn0QwRxf3p-424KgxZsLuoar8xbeosJM89lAB494cUcKLWFS8KX45jyHzZMkBNjoC8R~HO2s3-804tOYdzxfwMmmFBTGg7zUeWiKaGsBTOdK0Ci8etH5~bmp8qkJYvsM37lwu7ZLKMPNvMYJ3lWMD8GxEfJGQ97DfzPomCt2ZT7qzQzfJRgV77oIMglIB9zRoWgGBXNhvbt5TS7ynFzDi01Y~u3LRzUBssLfuWckLsoqEzkOgggBHqUJKoa2Hjwvnzsbwqn4dZPg__"
                alt="Group of young travelers on the beach"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Where Will You Go?
            </h2>
            <div className="h-1 w-16 bg-accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <Link key={dest.name} href={dest.href}>
                <Card className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-kinetic">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-bold tracking-tight">{dest.name}</h3>
                        <p className="text-background/80">{dest.tagline}</p>
                        <div className="flex items-center justify-between pt-4">
                          <span className="text-sm">{dest.tours}</span>
                          <span className="text-lg font-bold">From {dest.from}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Why Choose ACE?
              </h2>
              <div className="h-1 w-16 bg-primary" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're not just another tour company. We're building a community of adventurers who believe travel should be accessible, social, and unforgettable.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="bg-foreground text-background p-12 md:p-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Ready for Your First Adventure?
            </h2>
            <p className="text-xl text-background/80 leading-relaxed">
              Join thousands of solo travelers who've found their tribe with ACE. 
              Secure your spot with just £60 today.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium tracking-tight text-lg h-14 px-8"
            >
              <Link href="/tours">View All Tours <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
