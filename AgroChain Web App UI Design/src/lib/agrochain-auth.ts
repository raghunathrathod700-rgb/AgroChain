/// <reference types="vite/client" />

/** Base URL including Spring context path `/api`. Override with `VITE_API_BASE_URL`. */
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api"
).replace(/\/$/, "");

// ─── Firebase integration ─────────────────────────────────────
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google via Firebase.
 * After successful Firebase auth, exchanges the Firebase token for a backend JWT.
 */
export async function signInWithGoogle(): Promise<AuthSuccess> {
  const result = await signInWithPopup(auth, googleProvider);
  const firebaseUser: FirebaseUser = result.user;
  // Send the Firebase ID token to our backend to get a JWT
  const idToken = await firebaseUser.getIdToken();
  const res = await fetch(`${API_BASE_URL}/v1/auth/firebase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const msg = await readErrorMessage(res);
    throw new Error(msg);
  }
  return (await res.json()) as AuthSuccess;
}

/**
 * Sign out from Firebase Auth.
 */
export async function firebaseLogout(): Promise<void> {
  await firebaseSignOut(auth);
}
// ─── End Firebase integration ─────────────────────────────────

export const STORAGE_TOKEN = "agrochain_access_token";
export const STORAGE_USER = "agrochain_user";
/** Kept in sync for any legacy checks */
export const STORAGE_LOGGED_IN = "agrochain_logged_in";

export type UserProfile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export type AuthSuccess = {
  accessToken: string;
  tokenType: string;
  user: UserProfile;
};

type ApiErrorBody = {
  status?: number;
  message?: string;
};

export type ForgotPasswordResponse = {
  message: string;
  resetToken?: string | null;
};

const AUTH_CHANGED = "agrochain-auth-changed";

export function notifyAuthChanged(): void {
  window.dispatchEvent(new Event(AUTH_CHANGED));
}

export function subscribeAuthChanged(handler: () => void): () => void {
  window.addEventListener(AUTH_CHANGED, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(AUTH_CHANGED, handler);
    window.removeEventListener("storage", handler);
  };
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(STORAGE_TOKEN)?.trim());
}

export function isAdmin(): boolean {
  const user = getStoredUser();
  return Boolean(user?.roles?.includes("ROLE_ADMIN"));
}

export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_TOKEN);
}

export function getStoredUser(): UserProfile | null {
  const raw = localStorage.getItem(STORAGE_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function persistAuthSession(data: AuthSuccess): void {
  localStorage.setItem(STORAGE_TOKEN, data.accessToken);
  localStorage.setItem(STORAGE_USER, JSON.stringify(data.user));
  localStorage.setItem(STORAGE_LOGGED_IN, "true");
  localStorage.setItem("agrochain_user_email", data.user.email);
  notifyAuthChanged();
}

export function clearAuthSession(): void {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_USER);
  localStorage.removeItem(STORAGE_LOGGED_IN);
  localStorage.removeItem("agrochain_user_email");
  localStorage.removeItem("agrochain_user_name");
  localStorage.removeItem("agrochain_user_role");
  notifyAuthChanged();
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as ApiErrorBody;
    if (body?.message && typeof body.message === "string") return body.message;
  } catch {
    /* ignore */
  }
  return res.statusText || "Request failed";
}

export async function loginRequest(email: string, password: string): Promise<AuthSuccess> {
  const res = await fetch(`${API_BASE_URL}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });
  if (!res.ok) throw new Error(await readErrorMessage(res));
  return (await res.json()) as AuthSuccess;
}

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "FARMER" | "BUYER";
};

export async function registerRequest(payload: RegisterPayload): Promise<AuthSuccess> {
  const body: Record<string, string> = {
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    role: payload.role,
  };
  const phone = payload.phone?.trim();
  if (phone) body.phone = phone;

  const res = await fetch(`${API_BASE_URL}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await readErrorMessage(res));
  return (await res.json()) as AuthSuccess;
}

export async function requestPasswordReset(email: string): Promise<ForgotPasswordResponse> {
  const res = await fetch(`${API_BASE_URL}/v1/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
  if (!res.ok) throw new Error(await readErrorMessage(res));
  return (await res.json()) as ForgotPasswordResponse;
}

export async function resetPassword(token: string, newPassword: string): Promise<ForgotPasswordResponse> {
  const res = await fetch(`${API_BASE_URL}/v1/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token.trim(), newPassword }),
  });
  if (!res.ok) throw new Error(await readErrorMessage(res));
  return (await res.json()) as ForgotPasswordResponse;
}

export async function apiFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getAccessToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers,
  });
}
