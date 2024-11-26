import {create} from "zustand";
import axios from "axios";

export const useFollowStore = create((set) => ({
    follow: null,
    userFollow: null,
    followLoading: false,
    followError: null,
    followSuccess: false,

    getUserFollow: async (id) => {
        set({followLoading: true, followError: null});
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}follow/${id}`, {
                method: 'get',
                withCredentials: true,
            });
            set(() => ({userFollow: response.data, followLoading: false, followSuccess: true}));
        }catch(error){
            set({followError: error.message, followLoading: false});
        }
    },

    addFollow: async (id) => {
        set({followLoading: true, followError: null});
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}follow/${id}`, null, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({follow: response.data, followLoading: false, followSuccess: true}));
        }catch(error){
            set({followError: error.message, followLoading: false});
        }
    },

    deleteFollow: async (id) => {
        set({followLoading: true, followError: null});
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}follow/${id}`, {
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({follow: response.data, followLoading: false, followSuccess: true}));
        }catch(error){
            set({followError: error.message, followLoading: false});
        }
    },
}));