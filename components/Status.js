import { useEffect } from "react";

import styles from "../styles/Home.module.css";

export default function Status({ email }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async function () {
    // fetch the status from the backend
    const jsondata = JSON.stringify(email);
    const response = await fetch("/api/get_status", {
      method: "POST",
      body: jsondata,
    });
    const data = await response.json();
    console.log("data", data);
  }, []);

  return (
    <div className={styles.card}>
      <h2>{email}</h2>
    </div>
  );
}
