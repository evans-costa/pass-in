import icon from "../assets/icon.svg";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <div className="flex items-center gap-5">
      <img src={icon} />
      <nav className="flex items-center gap-5">
        <NavLink href="/events">Eventos</NavLink>
        <NavLink href="/attendees">Partipantes</NavLink>
      </nav>
    </div>
  );
}
