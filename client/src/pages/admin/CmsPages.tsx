import { useState } from "react";
import { useLocation } from "wouter";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Pencil, Trash2, ExternalLink, Layers, FileText, Globe } from "lucide-react";
import { toast } from "sonner";

// All built-in site pages with their routes and descriptions
const SITE_PAGES = [
  { label: "Home", path: "/", description: "Main landing page with hero, tours, deals, and reviews", icon: "🏠" },
  { label: "Tours", path: "/tours", description: "All tours listing page", icon: "✈️" },
  { label: "Destinations", path: "/destinations", description: "Destination overview — Thailand, Bali, Philippines", icon: "🗺️" },
  { label: "Deals", path: "/deals", description: "Current promotions and early bird offers", icon: "🏷️" },
  { label: "How It Works", path: "/how-it-works", description: "Step-by-step booking process and payment plans", icon: "📋" },
  { label: "Reviews", path: "/reviews", description: "Customer testimonials and ratings", icon: "⭐" },
  { label: "Blogs & Vlogs", path: "/blogs-vlogs", description: "Travel blog posts and video content", icon: "📹" },
  { label: "About", path: "/about", description: "About ACE Travel Experiences and the team", icon: "👥" },
  { label: "FAQ", path: "/faq", description: "Frequently asked questions", icon: "❓" },
  { label: "Contact", path: "/contact", description: "Contact form and social links", icon: "📬" },
  { label: "Payments", path: "/payments", description: "Payment plans and booking information", icon: "💳" },
  { label: "Scuba Diving", path: "/scuba-diving", description: "Scuba diving add-on information", icon: "🤿" },
  { label: "Flight Support", path: "/flight-support", description: "Flight booking assistance per tour", icon: "🛫" },
  { label: "Terms & Conditions", path: "/terms", description: "Booking terms and cancellation policy", icon: "📄" },
];

const emptyPage = {
  slug: "", title: "", metaTitle: null as string | null, metaDescription: null as string | null,
  published: false, showInNav: false, navLabel: null as string | null, sortOrder: 0,
};

