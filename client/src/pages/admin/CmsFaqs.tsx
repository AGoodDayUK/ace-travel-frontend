import { useState } from "react";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const emptyFaq = { question: "", answer: "", category: "general", sortOrder: 0, published: true };

const CATEGORIES = ["general", "booking", "scuba", "flights", "accommodation", "payments", "health-safety"];

export default function CmsFaqs() {
  const utils = trpc.useUtils();
  const faqsQuery = trpc.cms.faqs.list.useQuery();
  const upsert = trpc.cms.faqs.upsert.useMutation({
    onSuccess: () => { utils.cms.faqs.list.invalidate(); setEditOpen(false); toast.success("FAQ saved"); },
    onError: (e) => toast.error(e.message),
  });
  const del = trpc.cms.faqs.delete.useMutation({
    onSuccess: () => { utils.cms.faqs.list.invalidate(); toast.success("FAQ deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyFaq & { id?: number }>(emptyFaq);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const grouped = (faqsQuery.data ?? []).reduce<Record<string, typeof faqsQuery.data>>((acc, f) => {
    const cat = f.category ?? "general";
    if (!acc[cat]) acc[cat] = [];
    acc[cat]!.push(f);
    return acc;
  }, {});

  return (
    <CmsLayout title="FAQs">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">{faqsQuery.data?.length ?? 0} FAQs</p>
          <Button onClick={() => { setForm(emptyFaq); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />New FAQ
          </Button>
        </div>

        {faqsQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 capitalize">{cat}</h3>
                <div className="space-y-2">
                  {items?.map((f) => (
                    <div key={f.id} className="bg-white border border-gray-100 hover:border-teal-200 rounded-xl p-4 flex items-start gap-4 shadow-sm transition-all">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-gray-900 text-sm font-medium">{f.question}</p>
                          {!f.published && <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-500">Hidden</Badge>}
                        </div>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{f.answer}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-700 h-8 w-8 p-0" onClick={() => {
                          setForm({ id: f.id, question: f.question, answer: f.answer, category: f.category, sortOrder: f.sortOrder, published: f.published });
                          setEditOpen(true);
                        }}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400/60 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0" onClick={() => setDeleteId(f.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
          <DialogHeader><DialogTitle className="text-gray-900">{form.id ? "Edit FAQ" : "New FAQ"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Question *</Label>
              <Input value={form.question} onChange={(e) => set("question", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="What is included in the tour price?" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Answer *</Label>
              <Textarea value={form.answer} onChange={(e) => set("answer", e.target.value)} className="border-gray-200 text-gray-900 min-h-[120px] focus:border-teal-400" placeholder="Your answer here..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1).replace(/-/g, " ")}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Sort Order</Label>
                <Input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)} className="border-gray-200 text-gray-900 focus:border-teal-400" />
                <p className="text-gray-400 text-xs">Lower number = shown first</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
              <div>
                <Label className="text-gray-700 text-sm font-medium">Published</Label>
                <p className="text-gray-400 text-xs">{form.published ? "Visible on the FAQs page" : "Hidden from the FAQs page"}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-gray-200 text-gray-600">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save FAQ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete this FAQ?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={() => { if (deleteId) del.mutate({ id: deleteId }); setDeleteId(null); }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
