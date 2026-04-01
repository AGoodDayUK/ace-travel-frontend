import { useState } from "react";
import { useParams, useLocation } from "wouter";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Pencil, Trash2, ArrowUp, ArrowDown, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const BLOCK_TYPES = [
  { value: "hero", label: "Hero Banner", description: "Full-width hero with title, subtitle and CTA" },
  { value: "rich_text", label: "Rich Text", description: "Formatted text content" },
  { value: "image_text", label: "Image + Text", description: "Side-by-side image and text" },
  { value: "gallery", label: "Gallery", description: "Image grid" },
  { value: "pricing", label: "Pricing Cards", description: "Two or more pricing options" },
  { value: "cta", label: "CTA Banner", description: "Call-to-action section with button" },
  { value: "faq", label: "FAQ Accordion", description: "Expandable FAQ questions" },
  { value: "reviews", label: "Reviews", description: "Customer testimonials carousel" },
  { value: "tour_cards", label: "Tour Cards", description: "Display tour packages" },
  { value: "video", label: "Video Embed", description: "YouTube or Vimeo embed" },
] as const;

type BlockType = typeof BLOCK_TYPES[number]["value"];

const DEFAULT_CONTENT: Record<BlockType, Record<string, any>> = {
  hero: { title: "Page Title", subtitle: "A short description of this page.", ctaText: "Get Started", ctaLink: "/", backgroundImage: "" },
  rich_text: { content: "Enter your content here. You can use **bold**, *italic*, and other formatting." },
  image_text: { image: "", imageAlt: "", title: "Section Title", text: "Your content here.", imagePosition: "left", ctaText: "", ctaLink: "" },
  gallery: { images: [{ url: "", alt: "" }], columns: 3 },
  pricing: { title: "Choose Your Option", items: [{ label: "Basic", price: "£99", description: "What is included.", features: ["Feature 1", "Feature 2"] }] },
  cta: { title: "Ready to book?", subtitle: "Get in touch and we will sort everything.", ctaText: "Contact Us", ctaLink: "/contact", backgroundColour: "teal" },
  faq: { title: "Frequently Asked Questions", items: [{ question: "Question?", answer: "Answer." }] },
  reviews: { title: "What Our Travellers Say", showFeaturedOnly: true },
  tour_cards: { title: "Our Tours", tourSlugs: [] },
  video: { url: "https://www.youtube.com/watch?v=...", title: "Watch Our Video" },
};

