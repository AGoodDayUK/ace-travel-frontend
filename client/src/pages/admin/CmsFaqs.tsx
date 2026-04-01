import { useState } from "react";
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
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const emptyFaq = { question: "", answer: "", category: "general", sortOrder: 0, published: true };

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

  // Group by category
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
          <p className="text-gray-400 text-sm">{faqsQuery.data?.length ?? 0} FAQs</p>
          <Button onClick={() => { setForm(emptyFaq); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
            <Plus className="w-4 h-4 mr-2" />New FAQ
          </Button>
        </div>

        {faqsQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 capitalize">{cat}</h3>
                <div className="space-y-2">
                  {items?.map((f) => (
                    <div key={f.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white text-sm font-medium">{f.question}</p>
                          {!f.published && <Badge variant="secondary" className="text-xs">Hidden</Badge>}
                        </div>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{f.answer}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => {
                          setForm({ id: f.id, question: f.question, answer: f.answer, category: f.category, sortOrder: f.sortOrder, published: f.published });
                          setEditOpen(true);
                        }}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(f.id)}>
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
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{form.id ? "Edit FAQ" : "New FAQ"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-gray-300">Question</Label>
              <Input value={form.question} onChange={(e) => set("question", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Answer</Label>
              <Textarea value={form.answer} onChange={(e) => set("answer", e.target.value)} className="bg-gray-800 border-gray-700 text-white min-h-[120px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Category</Label>
                <Input value={form.category} onChange={(e) => set("category", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="general, booking, scuba..." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Sort Order</Label>
                <Input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)} className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
              <Label className="text-gray-300">Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save FAQ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this FAQ?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This cannot be undone.</AlertDialogDescription>
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
