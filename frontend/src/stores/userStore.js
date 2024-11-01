import {create} from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
    user: null,
    userLoading: false,
    userError: null,
    userSuccess: false,
    userMessage: null,

    register: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/register', data);
            set(() => ({user: response.data, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    login: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/login', data);
            set(() => ({user: response.data, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    getUserById: async (id) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.get(`http://localhost:3000/api/user/profile/${id}`);
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    userLogout: async () => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/logout');
            set(() => ({user: response.data, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    }
}));