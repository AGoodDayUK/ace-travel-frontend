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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Pencil, Trash2, ExternalLink, GripVertical, Image, X, MoveUp, MoveDown } from "lucide-react";
import { toast } from "sonner";

type ItineraryDay = { day: string; title: string; description: string; image?: string };
type Highlight = { title: string; description: string; image?: string };
type TourRow = {
  id: number; slug: string; name: string; destination: string; duration: string;
  price: string; deposit: string; groupSize: string; ageRange: string; rating: string;
  reviews: number; nextDeparture: string; heroImage: string; gallery: unknown;
  description: string; highlights: unknown; itinerary: unknown; included: unknown;
  notIncluded: unknown; published: boolean; sortOrder: number; createdAt: Date; updatedAt: Date;
};

const emptyTour = {
  slug: "", name: "", destination: "", duration: "", price: "", deposit: "£60",
  groupSize: "15-30", ageRange: "18-35", rating: "4.9", reviews: 0, nextDeparture: "",
  heroImage: "", gallery: [] as string[], description: "",
  highlights: [] as Highlight[],
  itinerary: [] as ItineraryDay[],
  included: [] as string[], notIncluded: [] as string[],
  published: true, sortOrder: 0,
};

// ── Small helper components ──────────────────────────────────────────────────

function StringListEditor({ label, value, onChange, placeholder }: {
  label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string;
}) {
  const add = () => onChange([...value, ""]);
  const update = (i: number, v: string) => { const a = [...value]; a[i] = v; onChange(a); };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">{label}</Label>
        <Button type="button" size="sm" variant="ghost" onClick={add} className="text-teal-400 hover:text-teal-300 h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />Add
        </Button>
      </div>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className="bg-gray-800 border-gray-700 text-white text-sm"
              placeholder={placeholder}
            />
            <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} className="text-red-500/60 hover:text-red-400 h-9 w-9 p-0 flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
        {value.length === 0 && (
          <p className="text-gray-600 text-xs italic">No items yet. Click Add to start.</p>
        )}
      </div>
    </div>
  );
}

