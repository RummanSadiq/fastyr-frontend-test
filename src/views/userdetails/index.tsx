import { FunctionComponent } from "react";

// Custom Components
import {UserInfoCard} from "@/components/users/UserInfoCard"

// Types
import { User } from "@/types/users";

type Props = {
  user: User;
};

export const UserDetailsView: FunctionComponent<Props> = ({ user }) => {
  return (
    <UserInfoCard name={user.name} email={user.email} website={user.website} phone={user.phone} username={user.username}/>
  );
};
