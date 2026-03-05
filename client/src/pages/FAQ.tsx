import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: "About ACE Travel Experiences",
      questions: [
        {
          q: "Who are ACE Travel Experiences?",
          a: "ACE Travel Experiences (ATE) is a UK-based group travel company offering curated trips to Thailand, Bali and The Philippines for 18-35 year olds."
        },
        {
          q: "What makes ATE different from other tour companies?",
          a: "We offer super social groups, flexible free time combined with organised activities, a UK-based support team, local guides and trip managers on every tour, and a focus on affordability for young travellers."
        },
        {
          q: "Is this like a party tour or a chill tour?",
          a: "A mix of both! Our tours are designed to give you the best of everything. There are lively social nights and beach parties, but also peaceful cultural experiences, nature adventures, and plenty of free time to explore at your own pace."
        },
        {
          q: "Will I make friends?",
          a: "Yes, absolutely. Our tours create a family atmosphere for likeminded travellers to bond over bucket list experiences."
        },
        {
          q: "What if I get homesick?",
          a: "Our trained trip managers are always on hand to specifically support the guests on each tour."
        },
        {
          q: "Can I arrive early or stay after?",
          a: "Yes, we will help you plan! Speak to one of our trip managers to get some advice."
        },
        {
          q: "Is Wi-Fi good?",
          a: "Yes, plus cheap discounted e-SIMs with our partner, Saily E-SIMs."
        },
        {
          q: "How much do drinks cost?",
          a: "Depends on different bars in each location, but always cheaper than Europe!"
        }
      ]
    },
    {
      category: "Payments & Booking",
      questions: [
        {
          q: "How much do I need to pay to secure my place?",
          a: "Just a £60 deposit to secure your spot."
        },
        {
          q: "When do I need to pay the rest?",
          a: "Flexible payment plans are available up to 6 weeks before departure."
        },
        {
          q: "Is the £60 deposit refundable?",
          a: "No, but it is transferable to another date."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept card, bank transfer, Wise and Revolut."
        }
      ]
    },
    {
      category: "Flights",
      questions: [
        {
          q: "Are flights included?",
          a: "No, flights are booked separately so that you can travel from anywhere!"
        },
        {
          q: "Will you help me find flights?",
          a: "Yes absolutely! We provide dedicated flight support to each and every one of our customers."
        },
        {
          q: "What airport should I fly into?",
          a: "It depends on which tour you choose. Our team can let you know once you have chosen your dream trip!"
        },
        {
          q: "How much will my flights cost?",
          a: "It depends on which tour you choose. Our team can give you an estimate for costs to each location."
        }
      ]
    },
    {
      category: "Visas",
      questions: [
        {
          q: "Do I need a visa?",
          a: "Thailand is usually visa-free for UK/Ireland travellers for up to 60 days. For Bali, an e-VOA is available on arrival or can be completed before travel. We send step-by-step instructions before departure."
        }
      ]
    },
    {
      category: "Packing",
      questions: [
        {
          q: "Should I bring a backpack or a suitcase?",
          a: "We recommend a backpack between 40-60L. Suitcases are allowed but for some accommodations they will not fit into the lockers."
        },
        {
          q: "What should I pack?",
          a: "We'll send you a full packing list of required, recommended and optional items once you've signed up."
        }
      ]
    },
    {
      category: "Accommodation",
      questions: [
        {
          q: "What type of accommodation is included?",
          a: "A mix of social hostels, boutique hotels and beach resorts."
        },
        {
          q: "Can I get a private room?",
          a: "Yes, upgrade options are available."
        },
        {
          q: "Will I share with strangers?",
          a: "Yes, unless you book a private upgrade. Groups are mixed genders unless requested."
        }
      ]
    },
    {
      category: "Group & Age",
      questions: [
        {
          q: "What's the age range?",
          a: "18-35 years old."
        },
        {
          q: "Can friends or couples join?",
          a: "Yes, and we can room you together."
        },
        {
          q: "Can I join solo?",
          a: "Absolutely! Most of our travellers come solo."
        }
      ]
    },
    {
      category: "Before Departure",
      questions: [
        {
          q: "Will I meet my group before the trip?",
          a: "Yes, you'll be added to a WhatsApp group and there will be an onboarding call with your trip manager before departure."
        },
        {
          q: "Do I need vaccines?",
          a: "It depends on your travel history. We advise checking the NHS website or speaking to your GP. No vaccines are required to join our trips."
        }
      ]
    },
    {
      category: "Safety",
      questions: [
        {
          q: "Is it safe?",
          a: "Yes absolutely! Our trip managers live in these destinations and provide guidance, and we have curated safe journeys and activities for each tour."
        },
        {
          q: "Do I need travel insurance?",
          a: "Yes, travel insurance is mandatory for all guests. We also provide business insurance through ACE, as well as through our local travel partners."
        }
      ]
    },
    {
      category: "Sustainability",
      questions: [
        {
          q: "How is ATE sustainable?",
          a: "We visit responsible elephant sanctuaries, partner with local travel companies to support local businesses, and help keep beaches and oceans clean with litter picks."
        }
      ]
    },
    {
      category: "Thailand Island Hopper",
      questions: [
        {
          q: "Which airport do I fly into?",
          a: "Fly into Phuket."
        },
        {
          q: "Where does the tour start and end?",
          a: "The tour starts in Phuket with airport pickup included, and finishes in Phuket Old Town with airport drop-off included."
        },
        {
          q: "What islands will we visit?",
          a: "Phuket, Phi Phi, Khao Sok, Koh Samui, Koh Tao and Koh Phangan."
        },
        {
          q: "Is diving included?",
          a: "Diving is optional. We partner with exemplary dive shops like Echo Divers in Koh Tao."
        },
        {
          q: "Is the Full Moon Party included?",
          a: "Not included, but an accommodation package can be added on to the end of some tours as a self-guided part of your trip."
        },
        {
          q: "How much spending money do I need?",
          a: "Around £600-800 depending on your food and drink spend."
        },
        {
          q: "Is there free time?",
          a: "Yes, plenty! Our trips are designed with free time for you to explore Thailand and learn how to travel along the way. Our local guides and trip managers give you the tools, skills, empowerment and confidence to explore in your own time."
        },
        {
          q: "Are scooters allowed?",
          a: "No, scooter hire is not allowed."
        }
      ]
    },
    {
      category: "Bali Island Hopper",
      questions: [
        {
          q: "Which airport do I fly into?",
          a: "Fly into Denpasar (DPS)."
        },
        {
          q: "Where does the tour start and end?",
          a: "The tour starts in Kuta with airport pickup included, and finishes in Kuta with airport drop-off included."
        },
        {
          q: "What islands do we visit?",
          a: "Bali mainland, Nusa Lembongan, Nusa Penida, Lombok and the Gili Islands."
        },
        {
          q: "Is fast boat included?",
          a: "Yes, fast boat transfers are included."
        },
        {
          q: "Is scuba diving available?",
          a: "Diving is optional. We partner with exemplary dive shops like Meno Divers in Gili Meno."
        },
        {
          q: "Are scooters allowed?",
          a: "No, scooter hire is not allowed."
        }
      ]
    },
    {
      category: "Bali Explorer",
      questions: [
        {
          q: "Which airport do I fly into?",
          a: "Fly into Denpasar (DPS)."
        },
        {
          q: "Where does the tour start and end?",
          a: "The tour starts in Canggu with airport pickup included, and finishes in Uluwatu with airport drop-off included."
        },
        {
          q: "What places do we visit?",
          a: "Canggu, Ubud, Nusa Lembongan and Uluwatu."
        },
        {
          q: "Is the Mount Batur hike included?",
          a: "Yes, a sunrise hike up Mount Batur is included."
        },
        {
          q: "Do we visit rice terraces?",
          a: "Yes, we visit the famous Tegallalang rice terraces."
        },
        {
          q: "Is yoga included?",
          a: "Yes, our partner hostel in Ubud provides morning yoga sessions."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap((cat, catIndex) =>
    cat.questions.map((q, qIndex) => ({
      ...q,
      category: cat.category,
      globalIndex: catIndex * 100 + qIndex
    }))
  );

  const filteredQuestions = searchQuery
    ? allQuestions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allQuestions;

  return (
    <div className="animate-fade-in">
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Everything you need to know about booking and travelling with ACE
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2"
            />
          </div>

          {searchQuery ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? "s" : ""}
              </p>
              {filteredQuestions.map((item) => (
                <Card key={item.globalIndex} className="border-2 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === item.globalIndex ? null : item.globalIndex)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="text-xs text-primary font-semibold uppercase tracking-wide">{item.category}</div>
                      <h3 className="text-lg font-bold">{item.q}</h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        openIndex === item.globalIndex ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === item.globalIndex && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {faqCategories.map((category, catIndex) => (
                <div key={category.category} className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight border-b pb-3">{category.category}</h2>
                  <div className="space-y-3">
                    {category.questions.map((item, qIndex) => {
                      const globalIndex = catIndex * 100 + qIndex;
                      return (
                        <Card key={globalIndex} className="border overflow-hidden">
                          <button
                            onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                            className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
                          >
                            <h3 className="text-base font-semibold flex-1">{item.q}</h3>
                            <ChevronDown
                              className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform ${
                                openIndex === globalIndex ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openIndex === globalIndex && (
                            <div className="px-5 pb-5">
                              <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-muted py-16">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">Still have questions?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Our team is happy to help. Drop us an email and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:admin@acetravelexperiences.com"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
}
