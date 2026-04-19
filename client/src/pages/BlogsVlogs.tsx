import { useState } from "react";
import { Play, BookOpen, Video, Calendar, Tag, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

// Frog gallery — permanent CDN URLs
const frogs = [
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ybUcZpiBKPyqdEQA.jpg", caption: "Red-eyed tree frog" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/JPREcUPwmJOcXSSL.jpg", caption: "Green tree frog on a leaf" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/qwJTCXuRTztBpiSO.jpg", caption: "Tree frog on a stem" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/lcnfRQfRBezKLwdp.jpg", caption: "Poison dart frog" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/rQRgTFtpwqbMHiav.jpg", caption: "Poison dart frog, orange & black" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/YobDsArwarPlsRVP.jpg", caption: "Red-eyed tree frog, close up" },
];

/** Extract a YouTube video ID from various YouTube URL formats */
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/, // bare ID
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function VlogCard({ item }: { item: { id: number; title: string; youtubeUrl: string | null; coverImage: string | null; excerpt: string | null; destination: string | null; author: string | null } }) {
  const [playing, setPlaying] = useState(false);
  const ytId = item.youtubeUrl ? extractYouTubeId(item.youtubeUrl) : null;
  const thumbnail = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : item.coverImage ?? "";

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-background group">
      <div className="relative aspect-video bg-black">
        {playing && ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <button
            onClick={() => ytId && setPlaying(true)}
            className="w-full h-full relative block"
            aria-label={`Play ${item.title}`}
          >
            {thumbnail ? (
              <img src={thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <Video className="w-12 h-12 text-gray-600" />
              </div>
            )}
            {ytId && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 text-[#e63946] fill-[#e63946] ml-1" />
                </div>
              </div>
            )}
          </button>
        )}
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">{item.title}</h3>
        {(item.destination || item.author) && (
          <p className="text-xs text-muted-foreground">
            {[item.destination, item.author ? `by ${item.author}` : null].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

function BlogCard({ item }: { item: { id: number; title: string; slug: string; excerpt: string | null; coverImage: string | null; destination: string | null; author: string | null; tags: string[] | null } }) {
  const destColour: Record<string, string> = {
    Thailand: "bg-[#e63946]",
    Bali: "bg-[#00b4d8]",
    Philippines: "bg-accent",
  };
  const colour = item.destination ? (destColour[item.destination] ?? "bg-primary") : "bg-primary";

  return (
    <div className="bg-background rounded-2xl overflow-hidden shadow-md flex flex-col">
      {item.coverImage ? (
        <div className="h-48 overflow-hidden">
          <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-muted to-border flex items-center justify-center">
          <div className="text-center space-y-2 p-6">
            {item.destination && (
              <span className={`inline-block text-xs font-semibold text-white px-3 py-1 rounded-full ${colour}`}>
                {item.destination}
              </span>
            )}
            <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mt-2" />
          </div>
        </div>
      )}
      <div className="p-6 space-y-3 flex-1 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap">
          {item.destination && (
            <span className={`inline-block text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${colour}`}>
              {item.destination}
            </span>
          )}
          {(item.tags ?? []).slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs py-0">{tag}</Badge>
          ))}
        </div>
        <h3 className="font-bold text-lg leading-snug">{item.title}</h3>
        {item.excerpt && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.excerpt}</p>}
        <div className="mt-auto pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/blogs-vlogs/${item.slug}`}>
              Read More <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BlogsVlogs() {
  const { data: allItems = [], isLoading } = trpc.cms.blogsVlogs.listPublic.useQuery();

  const vlogs = allItems.filter(i => i.type === "vlog");
  const blogs = allItems.filter(i => i.type === "blog");
  const hasContent = vlogs.length > 0 || blogs.length > 0;

  return (
    <div className="animate-fade-in">
      <SEO
        title="Travel Vlogs & Blogs | ACE Travel Experiences"
        description="Watch real travel vlogs and read blogs from ACE Travel group tour adventures in Thailand and Bali. Real stories from 18–35 year old travellers."
        canonical="/blogs-vlogs"
      />

      {/* Hero */}
      <section className="container py-16 md:py-20 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Vlogs, Blogs<br />
          <span className="text-accent">&amp; Frogs.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real stories from real travellers. Watch our vlogs, read our travel blogs, and enjoy some very special frogs.
        </p>
      </section>

      {/* Loading state */}
      {isLoading && (
        <section className="container pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md bg-background">
                <div className="aspect-video bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VLOGS SECTION — only shown when there are vlogs */}
      {!isLoading && vlogs.length > 0 && (
        <section className="container pb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[#e63946] flex items-center justify-center flex-shrink-0">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Vlogs</h2>
              <p className="text-muted-foreground mt-1">
                Watch real travel videos from our group adventures.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vlogs.map(item => (
              <VlogCard key={item.id} item={item as any} />
            ))}
          </div>
        </section>
      )}

      {/* BLOGS SECTION — only shown when there are blogs */}
      {!isLoading && blogs.length > 0 && (
        <section className="bg-muted py-16 md:py-20">
          <div className="container">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Blogs</h2>
                <p className="text-muted-foreground mt-1">
                  Travel stories, tips, and destination guides from the ACE team.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map(item => (
                <BlogCard key={item.id} item={item as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state — shown when no content at all (and not loading) */}
      {!isLoading && !hasContent && (
        <section className="container pb-20 text-center">
          <div className="max-w-md mx-auto py-16 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Content Coming Soon</h2>
            <p className="text-muted-foreground">
              We're working on some great blogs and vlogs. Check back soon!
            </p>
          </div>
        </section>
      )}

      {/* FROGS SECTION — always shown */}
      <section className="container py-16 md:py-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🐸</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frogs</h2>
            <p className="text-muted-foreground mt-1">
              We love frogs. We think everyone else loves frogs. So here are some cool frogs, no charge.
            </p>
          </div>
        </div>

        <div className="mt-8 mb-6 bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <span className="text-5xl">🐸</span>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-black text-green-700 tracking-tight">Take the Leap.</h3>
            <p className="text-green-600 mt-1">Frogs do it. You should too. Book your ACE adventure for just £60.</p>
          </div>
          <a
            href="https://booking.acetravelexperiences.com/book/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            Book Now 🐸
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {frogs.map((frog, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-md group relative aspect-square">
              <img
                src={frog.image}
                alt={frog.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{frog.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-lg italic">
            "Not all those who wander are lost. But some of them are definitely frogs."
          </p>
        </div>
      </section>

    </div>
  );
}
