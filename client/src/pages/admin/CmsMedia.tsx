import { useState, useRef } from "react";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, Upload, Pencil, Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CmsMedia() {
  const utils = trpc.useUtils();
  const mediaQuery = trpc.cms.media.list.useQuery();
  const uploadMutation = trpc.cms.media.upload.useMutation({
    onSuccess: () => { utils.cms.media.list.invalidate(); toast.success("Image uploaded"); },
    onError: (e) => toast.error(e.message),
  });
  const updateAlt = trpc.cms.media.updateAlt.useMutation({
    onSuccess: () => { utils.cms.media.list.invalidate(); setEditItem(null); toast.success("Alt text saved"); },
    onError: (e) => toast.error(e.message),
  });
  const del = trpc.cms.media.delete.useMutation({
    onSuccess: () => { utils.cms.media.list.invalidate(); toast.success("Image deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [editItem, setEditItem] = useState<{ id: number; altText: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      if (file.size > 16 * 1024 * 1024) { toast.error(`${file.name} is too large (max 16MB)`); continue; }
      const reader = new FileReader();
      await new Promise<void>((resolve) => {
        reader.onload = async () => {
          const base64 = (reader.result as string).split(",")[1];
          await uploadMutation.mutateAsync({
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            base64: base64!,
            altText: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          });
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = (mediaQuery.data ?? []).filter((m) =>
    !search || m.originalName.toLowerCase().includes(search.toLowerCase()) || (m.altText ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CmsLayout title="Media Library">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="bg-gray-900 border-gray-700 text-white max-w-xs"
          />
          <div className="ml-auto">
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
            <Button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="bg-teal-500 hover:bg-teal-400 text-gray-950"
            >
              {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>
          </div>
        </div>

        <p className="text-gray-400 text-sm">{filtered.length} images</p>

        {mediaQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((m) => (
              <div key={m.id} className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="aspect-square">
                  <img src={m.url} alt={m.altText ?? m.originalName} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-2">
                  <p className="text-gray-300 text-xs truncate">{m.originalName}</p>
                  {m.altText && <p className="text-gray-500 text-xs truncate">{m.altText}</p>}
                </div>
                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white" onClick={() => copyUrl(m.id, m.url)} title="Copy URL">
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white" onClick={() => setEditItem({ id: m.id, altText: m.altText ?? "" })} title="Edit alt text">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/40 text-red-400" onClick={() => setDeleteId(m.id)} title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit alt text */}
      <Dialog open={editItem !== null} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-sm">
          <DialogHeader><DialogTitle>Edit Alt Text</DialogTitle></DialogHeader>
          <div className="py-2 space-y-1.5">
            <Label className="text-gray-300">Alt Text (for accessibility and SEO)</Label>
            <Input
              value={editItem?.altText ?? ""}
              onChange={(e) => setEditItem((i) => i ? { ...i, altText: e.target.value } : null)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Describe the image..."
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditItem(null)} className="text-gray-400">Cancel</Button>
            <Button
              onClick={() => editItem && updateAlt.mutate({ id: editItem.id, altText: editItem.altText })}
              disabled={updateAlt.isPending}
              className="bg-teal-500 hover:bg-teal-400 text-gray-950"
            >
              {updateAlt.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this image?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This removes it from the library. Any pages using this image URL will show a broken image.</AlertDialogDescription>
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