export default function CmsPages() {
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const pagesQuery = trpc.cms.pages.list.useQuery();
  const upsert = trpc.cms.pages.upsert.useMutation({
    onSuccess: (id) => {
      utils.cms.pages.list.invalidate();
      setEditOpen(false);
      toast.success("Page saved");
      if (!form.id && id) navigate(`/admin/pages/${id}/blocks`);
    },
    onError: (e) => toast.error(e.message),
  });
  const del = trpc.cms.pages.delete.useMutation({
    onSuccess: () => { utils.cms.pages.list.invalidate(); toast.success("Page deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyPage & { id?: number }>(emptyPage);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!form.id) {
      set("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  return (
    <CmsLayout title="Pages">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── Section 1: Built-in Site Pages ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <Globe className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Site Pages</h2>
              <p className="text-xs text-gray-500">All pages built into the website. Edit their content via the relevant CMS section.</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {SITE_PAGES.map((page, i) => (
              <div
                key={page.path}
                className={`flex items-center gap-4 px-4 py-3 ${i < SITE_PAGES.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
              >
                <span className="text-lg w-7 text-center flex-shrink-0">{page.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{page.label}</p>
                  <p className="text-xs text-gray-400 truncate">{page.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <code className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded hidden sm:block">{page.path}</code>
                  <a href={page.path} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs gap-1.5 text-gray-600 hover:text-teal-600 hover:border-teal-300">
                      <ExternalLink className="w-3 h-3" />View
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-2 pl-1">
            To edit content on these pages, use the relevant section in the sidebar (Tours, Deals, Reviews, FAQs, etc.) or Site Settings.
          </p>
        </section>

        {/* ── Section 2: Custom Pages ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Layers className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Custom Pages</h2>
                <p className="text-xs text-gray-500">Build additional pages using drag-and-drop content blocks.</p>
              </div>
            </div>
            <Button onClick={() => { setForm(emptyPage); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-600 text-white h-8 px-3 text-sm gap-1.5">
              <Plus className="w-3.5 h-3.5" />New Page
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
            <div className="flex gap-3">
              <FileText className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Page Builder</p>
                <p className="text-xs text-blue-700 mt-0.5">
                  Create pages using content blocks: Hero, Text, Image + Text, Gallery, Pricing, CTA, FAQ, Reviews, Tour Cards, and Video.
                  After creating a page, click <strong>Blocks</strong> to add and arrange content.
                </p>
              </div>
            </div>
          </div>

          {pagesQuery.isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
          ) : (
            <div className="space-y-2">
              {pagesQuery.data?.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-4 hover:border-gray-300 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{p.title}</p>
                      <Badge variant={p.published ? "default" : "secondary"} className={p.published ? "bg-teal-50 text-teal-700 border-teal-200 text-xs" : "text-xs"}>
                        {p.published ? "Published" : "Draft"}
                      </Badge>
                      {p.showInNav && <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">In Nav</Badge>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">/page/{p.slug}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs gap-1.5 text-purple-600 border-purple-200 hover:bg-purple-50" onClick={() => navigate(`/admin/pages/${p.id}/blocks`)}>
                      <Layers className="w-3 h-3" />Blocks
                    </Button>
                    {p.published && (
                      <a href={`/page/${p.slug}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    )}
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700" onClick={() => {
                      setForm({ id: p.id, slug: p.slug, title: p.title, metaTitle: p.metaTitle ?? null, metaDescription: p.metaDescription ?? null, published: p.published, showInNav: p.showInNav, navLabel: p.navLabel ?? null, sortOrder: p.sortOrder });
                      setEditOpen(true);
                    }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:text-red-600" onClick={() => setDeleteId(p.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              {pagesQuery.data?.length === 0 && (
                <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl text-gray-400">
                  <Layers className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">No custom pages yet</p>
                  <p className="text-xs mt-1">Click "New Page" to create your first custom page.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* ── Create / Edit Dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-white border-gray-200 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4 border-b border-gray-100">
            <DialogTitle className="text-gray-900">{form.id ? "Edit Page" : "New Custom Page"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Page Title <span className="text-red-500">*</span></Label>
              <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. About Our Guides" className="border-gray-200 focus:border-teal-400" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">URL Slug <span className="text-red-500">*</span></Label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-2 whitespace-nowrap">/page/</span>
                <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="about-our-guides" className="border-gray-200 focus:border-teal-400" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">SEO Title <span className="text-gray-400 font-normal">(optional)</span></Label>
              <Input value={form.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value || null)} placeholder="Defaults to page title" className="border-gray-200 focus:border-teal-400" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">SEO Description <span className="text-gray-400 font-normal">(optional)</span></Label>
              <Textarea value={form.metaDescription ?? ""} onChange={(e) => set("metaDescription", e.target.value || null)} placeholder="Brief description for search engines..." rows={3} className="border-gray-200 focus:border-teal-400 resize-none" />
            </div>
            <div className="flex items-center gap-8 pt-1">
              <div className="flex items-center gap-3">
                <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
                <Label className="text-sm text-gray-700">Published</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.showInNav} onCheckedChange={(v) => set("showInNav", v)} />
                <Label className="text-sm text-gray-700">Show in Nav</Label>
              </div>
            </div>
            {form.showInNav && (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Nav Label</Label>
                <Input value={form.navLabel ?? ""} onChange={(e) => set("navLabel", e.target.value || null)} placeholder="Defaults to page title" className="border-gray-200 focus:border-teal-400" />
              </div>
            )}
          </div>
          <DialogFooter className="pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setEditOpen(false)} className="text-gray-600">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-600 text-white">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : form.id ? "Save Page" : "Create Page"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation ── */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete this page?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">This will delete the page and all its content blocks. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-200 text-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={() => { if (deleteId) del.mutate({ id: deleteId }); setDeleteId(null); }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
