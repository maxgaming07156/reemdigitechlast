"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { createAdminAccount } from "@/lib/admin/admin-management-actions";

const formSchema = z.object({
  full_name: z.string().min(2, "Full name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["admin", "super_admin"]),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateAdminDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { full_name: "", email: "", password: "", role: "admin" },
  });

  async function onSubmit(values: FormValues) {
    const result = await createAdminAccount(values);
    if (result.success) {
      toast.success(result.message);
      reset();
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="indigo">
          <UserPlus className="h-4 w-4" /> New Admin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new admin</DialogTitle>
          <DialogDescription>
            They'll be able to sign in immediately at /admin/login with the password you set here.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" {...register("full_name")} />
            {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Temporary password</Label>
            <Input id="password" type="text" placeholder="At least 8 characters" {...register("password")} />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            <p className="text-xs text-ink-400">Share this with them securely — they can't reset it themselves yet.</p>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-xs text-ink-400">Admins manage content. Super admins can also manage other admin accounts.</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="indigo" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              Create Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
