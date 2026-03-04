"use client";

import { useState, FormEvent } from "react";

// Pre-generated particle data to avoid impure function calls during render
const PARTICLES = [...Array(20)].map((_, i) => ({
  id: i,
  left: `${(i * 5 + 3) % 100}%`,
  animationDelay: `${(i * 0.25) % 5}s`,
  animationDuration: `${3 + (i % 4)}s`,
}));

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* Floating Orbs Background */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Floating Particles */}
      <div className="particles">
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      <main className="login-card">
        {/* Header Section */}
        <div className="login-header">
          <div className="avatar-container">
            <div className="avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access your account</p>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="success-container">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>Welcome!</h2>
            <p>Redirecting you to dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
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
                placeholder=" "
                required
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
              <label htmlFor="email">Email Address</label>
              <div className="input-highlight"></div>
            </div>

            {/* Password Field */}
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
                placeholder=" "
                required
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <label htmlFor="password">Password</label>
              <div className="input-highlight"></div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              <span className="btn-text">
                {isLoading ? "" : "Sign In"}
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

            {/* Social Login */}
            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button type="button" className="social-btn github">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
            </div>
          </form>
        )}

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            position: relative;
            overflow: hidden;
            padding: 20px;
          }

          /* Floating Orbs */
          .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.5;
            animation: float 8s ease-in-out infinite;
          }

          .orb-1 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            top: -100px;
            left: -100px;
            animation-delay: 0s;
          }

          .orb-2 {
            width: 300px;
            height: 300px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            bottom: -50px;
            right: -50px;
            animation-delay: -2s;
          }

          .orb-3 {
            width: 250px;
            height: 250px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            top: 50%;
            right: 20%;
            animation-delay: -4s;
          }

          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }

          /* Particles */
          .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: particle-float linear infinite;
          }

          @keyframes particle-float {
            0% {
              transform: translateY(100vh) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
              transform: translateY(90vh) scale(1);
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-10vh) scale(0);
              opacity: 0;
            }
          }

          /* Login Card */
          .login-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            padding: 48px 40px;
            width: 100%;
            max-width: 420px;
            position: relative;
            z-index: 10;
            box-shadow: 
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
            animation: card-appear 0.6s ease-out;
            margin: 0 auto;
          }

          @keyframes card-appear {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Header */
          .login-header {
            text-align: center;
            margin-bottom: 36px;
          }

          .avatar-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }

          .avatar {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            animation: avatar-pulse 3s ease-in-out infinite;
          }

          .avatar svg {
            width: 40px;
            height: 40px;
            color: white;
          }

          @keyframes avatar-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6); }
          }

          .login-header h1 {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin: 0 0 8px 0;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }

          .login-header p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
          }

          /* Form */
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          /* Input Groups */
          .input-group {
            position: relative;
          }

          .input-group input {
            width: 100%;
            padding: 18px 18px 18px 50px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            font-size: 15px;
            color: white;
            outline: none;
            transition: all 0.3s ease;
            box-sizing: border-box;
          }

          .input-group input::placeholder {
            color: transparent;
          }

          .input-group label {
            position: absolute;
            left: 50px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 15px;
            color: rgba(255, 255, 255, 0.6);
            pointer-events: none;
            transition: all 0.3s ease;
          }

          .input-group input:focus ~ label,
          .input-group input:not(:placeholder-shown) ~ label {
            top: -10px;
            left: 20px;
            font-size: 12px;
            background: linear-gradient(135deg, #302b63 0%, #24243e 100%);
            padding: 0 8px;
            color: #667eea;
          }

          .input-group input:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
          }

          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            color: rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;
            z-index: 5;
          }

          .input-group.focused .input-icon {
            color: #667eea;
            transform: translateY(-50%) scale(1.1);
          }

          .input-highlight {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: all 0.3s ease;
            border-radius: 0 0 12px 12px;
          }

          .input-group.focused .input-highlight {
            left: 0;
            width: 100%;
          }

          /* Form Options */
          .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
          }

          .checkbox-container {
            display: flex;
            align-items: center;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.7);
          }

          .checkbox-container input {
            display: none;
          }

          .checkmark {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            margin-right: 10px;
            position: relative;
            transition: all 0.3s ease;
          }

          .checkbox-container input:checked ~ .checkmark {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: #667eea;
          }

          .checkbox-container input:checked ~ .checkmark::after {
            content: '';
            position: absolute;
            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }

          .forgot-link {
            color: #667eea;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .forgot-link:hover {
            color: #764ba2;
            text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
          }

          /* Submit Button */
          .submit-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            color: white;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            margin-top: 8px;
          }

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          }

          .submit-btn:active:not(:disabled) {
            transform: translateY(0);
          }

          .submit-btn:disabled {
            cursor: not-allowed;
          }

          .btn-text {
            position: relative;
            z-index: 2;
          }

          .btn-glow {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
          }

          .submit-btn:hover .btn-glow {
            left: 100%;
          }

          /* Loader */
          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
          }

          .loader-dot {
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            animation: loader-bounce 0.6s ease-in-out infinite;
          }

          .loader-dot:nth-child(2) {
            animation-delay: 0.1s;
          }

          .loader-dot:nth-child(3) {
            animation-delay: 0.2s;
          }

          @keyframes loader-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          /* Divider */
          .divider {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.5);
            font-size: 13px;
            margin: 8px 0;
          }

          .divider::before,
          .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
          }

          .divider span {
            padding: 0 16px;
          }

          /* Social Login */
          .social-login {
            display: flex;
            gap: 12px;
            justify-content: center;
          }

          .social-btn {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.1);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .social-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
          }

          /* Success State */
          .success-container {
            text-align: center;
            animation: success-appear 0.5s ease-out;
          }

          @keyframes success-appear {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            animation: success-pulse 1s ease-in-out infinite;
          }

          @keyframes success-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 239, 125, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(56, 239, 125, 0); }
          }

          .success-icon svg {
            width: 40px;
            height: 40px;
            color: white;
          }

          .success-container h2 {
            font-size: 28px;
            color: white;
            margin: 0 0 8px 0;
          }

          .success-container p {
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
          }

          /* Responsive */
          @media (max-width: 480px) {
            .login-card {
              padding: 32px 24px;
            }

            .orb-1 {
              width: 250px;
              height: 250px;
            }

            .orb-2 {
              width: 200px;
              height: 200px;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
