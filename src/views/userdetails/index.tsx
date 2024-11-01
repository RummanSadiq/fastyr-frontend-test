"use client";

import { FunctionComponent, useCallback, useState } from "react";
import classNames from "classnames";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";

// Custom Components
import { UserInfoCard } from "@/components/users/UserInfoCard";
import { Button } from "@/components/ui/button";
import { CreateUserModal } from "@/components/users/CreateUserModal";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";

// Types
import { User } from "@/types/users";

// Services
import { DeleteUser } from "@/services/users";

type Props = {
  user: User;
};

export const UserDetailsView: FunctionComponent<Props> = ({ user }) => {
  const [openUpdateUserModal, setUpdateUserModal] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [deleteUser, { loading }] = useMutation(DeleteUser);

  const toggleUpdateUserModal = useCallback(() => {
    setUpdateUserModal((prev) => !prev);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    toast.promise(
      (async () => {
        await deleteUser({ variables: { id: user.id } });
        handleCloseDeleteModal();
      })(),
      {
        loading: "Deleting user...",
        success: "User deleted successfully!",
        error: "Failed to delete user. Please try again.",
      }
    );
  }, [deleteUser, handleCloseDeleteModal, user.id]);

  return (
    <div>
      <UserInfoCard
        name={user.name}
        email={user.email}
        website={user.website}
        phone={user.phone}
        username={user.username}
      />
      <div className={classNames("mt-4 flex justify-between")}>
        <Button
          onClick={toggleUpdateUserModal}
          className={classNames(
            "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
          )}
        >
          Update
        </Button>
        <Button
          onClick={handleOpenDeleteModal}
          className={classNames(
            "ml-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600",
          )}
        >
          Delete
        </Button>
      </div>

      {openUpdateUserModal && (
        <CreateUserModal onClose={toggleUpdateUserModal} user={user} />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          title={"Confirm Deletion"}
          description={
            "Are you sure you want to delete this user? This action cannot be undone."
          }
          isLoading={loading}
          isOpen={isDeleteModalOpen}
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};
