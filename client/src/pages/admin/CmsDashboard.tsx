import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Map, Tag, HelpCircle, Star, FileText, Image, ArrowRight, Settings, Users, Globe } from "lucide-react";

const sections = [
  {
    href: "/admin/tours",
    label: "Tours",
    icon: Map,
    description: "Edit tour pages, prices, itineraries and images",
    tip: "Click the pencil icon next to any tour to edit it",
    color: "bg-teal-50 text-teal-600",
  },
  {
    href: "/admin/deals",
    label: "Deals & Offers",
    icon: Tag,
    description: "Manage special offers and promotions on the Deals page",
    tip: "Toggle 'Active' to show or hide a deal instantly",
    color: "bg-orange-50 text-orange-600",
  },
  {
    href: "/admin/faqs",
    label: "FAQs",
    icon: HelpCircle,
    description: "Add, edit and reorder FAQ entries",
    tip: "Use the category field to group questions by topic",
    color: "bg-blue-50 text-blue-600",
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: Star,
    description: "Manage customer testimonials shown on the site",
    tip: "Toggle 'Featured' to highlight a review on the homepage",
    color: "bg-amber-50 text-amber-600",
  },
  {
    href: "/admin/media",
    label: "Media Library",
    icon: Image,
    description: "Upload and manage all site images",
    tip: "Images can now be uploaded directly in tour and deal editors",
    color: "bg-purple-50 text-purple-600",
  },
  {
    href: "/admin/settings",
    label: "Site Settings",
    icon: Settings,
    description: "Edit homepage stats, contact details, and SEO settings",
    tip: "Changes here affect the whole site — save each section separately",
    color: "bg-gray-100 text-gray-600",
  },
  {
    href: "/admin/pages",
    label: "Custom Pages",
    icon: FileText,
    description: "Create new pages using the block builder",
    tip: "Choose from pre-built blocks: hero, text, gallery, pricing, and more",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    href: "/admin/users",
    label: "CMS Users",
    icon: Users,
    description: "Manage who can log in to this admin area",
    tip: "Add new team members or change passwords here",
    color: "bg-rose-50 text-rose-600",
  },
];

export default function CmsDashboard() {
  const toursQuery = trpc.cms.tours.list.useQuery();
  const dealsQuery = trpc.cms.deals.list.useQuery();
  const faqsQuery = trpc.cms.faqs.list.useQuery();
  const reviewsQuery = trpc.cms.reviews.list.useQuery();
  const mediaQuery = trpc.cms.media.list.useQuery();

  const stats = [
    { label: "Tours", value: toursQuery.data?.length ?? "—", href: "/admin/tours", color: "text-teal-600" },
    { label: "Active Deals", value: dealsQuery.data?.filter((d) => d.active).length ?? "—", href: "/admin/deals", color: "text-orange-600" },
    { label: "FAQs", value: faqsQuery.data?.length ?? "—", href: "/admin/faqs", color: "text-blue-600" },
    { label: "Reviews", value: reviewsQuery.data?.length ?? "—", href: "/admin/reviews", color: "text-amber-600" },
    { label: "Media Files", value: mediaQuery.data?.length ?? "—", href: "/admin/media", color: "text-purple-600" },
  ];

  return (
    <CmsLayout title="Dashboard">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-xl">Welcome to the ACE Travel Content Manager</h2>
              <p className="text-teal-50 text-sm mt-1 leading-relaxed">
                Use the sections below to update any content on your website.
                All changes go live immediately — no publishing step needed.
              </p>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mt-3 transition-colors"
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
            <Link
              key={s.href}
              href={s.href}
              className="bg-white border border-gray-100 hover:border-teal-200 hover:shadow-sm rounded-xl p-4 text-center transition-all cursor-pointer"
            >
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
            </Link>
          ))}
        </div>

        {/* Section cards */}
        <div>
          <h2 className="text-gray-900 font-semibold mb-4">What would you like to update?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white border border-gray-100 hover:border-teal-200 hover:shadow-sm rounded-xl p-5 flex items-start gap-4 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium text-sm">{s.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{s.description}</p>
                  <p className="text-teal-600 text-xs mt-1.5">{s.tip}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </CmsLayout>
  );
}
