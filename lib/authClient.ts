"use client";

/**
 * Simple client-side authentication helpers using localStorage.
 * This is a demo implementation; do not use in production.
 */

export interface User {
  email: string;
  password: string;
  resetToken?: string;
}

const USERS_KEY = "auth_users";
const CURRENT_USER_KEY = "auth_current_user";

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function setUsers(users: User[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(email: string, password: string): { success: boolean; message?: string } {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, message: "Email already registered" };
  }
  users.push({ email, password });
  setUsers(users);
  return { success: true };
}

export function loginUser(email: string, password: string): boolean {
  const users = getUsers();
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (found) {
    setCurrentUser(found.email);
    return true;
  }
  return false;
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENT_USER_KEY);
}

function setCurrentUser(email: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENT_USER_KEY, email);
}

export function generateResetToken(email: string): string | null {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  user.resetToken = token;
  setUsers(users);
  return token;
}

export function verifyResetToken(token: string): string | null {
  const users = getUsers();
  const user = users.find((u) => u.resetToken === token);
  return user ? user.email : null;
}

export function resetPassword(token: string, newPassword: string): boolean {
  const users = getUsers();
  const user = users.find((u) => u.resetToken === token);
  if (!user) return false;
  user.password = newPassword;
  delete user.resetToken;
  setUsers(users);
  return true;
}
