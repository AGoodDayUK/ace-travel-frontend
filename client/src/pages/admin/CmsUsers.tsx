import { useState } from "react";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Pencil, Trash2, KeyRound, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { UnsavedChangesDialog } from "@/components/admin/UnsavedChangesDialog";

const emptyUser = { username: "", name: "", email: "", password: "", role: "editor" as "admin" | "editor" };

export default function CmsUsers() {
  const utils = trpc.useUtils();
  const usersQuery = trpc.cms.users.list.useQuery();
  const create = trpc.cms.users.create.useMutation({
    onSuccess: () => { utils.cms.users.list.invalidate(); createChanges.markClean(); setCreateOpen(false); toast.success("User created"); },
    onError: (e) => toast.error(e.message),
  });
  const update = trpc.cms.users.update.useMutation({
    onSuccess: () => { utils.cms.users.list.invalidate(); editChanges.markClean(); setEditOpen(false); toast.success("User updated"); },
    onError: (e) => toast.error(e.message),
  });
  const resetPw = trpc.cms.users.changePassword.useMutation({
    onSuccess: () => { setResetId(null); toast.success("Password updated"); },
    onError: (e: any) => toast.error(e.message),
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [resetId, setResetId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [form, setForm] = useState<typeof emptyUser>(emptyUser);
  const [editForm, setEditForm] = useState<{ id: number; name: string; email: string; role: "admin" | "editor" }>({ id: 0, name: "", email: "", role: "editor" });
  const createChanges = useUnsavedChanges();
  const editChanges = useUnsavedChanges();
  const set = (k: string, v: any) => { setForm((f) => ({ ...f, [k]: v })); createChanges.markDirty(); };

  return (
    <CmsLayout title="CMS Users">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">{usersQuery.data?.length ?? 0} users</p>
          <Button onClick={() => { createChanges.markClean(); setForm(emptyUser); setCreateOpen(true); }} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />New User
          </Button>
        </div>

        {/* Info banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800 text-sm">CMS Users vs Site Users</p>
            <p className="text-amber-700 text-xs mt-0.5">These are separate CMS admin accounts used only to log in to this management panel. They are not the same as customer accounts on the main site.</p>
          </div>
        </div>

        {usersQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
        ) : (
          <div className="space-y-2">
            {usersQuery.data?.map((u) => (
              <div key={u.id} className="bg-white border border-gray-100 hover:border-teal-200 rounded-xl p-4 flex items-center gap-4 shadow-sm transition-all">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-700 text-sm font-bold">{(u.name ?? u.username).charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-gray-900 text-sm font-medium">{u.name ?? u.username}</p>
                    <Badge className={u.role === "admin"
                      ? "bg-purple-50 text-purple-700 border-purple-200 text-xs"
                      : "bg-gray-100 text-gray-600 border-gray-200 text-xs"
                    }>
                      {u.role}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">@{u.username}{u.email ? ` · ${u.email}` : ""}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="text-amber-500/70 hover:text-amber-600 hover:bg-amber-50 h-8 w-8 p-0" title="Reset password" onClick={() => { setResetId(u.id); setNewPassword(""); }}>
                    <KeyRound className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-700 h-8 w-8 p-0" onClick={() => {
                    setEditForm({ id: u.id, name: u.name ?? "", email: u.email ?? "", role: u.role as "admin" | "editor" });
                    setEditOpen(true);
                  }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400/60 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0" onClick={() => setDeleteId(u.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <UnsavedChangesDialog open={createChanges.confirmLeave} onConfirm={createChanges.onConfirmLeave} onCancel={createChanges.onCancelLeave} />
      <UnsavedChangesDialog open={editChanges.confirmLeave} onConfirm={editChanges.onConfirmLeave} onCancel={editChanges.onCancelLeave} />

      {/* Create user */}
      <Dialog open={createOpen} onOpenChange={(open) => { if (!open) createChanges.handleNavigate(() => setCreateOpen(false)); else setCreateOpen(true); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-sm shadow-xl p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">New CMS User</DialogTitle>
              {createChanges.isDirty && <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 font-medium">Unsaved changes</span>}
            </div>
          </DialogHeader>
          <div className="space-y-5 px-6 py-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Username *</Label>
              <Input value={form.username} onChange={(e) => set("username", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="jane-smith" />
              <p className="text-gray-400 text-xs">Used to log in. Lowercase, no spaces.</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="Jane Smith" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Email (optional)</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="jane@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Password *</Label>
              <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Role</Label>
              <Select value={form.role} onValueChange={(v) => set("role", v)}>
                <SelectTrigger className="border-gray-200 text-gray-900 focus:border-teal-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="admin">Admin — full access</SelectItem>
                  <SelectItem value="editor">Editor — content only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <Button variant="outline" onClick={() => createChanges.handleNavigate(() => setCreateOpen(false))} className="border-gray-200 text-gray-600 bg-white">Cancel</Button>
            <Button onClick={() => create.mutate(form)} disabled={create.isPending} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
              {create.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit user */}
      <Dialog open={editOpen} onOpenChange={(open) => { if (!open) editChanges.handleNavigate(() => setEditOpen(false)); else setEditOpen(true); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-sm shadow-xl p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">Edit User</DialogTitle>
              {editChanges.isDirty && <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 font-medium">Unsaved changes</span>}
            </div>
          </DialogHeader>
          <div className="space-y-5 px-6 py-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} className="border-gray-200 text-gray-900 focus:border-teal-400" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} className="border-gray-200 text-gray-900 focus:border-teal-400" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Role</Label>
              <Select value={editForm.role} onValueChange={(v) => setEditForm((f) => ({ ...f, role: v as "admin" | "editor" }))}>
                <SelectTrigger className="border-gray-200 text-gray-900 focus:border-teal-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <Button variant="outline" onClick={() => editChanges.handleNavigate(() => setEditOpen(false))} className="border-gray-200 text-gray-600 bg-white">Cancel</Button>
            <Button onClick={() => update.mutate(editForm)} disabled={update.isPending} className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
              {update.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset password */}
      <Dialog open={resetId !== null} onOpenChange={() => setResetId(null)}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-sm shadow-xl">
          <DialogHeader><DialogTitle className="text-gray-900">Reset Password</DialogTitle></DialogHeader>
          <div className="py-2 space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">New Password</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-gray-200 text-gray-900 focus:border-teal-400" placeholder="Enter new password..." />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetId(null)} className="border-gray-200 text-gray-600">Cancel</Button>
            <Button onClick={() => resetId && resetPw.mutate({ id: resetId, newPassword })} disabled={resetPw.isPending || !newPassword} className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm">
              {resetPw.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete this user?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">They will no longer be able to log in to the CMS.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={() => { setDeleteId(null); toast.error("User deletion not available — change their role to editor to restrict access instead."); }}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
