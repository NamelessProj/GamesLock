import {create} from "zustand";
import axios from "axios";

export const useAdminStore = create((set) => ({
    adminError: null,

    userCount: 0,
    getUserCount: async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}user/count`);
            set(() => ({userCount: response.data.count}));
        }catch(error){
            set({adminError: error.message});
        }
    },

    messageCount: 0,
    getMessageCount: async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message/count`);
            set(() => ({messageCount: response.data.count}));
        }catch(error){
            set({adminError: error.message});
        }
    },
}));