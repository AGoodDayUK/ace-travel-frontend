import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Waves, ThumbsUp, Fish, Compass, GraduationCap, Anchor, Sun, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751";

const underwaterPhotos = [
  { src: `${CDN}/mVqPRwsMzuMFfJJi.jpg`, alt: "Yellow boxfish on Koh Tao reef" },
  { src: `${CDN}/AzAppvRGppbXzpRq.jpg`, alt: "School of fish in Koh Tao waters" },
  { src: `${CDN}/mXQOqNvRRuxZeNvl.jpg`, alt: "Seahorse on coral in Koh Tao" },
  { src: `${CDN}/nUYtFrJDXmtanRJn.jpg`, alt: "Sea turtle resting on the reef" },
  { src: `${CDN}/nLrfOOlvPBKqtRyF.jpg`, alt: "Shipwreck dive site in Koh Tao" },
  { src: `${CDN}/CXDfEochGZTWyvXn.jpg`, alt: "Blue-spotted ray on the seabed" },
];

const reasons = [
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Warm, Calm Conditions Year-Round",
    desc: "Koh Tao offers warm tropical water, gentle currents, and reliable visibility — perfect for relaxed and enjoyable diving.",
  },
  {
    icon: <Fish className="w-6 h-6" />,
    title: "Colourful & Diverse Marine Life",
    desc: "Bright coral reefs, turtles, rays, reef fish, and an abundance of small critters make every dive feel unique.",
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: "25+ Dive Sites to Explore",
    desc: "From shallow sandy bays to pinnacles, swim-throughs, and wrecks — there is something here for every diver.",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Ideal for Learning & Progression",
    desc: "Calm training bays for beginners and exciting deeper sites for advanced divers make Koh Tao perfect for growing your skills.",
  },
  {
    icon: <Anchor className="w-6 h-6" />,
    title: "Easy to Reach & Easy to Dive",
    desc: "Short boat rides, flexible schedules, and a diving-focused island make the whole experience simple and stress-free.",
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: "Relaxed Island Lifestyle",
    desc: "Sunsets, beach cafes, viewpoints, and a friendly community — Koh Tao is as enjoyable above the water as it is below.",
  },
];

const openWaterFAQs = [
  {
    q: "How long does the Open Water course take?",
    a: "Most people complete the SSI Open Water course in 3 days, but we are flexible if you need a slower pace. Small groups mean you are never rushed.",
  },
  {
    q: "Are there any extra costs?",
    a: "No hidden fees. The SSI Open Water Course price includes everything you need. The only optional extras are photos or videos.",
  },
  {
    q: "Do I need to be a strong swimmer?",
    a: "You only need to swim 200 metres or 300 metres with mask, fins and snorkel float for 10 minutes. No speed needed — just basic comfort in the water.",
  },
  {
    q: "Can I fly after my last dive?",
    a: "The general rule for flying after diving is to wait 12 hours after one dive, and 18 hours after two or more dives. If you went over your no-decompression limits or missed a safety stop on the dive, it is advised to wait 24 hours.",
  },
  {
    q: "Is diving safe for beginners?",
    a: "Absolutely. Koh Tao is one of the easiest places to learn, and your instructor will stay with you every step of the way.",
  },
  {
    q: "What if I feel nervous underwater?",
    a: "Totally normal. We take things slowly, practise skills in shallow water, and never push students faster than they are ready.",
  },
];

const basicDiverFAQs = [
  {
    q: "How long does the Basic Diver course take?",
    a: "It is designed as a one-day experience: a short theory session, calm-water skills, then an open water session with an SSI Professional.",
  },
  {
    q: "Is the Basic Diver course safe?",
    a: "Safety is the whole point. You will be with a professional instructor, use quality equipment, and learn the key skills before the dive. The course includes training, full scuba gear, and a guided open water dive.",
  },
  {
    q: "How deep will we go?",
    a: "Up to 12 metres, under direct professional supervision.",
  },
  {
    q: "Do I need to be a strong swimmer?",
    a: "You do not need to be fast, but you should be comfortable in the water. We ask that you can float or tread water for 10 minutes as a simple safety check.",
  },
  {
    q: "Do I get certified after this course?",
    a: "No — the SSI Basic Diver Course does not include a full certification. It is a proper introduction to scuba diving, without committing to the Open Water course straight away.",
  },
  {
    q: "Can I fly after my last dive?",
    a: "The general rule for flying after diving is to wait 12 hours after one dive, and 18 hours after two or more dives. If you went over your no-decompression limits or missed a safety stop on the dive, it is advised to wait 24 hours.",
  },
];

