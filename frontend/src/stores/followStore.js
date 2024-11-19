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
            const response = await axios.get(`http://localhost:3000/api/follow/${id}`, {
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
            const response = await axios.post(`http://localhost:3000/api/follow/${id}`, null, {
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
            const response = await axios.delete(`http://localhost:3000/api/follow/${id}`, {
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({follow: response.data, followLoading: false, followSuccess: true}));
        }catch(error){
            set({followError: error.message, followLoading: false});
        }
    },
}));