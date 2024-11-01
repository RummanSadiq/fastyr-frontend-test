import { NextPage } from "next";
import classNames from "classnames";

// Services
import { GetAlbumsById } from "@/services/albums";

// Lib
import { getClient } from "@/lib/apollo-client/client";

// Views
import { AlbumDetailsView } from "@/views/albumdetails";
type Props = {
  params: { id: string };
};

const AlbumDetail: NextPage<Props> = async ({ params }) => {
  const { id } = params;
  const client = getClient();

  const { data } = await client.query({
    query: GetAlbumsById,
    variables: { id },
  });

  const album = data.album;

  return (
    <div
      className={classNames(
        "flex h-screen items-center justify-center p-2 md:p-0",
      )}
    >
      <AlbumDetailsView album={album} />
    </div>
  );
};

export default AlbumDetail;
