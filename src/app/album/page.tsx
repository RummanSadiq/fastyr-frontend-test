import { NextPage } from "next";
import classNames from "classnames";

// Views
import { AlbumView } from "@/views/album";

//Lib
import { getClient } from "@/lib/apollo-client/client";

// Services
import { GetAlbums } from "@/services/albums";

const AlbumsPage: NextPage = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: GetAlbums,
  });

  return (
    <div className={classNames("mx-auto rounded-lg bg-white p-6 shadow-md")}>
      <AlbumView albums={data.albums.data} />
    </div>
  );
};

export default AlbumsPage;
