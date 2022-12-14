import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

export default function Status({ email }) {
  const [status, setStatus] = useState("initial");
  const [capacity, setCapacity] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async function () {
    // fetch the status from the backend
    email = "cs20btech11001@iith.ac.in";
    email = email.toLowerCase();
    if (email !== "no result") {
      const jsondata = JSON.stringify(email);
      const response = await fetch("/api/get_status", {
        method: "POST",
        body: jsondata,
      });
      console.log("response", response);
      if (response.status === 404) {
        console.log("User not found");
        setStatus(false);
      } else {
        const data = await response.json();
        console.log("status", data.status);
        console.log("capacity", data.capacity);
        setStatus(data.status);
        setCapacity(data.capacity);
      }
    }
  }, []);

  return (
    <div className={styles.card}>
      <h2>{status.toString()}</h2>
      {status === "initial" && <h2>Scanning...</h2>}
      {status === true && <h2>Allowed</h2>}
      {status === false && <h2>Not Allowed</h2>}
    </div>
  );
}
