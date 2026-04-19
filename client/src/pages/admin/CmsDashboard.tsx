import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Map, Tag, HelpCircle, Star, FileText, Image, ArrowRight, CheckCircle, Settings, Users, Globe } from "lucide-react";

const sections = [
  {
    href: "/admin/tours",
    label: "Tours",
    icon: Map,
    description: "Edit tour pages, prices, itineraries and images",
    tip: "Click the pencil icon next to any tour to edit it",
  },
  {
    href: "/admin/deals",
    label: "Deals & Offers",
    icon: Tag,
    description: "Manage special offers and promotions on the Deals page",
    tip: "Toggle 'Active' to show or hide a deal instantly",
  },
  {
    href: "/admin/faqs",
    label: "FAQs",
    icon: HelpCircle,
    description: "Add, edit and reorder FAQ entries",
    tip: "Use the category field to group questions by topic",
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: Star,
    description: "Manage customer testimonials shown on the site",
    tip: "Toggle 'Featured' to highlight a review on the homepage",
  },
  {
    href: "/admin/media",
    label: "Media Library",
    icon: Image,
    description: "Upload and manage all site images",
    tip: "Upload an image here, then copy its URL to use in tours or deals",
  },
  {
    href: "/admin/settings",
    label: "Site Settings",
    icon: Settings,
    description: "Edit homepage stats, contact details, and SEO settings",
    tip: "Changes here affect the whole site — save each section separately",
  },
  {
    href: "/admin/pages",
    label: "Custom Pages",
    icon: FileText,
    description: "Create new pages using the block builder",
    tip: "Choose from pre-built blocks: hero, text, gallery, pricing, and more",
  },
  {
    href: "/admin/users",
    label: "CMS Users",
    icon: Users,
    description: "Manage who can log in to this admin area",
    tip: "Add new team members or change passwords here",
  },
];

export default function CmsDashboard() {
  const toursQuery = trpc.cms.tours.list.useQuery();
  const dealsQuery = trpc.cms.deals.list.useQuery();
  const faqsQuery = trpc.cms.faqs.list.useQuery();
  const reviewsQuery = trpc.cms.reviews.list.useQuery();
  const mediaQuery = trpc.cms.media.list.useQuery();

  const stats = [
    { label: "Tours", value: toursQuery.data?.length ?? "—", href: "/admin/tours" },
    { label: "Active Deals", value: dealsQuery.data?.filter((d) => d.active).length ?? "—", href: "/admin/deals" },
    { label: "FAQs", value: faqsQuery.data?.length ?? "—", href: "/admin/faqs" },
    { label: "Reviews", value: reviewsQuery.data?.length ?? "—", href: "/admin/reviews" },
    { label: "Media Files", value: mediaQuery.data?.length ?? "—", href: "/admin/media" },
  ];

  return (
    <CmsLayout title="Dashboard">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-white font-semibold text-lg">Welcome to the ACE Travel Content Manager</h2>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                Use the sections below (or the sidebar) to update any content on your website.
                All changes go live immediately — no publishing step needed.
              </p>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-sm mt-3 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                View your live website
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {stats.map((s) => (
            <Link key={s.href} href={s.href} className="bg-gray-900 border border-gray-800 hover:border-teal-500/40 rounded-xl p-4 text-center transition-colors cursor-pointer">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </Link>
          ))}
        </div>

        {/* Section cards */}
        <div>
          <h2 className="text-white font-semibold mb-4">What would you like to update?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-gray-900 border border-gray-800 hover:border-teal-500/40 rounded-xl p-5 flex items-start gap-4 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/20 transition-colors">
                  <s.icon className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{s.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{s.description}</p>
                  <p className="text-teal-500/70 text-xs mt-1.5 italic">💡 {s.tip}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-teal-400 transition-colors flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </CmsLayout>
  );
}
