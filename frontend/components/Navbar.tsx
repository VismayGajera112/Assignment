import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/globals.css";

const decodeRole = (token: string): string => {
  try {
    const base64Payload = token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded?.role || "";
  } catch {
    return "";
  }
};

const Navbar: React.FC = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setRole(decodeRole(token));
    }
  }, []);

  return (
    <nav className="navbar">
      <ul className="navList">
        {role === "organizer" ? (
          <>
            <li className="navItem">
              <Link href="/dashboard" className="navLink">
              Dashboard
              </Link>
            </li>
            <li className="navItem">
              <Link href="/dashboard/events" className="navLink">
              Events
              </Link>
            </li>
            <li className="navItem">
              <Link href="/profile" className="navLink">
              Profile
              </Link>
            </li>
          </>
        ) : (
          <>
          <li className="navItem">
              <Link href="/dashboard" className="navLink">
              Dashboard
              </Link>
            </li>
            <li className="navItem">
              <Link href="/profile" className="navLink">
                Profile
              </Link>
            </li>
            <li className="navItem">
              <Link href="/events" className="navLink">
                My Events
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
