'use client';

import { FunctionComponent, useCallback, useState } from "react";
import classNames from "classnames";

// Custom Components
import { Header } from "@/components/common/Header";
import { UserInfoCard } from "@/components/users/UserInfoCard";
import { CreateUserModal } from "@/components/users/CreateUserModal"; // Import the modal

// Types
import { User } from "@/types/users";
import { Button } from "@/components/ui/button";

type Props = {
  users: User[];
};

export const UserView: FunctionComponent<Props> = ({ users }) => {
  const [openCreateUserModal, setCreateUserModal] = useState<boolean>(false);

  const toggleUserModal = useCallback(() => {
    setCreateUserModal((prev) => !prev)
  },[])

  return (
    <div className={classNames("flex h-screen flex-col overflow-auto")}>
      <Header label={"Users"} />
      {openCreateUserModal && <CreateUserModal onClose={toggleUserModal} />}
      <div className={classNames("p-4 flex justify-end")}>
        <Button className={classNames("p-4 w-full md:w-fit")} onClick={toggleUserModal}>Add Button</Button>
      </div>
      <div
        className={classNames(
          "grid grid-cols-1 gap-3 overflow-auto overflow-y-auto p-4 md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {!!users &&
          users.map((user: User) => (
            <UserInfoCard
              key={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              phone={user.phone}
              website={user.website}
              userId={user.id}
            />
          ))}
      </div>
    </div>
  );
};
