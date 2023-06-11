import axios from "axios";
import { create } from "zustand";

// type UserTypes = {
//   id: string;
//   username: string;
//   password: string;
// };

type FormDataTypes = {
  [k: string]: FormDataEntryValue;
};

type StoreTypes = {
  currUser: {
    username: string;
  };
  getCurrUser: (id: string | undefined) => Promise<any>;
  registerUser: (userData: FormDataTypes) => Promise<void>;
  loginUser: (userData: FormDataTypes) => Promise<any>;
  logOutUser: () => void;

  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const useZustandStore = create<StoreTypes>((set) => ({
  currUser: {
    username: "",
  },
  getCurrUser: async (id: string | undefined) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("User isn't authenticated");

      const res = await axios.get(`http://localhost:3001/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ currUser: res.data });
    } catch (error) {
      console.log("getCurrUser", error);
    }
  },
  registerUser: async (userData) => {
    try {
      const { username, password } = userData;
      await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
    } catch (error) {
      console.log("registerUser", error);
    }
  },
  loginUser: async (userData) => {
    try {
      const { username, password } = userData;
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      if (res.status === 200) {
        const { id, token } = res.data;
        localStorage.setItem("jwt", token);
        localStorage.setItem("userId", id);
        set({ authenticated: true });
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.log("loginUser", error);
      set({ authenticated: false });
    }
  },
  logOutUser: () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    set({ authenticated: false });
  },

  authenticated: false,
  setAuthenticated: (value: boolean) => {
    set({ authenticated: value });
  },
}));
