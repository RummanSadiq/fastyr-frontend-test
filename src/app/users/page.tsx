import { UserView } from "@/views/users";
import { NextPage } from "next";

// Lib
import { getClient } from "@/lib/apollo-client/client";

// Services
import { GetUsers } from "@/services/users";

const Users: NextPage = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: GetUsers,
  });

  return <UserView users={data.users.data} />;
};

export default Users;
