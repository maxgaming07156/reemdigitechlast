"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { updateAdminRole, deleteAdminAccount } from "@/lib/admin/admin-management-actions";
import { formatDate } from "@/lib/utils";
import type { AdminProfile, AdminRole } from "@/types/database";

export function AdminsTable({ admins, currentUserId }: { admins: AdminProfile[]; currentUserId: string }) {
  const router = useRouter();

  async function handleRoleChange(id: string, role: AdminRole) {
    const result = await updateAdminRole(id, role);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteAdminAccount(id);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-100 dark:border-ink-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-100 dark:border-ink-800 bg-ink-50 dark:bg-ink-900 text-left">
            <th className="px-5 py-3 font-medium text-ink-500">Name</th>
            <th className="px-5 py-3 font-medium text-ink-500">Email</th>
            <th className="px-5 py-3 font-medium text-ink-500">Role</th>
            <th className="px-5 py-3 font-medium text-ink-500">Added</th>
            <th className="px-5 py-3 font-medium text-ink-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
          {admins.map((admin) => {
            const isSelf = admin.id === currentUserId;
            return (
              <tr key={admin.id} className="bg-white dark:bg-ink-900">
                <td className="px-5 py-4">
                  <p className="font-medium text-ink-900 dark:text-white">
                    {admin.full_name} {isSelf && <span className="text-ink-400 font-normal">(you)</span>}
                  </p>
                </td>
                <td className="px-5 py-4 text-ink-600 dark:text-ink-300">{admin.email}</td>
                <td className="px-5 py-4">
                  {isSelf ? (
                    <Badge variant="indigo" className="capitalize">{admin.role.replace("_", " ")}</Badge>
                  ) : (
                    <Select value={admin.role} onValueChange={(v) => handleRoleChange(admin.id, v as AdminRole)}>
                      <SelectTrigger className="h-8 w-auto min-w-[140px] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </td>
                <td className="px-5 py-4 text-ink-500 dark:text-ink-400">{formatDate(admin.created_at)}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    {!isSelf && (
                      <ConfirmDeleteDialog
                        trigger={
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                        title={`Remove ${admin.full_name}?`}
                        description="Their login access will be permanently revoked. This can't be undone."
                        onConfirm={() => handleDelete(admin.id)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
