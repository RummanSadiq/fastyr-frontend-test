import { FunctionComponent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { CreateAlbumModal } from "./CreateAlbumModal"; // Import the modal component

// Types
type Album = {
  id: number;
  title: string;
  user: {
    name: string;
  };
};

type Props = {
  albums: Album[];
};

export const AlbumView: FunctionComponent<Props> = ({ albums }) => {
  return (
    <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-3xl font-bold">Albums</h1>
      <Table className="min-w-full bg-white">
        <TableCaption>A list of albums.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 text-left text-gray-600">
              Title
            </TableHead>
            <TableHead className="py-3 text-left text-gray-600">
              Artist
            </TableHead>
            <TableHead className="py-3 text-left text-gray-600">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => (
            <TableRow key={album.id} className="hover:bg-gray-50">
              <TableCell className="py-2">{album.title}</TableCell>
              <TableCell className="py-2">{album.user.name}</TableCell>
              <TableCell className="py-2">
                <a
                  href={`/albums/${album.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateAlbumModal />
    </div>
  );
};
