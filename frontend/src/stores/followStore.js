import {create} from "zustand";
import api from "../api/axiosConfig";

export const useFollowStore = create((set) => ({
    follow: null,
    userFollow: null,
    followLoading: false,
    followError: null,
    followSuccess: false,

    getUserFollow: async (id) => {
        set({followLoading: true, followError: null});
        try{
            const response = await api.get(`follow/${id}`, {
                method: 'get',
                withCredentials: true,
            });
            set(() => ({userFollow: response.data, followLoading: false, followSuccess: true}));
        }catch(error){
            set({followError: error.response.data.message || error.message, followLoading: false});
        }
    },

    addFollow: async (id) => {
        set({followLoading: true, followError: null});
        try{
            const response = await api.post(`follow/${id}`, null, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({follow: response.data, followLoading: false, followSuccess: true}));
        }catch(error){
            set({followError: error.response.data.message || error.message, followLoading: false});
        }
    },

    deleteFollow: async (id) => {
        set({followLoading: true, followError: null});
        try{
            const response = await api.delete(`follow/${id}`, {
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({follow: response.data, followLoading: false, followSuccess: true}));
        }catch(error){
            set({followError: error.response.data.message || error.message, followLoading: false});
        }
    },
}));