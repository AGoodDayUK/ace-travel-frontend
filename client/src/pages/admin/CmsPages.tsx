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
import { Loader2, Plus, Pencil, Trash2, ExternalLink, Layers } from "lucide-react";
import { toast } from "sonner";

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
      // Navigate to block editor for new pages
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

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!form.id) {
      set("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  return (
    <CmsLayout title="Pages">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">{pagesQuery.data?.length ?? 0} custom pages</p>
          <Button onClick={() => { setForm(emptyPage); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
            <Plus className="w-4 h-4 mr-2" />New Page
          </Button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm text-gray-400">
          <p className="font-medium text-gray-300 mb-1">Page Builder</p>
          <p>Create new pages using content blocks: Hero, Text, Image + Text, Gallery, Pricing, CTA, FAQ, Reviews, Tour Cards, and Video. After creating a page, click the Blocks button to add and arrange content.</p>
        </div>

        {pagesQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : (
          <div className="space-y-3">
            {pagesQuery.data?.map((p) => (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-medium text-sm">{p.title}</p>
                    <Badge variant={p.published ? "default" : "secondary"} className={p.published ? "bg-teal-500/20 text-teal-400 border-teal-500/30" : ""}>
                      {p.published ? "Published" : "Draft"}
                    </Badge>
                    {p.showInNav && <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Nav</Badge>}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">/{p.slug}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-teal-400 h-8 px-2 gap-1.5 text-xs" onClick={() => navigate(`/admin/pages/${p.id}/blocks`)}>
                    <Layers className="w-3.5 h-3.5" />Blocks
                  </Button>
                  {p.published && (
                    <a href={`/page/${p.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  )}
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => {
                    setForm({ id: p.id, slug: p.slug, title: p.title, metaTitle: p.metaTitle ?? null, metaDescription: p.metaDescription ?? null, published: p.published, showInNav: p.showInNav, navLabel: p.navLabel ?? null, sortOrder: p.sortOrder });
                    setEditOpen(true);
                  }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(p.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            {pagesQuery.data?.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No custom pages yet.</p>
                <p className="text-sm mt-1">Click "New Page" to create your first page.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{form.id ? "Edit Page" : "New Page"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-gray-300">Page Title</Label>
              <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="About Our Guides" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">/page/</span>
                <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="about-our-guides" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">SEO Title (optional)</Label>
              <Input value={form.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value || null)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">SEO Description (optional)</Label>
              <Textarea value={form.metaDescription ?? ""} onChange={(e) => set("metaDescription", e.target.value || null)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
                <Label className="text-gray-300">Published</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.showInNav} onCheckedChange={(v) => set("showInNav", v)} />
                <Label className="text-gray-300">Show in Nav</Label>
              </div>
            </div>
            {form.showInNav && (
              <div className="space-y-1.5">
                <Label className="text-gray-300">Nav Label</Label>
                <Input value={form.navLabel ?? ""} onChange={(e) => set("navLabel", e.target.value || null)} className="bg-gray-800 border-gray-700 text-white" placeholder="Defaults to page title" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : form.id ? "Save Page" : "Create Page"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this page?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This will delete the page and all its content blocks. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-500 text-white" onClick={() => { if (deleteId) del.mutate({ id: deleteId }); setDeleteId(null); }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
