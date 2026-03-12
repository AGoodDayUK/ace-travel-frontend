import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle2, Heart } from "lucide-react";

const TOUR_DATA: Record<string, {
  name: string;
  destination: string;
  tagline: string;
  emoji: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  pdfUrl: string;
  tripManagers: { name: string; phone: string }[];
  startingHostel?: string;
  currency?: string;
}> = {
  "bali-explorer": {
    name: "Bali Explorer",
    destination: "Bali, Indonesia",
    tagline: "Temples, rice terraces, surf, and sunsets — your Bali adventure starts now.",
    emoji: "🌴",
    color: "teal",
    gradientFrom: "#0d9488",
    gradientTo: "#0891b2",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/iKqTUBOcTnvdymBh.pdf",
    tripManagers: [
      { name: "Ruby", phone: "+44 7983 798257" },
      { name: "Jay", phone: "+44 7938 411298" },
    ],
  },
  "bali-island-hopper": {
    name: "Bali Island Hopper",
    destination: "Bali & the Gili Islands",
    tagline: "Bali's best bits plus paradise islands — the ultimate island-hopping adventure.",
    emoji: "🏝️",
    color: "cyan",
    gradientFrom: "#0891b2",
    gradientTo: "#7c3aed",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/DdUdSYxjQRGqzgHD.pdf",
    tripManagers: [
      { name: "Ruby", phone: "+44 7983 798257" },
      { name: "Jay", phone: "+44 7938 411298" },
    ],
  },
  "thailand-intro": {
    name: "Thailand Intro",
    destination: "Thailand",
    tagline: "Street food, temples, islands, and the best group of people you'll ever meet.",
    emoji: "🐘",
    color: "pink",
    gradientFrom: "#ec4899",
    gradientTo: "#f97316",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/wfVKtKAqoXHGoTuF.pdf",
    tripManagers: [
      { name: "Ruby", phone: "+44 7983 798257" },
      { name: "Jay", phone: "+44 7938 411298" },
    ],
  },
  "thailand-island-hopper": {
    name: "Thailand Island Hopper",
    destination: "Thailand",
    tagline: "Island-hop through Thailand's most stunning archipelagos with your new best mates.",
    emoji: "⛵",
    color: "violet",
    gradientFrom: "#7c3aed",
    gradientTo: "#ec4899",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/wWHgZxzyuPBONMxC.pdf",
    tripManagers: [
      { name: "Ruby", phone: "+44 7983 798257" },
      { name: "Jay", phone: "+44 7938 411298" },
    ],
  },
  "philippines": {
    name: "Philippines Paradise",
    destination: "Philippines",
    tagline: "Crystal waters, white sand beaches, and hidden lagoons — the Philippines is waiting.",
    emoji: "🌊",
    color: "blue",
    gradientFrom: "#2563eb",
    gradientTo: "#0d9488",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/QVRUaFamWprmvmJS.pdf",
    tripManagers: [
      { name: "Ruby", phone: "+44 7983 798257" },
      { name: "Jay", phone: "+44 7938 411298" },
    ],
  },
};

export default function TourWelcome() {
  const params = useParams<{ tour: string }>();
  const tour = TOUR_DATA[params.tour ?? ""];

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome page not found</h1>
          <p className="text-slate-500">Please check the link you were sent.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      {/* Hero */}
      <div
        className="relative overflow-hidden py-20 px-6 text-white text-center"
        style={{ background: `linear-gradient(135deg, ${tour.gradientFrom}, ${tour.gradientTo})` }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10 bg-white" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* ACE Logo */}
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ace-logo-white.png"
            alt="ACE Travel Experiences"
            className="h-10 mx-auto mb-6 opacity-90"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="text-6xl mb-4">{tour.emoji}</div>
          <p className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-2">
            Welcome to the ACE Family
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {tour.name}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            {tour.tagline}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        {/* Welcome message */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <Heart className="w-8 h-8 mx-auto mb-4 text-pink-500" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">You're officially part of the crew!</h2>
          <p className="text-slate-600 leading-relaxed text-base">
            We are absolutely buzzing to have you joining us on the <strong>{tour.name}</strong> to <strong>{tour.destination}</strong>.
            You're about to experience something truly special — incredible places, amazing people, and memories that'll last a lifetime.
            Your Trip Manager will be in touch soon with everything you need to know.
          </p>
        </div>

        {/* Download welcome pack */}
        <div
          className="rounded-2xl p-8 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${tour.gradientFrom}, ${tour.gradientTo})` }}
        >
          <Download className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-2">Your Welcome Pack</h2>
          <p className="text-white/85 mb-6 max-w-md mx-auto">
            Everything you need to know before you fly — arrival instructions, packing list, emergency contacts, and more.
          </p>
          <a
            href={tour.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-white/90 font-bold text-base px-8 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Welcome Pack (PDF)
            </Button>
          </a>
        </div>

        {/* What to expect */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-teal-500" />
            What happens next
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Check your messages",
                desc: "Your Trip Manager will reach out via WhatsApp or Instagram to introduce themselves and add you to your group chat.",
              },
              {
                step: "2",
                title: "Read your welcome pack",
                desc: "Download the PDF above — it covers arrival instructions, what to pack, airport transfers, and emergency contacts.",
              },
              {
                step: "3",
                title: "Sort your flights",
                desc: "Once you have your flight details, send them to your Trip Manager so your airport transfer can be arranged.",
              },
              {
                step: "4",
                title: "Get excited",
                desc: "That's genuinely it. We handle the rest. Just show up ready for the best trip of your life.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5"
                  style={{ background: tour.gradientFrom }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency contacts */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Phone className="w-6 h-6 text-pink-500" />
            Emergency Contacts
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Available 24/7. WhatsApp is recommended as it's free of charge.
          </p>
          <div className="space-y-3">
            {tour.tripManagers.map((manager) => (
              <div key={manager.name} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Trip Manager: {manager.name}</p>
                  <p className="text-slate-500 text-sm">{manager.phone}</p>
                </div>
                <a
                  href={`https://wa.me/${manager.phone.replace(/\s+/g, "").replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 hover:bg-green-100 transition-colors px-3 py-1.5 rounded-lg"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            ))}
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Home Office</p>
                <p className="text-slate-500 text-sm">+44 20 39240332</p>
              </div>
              <a
                href="tel:+442039240332"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1.5 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </a>
            </div>
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Email</p>
                <p className="text-slate-500 text-sm">admin@acetravelexperiences.com</p>
              </div>
              <a
                href="mailto:admin@acetravelexperiences.com"
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors px-3 py-1.5 rounded-lg"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex items-center gap-4">
          <MapPin className="w-8 h-8 flex-shrink-0 text-teal-500" />
          <div>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Your destination</p>
            <p className="text-xl font-bold text-slate-800">{tour.destination}</p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 text-sm pb-8">
          This page is private and just for you. Welcome to the ACE family — we can't wait to meet you.
        </p>
      </div>
    </div>
  );
}
