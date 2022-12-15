import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    console.log("Sign in successful", session);
    if (!session.user.email.endsWith("iith.ac.in")) {
      alert("Please sign in with your IITH email");
      signOut();
    }

    // push to generate page or scan page based on email
    router.push(`/generate`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>QR-code verifier</title>
        <meta
          name="QR-code verifier"
          content="QR-code verifier app by Lambda"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <button className={styles.card} onClick={() => signIn()}>
            <h2>Login With Google</h2>
          </button>{" "}
        </div>
      </main>
    </div>
  );
}
