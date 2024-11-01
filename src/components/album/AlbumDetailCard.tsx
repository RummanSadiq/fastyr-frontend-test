"use client";

import { FunctionComponent } from "react";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { CreateUpdateAlbumModal } from "./CreateUpdateAlbumModal";

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

// Props
type Props = {
  name: string;
  title: string;
};

export const AlbumDetailCard: FunctionComponent<Props> = ({ title, name }) => {
  return (
    <Card className={classNames("h-fit cursor-pointer")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {name}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm">
        <div className="flex items-center gap-2">
          <LuGlobe />
          <p>{title}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <CreateUpdateAlbumModal
            title={title}
            name={name}
            label={"Update Album"}
          />
          <Button
            variant="destructive"
            // onClick={handleDelete}
            className="rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
