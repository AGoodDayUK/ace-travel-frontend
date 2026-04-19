import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/JsonLd";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MessageCircle, ExternalLink, Clock, Send, HelpCircle, CalendarCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const HERO_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EngoliYHRVMWhoJy.jpg";

export default function Contact() {
  const settingsQuery = trpc.cms.settings.getPublic.useQuery();
  const s = useMemo(() => {
    const map: Record<string, string> = {};
    settingsQuery.data?.forEach(r => { map[r.key] = r.value ?? ""; });
    return map;
  }, [settingsQuery.data]);

  const email = s.contact_email || "admin@acetravelexperiences.com";
  const phone = s.contact_phone || "+44 7450 996 347";
  const whatsapp = s.contact_whatsapp || "447450996347";
  const instagram = s.contact_instagram || "https://www.instagram.com/acetravelexperiences/";
  const tiktok = s.contact_tiktok || "https://www.tiktok.com/@acetravelexperiences";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    tourInterest: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", inquiryType: "", tourInterest: "", message: "" });
    setSubmitting(false);
  };

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      description: "Get a quick answer from the ACE team",
      cta: "Start Chat",
      href: `https://wa.me/${whatsapp}`,
      color: "bg-green-50 border-green-200 hover:border-green-400",
      iconColor: "text-green-600",
      external: true
    },
    {
      icon: HelpCircle,
      title: "Browse FAQs",
      description: "Find instant answers to common questions",
      cta: "View FAQs",
      href: "/faq",
      color: "bg-[#44c5c3]/10 border-[#44c5c3]/30 hover:border-[#44c5c3]",
      iconColor: "text-[#44c5c3]",
      external: false
    },
    {
      icon: CalendarCheck,
      title: "Manage My Booking",
      description: "View or update your existing booking",
      cta: "My Account",
      href: "https://booking.acetravelexperiences.com/account/signin/",
      color: "bg-[#ee2f6d]/10 border-[#ee2f6d]/30 hover:border-[#ee2f6d]",
      iconColor: "text-[#ee2f6d]",
      external: true
    }
  ];

  return (
    <div className="animate-fade-in">
      <SEO
        title="Contact ACE Travel Experiences | Get in Touch"
        description="Have a question about our group tours to Thailand or Bali? Contact the ACE Travel team by email, WhatsApp, or social media. We're here to help you plan your adventure."
        canonical="/contact"
      />
      <JsonLd schema={webPageSchema({ name: "Contact Us — ACE Travel Experiences", description: "Get in touch with the ACE Travel team. We’re here to help with bookings, questions, and anything else you need.", path: "/contact" })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      {/* Hero */}
      <section className="relative min-h-[380px] md:min-h-[440px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 container pb-12 pt-32 md:pb-16">
          <div className="max-w-2xl">
            <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-3">Get In Touch</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none mb-4">
              We'd love to hear<br />from you
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl">
              Questions about a tour? Ready to book? Just want to chat about your next adventure? We're here.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white border-b">
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 group ${action.color}`}
              >
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Contact Info */}
      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">Send us a message</h2>
              <p className="text-muted-foreground">We aim to respond within 24 hours on weekdays.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Enquiry Type */}
              <div className="space-y-2">
                <Label htmlFor="inquiryType" className="font-semibold">What's your enquiry about? *</Label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select an enquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Making a booking</SelectItem>
                    <SelectItem value="payment">Payment plans</SelectItem>
                    <SelectItem value="itinerary">Tour itinerary question</SelectItem>
                    <SelectItem value="group">Group booking (5+ people)</SelectItem>
                    <SelectItem value="visa">Visas and travel documents</SelectItem>
                    <SelectItem value="existing">Existing booking</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tour Interest */}
              <div className="space-y-2">
                <Label htmlFor="tourInterest" className="font-semibold">Which tour are you interested in?</Label>
                <Select
                  value={formData.tourInterest}
                  onValueChange={(value) => setFormData({ ...formData, tourInterest: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a tour (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thailand-island-hopper">Thailand Island Hopper (21 days)</SelectItem>
                    <SelectItem value="thailand-intro">Thailand Intro (14 days)</SelectItem>
                    <SelectItem value="bali-explorer">Bali Explorer (14 days)</SelectItem>
                    <SelectItem value="bali-island-hopper">Bali Island Hopper (14 days)</SelectItem>
                    <SelectItem value="philippines-paradise">Philippines Paradise (10 days)</SelectItem>
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Jane Smith"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="jane@example.com"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-semibold">Phone Number <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 7123 456789"
                  className="h-12"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-semibold">Your Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Tell us what you'd like to know..."
                  rows={5}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full bg-[#ee2f6d] hover:bg-[#d42860] text-white font-bold text-base h-14 rounded-xl"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Details Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tighter mb-1">Reach out to us</h2>
              <p className="text-muted-foreground text-sm">Prefer to get in touch directly? Here's how to find us.</p>
            </div>

            {/* Email */}
            <Card className="p-5 border-2 hover:border-[#44c5c3] transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#44c5c3]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#44c5c3]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-1">Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-foreground hover:text-[#44c5c3] transition-colors break-all"
                  >
                    {email}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">We reply within 24 hours on weekdays</p>
                </div>
              </div>
            </Card>

            {/* Phone / WhatsApp */}
            <Card className="p-5 border-2 hover:border-green-400 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-1">Phone / WhatsApp</div>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="font-semibold text-foreground hover:text-green-600 transition-colors"
                  >
                    {phone}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Mon to Fri, 9am to 6pm GMT</p>
                </div>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="p-5 border-2 bg-muted/30">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-1">Response Times</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email enquiries</span>
                      <span className="font-semibold">Within 24 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">WhatsApp</span>
                      <span className="font-semibold">Same day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Urgent bookings</span>
                      <span className="font-semibold">Call us direct</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social */}
            <Card className="p-5 border-2">
              <div className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-3">Follow Our Adventures</div>
              <div className="flex gap-3">
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Instagram
                </a>
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  TikTok
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 container py-16 md:py-20 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Ready to book your adventure?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Secure your spot with just a £60 deposit and spread the rest with flexible payment plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#ee2f6d] hover:bg-[#d42860] text-white font-bold text-base h-14 px-8 rounded-xl"
            >
              <Link href="/tours">Browse All Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground font-bold text-base h-14 px-8 rounded-xl bg-transparent"
            >
              <Link href="/faq">Read FAQs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
