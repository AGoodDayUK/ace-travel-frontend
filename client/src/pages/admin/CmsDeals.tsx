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

const emptyDeal = { title: "", description: "", discount: "", validUntil: "", image: "", tourId: null as number | null, active: true, sortOrder: 0 };

export default function CmsDeals() {
  const utils = trpc.useUtils();
  const dealsQuery = trpc.cms.deals.list.useQuery();
  const upsert = trpc.cms.deals.upsert.useMutation({
    onSuccess: () => { utils.cms.deals.list.invalidate(); setEditOpen(false); toast.success("Deal saved"); },
    onError: (e) => toast.error(e.message),
  });
  const del = trpc.cms.deals.delete.useMutation({
    onSuccess: () => { utils.cms.deals.list.invalidate(); toast.success("Deal deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyDeal & { id?: number }>(emptyDeal);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <CmsLayout title="Deals">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">{dealsQuery.data?.length ?? 0} deals</p>
          <Button onClick={() => { setForm(emptyDeal); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
            <Plus className="w-4 h-4 mr-2" />New Deal
          </Button>
        </div>

        {dealsQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : (
          <div className="space-y-3">
            {dealsQuery.data?.map((d) => (
              <div key={d.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                {d.image && <img src={d.image} alt={d.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-medium text-sm">{d.title}</p>
                    <Badge variant={d.active ? "default" : "secondary"} className={d.active ? "bg-teal-500/20 text-teal-400 border-teal-500/30" : ""}>
                      {d.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{d.discount} · Valid until {d.validUntil}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => {
                    setForm({ id: d.id, title: d.title, description: d.description, discount: d.discount, validUntil: d.validUntil, image: d.image, tourId: d.tourId ?? null, active: d.active, sortOrder: d.sortOrder });
                    setEditOpen(true);
                  }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(d.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{form.id ? "Edit Deal" : "New Deal"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-gray-300">Title</Label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Description</Label>
              <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Discount Label</Label>
                <Input value={form.discount} onChange={(e) => set("discount", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="£100 off" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Valid Until</Label>
                <Input value={form.validUntil} onChange={(e) => set("validUntil", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="31 Dec 2025" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Image URL</Label>
              <Input value={form.image} onChange={(e) => set("image", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="https://..." />
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-2 h-24 w-full object-cover rounded-lg border border-gray-700" />
              )}
              <p className="text-gray-500 text-xs">Tip: upload in Media Library first, then paste the URL here.</p>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.active} onCheckedChange={(v) => set("active", v)} />
              <Label className="text-gray-300">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Deal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this deal?</AlertDialogTitle>
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
