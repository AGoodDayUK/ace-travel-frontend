import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      category: "Booking & Payments",
      questions: [
        {
          q: "How do I book a tour?",
          a: "Booking is simple! Choose your tour, select your departure date, and secure your spot with a £60 deposit. You can complete the booking online in just a few minutes. After booking, you'll receive a confirmation email with all the details and access to your tour WhatsApp group."
        },
        {
          q: "What are the payment options?",
          a: "We offer flexible payment plans to make travel accessible. Pay a £60 deposit to secure your spot, then spread the remaining balance over monthly installments. Final payment is due 60 days before departure. We accept all major credit and debit cards."
        },
        {
          q: "Can I get a refund if I need to cancel?",
          a: "Cancellation policies vary by tour and timing. If you cancel more than 60 days before departure, you'll receive a full refund minus the deposit. Cancellations within 60 days are subject to our standard cancellation fees. We strongly recommend purchasing travel insurance to protect your investment."
        },
        {
          q: "Is travel insurance included?",
          a: "Travel insurance is not included but is mandatory for all travellers. We can recommend trusted insurance providers that cover adventure activities, medical emergencies, and trip cancellations. Insurance typically costs between £40-80 depending on your tour length and coverage level."
        }
      ]
    },
    {
      category: "Travel Documents & Visas",
      questions: [
        {
          q: "Do I need a visa?",
          a: "Visa requirements depend on your nationality and destination. UK, EU, US, Canadian, and Australian citizens can enter Thailand, Indonesia (Bali), and the Philippines visa-free for tourism (30-60 days). We'll send you a detailed visa guide after booking with specific requirements for your nationality."
        },
        {
          q: "What documents do I need?",
          a: "You'll need a passport valid for at least 6 months from your travel date, proof of onward travel (return flight), and travel insurance documentation. Some countries may require proof of accommodation and sufficient funds. We provide a complete checklist after booking."
        },
        {
          q: "Do you help with visa applications?",
          a: "We provide comprehensive visa guidance and documentation support, but we don't process visa applications directly. Our team will send you step-by-step instructions, required documents lists, and links to official embassy websites."
        }
      ]
    },
    {
      category: "Accommodation & Meals",
      questions: [
        {
          q: "What type of accommodation is included?",
          a: "Accommodation varies by tour but typically includes a mix of hostels, beach bungalows, and unique stays like jungle lodges or floating bungalows. All accommodations are clean, safe, and chosen for their social atmosphere and location. You'll have private lockers and shared bathrooms in most hostels."
        },
        {
          q: "Are meals included?",
          a: "Most tours include daily breakfast and several group dinners (typically 8-12 meals depending on tour length). This gives you flexibility to explore local food on your own while ensuring you experience the best restaurants as a group. Meals are clearly listed in each tour itinerary."
        },
        {
          q: "Can you accommodate dietary requirements?",
          a: "Yes! We can accommodate vegetarian, vegan, gluten-free, and most dietary restrictions. Please inform us of any requirements when booking, and we'll ensure restaurants and group meals cater to your needs. Southeast Asia has excellent vegetarian and vegan options."
        }
      ]
    },
    {
      category: "Group & Solo Travel",
      questions: [
        {
          q: "What if I'm traveling solo?",
          a: "Most of our travellers join solo! That's the beauty of group travel. You'll be added to a WhatsApp group before departure to start connecting with your travel crew. Our trip managers facilitate introductions and group activities to help everyone bond quickly."
        },
        {
          q: "What's the typical group size?",
          a: "Groups range from 15-30 travellers, which is the perfect size for making friends while still being manageable. You'll have the flexibility to do activities with the whole group or break into smaller groups based on interests."
        },
        {
          q: "What's the age range?",
          a: "All our tours are designed for 18-35 year olds. The average age is typically 22-28, with a mix of gap year travellers, recent graduates, and young professionals taking career breaks."
        },
        {
          q: "Can I bring a friend?",
          a: "Absolutely! Many people travel with friends. You can request to share accommodation with your friend when booking. Group bookings of 4+ people also qualify for our group discount (£100 off per person)."
        }
      ]
    },
    {
      category: "Activities & Itinerary",
      questions: [
        {
          q: "Are all activities included?",
          a: "Most activities listed in the itinerary are included in the tour price. Optional activities (like scuba diving courses, spa treatments, or premium excursions) are available at an additional cost. Your trip manager will explain all options during the tour."
        },
        {
          q: "How much free time do I have?",
          a: "We balance structured group activities with free time for personal exploration. Typically, you'll have 2-3 organized activities per day with evenings and some afternoons free to relax, explore on your own, or join optional activities."
        },
        {
          q: "Can I skip activities?",
          a: "Yes, all activities are optional. If you'd prefer to relax at the beach or explore on your own instead of joining a group activity, that's completely fine. However, most activities are included in the price, so you're not saving money by skipping them."
        }
      ]
    },
    {
      category: "Flights & Transport",
      questions: [
        {
          q: "Are flights included?",
          a: "International flights to and from your home country are not included. However, all transport during the tour (buses, ferries, domestic flights) is included. We provide recommended flight options and can help with booking advice."
        },
        {
          q: "When should I book my flights?",
          a: "Book flights after your tour is confirmed (usually after final payment). We recommend arriving on Day 1 before 3pm for airport pickup. Depart any time on the final day or extend your stay. We'll send detailed flight booking guidance after you book."
        },
        {
          q: "Is airport pickup included?",
          a: "Yes! Airport pickup on Day 1 is included. We'll collect you from the airport and take you to the accommodation where you'll meet your group. Just send us your flight details at least 2 weeks before departure."
        }
      ]
    },
    {
      category: "Safety & Support",
      questions: [
        {
          q: "Is it safe to travel with ACE?",
          a: "Safety is our top priority. We have comprehensive travel protection, 24/7 emergency support, and our trip managers are trained in first aid. We only use vetted accommodation and transport providers, and we have comprehensive safety protocols for all activities."
        },
        {
          q: "What if I get sick or injured?",
          a: "Your trip manager will assist with medical care if needed. We have relationships with clinics and hospitals in all destinations. This is why travel insurance is mandatory. It covers medical treatment, emergency evacuation, and trip interruption."
        },
        {
          q: "Can I contact you during the tour?",
          a: "Yes! You'll have your trip manager's contact details, and we have a 24/7 emergency line for urgent situations. Your trip manager is with you throughout the tour and handles any issues that arise."
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
            Everything you need to know about booking and traveling with ACE
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
                Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}
              </p>
              {filteredQuestions.map((item) => (
                <Card
                  key={item.globalIndex}
                  className="border-2 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === item.globalIndex ? null : item.globalIndex)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-muted/50 transition-kinetic"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="text-xs text-primary font-medium">{item.category}</div>
                      <h3 className="text-lg font-bold">{item.q}</h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        openIndex === item.globalIndex ? 'rotate-180' : ''
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
                  <h2 className="text-3xl font-bold tracking-tight">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => {
                      const globalIndex = catIndex * 100 + qIndex;
                      return (
                        <Card
                          key={globalIndex}
                          className="border-2 overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                            className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-muted/50 transition-kinetic"
                          >
                            <h3 className="text-lg font-bold flex-1">{item.q}</h3>
                            <ChevronDown
                              className={`w-5 h-5 flex-shrink-0 transition-transform ${
                                openIndex === globalIndex ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {openIndex === globalIndex && (
                            <div className="px-6 pb-6">
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

      <section className="bg-muted py-16">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Still Have Questions?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight text-lg h-14 px-8 inline-flex items-center justify-center">
                Contact Us
              </button>
            </a>
            <a href="/tours">
              <button className="border-2 border-border bg-background hover:bg-muted font-medium tracking-tight text-lg h-14 px-8 inline-flex items-center justify-center">
                Browse Tours
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
