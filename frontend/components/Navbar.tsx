import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

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
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {role === "organizer" ? (
          <>
            <li className={styles.navItem}>
              <Link href="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/dashboard/events" className={styles.navLink}>
                Events
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/profile" className={styles.navLink}>
                Profile
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/dashboard/analytics" className={styles.navLink}>
                Analytics
              </Link>
            </li>
            <li className={styles.navItem}>
                <Link href={"/logout"} className={styles.navLink} onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/dashboard";
                }}>
                Logout
                </Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link href="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/profile" className={styles.navLink}>
                Profile
              </Link>
            </li>
            <li className={styles.navItem}>
                <Link href={"/logout"} className={styles.navLink} onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
                }}>
                Logout
                </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
