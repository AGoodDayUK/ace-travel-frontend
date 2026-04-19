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
import { TourSelectField } from "@/components/admin/TourSelectField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const emptyDeal = {
  title: "", description: "", discount: "", validUntil: "", image: "",
  tourId: null as number | null, active: true, sortOrder: 0,
};

export default function CmsDeals() {
  const utils = trpc.useUtils();
  const dealsQuery = trpc.cms.deals.list.useQuery();
  const toursQuery = trpc.cms.tours.list.useQuery();
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

  const tours = toursQuery.data ?? [];
  const getTourName = (id: number | null) => tours.find((t) => t.id === id)?.name ?? null;

  return (
    <CmsLayout title="Deals &amp; Offers">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">{dealsQuery.data?.length ?? 0} deals</p>
          <Button onClick={() => { setForm(emptyDeal); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />New Deal
          </Button>
        </div>

        {dealsQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
        ) : (
          <div className="space-y-2">
            {dealsQuery.data?.map((d) => (
              <div key={d.id} className="bg-white border border-gray-100 hover:border-teal-200 rounded-xl p-4 flex items-center gap-4 shadow-sm transition-all">
                {d.image && (
                  <img src={d.image} alt={d.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0 border border-gray-100" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-gray-900 font-medium text-sm">{d.title}</p>
                    <Badge className={d.active ? "bg-teal-50 text-teal-700 border-teal-200 text-xs" : "bg-gray-100 text-gray-500 text-xs"}>
                      {d.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {d.discount}{d.validUntil ? ` · Valid until ${d.validUntil}` : ""}
                    {d.tourId ? ` · ${getTourName(d.tourId) ?? "Linked tour"}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-700 h-8 w-8 p-0" onClick={() => {
                    setForm({ id: d.id, title: d.title, description: d.description, discount: d.discount, validUntil: d.validUntil, image: d.image, tourId: d.tourId ?? null, active: d.active, sortOrder: d.sortOrder });
                    setEditOpen(true);
                  }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400/60 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0" onClick={() => setDeleteId(d.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
          <DialogHeader><DialogTitle className="text-gray-900">{form.id ? "Edit Deal" : "New Deal"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Title *</Label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="Early Bird Discount" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="border-gray-200 text-gray-900 min-h-[80px] focus:border-teal-400" placeholder="Describe the deal..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Discount Label</Label>
                <Input value={form.discount} onChange={(e) => set("discount", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="£100 off" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Valid Until</Label>
                <Input value={form.validUntil} onChange={(e) => set("validUntil", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="31 Dec 2025" />
              </div>
            </div>

            {/* Tour dropdown from DB */}
            <TourSelectField
              label="Linked Tour (optional)"
              tourId={form.tourId}
              onChange={(tour) => set("tourId", tour?.id ?? null)}
            />

            <ImageUploadField
              label="Deal Image"
              value={form.image}
              onChange={(url) => set("image", url)}
              previewHeight="h-32"
              hint="Upload or paste a URL for the deal's featured image"
            />

            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <Switch checked={form.active} onCheckedChange={(v) => set("active", v)} />
              <div>
                <Label className="text-gray-700 text-sm font-medium">Active</Label>
                <p className="text-gray-400 text-xs">{form.active ? "Visible on the Deals page" : "Hidden from the Deals page"}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-gray-200 text-gray-600">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Deal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete this deal?</AlertDialogTitle>
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
