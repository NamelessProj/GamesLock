import {create} from "zustand";

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem('userInfo', JSON.stringify(data));
    },

    logout: () => {
        set(() => ({userInfo: null}));
        localStorage.removeItem('userInfo');
    }
}));