function ItineraryEditor({ value, onChange }: { value: ItineraryDay[]; onChange: (v: ItineraryDay[]) => void }) {
  const add = () => onChange([...value, { day: `Day ${value.length + 1}`, title: "", description: "", image: "" }]);
  const update = (i: number, field: keyof ItineraryDay, v: string) => {
    const a = [...value]; a[i] = { ...a[i], [field]: v }; onChange(a);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const a = [...value];
    const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">Itinerary</Label>
        <Button type="button" size="sm" variant="ghost" onClick={add} className="text-teal-400 hover:text-teal-300 h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />Add Day
        </Button>
      </div>
      {value.length === 0 && <p className="text-gray-600 text-xs italic">No itinerary days yet.</p>}
      <div className="space-y-3">
        {value.map((day, i) => (
          <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <Button type="button" size="sm" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0} className="h-5 w-5 p-0 text-gray-500 hover:text-white">
                  <MoveUp className="w-3 h-3" />
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => move(i, 1)} disabled={i === value.length - 1} className="h-5 w-5 p-0 text-gray-500 hover:text-white">
                  <MoveDown className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input
                  value={day.day}
                  onChange={(e) => update(i, "day", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white text-sm"
                  placeholder="Days 1-2"
                />
                <Input
                  value={day.title}
                  onChange={(e) => update(i, "title", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white text-sm"
                  placeholder="Location / title"
                />
              </div>
              <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0 flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Textarea
              value={day.description}
              onChange={(e) => update(i, "description", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white text-sm min-h-[70px]"
              placeholder="What happens on this day..."
            />
            <div className="flex gap-2 items-center">
              <Image className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
              <Input
                value={day.image ?? ""}
                onChange={(e) => update(i, "image", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white text-xs"
                placeholder="Image URL (optional)"
              />
              {day.image && (
                <img src={day.image} alt="" className="h-8 w-12 object-cover rounded flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightsEditor({ value, onChange }: { value: Highlight[]; onChange: (v: Highlight[]) => void }) {
  const add = () => onChange([...value, { title: "", description: "", image: "" }]);
  const update = (i: number, field: keyof Highlight, v: string) => {
    const a = [...value]; a[i] = { ...a[i], [field]: v }; onChange(a);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">Highlights</Label>
        <Button type="button" size="sm" variant="ghost" onClick={add} className="text-teal-400 hover:text-teal-300 h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />Add Highlight
        </Button>
      </div>
      {value.length === 0 && <p className="text-gray-600 text-xs italic">No highlights yet.</p>}
      <div className="space-y-3">
        {value.map((h, i) => (
          <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-2">
            <div className="flex gap-2">
              <Input
                value={h.title}
                onChange={(e) => update(i, "title", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white text-sm flex-1"
                placeholder="Highlight title"
              />
              <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} className="text-red-500/60 hover:text-red-400 h-9 w-9 p-0 flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Textarea
              value={h.description}
              onChange={(e) => update(i, "description", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white text-sm min-h-[60px]"
              placeholder="Description of this highlight..."
            />
            <div className="flex gap-2 items-center">
              <Image className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
              <Input
                value={h.image ?? ""}
                onChange={(e) => update(i, "image", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white text-xs"
                placeholder="Image URL (optional)"
              />
              {h.image && (
                <img src={h.image} alt="" className="h-8 w-12 object-cover rounded flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [newUrl, setNewUrl] = useState("");
  const add = () => { if (newUrl.trim()) { onChange([...value, newUrl.trim()]); setNewUrl(""); } };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <Label className="text-gray-300">Gallery Images</Label>
      <div className="flex gap-2">
        <Input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          className="bg-gray-800 border-gray-700 text-white text-sm"
          placeholder="Paste image URL and press Add"
        />
        <Button type="button" size="sm" onClick={add} className="bg-teal-500 hover:bg-teal-400 text-gray-950 flex-shrink-0">
          <Plus className="w-3.5 h-3.5 mr-1" />Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-800">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-600/80 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-1 py-0.5 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}
      {value.length === 0 && <p className="text-gray-600 text-xs italic">No gallery images yet.</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CmsTours() {
  const utils = trpc.useUtils();
  const toursQuery = trpc.cms.tours.list.useQuery();
  const upsertMutation = trpc.cms.tours.upsert.useMutation({
    onSuccess: () => {
      utils.cms.tours.list.invalidate();
      setEditOpen(false);
      toast.success("Tour saved successfully");
    },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.cms.tours.delete.useMutation({
    onSuccess: () => { utils.cms.tours.list.invalidate(); toast.success("Tour deleted"); },
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
      highlights: (t.highlights as Highlight[]) ?? [],
      itinerary: (t.itinerary as ItineraryDay[]) ?? [],
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
                    <Badge variant={t.published ? "default" : "secondary"} className={t.published ? "bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs" : "text-xs"}>
                      {t.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{t.destination} · {t.duration} · {t.price}</p>
                  <p className="text-gray-500 text-xs">/tour/{t.slug}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <a href={`/tour/${t.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" title="View live">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => openEdit(t)} title="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(t.id)} title="Delete">
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
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">{form.id ? `Edit: ${form.name}` : "New Tour"}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="bg-gray-800 border border-gray-700 w-full">
              <TabsTrigger value="basics" className="flex-1 text-xs data-[state=active]:bg-teal-500 data-[state=active]:text-gray-950">Basics</TabsTrigger>
              <TabsTrigger value="content" className="flex-1 text-xs data-[state=active]:bg-teal-500 data-[state=active]:text-gray-950">Content</TabsTrigger>
              <TabsTrigger value="itinerary" className="flex-1 text-xs data-[state=active]:bg-teal-500 data-[state=active]:text-gray-950">Itinerary</TabsTrigger>
              <TabsTrigger value="media" className="flex-1 text-xs data-[state=active]:bg-teal-500 data-[state=active]:text-gray-950">Images</TabsTrigger>
            </TabsList>

            {/* ── Tab: Basics ── */}
            <TabsContent value="basics" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Tour Name *</Label>
                  <Input value={form.name} onChange={(e) => set("name", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="Thailand Island Hopper" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">URL Slug *</Label>
                  <Input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} className="bg-gray-800 border-gray-700 text-white" placeholder="thailand-island-hopper" />
                  <p className="text-gray-600 text-xs">Used in the URL: /tour/your-slug</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Destination</Label>
                  <Input value={form.destination} onChange={(e) => set("destination", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="Thailand" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Duration</Label>
                  <Input value={form.duration} onChange={(e) => set("duration", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="21 days" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Price (e.g. £1,599)</Label>
                  <Input value={form.price} onChange={(e) => set("price", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="£1,599" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Deposit</Label>
                  <Input value={form.deposit} onChange={(e) => set("deposit", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="£60" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Next Departure</Label>
                  <Input value={form.nextDeparture} onChange={(e) => set("nextDeparture", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="April 2026" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Group Size</Label>
                  <Input value={form.groupSize} onChange={(e) => set("groupSize", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="15-30" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Age Range</Label>
                  <Input value={form.ageRange} onChange={(e) => set("ageRange", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="18-35" />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
                <div>
                  <Label className="text-gray-300 text-sm">Published</Label>
                  <p className="text-gray-500 text-xs">{form.published ? "Visible on the website" : "Hidden from the website"}</p>
                </div>
              </div>
            </TabsContent>

            {/* ── Tab: Content ── */}
            <TabsContent value="content" className="space-y-5 pt-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Tour Description</Label>
                <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="bg-gray-800 border-gray-700 text-white min-h-[100px]" placeholder="Describe the tour in 2-3 sentences..." />
              </div>
              <HighlightsEditor value={form.highlights} onChange={(v) => set("highlights", v)} />
              <StringListEditor
                label="What's Included (one item per line)"
                value={form.included}
                onChange={(v) => set("included", v)}
                placeholder="e.g. 21 days accommodation included"
              />
              <StringListEditor
                label="Not Included (one item per line)"
                value={form.notIncluded}
                onChange={(v) => set("notIncluded", v)}
                placeholder="e.g. International flights"
              />
            </TabsContent>

            {/* ── Tab: Itinerary ── */}
            <TabsContent value="itinerary" className="pt-4">
              <ItineraryEditor value={form.itinerary} onChange={(v) => set("itinerary", v)} />
            </TabsContent>

            {/* ── Tab: Images ── */}
            <TabsContent value="media" className="space-y-5 pt-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Hero Image URL</Label>
                <Input value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="https://..." />
                {form.heroImage && (
                  <img src={form.heroImage} alt="Hero preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-gray-700" />
                )}
                <p className="text-gray-500 text-xs">Tip: upload the image in the Media Library first, then copy the URL here.</p>
              </div>
              <GalleryEditor value={form.gallery} onChange={(v) => set("gallery", v)} />
            </TabsContent>
          </Tabs>

          <DialogFooter className="pt-2 border-t border-gray-800">
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSave} disabled={upsertMutation.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950 min-w-[100px]">
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
            <AlertDialogDescription className="text-gray-400">This cannot be undone. The tour will be removed from the website immediately.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={() => { if (deleteId) deleteMutation.mutate({ id: deleteId }); setDeleteId(null); }}
            >Delete Tour</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
