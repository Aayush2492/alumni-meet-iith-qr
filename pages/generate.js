import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styles from "../styles/Home.module.css";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Generate() {
  const { data: session } = useSession();
  const [qrCodeValue, setQrCodeValue] = useState(
    session?.user.email || "DEFAULT"
  );

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.back();
    }
  }, []);

  return (
    <div className={styles.main}>
      <button
        className={styles.card}
        onClick={function () {
          signOut();
        }}
      >
        <h2>Logout</h2>
      </button>{" "}
      <div className={styles.card}>
        <h2>Hello, {session?.user.name || "DEFAULT_NAME"}</h2>
      </div>
      {qrCodeValue != "" && (
        <QRCode value={qrCodeValue} className={styles.containerColumn} />
      )}
    </div>
  );
}

export default Generate;
