import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Users, Star, Shield, MapPin, MessageCircle } from "lucide-react";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/JsonLd";
import { SEO } from "@/components/SEO";
import { trpc } from "@/lib/trpc";

const JAY_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/RhbDAdBlBLuZiRxy.webp";
const RUBY_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/NcwbxXKmAmIpVQgh.webp";
const MOLLIE_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/obArGQYQxcqpKqme.webp";

const features = [
  {
    title: "Everything Actually Included",
    description: "No sneaky extras. No 'pay when you get there.' If it's on the itinerary, it's in the price. Every experience, every activity, already covered.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/AbstOSiVVfNKoBYN.jpg",
    alt: "Group of travellers on an elephant sanctuary experience in Chiang Mai"
  },
  {
    title: "Your ACE Rep Has Got You",
    description: "Real humans. Really good ones. Your dedicated ACE Rep is with you every step of the way — they'll hype you up, have your back, and make sure no one gets left behind. Solo traveller? First big trip? You're covered.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/bNROoWDCfWwuPcRn.jpg",
    alt: "Lush green rice terraces in Bali"
  },
  {
    title: "Support From Start to Finish",
    description: "From the moment you book to the last goodbye, we've got you. Pre-travel prep, a private WhatsApp group, and flight assistance. Got a question? Just ask. We're here the whole way.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/mHpHRfsSMXkVOXLL.jpg",
    alt: "El Nido lagoon in the Philippines"
  }
];

const whyACE = [
  { icon: CheckCircle, title: "Flexible Payments", description: "Secure your spot with a small deposit and spread the rest across easy instalments." },
  { icon: Star, title: "4.9 Star Rated", description: "Hundreds of five-star reviews from real travellers who've been on our tours." },
  { icon: Users, title: "18-35 Age Group", description: "Travel with people your own age who are just as excited about adventure as you are." },
  { icon: Shield, title: "Safe & Supported", description: "24/7 support, trusted local partners, and comprehensive safety planning on every trip." },
  { icon: MapPin, title: "Handpicked Destinations", description: "Thailand, Bali and the Philippines — curated routes that hit the best spots." },
  { icon: MessageCircle, title: "Private WhatsApp Group", description: "Connect with your travel group before you even leave home. The adventure starts early." }
];

export default function About() {
  const settingsQuery = trpc.cms.settings.getPublic.useQuery();
  const s = (key: string, fallback: string) => {
    if (!settingsQuery.data) return fallback;
    const found = settingsQuery.data.find((x: any) => x.key === key);
    return found?.value || fallback;
  };

  const teamMembers = [
    {
      name: s('about_team_member1_name', 'Jay'),
      role: s('about_team_member1_role', 'Operations Manager'),
      bio: s('about_team_member1_bio', 'The engine behind every tour. Jay makes sure every detail is sorted so you can focus on having the time of your life.'),
      image: s('about_team_member1_image', JAY_CDN),
    },
    {
      name: s('about_team_member2_name', 'Ruby'),
      role: s('about_team_member2_role', 'Social Media Manager'),
      bio: s('about_team_member2_bio', 'The face behind the content. Ruby captures the real moments that make you want to pack your bags and join us.'),
      image: s('about_team_member2_image', RUBY_CDN),
    },
    {
      name: s('about_team_member3_name', 'Mollie'),
      role: s('about_team_member3_role', 'Trip Manager'),
      bio: s('about_team_member3_bio', 'Your on-the-ground guide. Mollie is the one making sure every day of your trip runs like clockwork and every memory sticks.'),
      image: s('about_team_member3_image', MOLLIE_CDN),
    },
  ];

  return (
    <div className="animate-fade-in">
      <SEO
        title="About ACE Travel Experiences | Group Tours for 18-35s"
        description="ACE Travel Experiences creates small-group adventures for 18–35 year olds. Meet our team, learn our story, and discover why 800+ travellers have chosen us for their Thailand and Bali adventures."
        canonical="/about"
      />
      <JsonLd schema={webPageSchema({ name: "About Us — ACE Travel Experiences", description: "Learn about ACE Travel Experiences — who we are, what we stand for, and why thousands of 18–35 year olds choose us for their group adventures.", path: "/about" })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary">About ACE Travel</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              Born from a love<br />
              of travel, built<br />
              for adventurers.
            </h1>
            <div className="h-1 w-16 bg-accent" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're not just a travel company. We're your trusty sidekick in exploring Southeast Asia and Indonesia. Whether you're after pristine beaches, bustling markets, or hidden gems, we've got you covered.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team of passionate travel enthusiasts and local experts are here to take the stress out of planning and put the magic back into travel. Imagine group trips filled with laughter, new friends, and moments that'll last a lifetime.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8">
              <Link href="/tours">Browse Our Tours</Link>
            </Button>
          </div>
          <div className="md:col-span-6">
            <div className="relative">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/VNDmlCNoSkrrWiQj.jpg"
                alt="ACE Travel group on a beautiful beach in Thailand"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-xl p-4 shadow-lg">
                <div className="text-3xl font-bold">4.9 ★</div>
                <div className="text-sm font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary text-primary-foreground py-14 mt-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Travellers" },
              { number: "4.9/5", label: "Average Rating" },
              { number: "3", label: "Destinations" },
              { number: "5", label: "Tours Available" }
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-5xl md:text-6xl font-bold">{stat.number}</div>
                <div className="text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes ACE, ACE */}
      <section className="container py-16 md:py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">What makes ACE, ACE?</h2>
          <div className="h-1 w-16 bg-accent mx-auto" />
        </div>
        <div className="space-y-24">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="space-y-5">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
              <div>
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The ACE Team */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">{s('about_team_title', 'The A-ce Team')}</h2>
            <div className="h-1 w-16 bg-accent mx-auto" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {s('about_team_subtitle', 'Behind every incredible trip is a small, passionate team who genuinely love what they do. Say hello to the people who make it all happen.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
            <div key={member.name} className="bg-background rounded-2xl overflow-hidden shadow-md group">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role} at ACE Travel Experiences`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-primary">{member.name}</h3>
                <p className="text-muted-foreground font-medium mt-1">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ACE */}
      <section className="container py-16 md:py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">What Makes Us ACE</h2>
          <div className="h-1 w-16 bg-accent mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyACE.map((item) => (
            <div key={item.title} className="p-8 border-2 border-border hover:border-primary rounded-2xl transition-all duration-300 group">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.4)), url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/IMutWpLXypOxxteu.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Ready to join the adventure?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Grab your rucksack. We'll handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-14 px-10 text-lg">
              <Link href="/tours">View All Tours</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold h-14 px-10 text-lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
