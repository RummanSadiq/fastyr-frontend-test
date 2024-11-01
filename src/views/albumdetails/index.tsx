import { FunctionComponent } from "react";

// Custom Components
import { AlbumDetailCard } from "@/components/album/AlbumDetailCard";
// Types
import { Album } from "@/types/albums";

type Props = {
  album: Album;
};
export const AlbumDetailsView: FunctionComponent<Props> = ({ album }) => {
  return <AlbumDetailCard title={album.title} name={album.title} />;
};
