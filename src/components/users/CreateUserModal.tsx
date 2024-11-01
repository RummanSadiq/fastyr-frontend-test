import { useMutation } from "@apollo/client";
import classNames from "classnames";
import { toast } from "sonner";
import {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
  FunctionComponent,
} from "react";

// Custom Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define your GraphQL mutations
import { CreateUser, UpdateUser } from "@/services/users";

type UserData = {
  id?: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

type Props = {
  user?: UserData | null;
  onClose: () => void;
};

export const CreateUserModal: FunctionComponent<Props> = ({
  user,
  onClose,
}) => {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const [createUser] = useMutation(CreateUser);
  const [updateUser] = useMutation(UpdateUser);

  const isDisabled = useMemo(() => {
    const { name, username, email, phone, website } = userData;

    if (!user) {
      return !(name && username && email && phone && website);
    }

    if (user) {
      return (
        user.name === name &&
        user.username === username &&
        user.email === email &&
        user.phone === phone &&
        user.website === website
      );
    }

    return false;
  }, [user, userData]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    toast.promise(
      async () => {
        try {
          if (user) {
            await updateUser({
              variables: {
                id: userData.id,
                input: {
                  name: userData.name,
                  username: userData.username,
                  email: userData.email,
                  phone: userData.phone,
                  website: userData.website,
                },
              },
            });
          } else {
            await createUser({
              variables: {
                input: {
                  name: userData.name,
                  email: userData.email,
                  username: userData.username,
                  phone: userData.phone,
                  website: userData.website,
                },
              },
            });
          }
        } catch (error) {
          console.error("Error saving user:", error);
          throw error; // re-throw error to trigger the error message in toast.promise
        }
      },
      {
        loading: "Saving user...",
        success: "User saved successfully!",
        error: "Failed to save user. Please try again.",
      },
    );
  }, [createUser, updateUser, user, userData]);

  const formFields = useMemo(
    () => [
      { label: "Name", id: "name", value: userData.name },
      { label: "Username", id: "username", value: userData.username },
      { label: "Email", id: "email", value: userData.email },
      { label: "Phone", id: "phone", value: userData.phone },
      { label: "Website", id: "website", value: userData.website },
    ],
    [userData],
  );

  useEffect(() => {
    if (!user) return;

    setUserData(user);
  }, [user]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Update the user details below. Click save when done."
              : "Enter details for the new user. Click save when done."}
          </DialogDescription>
        </DialogHeader>
        <div className={classNames("flex flex-col gap-4 py-4")}>
          {formFields.map((field) => (
            <div key={field.id} className={classNames("items-center gap-4")}>
              <Label htmlFor={field.id} className={classNames("text-right")}>
                {field.label}
              </Label>
              <Input
                id={field.id}
                value={field.value}
                onChange={handleInputChange}
                className={classNames("col-span-3")}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isDisabled} onClick={handleSave}>
              {user ? "Save Changes" : "Create User"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
