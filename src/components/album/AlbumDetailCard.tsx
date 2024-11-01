"use client";

import { FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { CreateUpdateAlbumModal } from "./CreateUpdateAlbumModal";
import { gql, useMutation } from "@apollo/client";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";

// Icons
import { LuGlobe } from "react-icons/lu";

// Custom Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// GraphQL Mutation
const DELETE_ALBUM = gql`
  mutation DeleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
  }
`;

// Props
type Props = {
  name: string;
  title: string;
  albumId: string;
};

export const AlbumDetailCard: FunctionComponent<Props> = ({
  title,
  name,
  albumId,
}) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAlbum, { loading }] = useMutation(DELETE_ALBUM, {
    variables: { id: albumId },
    onCompleted: () => {
      toast.success("Album deleted successfully!");
      router.push("/albums");
    },
    onError: (error) => {
      toast.error(`Error deleting album: ${error.message}`);
    },
  });

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteConfirm = async () => {
    await deleteAlbum();
    handleCloseDeleteModal(); // Close the modal after deletion
  };

  return (
    <>
      <Card className={classNames("mx-auto h-fit w-4/5 cursor-pointer")}>
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {name}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 text-sm">
          <div className="flex items-center justify-center gap-2">
            <LuGlobe />
            <p>{title}</p>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            <CreateUpdateAlbumModal
              title={title}
              label={"Update Album"}
              albumId={albumId}
            />
            <Button
              variant="destructive"
              onClick={handleOpenDeleteModal} // Open modal on click
              className="rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmationModal
        title="Confirm Deletion"
        description="Are you sure you want to delete this album? This action cannot be undone."
        isLoading={loading}
        isOpen={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleDeleteConfirm}
      />
    </>
  );
};
