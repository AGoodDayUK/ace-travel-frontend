import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Users, Heart, Globe, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We're building a global community of adventurers who believe travel brings people together."
    },
    {
      icon: Heart,
      title: "Accessible Travel",
      description: "Epic adventures shouldn't break the bank. We make travel affordable with low deposits and payment plans."
    },
    {
      icon: Globe,
      title: "Authentic Experiences",
      description: "We go beyond tourist traps to show you the real culture, food, and hidden gems of each destination."
    },
    {
      icon: Award,
      title: "Quality & Safety",
      description: "ATOL and ABTA protected with 24/7 support. Your safety and experience are our top priorities."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Travelers" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "3", label: "Destinations" },
    { number: "11", label: "Tours" }
  ];

  return (
    <div className="animate-fade-in">
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              About ACE
            </h1>
            <div className="h-1 w-16 bg-primary" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              ACE Travel Experiences was founded on a simple belief: travel should be accessible, social, and unforgettable. We create group adventures for 18-35 year olds who want to explore the world without the hassle of planning or the loneliness of solo travel.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since 2019, we've helped over 10,000 travelers discover Southeast Asia, make lifelong friends, and create memories that last forever. We're not just a tour company. We're a community.
            </p>
          </div>
          <div className="md:col-span-6">
            <img 
              src="https://private-us-east-1.manuscdn.com/sessionFile/pXVHXcSbPXyc4MWdg9U3VE/sandbox/vQIa9gQhvpiaeVZHjvhxJC-img-4_1770480744000_na1fn_Z3JvdXAtdHJhdmVsLWhlcm8.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFhWSFhjU2JQWHljNE1XZGc5VTNWRS9zYW5kYm94L3ZRSWE5Z1FodnBpYWVWWkhqdmh4SkMtaW1nLTRfMTc3MDQ4MDc0NDAwMF9uYTFmbl9aM0p2ZFhBdGRISmhkbVZzTFdobGNtOC5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pWclah8wEL29jJrqhhVyZbo-dPKLMCPSioZB-AgrlpHNAfnbOMjUn1HxFPeSzIhjUUvhHrzggwIn0QwRxf3p-424KgxZsLuoar8xbeosJM89lAB494cUcKLWFS8KX45jyHzZMkBNjoC8R~HO2s3-804tOYdzxfwMmmFBTGg7zUeWiKaGsBTOdK0Ci8etH5~bmp8qkJYvsM37lwu7ZLKMPNvMYJ3lWMD8GxEfJGQ97DfzPomCt2ZT7qzQzfJRgV77oIMglIB9zRoWgGBXNhvbt5TS7ynFzDi01Y~u3LRzUBssLfuWckLsoqEzkOgggBHqUJKoa2Hjwvnzsbwqn4dZPg__"
              alt="ACE Travel group"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-5xl md:text-6xl font-bold">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Our Values
          </h2>
          <div className="h-1 w-16 bg-accent mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value) => (
            <Card key={value.title} className="p-8 border-2 hover:border-primary transition-kinetic">
              <div className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center bg-accent text-accent-foreground">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{value.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Join the ACE Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your adventure? Browse our tours and find your perfect trip.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight text-lg h-14 px-8"
          >
            <Link href="/tours">
              <a>View All Tours</a>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
