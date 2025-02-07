import { create } from "zustand";
import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true; // this ensures that any request sent the cookies is included
interface AuthStore {
  user: any | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;

  signup: (fullName: string, email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<any>;
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (fullName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        fullName,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        isCheckingAuth: false,
        isAuthenticated: true,
        user: response.data.user,
      });
    } catch (error: any) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: true });
    }
  },
}));
