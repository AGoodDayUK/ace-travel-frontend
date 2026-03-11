import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";

// Real ACE Travel photography from CDN
const IMAGES = {
  hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg",
  browse: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/trjSBWQKzHaQYLlx.webp",
  deposit: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/fxvwBSshNYtNUdKQ.jpg",
  group: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BEBsUGvmQvVYgUsC.jpg",
  adventure: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BEBsUGvmQvVYgUsC.jpg",
  payment: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/oSzURVcUCKZXqkJb.jpg",
};

const steps = [
  {
    number: "01",
    label: "Find Your Adventure",
    heading: "Browse tours built for 18-35s",
    body: "Explore our handpicked group tours across Thailand, Bali, and the Philippines. Each trip is designed for 18-35 year olds who want real experiences, not tourist traps. Filter by destination, duration, or departure date.",
    image: IMAGES.browse,
    imageAlt: "Group of travellers exploring Thailand together",
    cta: { label: "Browse Tours", href: "/tours" },
    highlights: ["Thailand, Bali & Philippines", "14 to 21 day itineraries", "Groups of 15-30 people"],
    flip: false,
  },
  {
    number: "02",
    label: "Secure Your Spot",
    heading: "Just £60 to lock in your place",
    body: "Reserve your spot on any tour with a £60 deposit. Then spread the remaining cost with flexible monthly payments up to 60 days before departure. No interest, no hidden fees.",
    image: IMAGES.deposit,
    imageAlt: "Travellers celebrating on a beach",
    cta: null,
    highlights: ["£60 deposit to secure your place", "Flexible monthly payment plans", "Final balance 60 days before departure"],
    flip: true,
  },
  {
    number: "03",
    label: "Join the Crew",
    heading: "Meet your travel family before you fly",
    body: "Once booked, you'll be added to your tour WhatsApp group so you can start connecting with your travel crew before you even leave home. No awkward first days — you'll already be friends.",
    image: IMAGES.group,
    imageAlt: "Group of friends on tour together",
    cta: null,
    highlights: ["Private WhatsApp group access", "Meet your crew before departure", "Solo travellers always welcome"],
    flip: false,
  },
  {
    number: "04",
    label: "Pack & Go",
    heading: "We handle the logistics, you make the memories",
    body: "Your ACE Rep and local guide take care of accommodation, activities, and all the day-to-day logistics. All you need to do is book your flights and show up ready for the adventure of a lifetime.",
    image: IMAGES.adventure,
    imageAlt: "Travellers on an adventure in Southeast Asia",
    cta: { label: "View What's Included", href: "/tours" },
    highlights: ["Accommodation included", "Activities and excursions included", "Expert ACE Rep on every tour"],
    flip: true,
  },
];

export default function HowItWorks() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 container pb-14 pt-32 md:pb-20">
          <div className="max-w-2xl">
            <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-3">Simple Process</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none mb-4">
              How It Works
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl">
              Four simple steps from browsing tours to living your best adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, idx) => (
        <section
          key={step.number}
          className={`py-16 md:py-24 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="container">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${step.flip ? "lg:flex-row-reverse" : ""}`}>

              {/* Image */}
              <div className={`relative ${step.flip ? "lg:order-2" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  {/* Step badge */}
                  <div className="absolute top-4 left-4 bg-[#ee2f6d] text-white font-black text-2xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                    {step.number}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${step.flip ? "lg:order-1" : ""}`}>
                <div>
                  <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-2">
                    Step {step.number} — {step.label}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                    {step.heading}
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.body}
                </p>
                <ul className="space-y-3">
                  {step.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#44c5c3] flex-shrink-0" />
                      <span className="font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
                {step.cta && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#ee2f6d] hover:bg-[#d42860] text-white font-bold rounded-xl h-12 px-6"
                  >
                    <Link href={step.cta.href}>
                      {step.cta.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Payment Plans Visual Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={IMAGES.payment}
                alt="Flexible payment plans for travel"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Payment breakdown */}
            <div className="space-y-8">
              <div>
                <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-2">Flexible Payments</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                  Travel now, pay over time
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                  We believe travel should be accessible to everyone. Our flexible payment plans let you spread the cost so you can focus on the excitement, not the price tag.
                </p>
              </div>

              {/* Example breakdown */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-5">
                <h3 className="text-xl font-bold">Example: Thailand Island Hopper</h3>
                <div className="text-3xl font-black text-[#44c5c3]">£1,599 <span className="text-base font-normal text-white/60">total</span></div>
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Deposit today</span>
                    <span className="font-bold text-[#ee2f6d] text-lg">£60</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Monthly payments</span>
                    <span className="font-bold text-lg">Flexible</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Final balance due</span>
                    <span className="font-bold text-lg">60 days before</span>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-sm text-white/70">
                  No interest. No hidden fees. Just flexible payments that work around your life.
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-[#ee2f6d] hover:bg-[#d42860] text-white font-bold rounded-xl h-12 px-6 w-full sm:w-auto"
              >
                <Link href="/tours">
                  See All Tours & Prices
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#44c5c3]/10 border-y border-[#44c5c3]/20 py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "500+", label: "Travellers" },
              { stat: "4.9★", label: "Trustpilot Rating" },
              { stat: "£60", label: "To Secure Your Spot" },
              { stat: "18-35", label: "Age Range" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#44c5c3]">{item.stat}</div>
                <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.adventure})` }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 container py-16 md:py-24 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Ready to start your adventure?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Browse our tours and secure your spot with just £60 today.
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
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
