"use client";

import { useState } from "react";
import styles from "./Forms.module.css";

// Log in and sign up are the same thing: enter your email, get a one-time sign-in link.
// The form works up to sending; actually sending the link needs Supabase Auth (next step).
export default function LoginForm({ base = "" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "invalid" | "pending"

  function handleSubmit(e) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? "pending" : "invalid");
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log in or sign up</h1>
        <p className={styles.lede}>
          Enter your email and we&apos;ll send you a link that signs you in. No password needed, and new and
          returning climbers use the same link.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus(null);
              }}
              aria-invalid={status === "invalid"}
              aria-describedby="login-status"
            />
          </label>

          <button type="submit" className={styles.primary}>
            Email me a sign-in link
          </button>

          <p id="login-status" className={styles.status} role="status">
            {status === "invalid" && "That doesn't look like an email address. Check it and try again."}
            {status === "pending" &&
              "Sign-in isn't connected yet; it's the next thing being built. Once it is, a link will arrive in your inbox."}
          </p>
        </form>

        <p className={styles.small}>
          By signing in, you agree to the <a href={`${base}/terms`}>Terms</a> and <a href={`${base}/privacy`}>Privacy policy</a>.
        </p>
      </div>
    </main>
  );
}
