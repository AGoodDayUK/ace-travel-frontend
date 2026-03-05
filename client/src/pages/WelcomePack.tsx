import { useEffect } from "react";
import { Download, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WELCOME_PACKS: Record<string, {
  title: string;
  subtitle: string;
  coverImage: string;
  pdfUrl: string;
  pdfFilename: string;
  highlights: string[];
}> = {
  "thailand-island-hopper": {
    title: "Thailand Island Hopper",
    subtitle: "Welcome to the Family!",
    coverImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/iwZWrpACEKkCeWqN.png",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ljGjGuHPKogjwFjo.pdf",
    pdfFilename: "ACE-Travel-Thailand-Island-Hopper-Welcome-Pack.pdf",
    highlights: [
      "Full 21-day itinerary breakdown",
      "Packing list and travel tips",
      "What's included in your trip",
      "Payment schedule and deadlines",
      "Private members group access details",
      "Flight guidance and airport tips",
    ],
  },
};

interface WelcomePackProps {
  tour?: string;
}

export default function WelcomePack({ tour = "thailand-island-hopper" }: WelcomePackProps) {
  const pack = WELCOME_PACKS[tour];

  // Prevent search engine indexing
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (!pack) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Pack Not Found</h1>
          <p className="text-gray-500">Please check the link you were sent and try again.</p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pack.pdfUrl;
    a.download = pack.pdfFilename;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <img
          src="/ace-logo-full.png"
          alt="ACE Travel Experiences"
          className="h-10"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#e91e8c] mb-2">
            You're officially booked!
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            {pack.subtitle}
          </h1>
          <p className="text-lg text-gray-600">
            Your {pack.title} welcome pack is ready to download. Everything you need to know before your trip is inside.
          </p>
        </div>

        {/* Main content: cover + download */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* PDF Cover Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img
              src={pack.coverImage}
              alt={`${pack.title} Welcome Pack Cover`}
              className="w-full h-auto"
            />
          </div>

          {/* Download panel */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {pack.title} Welcome Pack
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Your complete pre-trip guide. Download it and save it somewhere handy!
              </p>

              {/* Download button */}
              <Button
                onClick={handleDownload}
                className="w-full bg-[#e91e8c] hover:bg-[#c41878] text-white font-bold py-4 text-base rounded-xl mb-3 flex items-center justify-center gap-2"
                size="lg"
              >
                <Download className="w-5 h-5" />
                Download Welcome Pack
              </Button>

              {/* Open in new tab */}
              <a
                href={pack.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#e91e8c] transition-colors py-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in browser instead
              </a>
            </div>

            {/* What's inside */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">What's inside your pack</h3>
              <ul className="space-y-3">
                {pack.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#4ecdc4] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions */}
            <div className="bg-[#fff0f8] rounded-2xl border border-[#f9c6e3] p-5 text-sm text-gray-700">
              <p className="font-semibold text-gray-900 mb-1">Got questions?</p>
              <p>
                Drop us an email at{" "}
                <a
                  href="mailto:admin@acetravelexperiences.com"
                  className="text-[#e91e8c] font-semibold hover:underline"
                >
                  admin@acetravelexperiences.com
                </a>{" "}
                and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
