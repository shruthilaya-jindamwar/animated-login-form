"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import { generateResetToken, getCurrentUser } from "@/lib/authClient";

export default function ForgotPage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [tokenLink, setTokenLink] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getCurrentUser()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;

    const token = generateResetToken(email);
    if (token) {
      setEmailSent(true);
      setTokenLink(`${window.location.origin}/reset?token=${token}`);
    } else {
      setError("No account found with that email");
    }
  };

  return (
    <AuthLayout>
      <div className="login-header">
        <div className="avatar-container">
          <div className="avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a reset link</p>
      </div>

      {emailSent ? (
        <div className="success-container">
          <h2>Check your email</h2>
          <p>If an account exists, a link was generated.</p>
          {tokenLink && (
            <p>
              <a href={tokenLink} style={{ color: "#667eea" }}>
                {tokenLink}
              </a>
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-text" style={{ color: "#f33" }}>{error}</p>}
          <div className={`input-group ${focusedField === "email" ? "focused" : ""}`}>
            <div className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
            <label htmlFor="email">Email Address</label>
            <div className="input-highlight"></div>
          </div>

          <button type="submit" className="submit-btn">
            Send reset link
            <div className="btn-glow"></div>
          </button>

          <p style={{ fontSize: 13, textAlign: "center" }}>
            Remembered? <a href="/" style={{ color: "#667eea" }}>Sign in</a>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
