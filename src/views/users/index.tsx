import { FunctionComponent } from "react";
import classNames from "classnames";

// Custom Components
import { Header } from "@/components/common/Header";
import { UserInfoCard } from "@/components/users/UserInfoCard";

// Types
import { User } from "@/types/users";

type Props = {
  users: User[];
};

export const UserView: FunctionComponent<Props> = ({ users }) => {
  return (
    <div className={classNames("flex h-screen flex-col overflow-auto")}>
      <Header label={"Users"} />
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
            />
          ))}
      </div>
    </div>
  );
};
