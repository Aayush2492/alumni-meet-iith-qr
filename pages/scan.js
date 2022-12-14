import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Status from "../components/Status";

function Scan() {
  const { data: session } = useSession();
  const router = useRouter();

  const [data, setData] = useState("No result");

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              // verify email
              // verify status in mongo backend
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "40%", height: "40%" }}
        />
        <Status email={data} />
      </div>
    </div>
  );
}

export default Scan;
