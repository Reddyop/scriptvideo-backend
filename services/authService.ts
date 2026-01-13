
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { User } from "../types";

// Map Firebase User to App User
export const mapUser = (fbUser: FirebaseUser | null): User | null => {
  if (!fbUser) return null;
  return {
    id: fbUser.uid,
    email: fbUser.email || "",
    name: fbUser.email?.split('@')[0] || "User",
    credits: 10, // In real app, fetch this from backend DB
    // Fixed: Corrected casing to match PlanType and UserRole definitions
    plan: 'STARTER',
    role: 'USER',
    // Added missing status property to satisfy the User interface requirement
    status: 'ACTIVE'
  };
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (fbUser) => {
    callback(mapUser(fbUser));
  });
};

export const loginUser = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);

export const registerUser = (email: string, password: string) => 
  createUserWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);
