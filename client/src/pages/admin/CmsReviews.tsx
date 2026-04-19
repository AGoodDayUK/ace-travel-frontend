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
import { Loader2, Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { TourSelectField } from "@/components/admin/TourSelectField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { UnsavedChangesDialog } from "@/components/admin/UnsavedChangesDialog";

const emptyReview = {
  authorName: "", authorAge: null as number | null, authorLocation: null as string | null,
  authorPhoto: null as string | null, rating: 5, reviewText: "",
  tourSlug: null as string | null, tourName: null as string | null,
  reviewDate: null as string | null, published: true, featured: false, sortOrder: 0,
};

export default function CmsReviews() {
  const utils = trpc.useUtils();
  const reviewsQuery = trpc.cms.reviews.list.useQuery();
  const toursQuery = trpc.cms.tours.list.useQuery();
  const upsert = trpc.cms.reviews.upsert.useMutation({
    onSuccess: () => { utils.cms.reviews.list.invalidate(); markClean(); setEditOpen(false); toast.success("Review saved"); },
    onError: (e) => toast.error(e.message),
  });
  const del = trpc.cms.reviews.delete.useMutation({
    onSuccess: () => { utils.cms.reviews.list.invalidate(); toast.success("Review deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyReview & { id?: number }>(emptyReview);
  const { isDirty, markDirty, markClean, confirmLeave, handleNavigate, onConfirmLeave, onCancelLeave } = useUnsavedChanges();
  const set = (k: string, v: any) => { setForm((f) => ({ ...f, [k]: v })); markDirty(); };

  // For the tour dropdown in reviews we use tourSlug+tourName (reviews don't store tourId)
  const tours = toursQuery.data ?? [];

  return (
    <CmsLayout title="Reviews">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">{reviewsQuery.data?.length ?? 0} reviews</p>
          <Button onClick={() => { setForm(emptyReview); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />New Review
          </Button>
        </div>

        {reviewsQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
        ) : (
          <div className="space-y-2">
            {reviewsQuery.data?.map((r) => (
              <div key={r.id} className="bg-white border border-gray-100 hover:border-teal-200 rounded-xl p-4 flex items-start gap-4 shadow-sm transition-all">
                {r.authorPhoto ? (
                  <img src={r.authorPhoto} alt={r.authorName} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-100" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-700 text-sm font-bold">{r.authorName.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-gray-900 font-medium text-sm">{r.authorName}</p>
                    {r.featured && <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">Featured</Badge>}
                    {!r.published && <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-500">Hidden</Badge>}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                    ))}
                    {r.tourName && <span className="text-gray-400 text-xs ml-1">· {r.tourName}</span>}
                  </div>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{r.reviewText}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-700 h-8 w-8 p-0" onClick={() => {
                    setForm({
                      id: r.id, authorName: r.authorName, authorAge: r.authorAge ?? null,
                      authorLocation: r.authorLocation ?? null, authorPhoto: r.authorPhoto ?? null,
                      rating: r.rating, reviewText: r.reviewText, tourSlug: r.tourSlug ?? null,
                      tourName: r.tourName ?? null, reviewDate: r.reviewDate ?? null,
                      published: r.published, featured: r.featured, sortOrder: r.sortOrder,
                    });
                    setEditOpen(true);
                  }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400/60 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0" onClick={() => setDeleteId(r.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <UnsavedChangesDialog open={confirmLeave} onConfirm={onConfirmLeave} onCancel={onCancelLeave} />

      <Dialog open={editOpen} onOpenChange={(open) => { if (!open) handleNavigate(() => setEditOpen(false)); else setEditOpen(true); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg max-h-[90vh] overflow-y-auto shadow-xl p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">{form.id ? "Edit Review" : "New Review"}</DialogTitle>
              {isDirty && <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 font-medium">Unsaved changes</span>}
            </div>
          </DialogHeader>
          <div className="space-y-5 px-6 py-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Author Name *</Label>
                <Input value={form.authorName} onChange={(e) => set("authorName", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="Sarah M." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Age (optional)</Label>
                <Input type="number" value={form.authorAge ?? ""} onChange={(e) => set("authorAge", e.target.value ? parseInt(e.target.value) : null)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="24" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Location (optional)</Label>
                <Input value={form.authorLocation ?? ""} onChange={(e) => set("authorLocation", e.target.value || null)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="Manchester, UK" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Review Date</Label>
                <Input value={form.reviewDate ?? ""} onChange={(e) => set("reviewDate", e.target.value || null)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="March 2025" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => set("rating", star)} className="focus:outline-none p-0.5">
                    <Star className={`w-7 h-7 transition-colors ${star <= form.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 hover:text-amber-300"}`} />
                  </button>
                ))}
                <span className="text-gray-500 text-sm ml-2">{form.rating}/5</span>
              </div>
            </div>

            {/* Tour dropdown from DB */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Tour (optional)</Label>
              <select
                value={form.tourSlug ?? "__none__"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "__none__") { set("tourSlug", null); set("tourName", null); return; }
                  const tour = tours.find((t) => t.slug === val);
                  if (tour) { set("tourSlug", tour.slug); set("tourName", tour.name); }
                }}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20"
              >
                <option value="__none__">— No tour linked —</option>
                {tours.map((t) => (
                  <option key={t.id} value={t.slug}>{t.name} ({t.destination})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Review Text *</Label>
              <Textarea value={form.reviewText} onChange={(e) => set("reviewText", e.target.value)} className="border-gray-200 text-gray-900 min-h-[100px] focus:border-teal-400" placeholder="What did they say about their experience..." />
            </div>

            <ImageUploadField
              label="Author Photo (optional)"
              value={form.authorPhoto ?? ""}
              onChange={(url) => set("authorPhoto", url || null)}
              previewHeight="h-20"
              hint="Upload a profile photo or paste a URL"
            />

            <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-3">
                <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
                <div>
                  <Label className="text-gray-700 text-sm font-medium">Published</Label>
                  <p className="text-gray-400 text-xs">Visible on the site</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
                <div>
                  <Label className="text-gray-700 text-sm font-medium">Featured</Label>
                  <p className="text-gray-400 text-xs">Show on homepage</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <Button variant="outline" onClick={() => handleNavigate(() => setEditOpen(false))} className="border-gray-200 text-gray-600 bg-white">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete this review?</AlertDialogTitle>
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
