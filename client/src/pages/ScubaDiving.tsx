import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Waves } from "lucide-react";

export default function ScubaDiving() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[500px] flex items-end overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006994] via-[#0099cc] to-[#44c5c3] opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Waves className="w-96 h-96 text-white" />
        </div>
        <div className="relative z-10 container pb-14 pt-32 md:pb-20">
          <div className="max-w-2xl">
            <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase mb-3">Optional Add-On</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none mb-4">
              Scuba Diving
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl">
              More details coming soon. Available on Thailand Island Hopper and Bali Island Hopper trips.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <p className="text-[#44c5c3] font-bold tracking-widest text-sm uppercase">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Choose Your Level</h2>
              <p className="text-muted-foreground text-lg">
                Available on Thailand Island Hopper and Bali Island Hopper trips only.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Diver */}
              <div className="border-2 border-border rounded-2xl p-8 space-y-4 hover:border-[#44c5c3] transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#44c5c3]/10 flex items-center justify-center">
                  <Waves className="w-6 h-6 text-[#44c5c3]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Basic Diver</h3>
                  <p className="text-muted-foreground mt-1">A taster session for first-timers</p>
                </div>
                <div className="text-4xl font-black text-[#44c5c3]">£100</div>
                <p className="text-muted-foreground text-sm">
                  More details coming soon.
                </p>
              </div>

              {/* Open Water */}
              <div className="border-2 border-[#ee2f6d] rounded-2xl p-8 space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-[#ee2f6d] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
                <div className="w-12 h-12 rounded-full bg-[#ee2f6d]/10 flex items-center justify-center">
                  <Waves className="w-6 h-6 text-[#ee2f6d]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Open Water</h3>
                  <p className="text-muted-foreground mt-1">Full PADI Open Water certification</p>
                </div>
                <div className="text-4xl font-black text-[#ee2f6d]">£350</div>
                <p className="text-muted-foreground text-sm">
                  More details coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available On */}
      <section className="bg-slate-50 border-y border-border py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter">Available On These Trips</h2>
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
