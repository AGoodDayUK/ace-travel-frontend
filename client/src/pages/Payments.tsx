import { useState } from "react";
import { Link } from "wouter";
import {
  CreditCard, CheckCircle2, ChevronDown, ArrowRight,
  Calendar, Shield, RefreshCw, AlertCircle, Banknote, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "How do automatic payments work?",
    a: "When you sign up, you agree to a payment schedule. Payments are taken automatically on the agreed dates via the payment method you provided at sign-up. You'll receive a reminder email 3 days before each payment is due."
  },
  {
    q: "What if I want to pay in full?",
    a: "You can pay the full balance at any time by logging into your booking dashboard and selecting 'Pay in Full'. There are no extra charges for paying early — in fact, we love it!"
  },
  {
    q: "Can I make manual payments?",
    a: "Yes! You can log into your booking dashboard at any time and make a manual payment of any amount. This will reduce your remaining balance and future automatic payments will be recalculated accordingly."
  },
  {
    q: "What happens if a payment fails?",
    a: "If a payment fails, we'll notify you by email and give you 5 days to update your payment details or make a manual payment. If the payment remains outstanding after 5 days, your booking may be suspended."
  },
  {
    q: "Can I change my payment date?",
    a: "Yes — contact us via Instagram DM or email and we'll do our best to accommodate a change. We ask for at least 5 working days' notice before your next scheduled payment."
  },
  {
    q: "Is my payment secure?",
    a: "Absolutely. All payments are processed through our secure booking platform using industry-standard SSL encryption. We never store your full card details."
  },
  {
    q: "When is the final payment due?",
    a: "Your final payment must be made no later than 4 weeks before your departure date. If you book within 4 weeks of departure, the full balance is due at the time of booking."
  },
  {
    q: "What currencies do you accept?",
    a: "All payments are processed in GBP (£). If you're paying from a Euro account, your bank will apply their standard exchange rate. We're working on native EUR payment support — watch this space!"
  }
];

export default function Payments() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1040] via-[#2d1b69] to-[#1a1040] py-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#ee2f6d]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#44c5c3]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
            <CreditCard className="w-4 h-4 text-[#44c5c3]" />
            Flexible payment options
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Pay Your Way
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Spread the cost of your adventure with our flexible payment plans. Secure your spot for just £60 and pay the rest in monthly instalments.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">How Payments Work</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">Simple, transparent, and stress-free. Here's everything you need to know.</p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: CreditCard,
                colour: "bg-[#ee2f6d]",
                title: "Secure your spot for £60",
                desc: "Pay a small deposit to lock in your place. This is non-refundable but gets you in the group immediately."
              },
              {
                icon: Calendar,
                colour: "bg-[#44c5c3]",
                title: "Spread the rest monthly",
                desc: "Your remaining balance is split into equal monthly payments, automatically taken on the same date each month."
              },
              {
                icon: CheckCircle2,
                colour: "bg-purple-500",
                title: "Full balance 4 weeks before",
                desc: "Your final payment must be complete 4 weeks before departure. Then you're all set — just pack your bags!"
              }
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className={`w-12 h-12 ${step.colour} rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment options */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Payment Options</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">Choose the option that works best for you.</p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: RefreshCw,
                colour: "text-[#ee2f6d]",
                bg: "bg-[#ee2f6d]/10",
                title: "Automatic Payments",
                badge: "Most popular",
                badgeBg: "bg-[#ee2f6d] text-white",
                points: [
                  "Set it and forget it",
                  "Payments taken automatically each month",
                  "Email reminder 3 days before",
                  "Adjust or pause anytime via dashboard"
                ]
              },
              {
                icon: Banknote,
                colour: "text-[#44c5c3]",
                bg: "bg-[#44c5c3]/10",
                title: "Pay In Full",
                badge: "Best value",
                badgeBg: "bg-[#44c5c3] text-white",
                points: [
                  "Pay everything upfront",
                  "No monthly admin",
                  "Instant confirmation",
                  "No extra charges"
                ]
              },
              {
                icon: Smartphone,
                colour: "text-purple-500",
                bg: "bg-purple-500/10",
                title: "Manual Payments",
                badge: "Most flexible",
                badgeBg: "bg-purple-500 text-white",
                points: [
                  "Pay whenever you like",
                  "Any amount, any time",
                  "Log in to your dashboard",
                  "Balance updates instantly"
                ]
              }
            ].map((opt, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${opt.bg} rounded-xl flex items-center justify-center`}>
                    <opt.icon className={`w-6 h-6 ${opt.colour}`} />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${opt.badgeBg}`}>{opt.badge}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{opt.title}</h3>
                <ul className="space-y-2 flex-1">
                  {opt.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className={`w-4 h-4 ${opt.colour} flex-shrink-0 mt-0.5`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Shield, title: "Secure payments", desc: "SSL-encrypted checkout. We never store your full card details." },
              { icon: AlertCircle, title: "No hidden fees", desc: "The price you see is the price you pay. No booking fees, no surprises." },
              { icon: RefreshCw, title: "Flexible plans", desc: "Life happens. Contact us and we'll work with you on your payment schedule." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-[#1a1040]/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#1a1040]" />
                </div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">Payment FAQs</h2>
          <p className="text-center text-gray-500 mb-10">Got questions? We've got answers.</p>

          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-[#ee2f6d] transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180 text-[#ee2f6d]" : "text-gray-400"}`} />
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
      <section className="py-16 px-4 bg-gradient-to-br from-[#1a1040] to-[#2d1b69]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Secure Your Spot?</h2>
          <p className="text-white/70 mb-8">Start your adventure for just £60. The rest can wait.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#ee2f6d] hover:bg-[#ee2f6d]/90 text-white font-bold px-8 py-3 rounded-xl h-auto">
                Book Now — £60 deposit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Link href="/tours">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3 rounded-xl h-auto bg-transparent">
                View Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
