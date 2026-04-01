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
import { Loader2, Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

const emptyReview = {
  authorName: "", authorAge: null as number | null, authorLocation: null as string | null,
  authorPhoto: null as string | null, rating: 5, reviewText: "",
  tourSlug: null as string | null, tourName: null as string | null,
  reviewDate: null as string | null, published: true, featured: false, sortOrder: 0,
};

export default function CmsReviews() {
  const utils = trpc.useUtils();
  const reviewsQuery = trpc.cms.reviews.list.useQuery();
  const upsert = trpc.cms.reviews.upsert.useMutation({
    onSuccess: () => { utils.cms.reviews.list.invalidate(); setEditOpen(false); toast.success("Review saved"); },
    onError: (e) => toast.error(e.message),
  });
  const del = trpc.cms.reviews.delete.useMutation({
    onSuccess: () => { utils.cms.reviews.list.invalidate(); toast.success("Review deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyReview & { id?: number }>(emptyReview);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <CmsLayout title="Reviews">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">{reviewsQuery.data?.length ?? 0} reviews</p>
          <Button onClick={() => { setForm(emptyReview); setEditOpen(true); }} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
            <Plus className="w-4 h-4 mr-2" />New Review
          </Button>
        </div>

        {reviewsQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : (
          <div className="space-y-3">
            {reviewsQuery.data?.map((r) => (
              <div key={r.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-400 text-sm font-bold">{r.authorName.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-medium">{r.authorName}</p>
                    {r.featured && <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">Featured</Badge>}
                    {!r.published && <Badge variant="secondary" className="text-xs">Hidden</Badge>}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
                    ))}
                    {r.tourName && <span className="text-gray-500 text-xs ml-1">{r.tourName}</span>}
                  </div>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{r.reviewText}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => {
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
                  <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(r.id)}>
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
          <DialogHeader><DialogTitle>{form.id ? "Edit Review" : "New Review"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Author Name</Label>
                <Input value={form.authorName} onChange={(e) => set("authorName", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Age (optional)</Label>
                <Input type="number" value={form.authorAge ?? ""} onChange={(e) => set("authorAge", e.target.value ? parseInt(e.target.value) : null)} className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Location</Label>
                <Input value={form.authorLocation ?? ""} onChange={(e) => set("authorLocation", e.target.value || null)} className="bg-gray-800 border-gray-700 text-white" placeholder="Manchester, UK" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Rating (1-5)</Label>
                <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => set("rating", parseInt(e.target.value) || 5)} className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Review Text</Label>
              <Textarea value={form.reviewText} onChange={(e) => set("reviewText", e.target.value)} className="bg-gray-800 border-gray-700 text-white min-h-[100px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300">Tour Name</Label>
                <Input value={form.tourName ?? ""} onChange={(e) => set("tourName", e.target.value || null)} className="bg-gray-800 border-gray-700 text-white" placeholder="Thailand Island Hopper" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300">Review Date</Label>
                <Input value={form.reviewDate ?? ""} onChange={(e) => set("reviewDate", e.target.value || null)} className="bg-gray-800 border-gray-700 text-white" placeholder="March 2025" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Author Photo URL (optional)</Label>
              <Input value={form.authorPhoto ?? ""} onChange={(e) => set("authorPhoto", e.target.value || null)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
                <Label className="text-gray-300">Published</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
                <Label className="text-gray-300">Featured</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={() => upsert.mutate(form as any)} disabled={upsert.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this review?</AlertDialogTitle>
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
