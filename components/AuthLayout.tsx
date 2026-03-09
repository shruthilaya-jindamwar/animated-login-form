"use client";

import { ReactNode, useState } from "react";

// Pre-generated particle data to avoid impure function calls during render
const PARTICLES = [...Array(20)].map((_, i) => ({
  id: i,
  left: `${(i * 5 + 3) % 100}%`,
  animationDelay: `${(i * 0.25) % 5}s`,
  animationDuration: `${3 + (i % 4)}s`,
}));

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
        {children}
      </main>

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

        @media (prefers-color-scheme: light) {
          .login-container {
            background: linear-gradient(135deg, #e0e7ff 0%, #f5f3ff 50%, #fae8ff 100%);
          }
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

        @media (prefers-color-scheme: light) {
          .particle {
            background: rgba(102, 126, 234, 0.4);
          }
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

        @media (prefers-color-scheme: light) {
          .login-card {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(102, 126, 234, 0.2);
            box-shadow: 
              0 25px 50px -12px rgba(102, 126, 234, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
          }
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

        /* rest of common styles (inputs, buttons etc) */
        /* ... copied from original login page to keep consistency ... */
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
          width: 40px;   /* even smaller */
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          animation: avatar-pulse 3s ease-in-out infinite;
        }
        .avatar svg {
          width: 20px;
          height: 20px;
          color: white;
        }
        @keyframes avatar-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6); }
        }

        /* inputs, focus, highlights, etc. */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
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
        @media (prefers-color-scheme: light) {
          .input-group input {
            background: #f9fafb;
            border: 2px solid #e5e7eb;
            color: #1f2937;
          }
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
        @media (prefers-color-scheme: light) {
          .input-group label {
            color: #9ca3af;
          }
          .input-group input:focus ~ label,
          .input-group input:not(:placeholder-shown) ~ label {
            background: white;
            color: #667eea;
          }
        }
        .input-group input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          z-index: 5;
        }
        .input-icon svg {
          width: 100%;
          height: 100%;
          max-width: 16px;
          max-height: 16px;
        }
        @media (prefers-color-scheme: light) {
          .input-icon {
            color: #9ca3af;
          }
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
        @media (prefers-color-scheme: light) {
          .checkbox-container {
            color: #6b7280;
          }
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
        @media (prefers-color-scheme: light) {
          .checkmark {
            border: 2px solid #d1d5db;
          }
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

        .submit-btn {
          width: 100%;
          padding: 12px 14px; /* slightly smaller vertically */
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          font-size: 14px;
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
        @media (prefers-color-scheme: light) {
          .divider {
            color: #9ca3af;
          }
          .divider::before,
          .divider::after {
            background: #e5e7eb;
          }
        }
        .divider span {
          padding: 0 16px;
        }
        .social-login {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        @media (prefers-color-scheme: light) {
          .social-btn {
            border: 2px solid #e5e7eb;
            background: #f9fafb;
          }
          .social-btn:hover {
            background: white;
            border-color: #d1d5db;
          }
        }
        .social-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }
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
        @media (prefers-color-scheme: light) {
          .success-container h2 {
            color: #1f2937;
          }
          .success-container p {
            color: #6b7280;
          }
        }
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
    </div>
  );
}
