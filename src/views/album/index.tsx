"use client";

import { FunctionComponent, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { CreateUpdateAlbumModal } from "@/components/album/CreateUpdateAlbumModal";
import { Header } from "@/components/common/Header";
import classNames from "classnames";

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
  const [searchTerm, setSearchTerm] = useState("");

  // Filter albums based on the search term
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto h-screen overflow-y-auto rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <Header label="Albums" />
        <CreateUpdateAlbumModal />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <Table className="min-w-full overflow-hidden bg-white">
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
        <TableBody className={classNames("flex-1 overflow-y-auto")}>
          {filteredAlbums.map((album) => (
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
    </div>
  );
};