export default function ScubaDiving() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="relative min-h-[480px] md:min-h-[560px] flex items-end overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#004d6e] via-[#006994] to-[#44c5c3]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${CDN}/nUYtFrJDXmtanRJn.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="relative z-10 container pb-16 pt-36 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-3">Optional Add-On</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-5">
              Scuba Diving
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mb-2">
              Koh Tao is one of the cheapest places in the world to learn or try scuba diving. Available on Thailand Island Hopper and Bali Island Hopper trips.
            </p>
            <p className="text-[#44c5c3] font-semibold text-base">
              Plus: all divers get 20% off food and drinks at our partner hostel.
            </p>
          </div>
        </div>
      </section>

      {/* Six Reasons */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-3">Why Koh Tao?</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Six Reasons Divers Love Koh Tao</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reasons.map((r, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border hover:border-[#44c5c3]/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#44c5c3]/10 flex items-center justify-center text-[#006994] flex-shrink-0 mt-0.5">
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{r.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Underwater Photo Grid */}
      <section className="bg-slate-900 py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white text-center mb-10">
            What You Will See Underwater in Koh Tao
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {underwaterPhotos.map((p, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden">
                <img src={p.src} alt={p.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-border">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Choose Your Level</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">Available on Thailand Island Hopper and Bali Island Hopper trips only.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white border-2 border-[#44c5c3]/40 rounded-2xl p-8 hover:border-[#44c5c3] transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest text-[#006994] bg-[#44c5c3]/10 px-3 py-1 rounded-full">Taster</span>
              <h3 className="text-2xl font-black mt-4 mb-1">Basic Diver</h3>
              <div className="text-4xl font-black text-[#006994] mb-3">£100</div>
              <p className="text-muted-foreground text-sm mb-5">A one-day introduction to scuba diving. No experience needed — just a sense of adventure.</p>
              <ul className="space-y-2 text-sm">
                {["Theory session", "Confined water skills practice", "Guided open water dive to 12m", "Full scuba gear provided", "Professional SSI instructor"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#44c5c3] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border-2 border-[#ee2f6d] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#ee2f6d] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ee2f6d] bg-[#ee2f6d]/10 px-3 py-1 rounded-full">Certification</span>
              <h3 className="text-2xl font-black mt-4 mb-1">Open Water</h3>
              <div className="text-4xl font-black text-[#ee2f6d] mb-3">£350</div>
              <p className="text-muted-foreground text-sm mb-5">Full SSI Open Water certification over 3 days. Take your qualification home and dive anywhere in the world.</p>
              <ul className="space-y-2 text-sm">
                {["3-day course", "Theory + confined water training", "4 open water dives to 18m", "SSI certification (valid for life)", "No hidden fees — all inclusive"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#ee2f6d] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open Water Course Breakdown */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ee2f6d] bg-[#ee2f6d]/10 px-3 py-1 rounded-full">£350</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-4 mb-3">How Your Open Water Course Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This three-day course includes theory lessons, one confined session, and then 4 open water dives exploring the beautiful dive sites around Koh Tao. Performance-based — no previous experience needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                day: "Day 1",
                title: "Theory + Confined Water Training",
                img: `${CDN}/WSnonJoWEVjytnjE.jpg`,
                morning: { time: "8.30 AM – 10.30 AM", items: ["Meet your instructor and group", "Easy classroom sessions"] },
                afternoon: { time: "11.45 AM – 5.00 PM", items: ["Confined water training to practise skills in a calm, controlled space", "Open Water Dive 1"] },
              },
              {
                day: "Day 2",
                title: "Open Water Dives 1 & 2",
                img: `${CDN}/AfDzsZOcWGCfPlqe.jpg`,
                morning: { time: "10.30 AM – 11.45 AM", items: ["Final exam"] },
                afternoon: { time: "11.45 AM – 5.00 PM", items: ["Confined Water Training", "Practise buoyancy, equalisation", "Fun exploration", "Open Water Dive 2"] },
              },
              {
                day: "Day 3",
                title: "Open Water Dives 3 & 4",
                img: `${CDN}/UORRfnzCBIcLsphY.jpg`,
                morning: { time: "7.15 AM – 11.45 AM", items: ["Two final dives up to 18m", "Explore Koh Tao's reefs, rock formations and marine life", "Log your dives and final knowledge review", "Receive your SSI certification (valid for life)", "Celebrations!"] },
                afternoon: null,
              },
            ].map((d, i) => (
              <div key={i} className="rounded-2xl border border-border overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={d.img} alt={d.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ee2f6d]">{d.day}</span>
                  <h3 className="font-black text-lg mt-1 mb-4">{d.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground mb-1">Morning: {d.morning.time}</p>
                      <ul className="space-y-1">
                        {d.morning.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <Check className="w-3.5 h-3.5 text-[#44c5c3] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {d.afternoon && (
                      <div>
                        <p className="text-xs font-bold text-muted-foreground mb-1">Afternoon: {d.afternoon.time}</p>
                        <ul className="space-y-1">
                          {d.afternoon.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm">
                              <Check className="w-3.5 h-3.5 text-[#44c5c3] mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Open Water FAQs */}
          <div className="mt-14">
            <h3 className="text-2xl font-black tracking-tighter mb-6 text-center">Open Water — Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-2">
              {openWaterFAQs.map((faq, i) => (
                <AccordionItem key={i} value={`ow-${i}`} className="border border-border rounded-xl px-4">
                  <AccordionTrigger className="font-semibold text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Basic Diver Course Breakdown */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006994] bg-[#44c5c3]/10 px-3 py-1 rounded-full">£100</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-4 mb-3">How Your Basic Diver Course Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Before entering the water, your instructor will take you through a short theory session on safety and the basics of scuba diving. Then you will practise a few safety skills in shallow water near the beach. Once you are ready, your instructor will take you on an experience you will never forget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                part: "Part 1",
                title: "Theory + Confined Water",
                img: `${CDN}/ehEqCuktMVqUHWzZ.jpg`,
                items: [
                  "Simple theory that covers what you actually need",
                  "Get comfortable with the equipment and breathing underwater",
                  "Practise a few key skills in calm, controlled water",
                  "Build confidence before heading to the sea",
                ],
              },
              {
                part: "Part 2",
                title: "Open Water Dive",
                img: `${CDN}/ZSQNUTPbnNjbGBDA.jpg`,
                items: [
                  "Your first real ocean dive at a calm, beginner-friendly site",
                  "Take it slowly and enjoy the experience",
                  "Your instructor stays close and guides you step by step",
                  "Finish the day feeling confident and proud",
                ],
              },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#006994]">{p.part}</span>
                  <h3 className="font-black text-xl mt-1 mb-4">{p.title}</h3>
                  <ul className="space-y-2">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[#44c5c3] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Basic Diver FAQs */}
          <div className="mt-14">
            <h3 className="text-2xl font-black tracking-tighter mb-6 text-center">Basic Diver — Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-2">
              {basicDiverFAQs.map((faq, i) => (
                <AccordionItem key={i} value={`bd-${i}`} className="border border-border rounded-xl px-4">
                  <AccordionTrigger className="font-semibold text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Hostel Perk Banner */}
      <section className="bg-[#006994] py-10 text-white text-center">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ThumbsUp className="w-6 h-6 text-[#44c5c3]" />
            <h2 className="text-xl md:text-2xl font-black tracking-tight">Exclusive Diver Perk</h2>
          </div>
          <p className="text-white/90 text-lg">All divers get <strong>20% off food and drinks</strong> at our partner hostel.</p>
        </div>
      </section>

      {/* Available On */}
      <section className="bg-slate-50 border-y border-border py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter">Available On These Trips</h2>
            <p className="text-muted-foreground">Add this to your trip after booking. Just let your Trip Manager know.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#ee2f6d] hover:bg-[#d42860] text-white font-bold rounded-xl h-12 px-6"
              >
                <Link href="/tour/thailand-island-hopper">
                  Thailand Island Hopper <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#006994] hover:bg-[#005a7a] text-white font-bold rounded-xl h-12 px-6"
              >
                <Link href="/tour/bali-island-hopper">
                  Bali Island Hopper <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Got questions?</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Reach out to a Trip Manager and we will get you sorted.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#44c5c3] hover:bg-[#3ab5b3] text-slate-900 font-bold rounded-xl h-12 px-8"
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
