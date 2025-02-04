import {create} from "zustand";
import api from "../api/axiosConfig";

export const useAdminStore = create((set) => ({
    adminError: null,

    userCount: 0,
    getUserCount: async () => {
        try{
            const response = await api.get('user/count');
            set(() => ({userCount: response.data.count}));
        }catch(error){
            set({adminError: error.response.data.message || error.message});
        }
    },

    messageCount: 0,
    getMessageCount: async () => {
        try{
            const response = await api.get('message/count');
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
            const response = await api.get('message/reported', {
                method: "get",
                withCredentials: true
            });
            set(() => ({reportedPosts: response.data.messages, reportedPostsLoading: false}));
        }catch(error){
            set({adminError: error.response.data.message || error.message, reportedPostsLoading: false});
        }
    },


    deleteReportedPost: async (id) => {
        try{
            await api.delete(`message/report/${id}`, {
                method: "delete",
                withCredentials: true
            });
            set(() => ({reportedPosts: []}));
            await useAdminStore.getState().getReportedPosts();
        }catch(error){
            set({adminError: error.response.data.message || error.message});
        }
    }
}));