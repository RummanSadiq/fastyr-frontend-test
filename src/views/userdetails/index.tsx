'use client';

import { FunctionComponent, useCallback, useState } from "react";
import classNames from "classnames";

// Custom Components
import { UserInfoCard } from "@/components/users/UserInfoCard";
import { Button } from "@/components/ui/button";
import { DeleteUserModal } from "@/components/users/DeleteUserModal";
import { CreateUserModal } from "@/components/users/CreateUserModal";

// Types
import { User } from "@/types/users";

type Props = {
  user: User;
};

export const UserDetailsView: FunctionComponent<Props> = ({ user }) => {
  const [openUpdateUserModal, setUpdateUserModal] = useState<boolean>(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleUpdateUserModal = useCallback(() => {
    setUpdateUserModal((prev) => !prev)
  },[])

  const handleOpenDeleteModal = useCallback(() => {
    setDeleteModalOpen(true)
  },[])

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false)
  },[])

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
          className={classNames("bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600")}
        >
          Update
        </Button>
        <Button 
          onClick={handleOpenDeleteModal} 
          className={classNames("bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2")}
        >
          Delete
        </Button>
      </div>

      {openUpdateUserModal && <CreateUserModal onClose={toggleUpdateUserModal} user={user}/>}

      {isDeleteModalOpen && <DeleteUserModal 
        isOpen={isDeleteModalOpen} 
        onClose={handleCloseDeleteModal} 
        userId={user.id} 
      />}
    </div>
  );
};
