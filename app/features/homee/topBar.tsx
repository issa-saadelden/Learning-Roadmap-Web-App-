import Logout from "./logout";
import styles from "../styles/page.module.css";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          fontWeight: "bold",
          color: "#f2f2f2",
        }}
      >
        Learn.roadmap
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href="/features/learn/htmlLearn" className={styles.topbarbutton}>
          HTML
        </Link>
        <Link href="/features/learn/csslearn" className={styles.topbarbutton}>
          CSS
        </Link>
        <Link href="/features/learn/reactlearn" className={styles.topbarbutton}>
          REACT
        </Link>
        <Logout />
      </div>
    </div>
  );
}
