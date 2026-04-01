import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Map, Tag, HelpCircle, Star, FileText, Image, ArrowRight, CheckCircle } from "lucide-react";

const sections = [
  { href: "/admin/tours", label: "Tours", icon: Map, description: "Edit tour pages, prices, itineraries and images" },
  { href: "/admin/deals", label: "Deals", icon: Tag, description: "Manage special offers and promotions" },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle, description: "Add, edit and reorder FAQ entries" },
  { href: "/admin/reviews", label: "Reviews", icon: Star, description: "Manage customer testimonials" },
  { href: "/admin/pages", label: "Pages", icon: FileText, description: "Create new pages with the block builder" },
  { href: "/admin/media", label: "Media Library", icon: Image, description: "Upload and manage all site images" },
];

export default function CmsDashboard() {
  const toursQuery = trpc.cms.tours.list.useQuery();
  const dealsQuery = trpc.cms.deals.list.useQuery();
  const faqsQuery = trpc.cms.faqs.list.useQuery();
  const reviewsQuery = trpc.cms.reviews.list.useQuery();
  const pagesQuery = trpc.cms.pages.list.useQuery();
  const mediaQuery = trpc.cms.media.list.useQuery();

  const stats = [
    { label: "Tours", value: toursQuery.data?.length ?? "..." },
    { label: "Deals", value: dealsQuery.data?.length ?? "..." },
    { label: "FAQs", value: faqsQuery.data?.length ?? "..." },
    { label: "Reviews", value: reviewsQuery.data?.length ?? "..." },
    { label: "Pages", value: pagesQuery.data?.length ?? "..." },
    { label: "Media files", value: mediaQuery.data?.length ?? "..." },
  ];

  return (
    <CmsLayout title="Dashboard">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-white font-semibold">Welcome to the ACE Travel CMS</h2>
              <p className="text-gray-400 text-sm mt-1">
                Use the sidebar to manage all content on your site. Changes are live immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div>
          <h2 className="text-white font-semibold mb-4">Manage Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((s) => (
              <Link key={s.href} href={s.href}>
                <a className="group bg-gray-900 border border-gray-800 hover:border-teal-500/40 rounded-xl p-5 flex items-start gap-4 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/20 transition-colors">
                    <s.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{s.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{s.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-teal-400 transition-colors flex-shrink-0 mt-0.5" />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CmsLayout>
  );
}
