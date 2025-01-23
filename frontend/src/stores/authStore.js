import {create} from "zustand";

const localStorageName = "gl_userInfo";

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem(localStorageName) ? JSON.parse(localStorage.getItem(localStorageName)) : null,

    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem(localStorageName, JSON.stringify(data));
    },

    logout: () => {
        set(() => ({userInfo: null}));
        localStorage.removeItem(localStorageName);
    }
}));