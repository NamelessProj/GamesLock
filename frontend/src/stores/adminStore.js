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
            set({adminError: error.response.data.message || error.message});
        }
    },

    messageCount: 0,
    getMessageCount: async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message/count`);
            set(() => ({messageCount: response.data.count}));
        }catch(error){
            set({adminError: error.response.data.message || error.message});
        }
    },

    reportedPosts: [],
    reportedPostsLoading: false,
    getReportedPosts: async () => {
        set(() => ({reportedPostsLoading: true}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message/reported`, {
                method: "get",
                withCredentials: true
            });
            set(() => ({reportedPosts: response.data.messages, reportedPostsLoading: false}));
        }catch(error){
            set({adminError: error.response.data.message || error.message, reportedPostsLoading: false});
        }
    },
}));