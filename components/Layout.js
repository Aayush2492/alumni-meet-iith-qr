import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <>
      {children}{" "}
      <footer className={styles.footer}>
        <a href="https://iith.dev" target="_blank" rel="noopener noreferrer">
          A{" "}
          <span className={styles.logo}>
            <Image
              src="/lambda_logo.png"
              alt="Lambda Logo"
              width={20}
              height={20}
            />
          </span>
          &nbsp; Production
        </a>
      </footer>
    </>
  );
}
