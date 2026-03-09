"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import { verifyResetToken, resetPassword, getCurrentUser } from "@/lib/authClient";

export default function ResetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (getCurrentUser()) {
      router.push("/dashboard");
      return;
    }
    if (token) {
      const e = verifyResetToken(token);
      if (e) {
        setEmail(e);
      } else {
        setError("Invalid or expired token");
      }
    } else {
      setError("No token provided");
    }
  }, [token, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const form = e.target as HTMLFormElement;
    const pw = (form.password as HTMLInputElement).value;
    const confirm = (form.confirm as HTMLInputElement).value;

    if (pw !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const ok = resetPassword(token, pw);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } else {
      setError("Failed to reset password");
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
        <h1>Reset Password</h1>
        <p>{email ? `for ${email}` : ""}</p>
      </div>

      {error ? (
        <div className="success-container">
          <h2 style={{ color: "#f33" }}>Error</h2>
          <p>{error}</p>
        </div>
      ) : success ? (
        <div className="success-container">
          <h2>Done</h2>
          <p>Password has been updated.
            <br />Redirecting to sign in...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className={`input-group ${focusedField === "password" ? "focused" : ""}`}>
            <div className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              required
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
            <label htmlFor="password">New Password</label>
            <div className="input-highlight"></div>
          </div>

          <div className={`input-group ${focusedField === "confirm" ? "focused" : ""}`}>
            <div className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder=" "
              required
              onFocus={() => setFocusedField("confirm")}
              onBlur={() => setFocusedField(null)}
            />
            <label htmlFor="confirm">Confirm</label>
            <div className="input-highlight"></div>
          </div>

          <button type="submit" className="submit-btn">
            Update
            <div className="btn-glow"></div>
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
