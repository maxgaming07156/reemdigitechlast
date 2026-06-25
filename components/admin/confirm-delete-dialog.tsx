"use client";

import * as React from "react";
import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
}

export function ConfirmDeleteDialog({ trigger, title, description, onConfirm }: ConfirmDeleteDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function handleConfirm() {
    setIsDeleting(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>Cancel</Button>
          </DialogClose>
          <Button
            variant="default"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
