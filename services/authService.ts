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
  
  // Simulation: Try to fetch persisted user data (credits) from LocalStorage
  // In a real backend, this would be an API call.
  const storedData = localStorage.getItem(`user_data_${fbUser.uid}`);
  const storedCredits = storedData ? JSON.parse(storedData).credits : 10;

  return {
    id: fbUser.uid,
    email: fbUser.email || "",
    name: fbUser.email?.split('@')[0] || "User",
    credits: storedCredits, 
    plan: 'STARTER',
    role: 'USER',
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