export default function CmsBlockEditor() {
  const { id } = useParams<{ id: string }>();
  const pageId = parseInt(id ?? "0");
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const pageQuery = trpc.cms.pages.getById.useQuery({ id: pageId }, { enabled: !!pageId });
  const blocksQuery = trpc.cms.blocks.getByPage.useQuery({ pageId }, { enabled: !!pageId });

  const upsertBlock = trpc.cms.blocks.upsert.useMutation({
    onSuccess: () => { utils.cms.blocks.getByPage.invalidate({ pageId }); setEditOpen(false); toast.success("Block saved"); },
    onError: (e) => toast.error(e.message),
  });
  const deleteBlock = trpc.cms.blocks.delete.useMutation({
    onSuccess: () => { utils.cms.blocks.getByPage.invalidate({ pageId }); toast.success("Block deleted"); },
    onError: (e) => toast.error(e.message),
  });
  const reorder = trpc.cms.blocks.reorder.useMutation({
    onSuccess: () => utils.cms.blocks.getByPage.invalidate({ pageId }),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [blockType, setBlockType] = useState<BlockType>("rich_text");
  const [contentJson, setContentJson] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [published, setPublished] = useState(true);

  const openCreate = () => {
    setEditingId(null);
    setBlockType("rich_text");
    setContentJson(JSON.stringify(DEFAULT_CONTENT["rich_text"], null, 2));
    setJsonError("");
    setPublished(true);
    setEditOpen(true);
  };

  const openEdit = (block: any) => {
    setEditingId(block.id);
    setBlockType(block.type as BlockType);
    setContentJson(JSON.stringify(block.content, null, 2));
    setJsonError("");
    setPublished(block.published);
    setEditOpen(true);
  };

  const handleTypeChange = (t: BlockType) => {
    setBlockType(t);
    if (!editingId) {
      setContentJson(JSON.stringify(DEFAULT_CONTENT[t], null, 2));
    }
  };

  const handleSave = () => {
    let content: any;
    try {
      content = JSON.parse(contentJson);
      setJsonError("");
    } catch {
      setJsonError("Invalid JSON. Please check your content.");
      return;
    }
    const blocks = blocksQuery.data ?? [];
    const sortOrder = editingId ? (blocks.find((b) => b.id === editingId)?.sortOrder ?? 0) : blocks.length;
    upsertBlock.mutate({ id: editingId ?? undefined, pageId, type: blockType, content, sortOrder, published });
  };

  const moveBlock = (blockId: number, direction: "up" | "down") => {
    const blocks = [...(blocksQuery.data ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = blocks.findIndex((b) => b.id === blockId);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === blocks.length - 1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const newOrder = blocks.map((b, i) => {
      if (i === idx) return { id: b.id, sortOrder: blocks[swapIdx]!.sortOrder };
      if (i === swapIdx) return { id: b.id, sortOrder: blocks[idx]!.sortOrder };
      return { id: b.id, sortOrder: b.sortOrder };
    });
    reorder.mutate(newOrder);
  };

  const page = pageQuery.data;
  const blocks = (blocksQuery.data ?? []).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <CmsLayout title={page ? `Blocks: ${page.title}` : "Block Editor"}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/admin/pages")} className="text-gray-400 hover:text-white h-8 px-2">
            <ArrowLeft className="w-4 h-4 mr-1" />Pages
          </Button>
          {page && (
            <Badge variant={page.published ? "default" : "secondary"} className={page.published ? "bg-teal-500/20 text-teal-400 border-teal-500/30" : ""}>
              {page.published ? "Published" : "Draft"}
            </Badge>
          )}
          <div className="ml-auto">
            <Button onClick={openCreate} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              <Plus className="w-4 h-4 mr-2" />Add Block
            </Button>
          </div>
        </div>

        {blocksQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : blocks.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-gray-900 border border-gray-800 border-dashed rounded-2xl">
            <p className="font-medium text-gray-400">No blocks yet</p>
            <p className="text-sm mt-1">Click "Add Block" to start building this page.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blocks.map((block, idx) => {
              const blockInfo = BLOCK_TYPES.find((t) => t.value === block.type);
              return (
                <div key={block.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-white" onClick={() => moveBlock(block.id, "up")} disabled={idx === 0}>
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-white" onClick={() => moveBlock(block.id, "down")} disabled={idx === blocks.length - 1}>
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white text-sm font-medium">{blockInfo?.label ?? block.type}</p>
                      {!block.published && <Badge variant="secondary" className="text-xs">Hidden</Badge>}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{blockInfo?.description}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => openEdit(block)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(block.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Block editor dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Block" : "Add Block"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-gray-300">Block Type</Label>
              <Select value={blockType} onValueChange={(v) => handleTypeChange(v as BlockType)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {BLOCK_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="text-white focus:bg-gray-700">
                      <span className="font-medium">{t.label}</span>
                      <span className="text-gray-400 text-xs ml-2">{t.description}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Content (JSON)</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-500 hover:text-teal-400 text-xs h-6"
                  onClick={() => setContentJson(JSON.stringify(DEFAULT_CONTENT[blockType], null, 2))}
                >
                  Reset to template
                </Button>
              </div>
              <Textarea
                value={contentJson}
                onChange={(e) => { setContentJson(e.target.value); setJsonError(""); }}
                className="bg-gray-800 border-gray-700 text-white font-mono text-xs min-h-[240px]"
              />
              {jsonError && <p className="text-red-400 text-xs">{jsonError}</p>}
              <p className="text-gray-500 text-xs">Edit the JSON to customise this block's content. Use "Reset to template" to see the available fields.</p>
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={published} onCheckedChange={setPublished} />
              <Label className="text-gray-300">Visible on page</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSave} disabled={upsertBlock.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {upsertBlock.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Block"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this block?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-500 text-white" onClick={() => { if (deleteId) deleteBlock.mutate({ id: deleteId }); setDeleteId(null); }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
