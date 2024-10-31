"use client"

import { FunctionComponent, useCallback, useState } from "react";
import classNames from "classnames"
import { usePathname } from "next/navigation";
import Link from "next/link";

// Icons
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

// Components
import { Button } from "@/components/ui/button";

// Shared
import { NavLinks } from "@/shared/navigation";
import { Routes } from "@/shared/routes";

export const NavigationSidebar: FunctionComponent = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const pathname = usePathname();

  const isActive = useCallback(
    (route: string): boolean => {
      if (route === Routes.home) {
        return route === pathname;
      }
      return pathname.includes(route);
    },
    [pathname],
  );

  const handleToggleMenu = useCallback(() => {
    setToggleMenu((prevState) => !prevState);
  }, []);
  return (
    <div
      className={classNames(
        "flex w-full flex-col justify-between py-3 md:h-screen md:w-72 md:py-7 border",
        { "h-screen": toggleMenu },
      )}
    >
      <div className={classNames("flex flex-col gap-8")}>
        <div
          className={classNames(
            "flex items-center justify-between px-2 text-3xl md:px-7",
          )}
        >
          <Button
            className={classNames("bg-primary md:hidden")}
            size={"icon"}
            onClick={handleToggleMenu}
          >
            {toggleMenu ? (
              <RxCross2 className={classNames("size-6")} />
            ) : (
              <RiMenu2Fill className={classNames("size-6")} />
            )}
          </Button>
          <h1
            className={classNames(
              "flex-1 text-center font-bold text-primary md:text-left",
            )}
          >
            Fastyr
          </h1>
        </div>
        <div
          className={classNames("flex-col md:flex", { hidden: !toggleMenu })}
        >
          {NavLinks.map((nav) => (
            <Link key={nav.label} href={nav.link}>
              <Button
                className={classNames(
                  "flex h-auto w-full justify-start gap-2 rounded-none transition bg-transparent p-4 text-base font-medium text-subtle hover:bg-primary/30 hover:text-white md:px-7",
                  { "bg-primary text-white": isActive(nav.link) },
                )}
              >
                <nav.icon className={classNames("size-6")} />
                {nav.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}