import classNames from "classnames";
import { FunctionComponent, PropsWithChildren } from "react";

type Props = { label: string };

export const Header: FunctionComponent<PropsWithChildren<Props>> = ({
  label,
}) => {
  return (
    <div
      className={classNames(
        "flex justify-start overflow-hidden border-b p-7 text-black",
      )}
    >
      <p className={classNames("text-2xl font-bold")}>{label}</p>
    </div>
  );
};
