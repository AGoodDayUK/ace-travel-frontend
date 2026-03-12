import { useState } from "react";
import { Link } from "wouter";
import {
  Plane, ChevronDown, ArrowRight, MapPin, Clock, Search,
  MessageCircle, AlertCircle, CheckCircle2, Globe, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";

const flightInfo = [
  {
    tour: "Thailand Island Hopper",
    flag: "🇹🇭",
    colour: "bg-[#ee2f6d]",
    fly: "Into Phuket (HKT)",
    flyOut: "Out of Phuket (HKT)",
    notes: "Fly into Phuket International Airport. The tour starts and ends in Phuket, so a return flight is straightforward. Check for direct routes from London Heathrow, Gatwick, or Manchester."
  },
  {
    tour: "Thailand Intro",
    flag: "🇹🇭",
    colour: "bg-purple-500",
    fly: "Into Bangkok (BKK / DMK)",
    flyOut: "Out of Phuket (HKT)",
    notes: "This tour starts in Bangkok and ends in Phuket, so you'll need an open-jaw ticket (fly in to one city, out of another). This is very common and usually no more expensive than a return."
  },
  {
    tour: "Bali Explorer",
    flag: "🇮🇩",
    colour: "bg-[#44c5c3]",
    fly: "Into Bali / Denpasar (DPS)",
    flyOut: "Out of Bali / Denpasar (DPS)",
    notes: "Fly into Ngurah Rai International Airport (DPS). Return flights are straightforward. Look for routes via Singapore (SIN), Kuala Lumpur (KUL), or Dubai (DXB)."
  },
  {
    tour: "Bali Island Hopper",
    flag: "🇮🇩",
    colour: "bg-emerald-500",
    fly: "Into Bali / Denpasar (DPS)",
    flyOut: "Out of Bali / Denpasar (DPS)",
    notes: "Same airport as Bali Explorer. The island hopping is all arranged by ACE — you just need to get to and from Bali."
  },
  {
    tour: "Philippines Paradise",
    flag: "🇵🇭",
    colour: "bg-orange-500",
    fly: "Into Cebu (CEB)",
    flyOut: "Out of Manila (MNL) or Cebu (CEB)",
    notes: "The Philippines tour typically starts in Cebu. You may fly out of Manila or Cebu depending on your itinerary — we'll confirm this once you're booked. Look for routes via Manila (MNL) or Hong Kong (HKG)."
  }
];

const tips = [
  {
    icon: Search,
    title: "Use Skyscanner or Google Flights",
    desc: "Search for the best deals using flexible date views. Flying mid-week (Tuesday/Wednesday) is often cheaper than weekends."
  },
  {
    icon: Calendar,
    title: "Book early for the best prices",
    desc: "Flights to Southeast Asia typically get cheaper when booked 3–6 months in advance. Don't leave it too late!"
  },
  {
    icon: Globe,
    title: "Consider open-jaw tickets",
    desc: "For Thailand Intro, you'll fly into Bangkok and out of Phuket. Open-jaw tickets are flexible and often no more expensive."
  },
  {
    icon: Clock,
    title: "Allow time for transfers",
    desc: "Build in at least 3 hours for international connections, and arrive at your destination airport at least 2 hours before your tour start time."
  },
  {
    icon: AlertCircle,
    title: "Check baggage allowances",
    desc: "Budget airlines like AirAsia and Scoot have strict baggage policies. Make sure you have enough allowance for your luggage."
  },
  {
    icon: CheckCircle2,
    title: "Share your flight details with us",
    desc: "Once you've booked your flights, share your arrival details with your Trip Manager so we can arrange your airport transfer."
  }
];

const faqs = [
  {
    q: "Do you book flights for me?",
    a: "We don't book flights on your behalf, but we're here to help you find the right ones. Once you're booked on a tour, your Trip Manager will send you a Flight Support Document with all the details you need — airports, recommended airlines, and timing advice."
  },
  {
    q: "What's a Flight Support Document?",
    a: "After you sign up, you'll receive a personalised Flight Support Document as part of your Welcome Pack. It covers exactly which airports to fly into and out of, recommended airlines, typical flight times, and tips for your specific tour."
  },
  {
    q: "Can I arrive early or stay after the tour?",
    a: "Absolutely! Many of our travellers extend their trip. Let your Trip Manager know and they'll help you plan extra time before or after the tour. Just make sure your flights align with the tour start and end dates."
  },
  {
    q: "What if my flight is delayed?",
    a: "Don't panic — contact your Trip Manager immediately via WhatsApp. We'll do everything we can to accommodate delays and make sure you don't miss out on the start of your adventure."
  },
  {
    q: "Do I need a visa?",
    a: "Visa requirements depend on your nationality and destination. UK passport holders typically get visa-on-arrival or visa-free access to Thailand, Bali, and the Philippines. We'll include visa guidance in your Flight Support Document, but always check the official government travel advice for your country."
  },
  {
    q: "Which airlines do you recommend?",
    a: "For Thailand: British Airways, Emirates, Qatar Airways, and Thai Airways offer great direct or one-stop options from the UK. For Bali: Singapore Airlines, Cathay Pacific, and KLM are popular. For the Philippines: Cathay Pacific and Emirates via Hong Kong or Dubai work well."
  }
];

export default function FlightSupport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] py-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#44c5c3]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#ee2f6d]/20 rounded-full blur-3xl" />
          {/* Decorative plane path */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 400" fill="none">
            <path d="M0 300 Q200 100 400 200 Q600 300 800 100" stroke="white" strokeWidth="2" strokeDasharray="8 8" fill="none" />
          </svg>
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
            <Plane className="w-4 h-4 text-[#44c5c3]" />
            We've got your back
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Flight Support
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            We don't book your flights, but we make sure you know exactly where to fly, when to arrive, and what to expect. Your Trip Manager is always on hand to help.
          </p>
        </div>
      </section>

      {/* Flight info per tour */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Where to Fly</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Each tour has specific airports. Here's a quick guide — your Flight Support Document will have full details.
          </p>

          <div className="space-y-4">
            {flightInfo.map((info, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${info.colour} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {info.flag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-3">{info.tour}</h3>
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Plane className="w-3 h-3 text-green-600 rotate-[-45deg]" />
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs block">Fly in</span>
                          <span className="font-semibold text-gray-800">{info.fly}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Plane className="w-3 h-3 text-blue-600 rotate-[45deg]" />
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs block">Fly out</span>
                          <span className="font-semibold text-gray-800">{info.flyOut}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{info.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Flight Booking Tips</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">Our top tips for finding the best flights at the best prices.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-[#1a1040]/10 rounded-xl flex items-center justify-center mb-4">
                  <tip.icon className="w-5 h-5 text-[#1a1040]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{tip.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flight Support Document callout */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#44c5c3]/10 to-[#ee2f6d]/10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 bg-[#44c5c3]/15 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-8 h-8 text-[#44c5c3]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-gray-900 mb-2">Your Flight Support Document</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Once you've signed up, you'll receive a personalised Flight Support Document as part of your Welcome Pack. It includes exact airports, recommended airlines, timing advice, and transfer details specific to your tour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Flight FAQs</h2>
          <p className="text-center text-gray-500 mb-10">Everything you need to know about getting there.</p>

          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-[#44c5c3] transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180 text-[#44c5c3]" : "text-gray-400"}`} />
                </button>
                {openIndex === i && (
                  <div className="pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Still have questions?</h2>
          <p className="text-white/70 mb-8">Our team is always happy to help. Drop us a message on Instagram or email us directly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.instagram.com/acetravelexperiences/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#ee2f6d] hover:bg-[#ee2f6d]/90 text-white font-bold px-8 py-3 rounded-xl h-auto">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Us on Instagram
              </Button>
            </a>
            <Link href="/tours">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3 rounded-xl h-auto bg-transparent">
                View Tours
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
