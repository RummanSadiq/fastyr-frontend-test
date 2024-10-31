import { Navigation } from "@/types/navigation";
import { RiHome2Line, RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineAudio } from "react-icons/ai";
import { BiAlbum } from "react-icons/bi";
import { Routes } from "@/shared/routes";

export const NavLinks: Navigation[] = [
  {
    icon: RiHome2Line,
    label: "Home",
    link: Routes.home,
  },
  {
    icon: RiAccountCircleLine,
    label: "User",
    link: Routes.user,
  },
  {
    icon: BiAlbum,
    label: "Album",
    link: Routes.album,
  },
  {
    icon: AiOutlineAudio,
    label: "Audio",
    link: Routes.audio,
  },
];
