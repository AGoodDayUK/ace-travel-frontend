import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/JsonLd";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, CheckCircle, Users, RotateCcw, Heart, CreditCard, Wallet } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const TRIPS = [
  "Thailand Island Hopper (21 Days)",
  "Thailand Intro (12 Days)",
  "Bali Explorer (14 Days)",
  "Bali Island Hopper (14 Days)",
  "Philippines Paradise (23 Days)",
];

const deals = [
  {
    id: "mates-rates",
    title: "Mates Rates",
    tagline: "Bring a friend, save together",
    discount: "£50 OFF",
    description: "Refer a friend at any time and get £50 off your package. Unlimited uses — the more mates you bring, the more you save.",
    icon: Users,
    colour: "bg-emerald-500",
    textColour: "text-emerald-600",
    borderColour: "border-emerald-200",
    bgLight: "bg-emerald-50",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg",
  },
  {
    id: "welcome-back",
    title: "Welcome Back",
    tagline: "Once an ACE traveller, always an ACE traveller",
    discount: "£100 OFF",
    description: "£100 off for any returning customer. Ace Working Holidays included. You already know how good it is — come back for more.",
    icon: RotateCcw,
    colour: "bg-blue-500",
    textColour: "text-blue-600",
    borderColour: "border-blue-200",
    bgLight: "bg-blue-50",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EkbTwtPubGBZnpjI.jpg",
  },
  {
    id: "bf-gf-bff",
    title: "BF, GF, or BFF",
    tagline: "Share the love (and the savings)",
    discount: "£150 OFF",
    description: "Boyfriend, Girlfriend, or Best Friend Forever — bring them along and share £150 off between you. Valid within 24 hours of signing up.",
    icon: Heart,
    colour: "bg-rose-500",
    textColour: "text-rose-600",
    borderColour: "border-rose-200",
    bgLight: "bg-rose-50",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ElOPcITQITYxAUYp.jpg",
  },
  {
    id: "pif",
    title: "PIF",
    tagline: "Pay in Full, save instantly",
    discount: "£100 OFF",
    description: "Pay in Full and get £100 off. Simple as that. No instalments, no waiting — just a straight saving applied immediately.",
    icon: CreditCard,
    colour: "bg-violet-500",
    textColour: "text-violet-600",
    borderColour: "border-violet-200",
    bgLight: "bg-violet-50",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/pgjBFhnsFhBdxVMb.jpg",
  },
  {
    id: "go-halves",
    title: "Go Halves",
    tagline: "Commit early, save more",
    discount: "£50 OFF",
    description: "Pay 50% of your travel package within 7 days of your deposit payment and get £50 off your trip.",
    icon: Wallet,
    colour: "bg-amber-500",
    textColour: "text-amber-600",
    borderColour: "border-amber-200",
    bgLight: "bg-amber-50",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/HzkAzSiHHurpNQTN.jpg",
  },
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  instagram: string;
  trip: string;
  deal: string;
}

