import {create} from "zustand";
import api from "../api/axiosConfig";

export const useNotificationStore = create((set) => ({
    notifications: [],
    notificationLoading: false,
    notificationError: null,

    getUserNotifications: async (id) => {
        set(() => ({notificationLoading: true, notificationError: null}));
        try{
            const response = await api.get(`notification/${id}`, {
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
            await api.patch('notification/read', null, {
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
            const response = await api.delete(`notification/${id}`, {
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
            await api.delete('notification', {
                method: 'delete',
                withCredentials: true
            });
            set(() => ({notifications: []}));
        }catch(error){
            set({notificationError: error.response.data.message || error.message});
        }
    }
}));