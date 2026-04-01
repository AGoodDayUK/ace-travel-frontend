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
import { Loader2, Plus, Pencil, Trash2, KeyRound } from "lucide-react";
import { toast } from "sonner";

const emptyUser = { username: "", name: "", email: "", password: "", role: "editor" as "admin" | "editor" };

export default function CmsUsers() {
  const utils = trpc.useUtils();
  const usersQuery = trpc.cms.users.list.useQuery();
  const create = trpc.cms.users.create.useMutation({
    onSuccess: () => { utils.cms.users.list.invalidate(); setCreateOpen(false); toast.success("User created"); },
    onError: (e) => toast.error(e.message),
  });
  const update = trpc.cms.users.update.useMutation({
    onSuccess: () => { utils.cms.users.list.invalidate(); setEditOpen(false); toast.success("User updated"); },
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
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <CmsLayout title="CMS Users">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">{usersQuery.data?.length ?? 0} users</p>
          <Button onClick={() => { setForm(emptyUser); setCreateOpen(true); }} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
            <Plus className="w-4 h-4 mr-2" />New User
          </Button>
        </div>

        <div className="bg-gray-900 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-300/80">
          <p className="font-medium text-amber-300 mb-1">CMS Users vs Site Users</p>
          <p>These are separate CMS admin accounts used only to log in to this management panel. They are not the same as customer accounts on the main site.</p>
        </div>

        {usersQuery.isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
        ) : (
          <div className="space-y-3">
            {usersQuery.data?.map((u) => (
              <div key={u.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-400 text-sm font-bold">{(u.name ?? u.username).charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-medium">{u.name ?? u.username}</p>
                    <Badge className={u.role === "admin" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "bg-gray-700 text-gray-300 border-gray-600"}>
                      {u.role}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">@{u.username}{u.email ? ` · ${u.email}` : ""}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-amber-400 h-8 w-8 p-0" title="Reset password" onClick={() => { setResetId(u.id); setNewPassword(""); }}>
                    <KeyRound className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8 w-8 p-0" onClick={() => {
                    setEditForm({ id: u.id, name: u.name ?? "", email: u.email ?? "", role: u.role as "admin" | "editor" });
                    setEditOpen(true);
                  }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500/60 hover:text-red-400 h-8 w-8 p-0" onClick={() => setDeleteId(u.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create user */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-sm">
          <DialogHeader><DialogTitle>New CMS User</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-gray-300">Username</Label>
              <Input value={form.username} onChange={(e) => set("username", e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="jane-smith" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Full Name</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Email (optional)</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Password</Label>
              <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Role</Label>
              <Select value={form.role} onValueChange={(v) => set("role", v)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="admin" className="text-white focus:bg-gray-700">Admin — full access</SelectItem>
                  <SelectItem value="editor" className="text-white focus:bg-gray-700">Editor — content only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCreateOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={() => create.mutate(form)} disabled={create.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {create.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit user */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-sm">
          <DialogHeader><DialogTitle>Edit User</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-gray-300">Full Name</Label>
              <Input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Email</Label>
              <Input type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300">Role</Label>
              <Select value={editForm.role} onValueChange={(v) => setEditForm((f) => ({ ...f, role: v as "admin" | "editor" }))}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="admin" className="text-white focus:bg-gray-700">Admin</SelectItem>
                  <SelectItem value="editor" className="text-white focus:bg-gray-700">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={() => update.mutate(editForm)} disabled={update.isPending} className="bg-teal-500 hover:bg-teal-400 text-gray-950">
              {update.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset password */}
      <Dialog open={resetId !== null} onOpenChange={() => setResetId(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-sm">
          <DialogHeader><DialogTitle>Reset Password</DialogTitle></DialogHeader>
          <div className="py-2 space-y-1.5">
            <Label className="text-gray-300">New Password</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResetId(null)} className="text-gray-400">Cancel</Button>
            <Button onClick={() => resetId && resetPw.mutate({ id: resetId, newPassword: newPassword })} disabled={resetPw.isPending || !newPassword} className="bg-amber-500 hover:bg-amber-400 text-gray-950">
              {resetPw.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">They will no longer be able to log in to the CMS.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-500 text-white" onClick={() => { setDeleteId(null); toast.error("User deletion not available — deactivate via role change instead."); }}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CmsLayout>
  );
}
