import { useState, useRef } from "react";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, Upload, Pencil, Trash2, Copy, Check, ImageIcon } from "lucide-react";
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
  const dropRef = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState(false);
  const [editItem, setEditItem] = useState<{ id: number; altText: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState(false);

  const processFiles = async (files: File[]) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => processFiles(Array.from(e.target.files ?? []));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/")));
  };

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = (mediaQuery.data ?? []).filter((m) =>
    !search || m.originalName.toLowerCase().includes(search.toLowerCase()) || (m.altText ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CmsLayout title="Media Library">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Upload drop zone */}
        <div
          ref={dropRef}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            dragging ? "border-teal-400 bg-teal-50" : "border-gray-200 hover:border-teal-300 hover:bg-gray-50/60"
          }`}
        >
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
              <p className="text-gray-500 text-sm">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-gray-700 font-medium text-sm">Drop images here or click to upload</p>
              <p className="text-gray-400 text-xs">PNG, JPG, WebP up to 16MB · Multiple files supported</p>
            </div>
          )}
        </div>

        {/* Search + count */}
        <div className="flex items-center gap-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename or alt text..."
            className="border-gray-200 text-gray-900 max-w-xs focus:border-teal-400"
          />
          <p className="text-gray-400 text-sm ml-auto">{filtered.length} image{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        {mediaQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{search ? "No images match your search" : "No images uploaded yet"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((m) => (
              <div key={m.id} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-50">
                  <img src={m.url} alt={m.altText ?? m.originalName} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-2">
                  <p className="text-gray-700 text-xs truncate font-medium">{m.originalName}</p>
                  {m.altText && <p className="text-gray-400 text-xs truncate">{m.altText}</p>}
                </div>
                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700" onClick={() => copyUrl(m.id, m.url)} title="Copy URL">
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700" onClick={() => setEditItem({ id: m.id, altText: m.altText ?? "" })} title="Edit alt text">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-red-50 hover:bg-red-100 text-red-500" onClick={() => setDeleteId(m.id)} title="Delete">
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
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-sm shadow-xl">
          <DialogHeader><DialogTitle className="text-gray-900">Edit Alt Text</DialogTitle></DialogHeader>
          <div className="py-2 space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Alt Text (for accessibility & SEO)</Label>
            <Input
              value={editItem?.altText ?? ""}
              onChange={(e) => setEditItem((i) => i ? { ...i, altText: e.target.value } : null)}
              className="border-gray-200 text-gray-900 focus:border-teal-400"
              placeholder="Describe the image..."
            />
            <p className="text-gray-400 text-xs">Describe what's in the image for screen readers and search engines.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)} className="border-gray-200 text-gray-600">Cancel</Button>
            <Button
              onClick={() => editItem && updateAlt.mutate({ id: editItem.id, altText: editItem.altText })}
              disabled={updateAlt.isPending}
              className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm"
            >
              {updateAlt.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete this image?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">This removes it from the library. Any pages using this image URL will show a broken image.</AlertDialogDescription>
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
