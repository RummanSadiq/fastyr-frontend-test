'use client'

import classNames from "classnames";
import { FunctionComponent, useCallback } from "react";
import { useRouter } from "next/navigation";

// Custom Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Utils
import { formatPhoneWithExt } from "@/utils";

// Icons
import { LuPhone, LuMail, LuGlobe } from "react-icons/lu";

// Shared
import { Routes } from "@/shared/routes";

type Props = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  userId?: string;
};

export const UserInfoCard: FunctionComponent<Props> = ({
  name,
  username,
  email,
  phone,
  website,
  userId,
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if(!userId) return

    router.push(Routes.userDetail(userId));
  },[]);

  return (
    <Card
      onClick={handleClick}
      className={classNames("h-fit cursor-pointer")}
    >
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className={classNames("text-sm text-muted-foreground")}>
            {username}
          </CardDescription>
        </CardHeader>
        <CardContent className={classNames("flex flex-col gap-1 text-sm")}>
          <div className={classNames("flex items-center gap-2")}>
            <LuPhone />
            <p>{formatPhoneWithExt(phone)}</p>
          </div>
          <div className={classNames("flex items-center gap-2")}>
            <LuMail />
            <p>{email}</p>
          </div>
          <div className={classNames("flex items-center gap-2")}>
            <LuGlobe />
            <p>{website}</p>
          </div>
        </CardContent>
      </Card>
  );
};
