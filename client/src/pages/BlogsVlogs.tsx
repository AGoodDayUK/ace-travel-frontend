import { useState } from "react";
import { Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

// All vlogs by Libby — one unified list
const vlogs = [
  { id: "Z20HYbB5diQ", title: "Come With Me to Bali — First Glimpse + Meeting My Tour Group" },
  { id: "Wv-ILYoCkJ8", title: "Pack With Me for Bali! Travel Tips, Essentials & How I Planned It With ACE" },
  { id: "1EN-j0gGI00", title: "Bamboo River Rafting & Night Time Jungle Walk" },
  { id: "YqCRJJhommw", title: "Morning Jungle Safari & Shopping!" },
  { id: "wCHWVWygIiE", title: "Pig Island, Snorkelling & Partying" },
  { id: "HOIdsTgG_tc", title: "Koh Samui Ziplining" },
  { id: "1kOWBIAfLhU", title: "Koh Phangan & Puk's Palace" },
  { id: "1TOb_0YkIzc", title: "Quad Biking & Full Moon Party" },
  { id: "DqqBtdb0V5M", title: "Snorkelling in Koh Tao" },
  { id: "_LZ7QDw7ibk", title: "Koh Tao. Getting Inked." },
  { id: "Fp6Y3A3fV-s", title: "Freedom Beach in Phuket & a Very Special Moment!" },
  { id: "J3kCYte0bD8", title: "Final Day in Thailand With ACE Travel Experiences" },
];

// Verified frog images uploaded to CDN
const frogs = [
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ybUcZpiBKPyqdEQA.jpg", caption: "Red-eyed tree frog" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/JPREcUPwmJOcXSSL.jpg", caption: "Green tree frog on a leaf" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/qwJTCXuRTztBpiSO.jpg", caption: "Tree frog on a stem" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/lcnfRQfRBezKLwdp.jpg", caption: "Poison dart frog" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/rQRgTFtpwqbMHiav.jpg", caption: "Poison dart frog, orange & black" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/YobDsArwarPlsRVP.jpg", caption: "Red-eyed tree frog, close up" },
];

function VlogCard({ vlog }: { vlog: typeof vlogs[0] }) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${vlog.id}/hqdefault.jpg`;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-background group">
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${vlog.id}?autoplay=1`}
            title={vlog.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="w-full h-full relative block"
            aria-label={`Play ${vlog.title}`}
          >
            <img
              src={thumbnail}
              alt={vlog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 text-[#e63946] fill-[#e63946] ml-1" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">{vlog.title}</h3>
      </div>
    </div>
  );
}

export default function BlogsVlogs() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="container py-16 md:py-20 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Vlogs, Blogs<br />
          <span className="text-accent">&amp; Frogs.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real stories from real travellers. Watch Libby's vlogs from her ACE adventures, read our travel blogs, and enjoy some very special frogs.
        </p>
      </section>

      {/* VLOGS SECTION */}
      <section className="container pb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-[#e63946] flex items-center justify-center flex-shrink-0">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Vlogs</h2>
            <p className="text-muted-foreground mt-1">
              Meet Libby, a serial vlogger who captured her Thailand Island Hopper, Bali Explorer, and Bali Island Hopper trips. Watch her awesome videos here.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vlogs.map(vlog => (
            <VlogCard key={vlog.id} vlog={vlog} />
          ))}
        </div>
      </section>

      {/* BLOGS SECTION */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Blogs</h2>
              <p className="text-muted-foreground mt-1">
                Prefer words over videos? We've got you. Our travel blogs are coming soon!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Things Nobody Tells You Before Travelling to Thailand",
                category: "Thailand",
                colour: "bg-[#e63946]",
                excerpt: "From the heat to the food to the full moon party — here's what we wish we'd known before our first trip to Thailand.",
              },
              {
                title: "Bali on a Budget: How to Make the Most of Your Trip",
                category: "Bali",
                colour: "bg-[#00b4d8]",
                excerpt: "Bali doesn't have to break the bank. Here's how to eat well, explore freely, and still have money left for a massage.",
              },
              {
                title: "The Philippines: Why It Should Be Top of Your Bucket List",
                category: "Philippines",
                colour: "bg-accent",
                excerpt: "El Nido, Siargao, Siquijor — the Philippines has it all. Here's why it's one of the most underrated destinations in Southeast Asia.",
              }
            ].map(blog => (
              <div key={blog.title} className="bg-background rounded-2xl overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-br from-muted to-border flex items-center justify-center">
                  <div className="text-center space-y-2 p-6">
                    <span className={`inline-block text-xs font-semibold text-white px-3 py-1 rounded-full ${blog.colour}`}>
                      {blog.category}
                    </span>
                    <p className="text-sm text-muted-foreground font-medium">Coming Soon</p>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg leading-snug">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{blog.excerpt}</p>
                  <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FROGS SECTION */}
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
