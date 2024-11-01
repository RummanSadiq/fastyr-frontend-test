"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FunctionComponent, useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";

// Services
import { GetUsers } from "@/services/users";

// GraphQL Mutations
const CREATE_ALBUM = gql`
  mutation CreateAlbum($title: String!, $userId: ID!) {
    createAlbum(input: { title: $title, userId: $userId }) {
      id
      title
      user {
        name
      }
    }
  }
`;

const UPDATE_ALBUM = gql`
  mutation UpdateAlbum($id: ID!, $title: String!, $userId: ID!) {
    updateAlbum(id: $id, input: { title: $title, userId: $userId }) {
      id
      title
      user {
        name
      }
    }
  }
`;

// Define the prop types with optional properties
type CreateUpdateAlbumModalProps = {
  title?: string;
  label?: string;
  albumId?: string;
};

export const CreateUpdateAlbumModal: FunctionComponent<
  CreateUpdateAlbumModalProps
> = ({
  title = "New Album",
  label = "Create Album",
  albumId, // Accept album ID for updates
}) => {
  const [albumTitle, setAlbumTitle] = useState(title);
  const [userId, setUserId] = useState<string | null>(null);

  const { loading: usersLoading, error: usersError, data } = useQuery(GetUsers);
  const users = Array.isArray(data?.users.data) ? data.users : [];
  const [createAlbum, { loading: createLoading, error: createError }] =
    useMutation(CREATE_ALBUM);
  const [updateAlbum, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_ALBUM);

  const handleSaveChanges = async () => {
    try {
      if (!userId) {
        toast.warning("Please select a user.");
        return;
      }

      if (albumId) {
        await updateAlbum({
          variables: {
            id: albumId,
            title: albumTitle,
            userId,
          },
        });
        toast.success("Album updated successfully!");
      } else {
        await createAlbum({
          variables: {
            title: albumTitle,
            userId,
          },
        });
        toast.success("Album created successfully!");
      }
    } catch (err) {
      console.error("Failed to save album:", err);
    }
  };

  useEffect(() => {
    if (albumId) {
      setAlbumTitle(title);
    }
  }, [albumId, title]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            Make changes to your album here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="albumTitle" className="text-right">
              Title
            </Label>
            <Input
              id="albumTitle"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userSelect" className="text-right">
              Artist
            </Label>
            <select
              id="userSelect"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              className="col-span-3 rounded border border-gray-300 p-2"
            >
              <option value="">Select an artist</option>
              {usersLoading ? (
                <option value="">Loading...</option>
              ) : usersError ? (
                <option value="">Error loading users</option>
              ) : (
                users &&
                users.data.map((user: { id: string; name: string }) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveChanges}
              disabled={createLoading || updateLoading}
            >
              {createLoading || updateLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogClose>
          {(createError || updateError) && (
            <p className="mt-2 text-red-500">
              Error: {createError?.message || updateError?.message}
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
