import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Search, CreditCard, Users, Plane, Shield, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Find Your Adventure",
      description: "Browse our tours across Thailand, Bali, and the Philippines. Filter by destination, duration, or departure date to find your perfect match."
    },
    {
      number: "02",
      icon: CreditCard,
      title: "Secure with £60",
      description: "Reserve your spot with just a £60 deposit. Then spread the remaining cost with flexible payment plans up to 60 days before departure."
    },
    {
      number: "03",
      icon: Users,
      title: "Join the Group",
      description: "Get added to your tour WhatsApp group and start connecting with your travel crew before you even leave home."
    },
    {
      number: "04",
      icon: Plane,
      title: "Pack & Go",
      description: "We handle accommodation, activities, and logistics. You just need to book your flights and show up ready for adventure."
    }
  ];

  const included = [
    { icon: Shield, title: "ATOL & ABTA Protected", description: "Complete financial protection" },
    { icon: Users, title: "Expert Trip Managers", description: "On-ground support 24/7" },
    { icon: Heart, title: "Most Meals Included", description: "Breakfast daily plus group dinners" },
    { icon: Plane, title: "All Activities", description: "Tours, excursions, and experiences" }
  ];

  return (
    <div className="animate-fade-in">
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            How It Works
          </h1>
          <div className="h-1 w-16 bg-primary mx-auto" />
          <p className="text-xl md:text-2xl text-muted-foreground">
            Four simple steps to your first epic adventure
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step) => (
            <div key={step.number}>
              <Card className="p-8 h-full border-2 hover:border-primary transition-kinetic">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 flex items-center justify-center bg-primary text-primary-foreground">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="text-6xl font-bold text-muted opacity-20">{step.number}</div>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              What's Included
            </h2>
            <div className="h-1 w-16 bg-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {included.map((item) => (
              <div key={item.title} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-accent text-accent-foreground">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Flexible Payment Plans
            </h2>
            <div className="h-1 w-16 bg-primary" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe travel should be accessible. That's why we offer flexible payment plans that let you spread the cost over time.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                <span>Just £60 to secure your spot</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                <span>Spread remaining balance over monthly payments</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                <span>Final payment due 60 days before departure</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                <span>No hidden fees or interest charges</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-6">
            <Card className="p-8 bg-foreground text-background">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Example: Thailand 14-Day Tour</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-background/20">
                    <span>Total Tour Cost</span>
                    <span className="text-2xl font-bold">£1,299</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Deposit Today</span>
                    <span className="text-xl font-bold text-accent">£60</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Payments (x4)</span>
                    <span className="text-xl">£310</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="bg-muted p-12 md:p-16 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Ready to Start Your Adventure?
          </h2>
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight text-lg h-14 px-8"
          >
            <Link href="/tours">Browse Tours</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
