import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";

// Components
import { NavigationSidebar } from "@/components/layout/dashboard-layout/NavigationSidebar";

export const DashboardLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className={classNames("flex h-full flex-col md:flex-row")}>
      <NavigationSidebar />
      <div className={classNames("max-h-dvh w-full")}>{children}</div>
    </div>
  );
};
