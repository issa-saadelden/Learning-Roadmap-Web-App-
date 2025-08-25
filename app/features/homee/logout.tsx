import styles from "../styles/page.module.css";

export default function Logout() {
  return (
    <button
      onClick={() => {
        sessionStorage.removeItem("user");
        window.location.reload();
      }}
      className={styles.topbarbutton}
    >
      Logout
    </button>
  );
}
