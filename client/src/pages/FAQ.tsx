import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  Search, ChevronDown, MessageCircle, Plane, CreditCard, Backpack,
  Hotel, Users, Compass, Shield, MapPin, Star, ArrowRight
} from "lucide-react";

const categoryConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "About ACE Travel Experiences": { icon: Star, color: "text-[#ee2f6d]", bg: "bg-[#ee2f6d]/10" },
  "Payments & Booking": { icon: CreditCard, color: "text-[#44c5c3]", bg: "bg-[#44c5c3]/10" },
  "Flights": { icon: Plane, color: "text-purple-500", bg: "bg-purple-500/10" },
  "Visas": { icon: Compass, color: "text-orange-500", bg: "bg-orange-500/10" },
  "Packing": { icon: Backpack, color: "text-blue-500", bg: "bg-blue-500/10" },
  "Accommodation": { icon: Hotel, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  "Group & Age": { icon: Users, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  "Before Departure": { icon: MessageCircle, color: "text-pink-400", bg: "bg-pink-400/10" },
  "Safety": { icon: Shield, color: "text-red-500", bg: "bg-red-500/10" },
  "Thailand Island Hopper": { icon: MapPin, color: "text-[#ee2f6d]", bg: "bg-[#ee2f6d]/10" },
  "Bali Island Hopper": { icon: MapPin, color: "text-[#44c5c3]", bg: "bg-[#44c5c3]/10" },
  "Bali Explorer": { icon: MapPin, color: "text-emerald-500", bg: "bg-emerald-500/10" },
};

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: cmsFaqs } = trpc.cms.faqs.listPublic.useQuery();

  // Build categories from CMS data, falling back to hardcoded data
  const buildCmsCategories = () => {
    if (!cmsFaqs || cmsFaqs.length === 0) return null;
    const grouped: Record<string, { q: string; a: string }[]> = {};
    for (const faq of cmsFaqs) {
      const cat = faq.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ q: faq.question, a: faq.answer });
    }
    return Object.entries(grouped).map(([category, questions]) => ({ category, questions }));
  };

  const cmsCategories = buildCmsCategories();

  const faqCategoriesHardcoded = [
    {
      category: "About ACE Travel Experiences",
      questions: [
        { q: "Who are ACE Travel Experiences?", a: "ACE Travel Experiences is a UK-based group travel company offering curated trips to Thailand, Bali and The Philippines for 18-35 year olds." },
        { q: "What makes ACE different from other tour companies?", a: "We offer super social groups, flexible free time combined with organised activities, a UK-based support team, local guides and trip managers on every tour, and a focus on affordability for young travellers." },
        { q: "Is this like a party tour or a chill tour?", a: "A mix of both! Our tours are designed to give you the best of everything. There are lively social nights and beach parties, but also peaceful cultural experiences, nature adventures, and plenty of free time to explore at your own pace." },
        { q: "Will I make friends?", a: "Yes, absolutely. Our tours create a family atmosphere for likeminded travellers to bond over bucket list experiences." },
        { q: "What if I get homesick?", a: "Our trained trip managers are always on hand to specifically support the guests on each tour." },
        { q: "Can I arrive early or stay after?", a: "Yes, we will help you plan! Speak to one of our trip managers to get some advice." },
        { q: "Is Wi-Fi good?", a: "Yes, plus cheap discounted e-SIMs with our partner, Saily E-SIMs." },
        { q: "How much do drinks cost?", a: "Depends on different bars in each location, but always cheaper than Europe!" }
      ]
    },
    {
      category: "Payments & Booking",
      questions: [
        { q: "How much do I need to pay to secure my place?", a: "Just a £60 deposit to secure your spot." },
        { q: "When do I need to pay the rest?", a: "Flexible payment plans are available up to 6 weeks before departure." },
        { q: "Is the £60 deposit refundable?", a: "No, but it is transferable to another date." },
        { q: "What payment methods do you accept?", a: "We accept card, bank transfer, Wise and Revolut." }
      ]
    },
    {
      category: "Flights",
      questions: [
        { q: "Are flights included?", a: "No, flights are booked separately so that you can travel from anywhere!" },
        { q: "Will you help me find flights?", a: "Yes absolutely! We provide dedicated flight support to each and every one of our customers." },
        { q: "What airport should I fly into?", a: "It depends on which tour you choose. Our team can let you know once you have chosen your dream trip!" },
        { q: "How much will my flights cost?", a: "It depends on which tour you choose. Our team can give you an estimate for costs to each location." }
      ]
    },
    {
      category: "Visas",
      questions: [
        { q: "Do I need a visa?", a: "Thailand is usually visa-free for UK/Ireland travellers for up to 60 days. For Bali, an e-VOA is available on arrival or can be completed before travel. We send step-by-step instructions before departure." }
      ]
    },
    {
      category: "Packing",
      questions: [
        { q: "Should I bring a backpack or a suitcase?", a: "We recommend a backpack between 40-60L. Suitcases are allowed but for some accommodations they will not fit into the lockers." },
        { q: "What should I pack?", a: "We'll send you a full packing list of required, recommended and optional items once you've signed up." }
      ]
    },
    {
      category: "Accommodation",
      questions: [
        { q: "What type of accommodation is included?", a: "A mix of social hostels, boutique hotels and beach resorts." },
        { q: "Can I get a private room?", a: "Yes, upgrade options are available." },
        { q: "Will I share with strangers?", a: "Yes, unless you book a private upgrade. Groups are mixed genders unless requested." }
      ]
    },
    {
      category: "Group & Age",
      questions: [
        { q: "What's the age range?", a: "18-35 years old." },
        { q: "Can friends or couples join?", a: "Yes, and we can room you together." },
        { q: "Can I join solo?", a: "Absolutely! Most of our travellers come solo." }
      ]
    },
    {
      category: "Before Departure",
      questions: [
        { q: "Will I meet my group before the trip?", a: "Yes, you'll be added to a WhatsApp group and there will be an onboarding call with your trip manager before departure." },
        { q: "Do I need vaccines?", a: "It depends on your travel history. We advise checking the NHS website or speaking to your GP. No vaccines are required to join our trips." }
      ]
    },
    {
      category: "Safety",
      questions: [
        { q: "Is it safe?", a: "Yes absolutely! Our trip managers live in these destinations and provide guidance, and we have curated safe journeys and activities for each tour." },
        { q: "Do I need travel insurance?", a: "Yes, travel insurance is mandatory for all guests. We also provide business insurance through ACE, as well as through our local travel partners." }
      ]
    },
    {
      category: "Thailand Island Hopper",
      questions: [
        { q: "Which airport do I fly into?", a: "Fly into Phuket." },
        { q: "Where does the tour start and end?", a: "The tour starts in Phuket with airport pickup included, and finishes in Phuket Old Town with airport drop-off included." },
        { q: "What islands will we visit?", a: "Phuket, Phi Phi, Khao Sok, Koh Samui, Koh Tao and Koh Phangan." },
        { q: "Is scuba diving available?", a: "Yes! Scuba diving is available as an optional add-on on the Thailand Island Hopper trip. We work with a certified local dive school in Koh Tao. You can choose between a Basic Diver taster session (£100) or a full PADI Open Water course (£350). See our Scuba Diving add-on page for full details." },
        { q: "Is the Full Moon Party included?", a: "Not included, but an accommodation package can be added on to the end of some tours as a self-guided part of your trip." },
        { q: "How much spending money do I need?", a: "Around £600-800 depending on your food and drink spend." },
        { q: "Is there free time?", a: "Yes, plenty! Our trips are designed with free time for you to explore Thailand and learn how to travel along the way. Our local guides and trip managers give you the tools, skills, empowerment and confidence to explore in your own time." },
        { q: "Are scooters allowed?", a: "No, scooter hire is not allowed." }
      ]
    },
    {
      category: "Bali Island Hopper",
      questions: [
        { q: "Which airport do I fly into?", a: "Fly into Denpasar (DPS)." },
        { q: "Where does the tour start and end?", a: "The tour starts in Kuta with airport pickup included, and finishes in Kuta with airport drop-off included." },
        { q: "What islands do we visit?", a: "Bali mainland, Nusa Lembongan, Nusa Penida, Lombok and the Gili Islands." },
        { q: "Is fast boat included?", a: "Yes, fast boat transfers are included." },
        { q: "Is scuba diving available?", a: "Yes! Scuba diving is available as an optional add-on on the Bali Island Hopper trip. We work with a certified local dive school in the Gili Islands. You can choose between a Basic Diver taster session (£100) or a full PADI Open Water course (£350). See our Scuba Diving add-on page for full details." },
        { q: "Are scooters allowed?", a: "No, scooter hire is not allowed." }
      ]
    },
    {
      category: "Bali Explorer",
      questions: [
        { q: "Which airport do I fly into?", a: "Fly into Denpasar (DPS)." },
        { q: "Where does the tour start and end?", a: "The tour starts in Canggu with airport pickup included, and finishes in Uluwatu with airport drop-off included." },
        { q: "What places do we visit?", a: "Canggu, Ubud, Nusa Lembongan and Uluwatu." },
        { q: "Is the Mount Batur hike included?", a: "Yes, a sunrise hike up Mount Batur is included." },
        { q: "Do we visit rice terraces?", a: "Yes, we visit the famous Tegallalang rice terraces." },
        { q: "Is yoga included?", a: "Yes, our partner hostel in Ubud provides morning yoga sessions." }
      ]
    }
  ];

  const faqCategories = cmsCategories ?? faqCategoriesHardcoded;

  const allQuestions = faqCategories.flatMap((cat, catIndex) =>
    cat.questions.map((q, qIndex) => ({
      ...q,
      category: cat.category,
      globalIndex: catIndex * 100 + qIndex
    }))
  );

  const filteredByCategory = activeCategory
    ? faqCategories.filter((c) => c.category === activeCategory)
    : faqCategories;

  const filteredQuestions = searchQuery
    ? allQuestions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ee2f6d] via-[#c0255a] to-[#44c5c3] py-20 md:py-28">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
        <div className="container relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium">
            <MessageCircle className="w-4 h-4" />
            Got questions? We've got answers.
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            FAQs
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need to know before booking your trip with ACE
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto mt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory(null); }}
              className="pl-12 h-14 text-base bg-white border-0 shadow-xl rounded-2xl focus-visible:ring-2 focus-visible:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <div className="bg-foreground text-background">
        <div className="container py-5">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: "£60", label: "Deposit to book" },
              { value: "4.9★", label: "Trustpilot rating" },
              { value: "800+", label: "Happy travellers" },
              { value: "18-35", label: "Age range" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[#ee2f6d]">{stat.value}</div>
                <div className="text-xs text-background/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Search results */}
          {searchQuery && filteredQuestions && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                {filteredQuestions.length} result{filteredQuestions.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="text-5xl">🤔</div>
                  <p className="text-lg font-semibold">No results found</p>
                  <p className="text-muted-foreground">Try different keywords or browse by category below</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-2">
                    Clear search
                  </Button>
                </div>
              ) : (
                filteredQuestions.map((item) => {
                  const cfg = categoryConfig[item.category] || { icon: MessageCircle, color: "text-primary", bg: "bg-primary/10" };
                  const Icon = cfg.icon;
                  return (
                    <FAQItem
                      key={item.globalIndex}
                      question={item.q}
                      answer={item.a}
                      isOpen={openIndex === item.globalIndex}
                      onToggle={() => setOpenIndex(openIndex === item.globalIndex ? null : item.globalIndex)}
                      categoryLabel={item.category}
                      icon={<Icon className={`w-4 h-4 ${cfg.color}`} />}
                      iconBg={cfg.bg}
                    />
                  );
                })
              )}
            </div>
          )}

          {/* Category browsing */}
          {!searchQuery && (
            <>
              {/* Category pill filters */}
              <div className="flex flex-wrap gap-2 mb-10">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                    activeCategory === null
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground border-border hover:border-foreground/40"
                  }`}
                >
                  All topics
                </button>
                {faqCategories.map((cat) => {
                  const cfg = categoryConfig[cat.category] || { icon: MessageCircle, color: "text-primary", bg: "bg-primary/10" };
                  const Icon = cfg.icon;
                  const isActive = activeCategory === cat.category;
                  return (
                    <button
                      key={cat.category}
                      onClick={() => setActiveCategory(isActive ? null : cat.category)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                        isActive
                          ? `${cfg.bg} border-current ${cfg.color}`
                          : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? cfg.color : ""}`} />
                      {cat.category}
                    </button>
                  );
                })}
              </div>

              {/* FAQ categories */}
              <div className="space-y-10">
                {filteredByCategory.map((category, catIndex) => {
                  const cfg = categoryConfig[category.category] || { icon: MessageCircle, color: "text-primary", bg: "bg-primary/10" };
                  const Icon = cfg.icon;
                  return (
                    <div key={category.category} className="space-y-3">
                      {/* Category header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${cfg.color}`} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">{category.category}</h2>
                        <div className="flex-1 h-px bg-border ml-2" />
                        <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-full">
                          {category.questions.length} Q{category.questions.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Questions */}
                      <div className="space-y-2">
                        {category.questions.map((item, qIndex) => {
                          const globalIndex = catIndex * 100 + qIndex;
                          return (
                            <FAQItem
                              key={globalIndex}
                              question={item.q}
                              answer={item.a}
                              isOpen={openIndex === globalIndex}
                              onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                              icon={<Icon className={`w-4 h-4 ${cfg.color}`} />}
                              iconBg={cfg.bg}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground to-foreground/90 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-8 text-8xl font-black text-white rotate-[-15deg]">?</div>
          <div className="absolute bottom-4 right-12 text-6xl font-black text-white rotate-[10deg]">?</div>
          <div className="absolute top-1/2 left-1/3 text-9xl font-black text-white rotate-[5deg]">?</div>
        </div>
        <div className="container relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-medium">
            <MessageCircle className="w-4 h-4" />
            Still not sure?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            We're always happy to help
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Drop us a message and our team will get back to you super quickly — usually within a few hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="bg-[#ee2f6d] hover:bg-[#ee2f6d]/90 text-white font-bold h-12 px-8 rounded-full shadow-lg shadow-[#ee2f6d]/30"
            >
              <Link href="/contact">
                Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <a
              href="mailto:admin@acetravelexperiences.com"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-base"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  categoryLabel,
  icon,
  iconBg,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  categoryLabel?: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div
      className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
        isOpen ? "border-primary/30 shadow-md shadow-primary/5" : "border-border hover:border-border/80"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 sm:p-5 text-left flex items-start gap-3 sm:gap-4 hover:bg-muted/30 transition-colors"
      >
        <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          {categoryLabel && (
            <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">{categoryLabel}</div>
          )}
          <h3 className="text-sm sm:text-base font-semibold leading-snug pr-2">{question}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 mt-0.5 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[3.25rem] sm:pl-[4.25rem]">
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{answer}</p>
        </div>
      )}
    </div>
  );
}
