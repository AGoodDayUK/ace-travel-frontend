import { useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  previewHeight?: string; // e.g. "h-32" or "h-20"
  hint?: string;
}

/**
 * A reusable image field that allows:
 * 1. Uploading a file directly (no need to go to Media Library first)
 * 2. Pasting a URL manually
 * 3. Previewing the current image
 * 4. Clearing the image
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = "https://... or upload a file",
  className,
  previewHeight = "h-32",
  hint,
}: ImageUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const uploadMutation = trpc.cms.media.upload.useMutation({
    onError: (e) => toast.error(`Upload failed: ${e.message}`),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 16 * 1024 * 1024) {
      toast.error("File too large (max 16MB)");
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const result = await uploadMutation.mutateAsync({
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        base64,
        altText: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      });
      onChange(result.url);
      toast.success("Image uploaded");
    } catch {
      // error already shown by onError
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}

      {/* Preview area */}
      {value ? (
        <div className={cn("relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group", previewHeight)}>
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="bg-white/90 hover:bg-white text-gray-800 h-8 px-3 text-xs font-medium"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Upload className="w-3 h-3 mr-1" />}
              Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="bg-red-500/90 hover:bg-red-500 text-white h-8 w-8 p-0"
              onClick={() => onChange("")}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className={cn(
            "w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-teal-300 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer",
            previewHeight
          )}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-400" />
          )}
          <span className="text-xs text-gray-500">
            {uploading ? "Uploading..." : "Click to upload image"}
          </span>
        </button>
      )}

      {/* URL input row */}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-sm border-gray-200 focus:border-teal-400 bg-white text-gray-900 placeholder:text-gray-400 flex-1"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="border-gray-200 text-gray-600 hover:text-teal-600 hover:border-teal-300 flex-shrink-0 px-3"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          title="Upload image file"
        >
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
        </Button>
      </div>

      {hint && <p className="text-xs text-gray-400">{hint}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