export default function Deals() {
  const { data: cmsDeals } = trpc.cms.deals.listPublic.useQuery();

  // Merge CMS text content over hardcoded colour/icon config
  const mergedDeals = deals.map(deal => {
    const cms = cmsDeals?.find(d => d.slug === deal.id);
    if (!cms) return deal;
    return {
      ...deal,
      title: cms.title ?? deal.title,
      tagline: cms.tagline ?? deal.tagline,
      discount: cms.discount ?? deal.discount,
      description: cms.description ?? deal.description,
      image: cms.image ?? deal.image,
    };
  });

  const [selectedDeal, setSelectedDeal] = useState<typeof deals[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    instagram: "",
    trip: "",
    deal: "",
  });

  const notifyOwner = trpc.system.notifyOwner.useMutation();

  const openForm = (deal: typeof deals[0]) => {
    setSelectedDeal(deal);
    setSubmitted(false);
    setForm((prev) => ({ ...prev, deal: deal.title }));
    document.body.style.overflow = "hidden";
  };

  const closeForm = () => {
    setSelectedDeal(null);
    setSubmitted(false);
    document.body.style.overflow = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.instagram || !form.trip) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await notifyOwner.mutateAsync({
        title: `New Deal Claim: ${form.deal}`,
        content: `A new deal claim has been submitted:\n\nDeal: ${form.deal}\nTrip: ${form.trip}\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nInstagram: @${form.instagram.replace(/^@/, "")}`,
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="animate-fade-in min-h-screen bg-background">
      <SEO
        title="Tour Deals & Special Offers | ACE Travel Experiences"
        description="Exclusive deals on ACE Travel group tours to Thailand and Bali. Limited-time discounts for 18–35 year olds. Secure your spot with a £60 deposit."
        canonical="/deals"
      />
      <JsonLd schema={webPageSchema({ name: "Deals & Offers — ACE Travel Experiences", description: "Exclusive deals and special offers on ACE Travel group tours. Limited-time discounts on Thailand, Bali and Philippines adventures.", path: "/deals" })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Deals", path: "/deals" }])} />
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/nbdFlsyYCgCVjCdb.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container py-20 md:py-28 text-center space-y-6">
          <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-1.5 backdrop-blur-sm">
            ACE Deals
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Take Your Pick.
            <br />
            <span className="text-primary">Anytime.</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
            Five ways to save on your next ACE adventure. Stack them if you can.
          </p>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => {
            const Icon = deal.icon;
            return (
              <Card
                key={deal.id}
                className={`overflow-hidden border-2 ${deal.borderColour} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col py-0 gap-0`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-3xl font-black tracking-tighter drop-shadow-lg">
                      {deal.discount}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className={`inline-flex items-center gap-2 ${deal.bgLight} ${deal.textColour} rounded-full px-3 py-1 text-sm font-medium w-fit`}>
                    <Icon className="w-4 h-4" />
                    {deal.title}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{deal.tagline}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{deal.description}</p>
                  </div>
                  <div className="flex-1" />
                  <Button
                    onClick={() => openForm(deal)}
                    className={`w-full font-semibold tracking-tight ${deal.colour} hover:opacity-90 text-white border-0`}
                  >
                    Claim It
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Slide-over form */}
      {selectedDeal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 overflow-y-auto flex flex-col">
            <div className={`${selectedDeal.colour} text-white p-6 flex items-start justify-between`}>
              <div>
                <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">Claiming</p>
                <h2 className="text-2xl font-bold tracking-tight">{selectedDeal.title}</h2>
                    <p className="text-white/90 text-sm mt-1">{selectedDeal.discount} off your trip</p>
              </div>
              <button onClick={closeForm} className="text-white/80 hover:text-white transition-colors mt-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-16">
                  <CheckCircle className="w-16 h-16 text-emerald-500" />
                  <h3 className="text-2xl font-bold tracking-tight">You just aced it!</h3>
                  <p className="text-muted-foreground">
                    We've received your claim for the <strong>{selectedDeal.title}</strong> deal. We'll be in touch within 24 hours to apply your {selectedDeal.discount} discount.
                  </p>
                  <Button onClick={closeForm} variant="outline" className="mt-4">
                    Back to Deals
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-muted-foreground text-sm">
                    Fill in your details and we'll apply your <strong>{selectedDeal.discount}</strong> discount to your payment plan.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Jane" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Smith" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                      <Input id="instagram" required value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="yourusername" className="pl-7" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="trip">Which Trip?</Label>
                    <Select value={form.trip} onValueChange={(val) => setForm({ ...form, trip: val })} required>
                      <SelectTrigger id="trip">
                        <SelectValue placeholder="Select a trip" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRIPS.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Deal</Label>
                    <div className={`${selectedDeal.bgLight} ${selectedDeal.textColour} rounded-md px-4 py-3 text-sm font-semibold border ${selectedDeal.borderColour}`}>
                      {selectedDeal.title} — {selectedDeal.discount}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={notifyOwner.isPending}
                    className={`w-full font-semibold ${selectedDeal.colour} hover:opacity-90 text-white border-0 mt-2`}
                  >
                    {notifyOwner.isPending ? "Sending..." : "Claim My Discount"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll be in touch within 24 hours via email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
