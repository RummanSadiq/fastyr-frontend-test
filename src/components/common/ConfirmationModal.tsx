'use client';

import { FunctionComponent } from "react";

// Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  isOpen: boolean;
  isLoading: boolean
  title: string;
  description: string;
  handleClose: () => void;
  handleConfirm: () => void
};

export const ConfirmationModal: FunctionComponent<Props> = ({
  isOpen,
  isLoading,
  title,
  description,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClose} variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm} variant="destructive" disabled={isLoading}>
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
