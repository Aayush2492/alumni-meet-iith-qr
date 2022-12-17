import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";

function Scan() {
  const [data, setData] = useState("Data from scanned QR will appear here");
  const [status, setStatus] = useState("initial");
  const [capacity, setCapacity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const getFromLocalStorage = (key) => {
    if (typeof window !== "undefined") {
      const ans = localStorage.getItem(key);
      // console.log(key, ans);
      return ans;
    }
    return null;
  };

  const setToStorage = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  const getUserData = async (email) => {
    // email = "cs20btech11001@iith.ac.in";
    email = email.toLowerCase();
    if (email !== "no result") {
      const valFromLocalStorage = getFromLocalStorage(email);
      if (valFromLocalStorage) {
        // console.log("From local storage", valFromLocalStorage);
        setStatus(true);
        setCapacity(valFromLocalStorage);
        return;
      }

      const jsondata = JSON.stringify(email);
      const response = await fetch("/api/get_status", {
        method: "POST",
        body: jsondata,
      });
      console.log("response", response);
      if (response.status === 404) {
        console.log("User not found");
        setStatus(false);
        setErrorMessage("User not found");
      } else {
        const data = await response.json();
        // console.log("status", data.status);
        // console.log("capacity", data.capacity);
        setStatus(data.status);
        setCapacity(data.capacity);
        setToStorage(email, data.capacity);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              // console.log("Data", data);
              // console.info("Scan output(inside if)", result?.text);
              setData(result?.text);
              getUserData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "40%", height: "40%" }}
        />

        <div className={styles.card}>{data}</div>

        {status === "initial" && (
          <div className={styles.card} style={{ backgroundColor: "yellow" }}>
            <h2>Scanning...</h2>
          </div>
        )}
        {status === true && (
          <div
            className={styles.card}
            style={{ backgroundColor: "green", color: "white" }}
          >
            <h2>Allowed</h2>
            <hr />
            <h2>Capacity: &nbsp; {capacity}</h2>
          </div>
        )}
        {status === false && errorMessage !== "" && (
          <div
            className={styles.card}
            style={{ backgroundColor: "red", color: "white" }}
          >
            <h2>Not Allowed</h2>
            <hr />
            <h2>{errorMessage}</h2>
          </div>
        )}
        {status === false && errorMessage === "" && (
          <div
            className={styles.card}
            style={{ backgroundColor: "red", color: "white" }}
          >
            <h2>Not Allowed</h2>
            <hr />
            <h2>Entry already marked</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Scan;
