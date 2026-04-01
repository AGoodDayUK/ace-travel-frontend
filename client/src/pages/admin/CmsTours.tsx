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
import { Loader2, Plus, Pencil, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { toast } from "sonner";

type TourRow = { id: number; slug: string; name: string; destination: string; duration: string; price: string; deposit: string; groupSize: string; ageRange: string; rating: string; reviews: number; nextDeparture: string; heroImage: string; gallery: unknown; description: string; highlights: unknown; itinerary: unknown; included: unknown; notIncluded: unknown; published: boolean; sortOrder: number; createdAt: Date; updatedAt: Date; };

const emptyTour = {
  slug: "", name: "", destination: "", duration: "", price: "", deposit: "",
  groupSize: "", ageRange: "", rating: "4.9", reviews: 0, nextDeparture: "",
  heroImage: "", gallery: [] as string[], description: "", highlights: [] as string[],
  itinerary: [] as { day: string; title: string; description: string }[],
  included: [] as string[], notIncluded: [] as string[],
  published: true, sortOrder: 0,
};

export default function CmsTours() {
  const utils = trpc.useUtils();
  const toursQuery = trpc.cms.tours.list.useQuery();
  const upsertMutation = trpc.cms.tours.upsert.useMutation({
    onSuccess: () => {
      utils.cms.tours.list.invalidate();
      setEditOpen(false);
      toast.success("Tour saved");
    },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.cms.tours.delete.useMutation({
    onSuccess: () => {
      utils.cms.tours.list.invalidate();
      toast.success("Tour deleted");
    },
    onError: (e) => toast.error(e.message),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyTour & { id?: number }>(emptyTour);

  const openCreate = () => { setForm(emptyTour); setEditOpen(true); };
  const openEdit = (t: TourRow) => {
    setForm({
      id: t.id, slug: t.slug, name: t.name, destination: t.destination,
      duration: t.duration, price: t.price, deposit: t.deposit,
      groupSize: t.groupSize, ageRange: t.ageRange, rating: t.rating,
      reviews: t.reviews, nextDeparture: t.nextDeparture, heroImage: t.heroImage,
      gallery: (t.gallery as string[]) ?? [],
      description: t.description,
      highlights: (t.highlights as string[]) ?? [],
      itinerary: (t.itinerary as any[]) ?? [],
      included: (t.included as string[]) ?? [],
      notIncluded: (t.notIncluded as string[]) ?? [],
      published: t.published, sortOrder: t.sortOrder,
    });
    setEditOpen(true);
  };

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => upsertMutation.mutate(form as any);

  return (
    <CmsLayout title="Tours">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">{toursQuery.data?.length ?? 0} tours</p>
          <Button onClick={openCreate} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
            <Plus className="w-4 h-4 mr-2" />New Tour
          </Button>
        </div>

        {toursQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : (
          <div className="space-y-3">
            {toursQuery.data?.map((t) => (
              <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-gray-600 flex-shrink-0" />
                {t.heroImage && (
                  <img src={t.heroImage} alt={t.name} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <Badge variant={t.published ? "default" : "secondary"} className={t.published ? "bg-teal-500/20 text-teal-400 border-teal-500/30" : ""}>
                      {t.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{t.destination} · {t.duration} · {t.price}</p>
                  <p className="text-gray-500 text-xs">/tour/{t.slug}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={`/tour/${t.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => openEdit(t)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(t.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Tour" : "New Tour"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Tour Name</Label>
                <Input value={form.name} onChange={(e) => set("name", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Slug (URL)</Label>
                <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="thailand-island-hopper" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Destination</Label>
                <Input value={form.destination} onChange={(e) => set("destination", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Duration</Label>
                <Input value={form.duration} onChange={(e) => set("duration", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="14 days" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Price</Label>
                <Input value={form.price} onChange={(e) => set("price", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="£1,299" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Deposit</Label>
                <Input value={form.deposit} onChange={(e) => set("deposit", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="£250" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Next Departure</Label>
                <Input value={form.nextDeparture} onChange={(e) => set("nextDeparture", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="June 2025" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Group Size</Label>
                <Input value={form.groupSize} onChange={(e) => set("groupSize", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="8-16 people" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Age Range</Label>
                <Input value={form.ageRange} onChange={(e) => set("ageRange", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="18-35" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Hero Image URL</Label>
              <Input value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="https://..." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Description</Label>
              <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="bg-gray-800 border-gray-700 text-white min-h-[100px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Highlights (one per line)</Label>
              <Textarea
                value={form.highlights.join("\n")}
                onChange={(e) => set("highlights", e.target.value.split("\n").filter(Boolean))}
                className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
                placeholder="Snorkelling at Koh Tao&#10;Full moon party&#10;..."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Included (one per line)</Label>
              <Textarea
                value={form.included.join("\n")}
                onChange={(e) => set("included", e.target.value.split("\n").filter(Boolean))}
                className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Not Included (one per line)</Label>
              <Textarea
                value={form.notIncluded.join("\n")}
                onChange={(e) => set("notIncluded", e.target.value.split("\n").filter(Boolean))}
                className="bg-gray-800 border-gray-700 text-white min-h-[60px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Itinerary (JSON)</Label>
              <Textarea
                value={JSON.stringify(form.itinerary, null, 2)}
                onChange={(e) => {
                  try { set("itinerary", JSON.parse(e.target.value)); } catch {}
                }}
                className="bg-gray-800 border-gray-700 text-white font-mono text-xs min-h-[120px]"
                placeholder='[{"day":"Day 1","title":"Arrival","description":"..."}]'
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
              <Label className="text-gray-300">Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSave} disabled={upsertMutation.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {upsertMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Tour"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this tour?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={() => { if (deleteId) deleteMutation.mutate({ id: deleteId }); setDeleteId(null); }}
            >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
