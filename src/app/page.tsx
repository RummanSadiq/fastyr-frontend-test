import classNames from "classnames";

// Components
import { Header } from "@/components/common/Header";

export default function Home() {
  return (
    <div className={classNames("flex")}>
      <Header label={"Home"}/>
    </div>
  );
}
