'use client';

import { FunctionComponent, useCallback } from "react";
import { useMutation } from "@apollo/client";

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

// Services
import { DeleteUser } from "@/services/users";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
};

export const DeleteUserModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  userId,
}) => {

  const [deleteUser, { loading, error }] = useMutation(DeleteUser);

  const handleDeleteConfirm = useCallback(async () => {
      await deleteUser({ variables: { id: userId } });
      onClose()
  },[deleteUser, onClose, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleDeleteConfirm} variant="destructive" disabled={loading}>
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
        {error && <p className="text-red-500">Error deleting user: {error.message}</p>}
      </DialogContent>
    </Dialog>
  );
};
