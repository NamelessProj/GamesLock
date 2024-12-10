import {create} from "zustand";
import axios from "axios";

export const useNotificationStore = create((set) => ({
    notifications: [],
    notificationLoading: false,
    notificationError: null,

    getUserNotifications: async (id) => {
        set(() => ({notificationLoading: true, notificationError: null}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}notification/${id}`, {
                withCredentials: true
            });
            set(() => ({notifications: response.data.notifications, notificationLoading: false}));
        }catch(error){
            set({notificationError: error.message, notificationLoading: false});
        }
    },
}));