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
                method: 'get',
                withCredentials: true
            });
            set(() => ({notifications: response.data.notifications, notificationLoading: false}));
        }catch(error){
            set({notificationError: error.response.data.message || error.message, notificationLoading: false});
        }
    },

    readAllNotifications: async () => {
        try{
            await axios.patch(`${import.meta.env.VITE_API_URL}notification/read`, null, {
                method: 'patch',
                withCredentials: true
            });
        }catch(error){
            console.error(error);
        }
    },

    deleteANotification: async (id) => {
        set(() => ({notificationError: null}));
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}notification/${id}`, {
                method: 'delete',
                withCredentials: true
            });
            set(() => ({notifications: response.data.notifications}));
        }catch(error){
            set({notificationError: error.response.data.message || error.message});
        }
    },

    deleteAllNotifications: async () => {
        set(() => ({notificationError: null}));
        try{
            await axios.delete(`${import.meta.env.VITE_API_URL}notification`, {
                method: 'delete',
                withCredentials: true
            });
            set(() => ({notifications: []}));
        }catch(error){
            set({notificationError: error.response.data.message || error.message});
        }
    }
}));