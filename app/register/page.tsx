"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import { registerUser, getCurrentUser } from "@/lib/authClient";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    const confirm = (form.confirm as HTMLInputElement).value;

    if (password !== confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const result = registerUser(email, password);
      setIsLoading(false);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 1200);
      } else {
        setError(result.message || "Unable to register");
      }
    }, 500);
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
        <h1>Create Account</h1>
        <p>Register a new user</p>
      </div>

      {success ? (
        <div className="success-container">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2>Registered!</h2>
          <p>Redirecting to sign in...</p>
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
            <label htmlFor="password">Password</label>
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
            <label htmlFor="confirm">Confirm Password</label>
            <div className="input-highlight"></div>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            <span className="btn-text">
              {isLoading ? "" : "Sign Up"}
            </span>
            {isLoading && (
              <div className="loader">
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
              </div>
            )}
            <div className="btn-glow"></div>
          </button>

          <p style={{ fontSize: 13, textAlign: "center" }}>
            Already have an account? <a href="/" style={{ color: "#667eea" }}>Sign in</a>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
