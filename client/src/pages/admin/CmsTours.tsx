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
import { Loader2, Plus, Pencil, Trash2, ExternalLink, GripVertical, X, MoveUp, MoveDown } from "lucide-react";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { UnsavedChangesDialog } from "@/components/admin/UnsavedChangesDialog";

type ItineraryDay = { day: string; title: string; description: string; image?: string };
type Highlight = { title: string; description: string; image?: string };
type DepartureDate = { date: string; price: string; duration: string; badge?: string };
type FlightInfo = { flyIn: string; flyOut: string; notes: string };
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
  departureDates: [] as DepartureDate[],
  flightInfo: { flyIn: "", flyOut: "", notes: "" } as FlightInfo,
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
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <Button type="button" size="sm" variant="ghost" onClick={add} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />Add
        </Button>
      </div>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className="border-gray-200 text-gray-900 text-sm focus:border-teal-400"
              placeholder={placeholder}
            />
            <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 hover:bg-red-50 h-9 w-9 p-0 flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
        {value.length === 0 && (
          <p className="text-gray-400 text-xs italic">No items yet. Click Add to start.</p>
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
        <Label className="text-sm font-medium text-gray-700">Itinerary</Label>
        <Button type="button" size="sm" variant="ghost" onClick={add} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />Add Day
        </Button>
      </div>
      {value.length === 0 && <p className="text-gray-400 text-xs italic">No itinerary days yet.</p>}
      <div className="space-y-3">
        {value.map((day, i) => (
          <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <Button type="button" size="sm" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0} className="h-5 w-5 p-0 text-gray-400 hover:text-gray-700">
                  <MoveUp className="w-3 h-3" />
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => move(i, 1)} disabled={i === value.length - 1} className="h-5 w-5 p-0 text-gray-400 hover:text-gray-700">
                  <MoveDown className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input
                  value={day.day}
                  onChange={(e) => update(i, "day", e.target.value)}
                  className="border-gray-200 text-gray-900 text-sm"
                  placeholder="Days 1-2"
                />
                <Input
                  value={day.title}
                  onChange={(e) => update(i, "title", e.target.value)}
                  className="border-gray-200 text-gray-900 text-sm"
                  placeholder="Location / title"
                />
              </div>
              <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Textarea
              value={day.description}
              onChange={(e) => update(i, "description", e.target.value)}
              className="border-gray-200 text-gray-900 text-sm min-h-[70px]"
              placeholder="What happens on this day..."
            />
            <ImageUploadField
              label="Day Image (optional)"
              value={day.image ?? ""}
              onChange={(url) => update(i, "image", url)}
              previewHeight="h-24"
            />
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
        <Label className="text-sm font-medium text-gray-700">Highlights</Label>
        <Button type="button" size="sm" variant="ghost" onClick={add} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />Add Highlight
        </Button>
      </div>
      {value.length === 0 && <p className="text-gray-400 text-xs italic">No highlights yet.</p>}
      <div className="space-y-3">
        {value.map((h, i) => (
          <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="flex gap-2">
              <Input
                value={h.title}
                onChange={(e) => update(i, "title", e.target.value)}
                className="border-gray-200 text-gray-900 text-sm flex-1"
                placeholder="Highlight title"
              />
              <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 hover:bg-red-50 h-9 w-9 p-0 flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Textarea
              value={h.description}
              onChange={(e) => update(i, "description", e.target.value)}
              className="border-gray-200 text-gray-900 text-sm min-h-[60px]"
              placeholder="Description of this highlight..."
            />
            <ImageUploadField
              label="Highlight Image (optional)"
              value={h.image ?? ""}
              onChange={(url) => update(i, "image", url)}
              previewHeight="h-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const addUrl = (url: string) => { if (url.trim()) onChange([...value, url.trim()]); };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-700">Gallery Images</Label>
      <ImageUploadField
        value=""
        onChange={(url) => { if (url) addUrl(url); }}
        placeholder="Paste image URL to add to gallery"
        previewHeight="h-20"
        hint="Upload or paste a URL to add each image to the gallery"
      />
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
          {value.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500/90 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
              >
                <X className="w-3 h-3 text-white" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-1 py-0.5 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}
      {value.length === 0 && <p className="text-gray-400 text-xs italic">No gallery images yet.</p>}
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
      markClean();
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
  const { isDirty, markDirty, markClean, confirmLeave, handleNavigate, onConfirmLeave, onCancelLeave } = useUnsavedChanges();

  const openCreate = () => { markClean(); setForm(emptyTour); setEditOpen(true); };
  const openEdit = (t: TourRow) => { markClean();
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
      departureDates: ((t as any).departureDates as DepartureDate[]) ?? [],
      flightInfo: ((t as any).flightInfo as FlightInfo) ?? { flyIn: "", flyOut: "", notes: "" },
      published: t.published, sortOrder: t.sortOrder,
    });
    setEditOpen(true);
  };

  const set = (k: string, v: any) => { setForm((f) => ({ ...f, [k]: v })); markDirty(); };
  const handleSave = () => upsertMutation.mutate(form as any);

  return (
    <CmsLayout title="Tours">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">{toursQuery.data?.length ?? 0} tours</p>
          <Button onClick={openCreate} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />New Tour
          </Button>
        </div>

        {toursQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
        ) : (
          <div className="space-y-2">
            {toursQuery.data?.map((t) => (
              <div key={t.id} className="bg-white border border-gray-100 hover:border-teal-200 rounded-xl p-4 flex items-center gap-4 shadow-sm transition-all">
                <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                {t.heroImage && (
                  <img src={t.heroImage} alt={t.name} className="w-16 h-12 object-cover rounded-lg flex-shrink-0 border border-gray-100" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-gray-900 font-medium text-sm">{t.name}</p>
                    <Badge variant={t.published ? "default" : "secondary"} className={t.published ? "bg-teal-50 text-teal-700 border-teal-200 text-xs" : "text-xs bg-gray-100 text-gray-500"}>
                      {t.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{t.destination} · {t.duration} · {t.price}</p>
                  <p className="text-gray-400 text-xs">/tour/{t.slug}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <a href={`/tour/${t.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-teal-600 h-8 w-8 p-0" title="View live">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-700 h-8 w-8 p-0" onClick={() => openEdit(t)} title="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400/60 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0" onClick={() => setDeleteId(t.id)} title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit dialog */}
      <UnsavedChangesDialog open={confirmLeave} onConfirm={onConfirmLeave} onCancel={onCancelLeave} />

      <Dialog open={editOpen} onOpenChange={(open) => { if (!open) handleNavigate(() => setEditOpen(false)); else setEditOpen(true); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">{form.id ? `Edit: ${form.name}` : "New Tour"}</DialogTitle>
              {isDirty && <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 font-medium">Unsaved changes</span>}
            </div>
          </DialogHeader>

          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="bg-gray-50 border-b border-gray-100 w-full rounded-none px-6 h-11 gap-1 justify-start">
              <TabsTrigger value="basics" className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 rounded-md px-3 h-8">Basics</TabsTrigger>
              <TabsTrigger value="content" className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 rounded-md px-3 h-8">Content</TabsTrigger>
              <TabsTrigger value="itinerary" className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 rounded-md px-3 h-8">Itinerary</TabsTrigger>
              <TabsTrigger value="dates" className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 rounded-md px-3 h-8">Dates</TabsTrigger>
              <TabsTrigger value="media" className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 rounded-md px-3 h-8">Images</TabsTrigger>
            </TabsList>

            {/* ── Tab: Basics ── */}
            <TabsContent value="basics" className="space-y-5 px-6 py-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Tour Name *</Label>
                  <Input value={form.name} onChange={(e) => set("name", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="Thailand Island Hopper" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">URL Slug *</Label>
                  <Input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="thailand-island-hopper" />
                  <p className="text-gray-400 text-xs">Used in the URL: /tour/your-slug</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Destination</Label>
                  <Input value={form.destination} onChange={(e) => set("destination", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="Thailand" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Duration</Label>
                  <Input value={form.duration} onChange={(e) => set("duration", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="21 days" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Price (e.g. £1,599)</Label>
                  <Input value={form.price} onChange={(e) => set("price", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="£1,599" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Deposit</Label>
                  <Input value={form.deposit} onChange={(e) => set("deposit", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="£60" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Next Departure</Label>
                  <Input value={form.nextDeparture} onChange={(e) => set("nextDeparture", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="April 2026" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Group Size</Label>
                  <Input value={form.groupSize} onChange={(e) => set("groupSize", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="15-30" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Age Range</Label>
                  <Input value={form.ageRange} onChange={(e) => set("ageRange", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="18-35" />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 bg-gray-50 rounded-xl p-4">
                <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
                <div>
                  <Label className="text-gray-700 text-sm font-medium">Published</Label>
                  <p className="text-gray-500 text-xs">{form.published ? "Visible on the website" : "Hidden from the website"}</p>
                </div>
              </div>
            </TabsContent>

            {/* ── Tab: Content ── */}
            <TabsContent value="content" className="space-y-5 px-6 py-5">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Tour Description</Label>
                <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="border-gray-200 text-gray-900 min-h-[100px] focus:border-teal-400" placeholder="Describe the tour in 2-3 sentences..." />
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
            <TabsContent value="itinerary" className="px-6 py-5">
              <ItineraryEditor value={form.itinerary} onChange={(v) => set("itinerary", v)} />
            </TabsContent>

            {/* ── Tab: Departure Dates ── */}
            <TabsContent value="dates" className="space-y-5 px-6 py-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Departure Dates</Label>
                    <p className="text-gray-400 text-xs mt-0.5">Add all available departure dates for this tour</p>
                  </div>
                  <Button type="button" size="sm" variant="ghost" onClick={() => set("departureDates", [...(form.departureDates ?? []), { date: "", price: form.price, duration: form.duration, badge: "" }])} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-7 text-xs">
                    <Plus className="w-3 h-3 mr-1" />Add Date
                  </Button>
                </div>
                {(form.departureDates ?? []).length === 0 && (
                  <p className="text-gray-400 text-xs italic">No departure dates yet. Click Add Date to start.</p>
                )}
                <div className="space-y-3">
                  {(form.departureDates ?? []).map((d, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-gray-500 text-xs">Date</Label>
                            <Input
                              value={d.date}
                              onChange={(e) => { const a = [...(form.departureDates ?? [])]; a[i] = { ...a[i], date: e.target.value }; set("departureDates", a); }}
                              className="border-gray-200 text-gray-900 text-sm"
                              placeholder="e.g. 12 April 2026"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-gray-500 text-xs">Price</Label>
                            <Input
                              value={d.price}
                              onChange={(e) => { const a = [...(form.departureDates ?? [])]; a[i] = { ...a[i], price: e.target.value }; set("departureDates", a); }}
                              className="border-gray-200 text-gray-900 text-sm"
                              placeholder="£1,599"
                            />
                          </div>
                        </div>
                        <Button type="button" size="sm" variant="ghost" onClick={() => set("departureDates", (form.departureDates ?? []).filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 flex-shrink-0 mt-5">
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-gray-500 text-xs">Duration</Label>
                          <Input
                            value={d.duration}
                            onChange={(e) => { const a = [...(form.departureDates ?? [])]; a[i] = { ...a[i], duration: e.target.value }; set("departureDates", a); }}
                            className="border-gray-200 text-gray-900 text-sm"
                            placeholder="21 days"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-gray-500 text-xs">Badge (optional)</Label>
                          <Input
                            value={d.badge ?? ""}
                            onChange={(e) => { const a = [...(form.departureDates ?? [])]; a[i] = { ...a[i], badge: e.target.value }; set("departureDates", a); }}
                            className="border-gray-200 text-gray-900 text-sm"
                            placeholder="e.g. Selling Fast"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-5">
                <Label className="text-sm font-medium text-gray-700">Flight Information</Label>
                <p className="text-gray-400 text-xs">Displayed on the Flight Support page</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-gray-500 text-xs">Fly In (arrival airport)</Label>
                    <Input
                      value={(form.flightInfo ?? { flyIn: "" }).flyIn}
                      onChange={(e) => set("flightInfo", { ...(form.flightInfo ?? {}), flyIn: e.target.value })}
                      className="border-gray-200 text-gray-900 text-sm"
                      placeholder="e.g. Bangkok (BKK)"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-500 text-xs">Fly Out (departure airport)</Label>
                    <Input
                      value={(form.flightInfo ?? { flyOut: "" }).flyOut}
                      onChange={(e) => set("flightInfo", { ...(form.flightInfo ?? {}), flyOut: e.target.value })}
                      className="border-gray-200 text-gray-900 text-sm"
                      placeholder="e.g. Bali (DPS)"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-500 text-xs">Flight Notes</Label>
                  <Textarea
                    value={(form.flightInfo ?? { notes: "" }).notes}
                    onChange={(e) => set("flightInfo", { ...(form.flightInfo ?? {}), notes: e.target.value })}
                    className="border-gray-200 text-gray-900 text-sm min-h-[70px]"
                    placeholder="Any additional flight information..."
                  />
                </div>
              </div>
            </TabsContent>

            {/* ── Tab: Images ── */}
            <TabsContent value="media" className="space-y-5 px-6 py-5">
              <ImageUploadField
                label="Hero Image"
                value={form.heroImage}
                onChange={(url) => set("heroImage", url)}
                previewHeight="h-40"
                hint="This is the main image shown at the top of the tour page"
              />
              <GalleryEditor value={form.gallery} onChange={(v) => set("gallery", v)} />
            </TabsContent>
          </Tabs>

          <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <Button variant="outline" onClick={() => handleNavigate(() => setEditOpen(false))} className="border-gray-200 text-gray-600 bg-white">Cancel</Button>
            <Button onClick={handleSave} disabled={upsertMutation.isPending} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm min-w-[100px]">
              {upsertMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Tour"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete this tour?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">This cannot be undone. The tour will be removed from the website immediately.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => { if (deleteId) deleteMutation.mutate({ id: deleteId }); setDeleteId(null); }}
            >Delete Tour</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
