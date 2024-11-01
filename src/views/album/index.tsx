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
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { DELETE_ALBUM } from "@/services/albums";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/common/ConfirmationModal"; // Import the ConfirmationModal component

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
  const [selectedAlbums, setSelectedAlbums] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAlbum, { loading }] = useMutation(DELETE_ALBUM);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCheckboxChange = (id: number) => {
    setSelectedAlbums((prev) =>
      prev.includes(id)
        ? prev.filter((albumId) => albumId !== id)
        : [...prev, id],
    );
  };

  const handleBulkDelete = async () => {
    closeDeleteModal();

    const chunkSize = 10;
    if (selectedAlbums.length === 0) {
      toast.warning("Please select albums from the list");
      return;
    }
    for (let i = 0; i < selectedAlbums.length; i += chunkSize) {
      const chunk = selectedAlbums.slice(i, i + chunkSize);

      try {
        const deletePromises = chunk.map((id) =>
          deleteAlbum({ variables: { id } }),
        );

        await Promise.all(deletePromises);
        toast.success(
          `Successfully deleted albums ${i + 1} to ${i + chunk.length}`,
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error deleting albums:", error);
        toast.error("Failed to delete some albums. Please try again later.");
        break;
      }
    }

    setSelectedAlbums([]);
  };

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
      <div className="mb-4">
        <Button
          variant="destructive"
          onClick={openDeleteModal} // Open modal on click
          className="rounded bg-red-500 text-white hover:bg-red-600"
        >
          Delete Selected
        </Button>
      </div>
      <Table className="min-w-full overflow-hidden bg-white">
        <TableCaption>A list of albums.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 text-left text-gray-600">
              <input
                type="checkbox"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedAlbums(
                    checked ? filteredAlbums.map((album) => album.id) : [],
                  );
                }}
                checked={
                  selectedAlbums.length === filteredAlbums.length &&
                  filteredAlbums.length > 0
                }
              />
            </TableHead>
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
              <TableCell className="py-2">
                <input
                  type="checkbox"
                  checked={selectedAlbums.includes(album.id)}
                  onChange={() => handleCheckboxChange(album.id)}
                />
              </TableCell>
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

      <ConfirmationModal
        title="Confirm Bulk Deletion"
        description="Are you sure you want to delete the selected albums? This action cannot be undone."
        isLoading={loading}
        isOpen={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        handleConfirm={handleBulkDelete}
      />
    </div>
  );
};
