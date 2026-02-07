import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@acetravelexperiences.com",
      link: "mailto:hello@acetravelexperiences.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+44 20 1234 5678",
      link: "tel:+442012345678"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Travel Street, London, UK",
      link: null
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon-Fri: 9am-6pm GMT",
      link: null
    }
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Have questions? We're here to help you plan your perfect adventure
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="p-8 border-2">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7123 456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Question</SelectItem>
                        <SelectItem value="payment">Payment Plans</SelectItem>
                        <SelectItem value="itinerary">Tour Itinerary</SelectItem>
                        <SelectItem value="group">Group Booking</SelectItem>
                        <SelectItem value="visa">Visa & Travel Docs</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Tell us about your travel plans..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg h-14"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item) => (
              <Card key={item.title} className="p-6 border-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-sm text-muted-foreground hover:text-primary transition-kinetic"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-muted border-2">
              <h3 className="font-bold mb-3">Quick Response Times</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We aim to respond to all inquiries within 24 hours during business days. 
                For urgent booking questions, call us directly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Ready to Book?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our tours and secure your spot with just a £60 deposit
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight text-lg h-14 px-8"
          >
            View All Tours
          </Button>
        </div>
      </section>
    </div>
  );
}
