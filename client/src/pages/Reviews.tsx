import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Reviews() {
  const { data: cmsReviews } = trpc.cms.reviews.listPublic.useQuery();

  const hardcodedReviews = [
    {
      name: "Sophie M.",
      age: 24,
      tour: "Thailand Island Hopper",
      rating: 5,
      date: "January 2026",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      review: "Honestly the best 3 weeks of my life. I came solo and was nervous at first, but within the first day I felt like I'd known everyone forever. The Full Moon Party was insane, the jungle trek was incredible, and our trip manager Jake made everything so easy. Already planning my next ACE trip!",
      highlight: "Made 12 lifelong friends"
    },
    {
      name: "James T.",
      age: 27,
      tour: "Bali Adventure",
      rating: 5,
      date: "December 2025",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      review: "The Mount Batur sunrise trek was breathtaking. Surfing in Canggu, exploring Ubud's rice terraces, and the beach clubs in Seminyak were all amazing. The group was such good vibes and the accommodation was way better than I expected. Worth every penny.",
      highlight: "Learned to surf!"
    },
    {
      name: "Emma L.",
      age: 22,
      tour: "Philippines Paradise",
      rating: 5,
      date: "November 2025",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      review: "El Nido was like something out of a movie. The secret lagoons, hidden beaches, and crystal clear water were unreal. Camping on the beach under the stars was a core memory. The group was amazing and our trip manager Sarah knew all the best spots. Can't recommend ACE enough!",
      highlight: "Most beautiful place I've ever seen"
    },
    {
      name: "Marcus R.",
      age: 26,
      tour: "Thailand Island Hopper",
      rating: 5,
      date: "October 2025",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      review: "As someone who'd never traveled solo before, ACE made it so easy. The WhatsApp group before the trip helped me connect with people early. The itinerary was perfect - busy enough to see everything but with plenty of free time to chill. The elephant sanctuary was ethical and beautiful.",
      highlight: "Perfect first solo trip"
    },
    {
      name: "Chloe W.",
      age: 23,
      tour: "Bali Adventure",
      rating: 5,
      date: "September 2025",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      review: "The cooking class in Ubud was so fun, and the Nusa Islands day trip was the highlight. Snorkeling with manta rays and cliff jumping at Blue Lagoon were bucket list moments. The group dinners were always a vibe and I loved that we had freedom to explore on our own too.",
      highlight: "Snorkeled with manta rays!"
    },
    {
      name: "Ryan K.",
      age: 25,
      tour: "Philippines Paradise",
      rating: 5,
      date: "August 2025",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      review: "Coron's shipwreck snorkeling was incredible. Twin Lagoon and Barracuda Lake were like nothing I've ever seen. The group was such a laugh and we're already planning a reunion trip. The £60 deposit and payment plan made it so affordable. Best decision I made this year.",
      highlight: "Explored WWII shipwrecks"
    },
    {
      name: "Lily P.",
      age: 21,
      tour: "Thailand Island Hopper",
      rating: 5,
      date: "July 2025",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      review: "Bangkok was chaotic in the best way, the islands were paradise, and Chiang Mai was so cultural and beautiful. The floating markets, temple tours, and night markets were all amazing. I came alone and left with a second family. Already booked my next ACE trip to Bali!",
      highlight: "Booked another trip immediately"
    },
    {
      name: "Alex D.",
      age: 28,
      tour: "Bali Adventure",
      rating: 5,
      date: "June 2025",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      review: "The jungle swings were terrifying but so worth it for the photos. Tanah Lot temple at sunset was stunning. The group was diverse and everyone was so friendly. Trip manager Lisa was incredible and handled everything smoothly. The payment plan made it super manageable financially.",
      highlight: "Conquered my fear of heights"
    },
    {
      name: "Mia S.",
      age: 24,
      tour: "Philippines Paradise",
      rating: 5,
      date: "May 2025",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
      review: "Island hopping in El Nido was the best experience. Every day was a new adventure with hidden lagoons, secret beaches, and incredible snorkeling. The beach BBQs and sunset boat parties were unforgettable. Met some of my best friends on this trip. ACE really delivers on the experience.",
      highlight: "Found my travel tribe"
    }
  ];

  // Use CMS reviews if available, otherwise fall back to hardcoded
  const reviews = cmsReviews && cmsReviews.length > 0
    ? cmsReviews.map(r => ({
        name: r.authorName,
        age: r.authorAge ?? null,
        tour: r.tourName ?? "",
        rating: r.rating,
        date: r.reviewDate ?? "",
        image: r.authorPhoto ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        review: r.reviewText,
        highlight: ""
      }))
    : hardcodedReviews;

  const stats = [
    { value: "4.9/5", label: "Average Rating" },
    { value: "2,400+", label: "Happy Travelers" },
    { value: "98%", label: "Would Recommend" },
    { value: "247", label: "5-Star Reviews" }
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Traveler Reviews
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Real stories from real travellers who've experienced ACE adventures
          </p>
          <div className="flex items-center justify-center gap-2 pt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-current" />
            ))}
            <span className="text-2xl font-bold ml-2">4.9/5</span>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 border-2 flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 object-cover"
                  />
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-xs text-muted-foreground">Age {review.age}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {review.tour}
                </Badge>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>

              <div className="relative flex-1">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {review.review}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-xs font-medium text-primary">{review.highlight}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/EkbTwtPubGBZnpjI.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
        <div className="relative container text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Rated 4.9/5 by 500+ travellers
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Ready to Create Your<br className="hidden md:block" /> Own Story?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join hundreds of travellers who've had the adventure of a lifetime with ACE. Your group is waiting.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a href="/tours">
              <button className="bg-primary hover:bg-primary/90 text-white font-semibold tracking-tight text-lg h-14 px-10 rounded-full inline-flex items-center justify-center shadow-lg shadow-primary/30 transition-all hover:scale-105">
                Browse Tours
              </button>
            </a>
            <a href="/contact">
              <button className="border-2 border-white/70 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold tracking-tight text-lg h-14 px-10 rounded-full inline-flex items-center justify-center transition-all hover:scale-105">
                Get in Touch
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
