import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";

// Real ACE Travel photography from CDN
const IMAGES = {
  hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg",
  browse: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/UpbKhZiBLzYSxFXe.webp",
  deposit: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/fxvwBSshNYtNUdKQ.jpg",
  call: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ycNbQDtguuEeurhc.webp",
  group: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ZvVsOICEyvcbfPGz.png",
  adventure: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/BEBsUGvmQvVYgUsC.jpg",
  payment: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/oSzURVcUCKZXqkJb.jpg",
  arrive: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/HzkAzSiHHurpNQTN.jpg",
};

const steps = [
  {
    number: "01",
    label: "Fill In Your Details",
    heading: "Secure your spot for just £60",
    body: "Head to the booking site and pick your destination — Thailand, Bali, or the Philippines. Choose your arrival date, check availability, and lock in your place with a £60 deposit. That's all it takes to get the adventure started.",
    image: IMAGES.browse,
    imageAlt: "ACE Travel booking app on a phone",
    cta: { label: "Book Now", href: "https://booking.acetravelexperiences.com/book/", external: true },
    highlights: [
      "Choose Thailand, Bali or the Philippines",
      "Pick your arrival date & check availability",
      "Secure your place for just £60",
    ],
    flip: false,
  },
  {
    number: "02",
    label: "Check Your DMs",
    heading: "We'll reach out — keep an eye on your inbox",
    body: "Once you've booked, it's our turn. We'll contact you on Instagram, WhatsApp, and email to organise a quick onboarding call. We'll walk you through everything, sort your payment plan, and get you added to your private WhatsApp group chat. Make sure you follow us so we can message you!",
    image: IMAGES.call,
    imageAlt: "Incoming call from Group Trip on a smartphone",
    cta: null,
    highlights: [
      "We'll reach out via Instagram, WhatsApp & email",
      "Quick onboarding call to walk you through everything",
      "Added to your private WhatsApp group chat",
    ],
    flip: true,
  },
  {
    number: "03",
    label: "Check Your Welcome Pack",
    heading: "Your welcome pack & flight support document",
    body: "We'll send you an email with your welcome pack and flight support document. Make sure you read through these carefully — they've got everything you need to know before you fly. Any questions? Just reach out, we're always ready to help.",
    image: IMAGES.group,
    imageAlt: "Group of friends excited before their trip",
    cta: null,
    highlights: [
      "Welcome pack sent straight to your inbox",
      "Flight support document included",
      "Trip Managers on hand to answer any questions",
    ],
    flip: false,
  },
  {
    number: "04",
    label: "Get Organised",
    heading: "Sort your flights, insurance & spending money",
    body: "When spending time abroad it's important to get organised early — flights, travel insurance, a travel money card, and spending money. Closer to your departure, speak to your Trip Manager about what to pack. We have loads of useful info on our socials and in your welcome pack!",
    image: IMAGES.deposit,
    imageAlt: "Travellers packing and getting ready for their trip",
    cta: { label: "Talk to a Trip Manager", href: "/contact", external: false },
    highlights: [
      "Book flights & travel insurance early",
      "Speak to your Trip Manager about packing",
      "Tips & advice on our socials & in your welcome pack",
    ],
    flip: true,
  },
  {
    number: "05",
    label: "Arrive in Paradise",
    heading: "Airport transfer waiting. Trip Manager ready.",
    body: "You'll arrive in paradise with an airport transfer waiting for you and your Trip Manager ready to welcome you. You'll be transferred to your first accommodation and briefed that evening for the trip of a lifetime.",
    image: IMAGES.arrive,
    imageAlt: "Beautiful tropical destination in Southeast Asia",
    cta: null,
    highlights: [
      "Airport transfer included on arrival",
      "Trip Manager there to meet and greet you",
      "Evening briefing before the adventure begins",
    ],
    flip: false,
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
              Five simple steps from booking to arriving in paradise.
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
                  step.cta.external ? (
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#ee2f6d] hover:bg-[#d42860] text-white font-bold rounded-xl h-12 px-6"
                    >
                      <a href={step.cta.href} target="_blank" rel="noopener noreferrer">
                        {step.cta.label}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  ) : (
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
                  )
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
              { stat: "800+", label: "Travellers" },
              { stat: "4.9★", label: "Trustpilot Rating" },
              { stat: '£60', label: "To Secure Your Spot" },
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
