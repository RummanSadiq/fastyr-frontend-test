import { NextPage } from "next";

// Views
import { AlbumView } from "@/views/album";

// Lib
import { getClient } from "@/lib/apollo-client/client";

// Services
import { GetAlbums } from "@/services/albums";

const AlbumsPage: NextPage = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: GetAlbums,
  });

  return <AlbumView albums={data.albums.data} />;
};

export default AlbumsPage;
