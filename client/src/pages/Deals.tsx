import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Tag, ArrowRight, Clock } from "lucide-react";

export default function Deals() {
  const deals = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Save £150 on any tour booked 6+ months in advance",
      discount: "£150 OFF",
      validUntil: "31 Dec 2026",
      code: "EARLYBIRD150",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      terms: "Valid on all tours departing after 1 June 2026"
    },
    {
      id: 2,
      title: "Group Booking Discount",
      description: "Book with 4+ friends and everyone saves £100",
      discount: "£100 OFF",
      validUntil: "Ongoing",
      code: "GROUP4",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      terms: "Minimum 4 people booking same tour and departure date"
    },
    {
      id: 3,
      title: "Last Minute Deals",
      description: "Tours departing within 30 days get automatic discounts",
      discount: "Up to £200 OFF",
      validUntil: "Ongoing",
      code: "AUTO-APPLIED",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      terms: "Discount varies by tour and availability"
    }
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            ACE Deals
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Save big on your next adventure with our exclusive offers and discounts
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card 
              key={deal.id}
              className="overflow-hidden border-2 hover:border-primary transition-kinetic"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-destructive text-destructive-foreground text-lg px-4 py-2">
                    {deal.discount}
                  </Badge>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">{deal.title}</h3>
                <p className="text-muted-foreground">{deal.description}</p>
                
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono font-bold">{deal.code}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {deal.validUntil}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  {deal.terms}
                </p>

                <Button 
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  <Link href="/tours">
                    <a className="flex items-center justify-center gap-2">
                      Browse Tours
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background py-16 md:py-24">
        <div className="container max-w-3xl text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Never Miss a Deal
          </h2>
          <p className="text-xl opacity-80">
            Subscribe to our newsletter and be the first to know about flash sales, exclusive offers, and new tour launches
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium tracking-tight"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
