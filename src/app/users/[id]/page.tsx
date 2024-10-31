import { NextPage } from "next";
import classNames from "classnames";

// Services
import { GetUserById } from "@/services/users";

// Lib
import { getClient } from "@/lib/apollo-client/client";

// Views
import { UserDetailsView } from "@/views/userdetails";

type Props = {
  params: {id: string};
};

const UserProfile: NextPage<Props> = async ({ params }) => {
  const { id } = params;
  const client = getClient();

  const { data } = await client.query({
    query: GetUserById,
    variables: { id },
  });

  const user = data.user;

  return (
    <div className={classNames("flex items-center p-2 md:p-0 justify-center h-screen")}>
      <UserDetailsView user={user} />
    </div>
  );
};

export default UserProfile;
