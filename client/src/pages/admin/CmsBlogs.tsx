import { useState, useEffect } from "react";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Video, FileText, Youtube, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { TourSelectField } from "@/components/admin/TourSelectField";

type BlogVlog = {
  id: number;
  type: "blog" | "vlog";
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  youtubeUrl: string | null;
  author: string | null;
  tourSlug: string | null;
  tourName: string | null;
  destination: string | null;
  tags: string[] | null;
  published: boolean;
  featured: boolean;
  publishedAt: Date | null;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
};

const EMPTY: Omit<BlogVlog, "id" | "publishedAt"> = {
  type: "blog",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  youtubeUrl: "",
  author: "",
  tourSlug: "",
  tourName: "",
  destination: "",
  tags: [],
  published: false,
  featured: false,
  sortOrder: 0,
  metaTitle: "",
  metaDescription: "",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function CmsBlogs() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.blogsVlogs.list.useQuery();
  const upsert = trpc.cms.blogsVlogs.upsert.useMutation({
    onSuccess: () => { utils.cms.blogsVlogs.list.invalidate(); toast.success("Saved successfully"); setOpen(false); },
    onError: (e) => toast.error(e.message),
  });
  const remove = trpc.cms.blogsVlogs.delete.useMutation({
    onSuccess: () => { utils.cms.blogsVlogs.list.invalidate(); toast.success("Deleted"); setDeleteId(null); },
    onError: (e) => toast.error(e.message),
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogVlog | null>(null);
  const [form, setForm] = useState<Omit<BlogVlog, "id" | "publishedAt">>(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [activeTab, setActiveTab] = useState("basics");
  const [isDirty, setIsDirty] = useState(false);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setTagInput("");
    setActiveTab("basics");
    setIsDirty(false);
    setOpen(true);
  }

  function openEdit(item: BlogVlog) {
    setEditing(item);
    setForm({
      type: item.type,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      coverImage: item.coverImage ?? "",
      youtubeUrl: item.youtubeUrl ?? "",
      author: item.author ?? "",
      tourSlug: item.tourSlug ?? "",
      tourName: item.tourName ?? "",
      destination: item.destination ?? "",
      tags: item.tags ?? [],
      published: item.published,
      featured: item.featured,
      sortOrder: item.sortOrder,
      metaTitle: item.metaTitle ?? "",
      metaDescription: item.metaDescription ?? "",
    });
    setTagInput("");
    setActiveTab("basics");
    setIsDirty(false);
    setOpen(true);
  }

  function set(key: keyof typeof form, value: any) {
    setForm(f => ({ ...f, [key]: value }));
    setIsDirty(true);
  }

  function handleTitleChange(title: string) {
    setForm(f => ({
      ...f,
      title,
      slug: editing ? f.slug : slugify(title),
    }));
    setIsDirty(true);
  }

  function addTag() {
    const t = tagInput.trim();
    if (!t || (form.tags ?? []).includes(t)) return;
    set("tags", [...(form.tags ?? []), t]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    set("tags", (form.tags ?? []).filter(t => t !== tag));
  }

  function handleSave() {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.slug.trim()) { toast.error("Slug is required"); return; }
    upsert.mutate({
      ...(editing ? { id: editing.id } : {}),
      ...form,
      tags: form.tags ?? [],
    } as any);
  }

  function handleClose() {
    if (isDirty) {
      if (!window.confirm("You have unsaved changes. Leave anyway?")) return;
    }
    setOpen(false);
  }

  const blogs = items.filter(i => i.type === "blog");
  const vlogs = items.filter(i => i.type === "vlog");

  function ItemCard({ item }: { item: BlogVlog }) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
        ) : item.youtubeUrl ? (
          <div className="w-16 h-16 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
            <Youtube className="w-7 h-7 text-red-500" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-gray-400" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 truncate">{item.title}</span>
            {item.featured && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Badge variant="outline" className="text-xs py-0 px-1.5">
              {item.type === "vlog" ? "Vlog" : "Blog"}
            </Badge>
            {item.destination && <span>{item.destination}</span>}
            {item.author && <span>by {item.author}</span>}
            <span className="text-gray-400">/{item.slug}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className={item.published ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}>
            {item.published ? "Published" : "Draft"}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-[#44c5c3]" onClick={() => openEdit(item as BlogVlog)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500" onClick={() => setDeleteId(item.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CmsLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blogs &amp; Vlogs</h1>
            <p className="text-sm text-gray-500 mt-1">{items.length} post{items.length !== 1 ? "s" : ""} total</p>
          </div>
          <Button onClick={openCreate} className="bg-[#44c5c3] hover:bg-[#3ab5b3] text-white gap-2">
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium mb-2">No posts yet</p>
            <p className="text-sm mb-6">Create your first blog post or vlog to get started.</p>
            <Button onClick={openCreate} className="bg-[#44c5c3] hover:bg-[#3ab5b3] text-white gap-2">
              <Plus className="w-4 h-4" /> New Post
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-6 bg-gray-100">
              <TabsTrigger value="all">All ({items.length})</TabsTrigger>
              <TabsTrigger value="blogs">Blogs ({blogs.length})</TabsTrigger>
              <TabsTrigger value="vlogs">Vlogs ({vlogs.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-3">
              {items.map(item => <ItemCard key={item.id} item={item as BlogVlog} />)}
            </TabsContent>
            <TabsContent value="blogs" className="space-y-3">
              {blogs.length === 0 ? <p className="text-gray-400 text-sm py-8 text-center">No blog posts yet.</p> : blogs.map(item => <ItemCard key={item.id} item={item as BlogVlog} />)}
            </TabsContent>
            <TabsContent value="vlogs" className="space-y-3">
              {vlogs.length === 0 ? <p className="text-gray-400 text-sm py-8 text-center">No vlogs yet.</p> : vlogs.map(item => <ItemCard key={item.id} item={item as BlogVlog} />)}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Editor Dialog */}
      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {editing ? `Edit: ${editing.title}` : "New Post"}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col">
            <TabsList className="mx-6 mt-4 mb-0 bg-gray-100 w-fit">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* Basics Tab */}
            <TabsContent value="basics" className="px-6 py-5 space-y-5">
              {/* Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Post Type</Label>
                  <Select value={form.type} onValueChange={v => set("type", v)}>
                    <SelectTrigger className="border-gray-200 focus:ring-[#44c5c3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog"><span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Blog Post</span></SelectItem>
                      <SelectItem value="vlog"><span className="flex items-center gap-2"><Video className="w-4 h-4" /> Vlog</span></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Author</Label>
                  <Input value={form.author ?? ""} onChange={e => set("author", e.target.value)} placeholder="e.g. Ruby" className="border-gray-200 focus:ring-[#44c5c3]" />
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></Label>
                  <Input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Post title" className="border-gray-200 focus:ring-[#44c5c3]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">URL Slug <span className="text-red-500">*</span></Label>
                  <Input value={form.slug} onChange={e => set("slug", slugify(e.target.value))} placeholder="url-slug" className="border-gray-200 focus:ring-[#44c5c3]" />
                  <p className="text-xs text-gray-400">/blogs-vlogs/{form.slug || "your-slug"}</p>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Excerpt</Label>
                <Textarea value={form.excerpt ?? ""} onChange={e => set("excerpt", e.target.value)} placeholder="Short summary shown in listings..." rows={2} className="border-gray-200 focus:ring-[#44c5c3] resize-none" />
              </div>

              {/* Cover Image */}
              <ImageUploadField
                label="Cover Image"
                value={form.coverImage ?? ""}
                onChange={v => set("coverImage", v)}
              />

              {/* YouTube URL (vlogs only) */}
              {form.type === "vlog" && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Youtube className="w-4 h-4 text-red-500" /> YouTube URL</Label>
                  <Input value={form.youtubeUrl ?? ""} onChange={e => set("youtubeUrl", e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="border-gray-200 focus:ring-[#44c5c3]" />
                  <p className="text-xs text-gray-400">Paste the full YouTube URL — it will be embedded automatically.</p>
                </div>
              )}

              {/* Destination & Tour */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Destination</Label>
                  <Select value={form.destination ?? ""} onValueChange={v => set("destination", v)}>
                    <SelectTrigger className="border-gray-200 focus:ring-[#44c5c3]">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Bali">Bali</SelectItem>
                      <SelectItem value="Philippines">Philippines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <TourSelectField
                  label="Linked Tour"
                  tourId={null}
                  onChange={(tour) => { set("tourSlug", tour?.slug ?? ""); set("tourName", tour?.name ?? ""); }}
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Tag className="w-4 h-4" /> Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                    placeholder="Add a tag and press Enter"
                    className="border-gray-200 focus:ring-[#44c5c3]"
                  />
                  <Button type="button" variant="outline" onClick={addTag} className="border-gray-200">Add</Button>
                </div>
                {(form.tags ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(form.tags ?? []).map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-[#44c5c3]/10 text-[#44c5c3] text-xs px-2.5 py-1 rounded-full font-medium">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Published / Featured toggles */}
              <div className="flex gap-8 pt-2">
                <div className="flex items-center gap-3">
                  <Switch checked={form.published} onCheckedChange={(checked: boolean) => set("published", checked)} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Published</p>
                    <p className="text-xs text-gray-400">Visible on the website</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={form.featured} onCheckedChange={(v: boolean) => set("featured", v)} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Featured</p>
                    <p className="text-xs text-gray-400">Highlighted on the page</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="px-6 py-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Body Content</Label>
                <p className="text-xs text-gray-400">Write your blog post content here. Basic markdown is supported (# headings, **bold**, *italic*, - lists).</p>
                <Textarea
                  value={form.content ?? ""}
                  onChange={e => set("content", e.target.value)}
                  placeholder="Write your post content here..."
                  rows={20}
                  className="border-gray-200 focus:ring-[#44c5c3] font-mono text-sm resize-y"
                />
              </div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="px-6 py-5 space-y-5">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Meta Title</Label>
                <Input value={form.metaTitle ?? ""} onChange={e => set("metaTitle", e.target.value)} placeholder="SEO page title (60 chars max)" className="border-gray-200 focus:ring-[#44c5c3]" maxLength={60} />
                <p className="text-xs text-gray-400">{(form.metaTitle ?? "").length}/60 characters</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Meta Description</Label>
                <Textarea value={form.metaDescription ?? ""} onChange={e => set("metaDescription", e.target.value)} placeholder="SEO description (160 chars max)" rows={3} className="border-gray-200 focus:ring-[#44c5c3] resize-none" maxLength={160} />
                <p className="text-xs text-gray-400">{(form.metaDescription ?? "").length}/160 characters</p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <Button variant="outline" onClick={handleClose} className="border-gray-200">Cancel</Button>
            <Button onClick={handleSave} disabled={upsert.isPending} className="bg-[#44c5c3] hover:bg-[#3ab5b3] text-white min-w-[100px]">
              {upsert.isPending ? "Saving..." : "Save Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={v => { if (!v) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && remove.mutate({ id: deleteId })} className="bg-red-500 hover:bg-red-600 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
