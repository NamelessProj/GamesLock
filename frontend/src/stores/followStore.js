import {create} from "zustand";
import axios from "axios";

export const useFollowStore = create((set) => ({
    follow: null,
    followLoading: false,
    followError: null,
    followSuccess: false,

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
}));