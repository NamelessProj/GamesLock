import {create} from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
    user: null,
    userLoading: false,
    error: null,
    success: false,
    message: null,

    register: async (data) => {
        set({userLoading: true, error: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/register', data);
            set(() => ({user: response.data, userLoading: false, success: true}));
        }catch(error){
            set({error: error.message, userLoading: false});
        }
    },

    login: async (data) => {
        set({userLoading: true, error: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/login', data);
            set(() => ({user: response.data, userLoading: false, success: true}));
        }catch(error){
            set({error: error.message, userLoading: false});
        }
    },

    getUserById: async (id) => {
        set({userLoading: true, error: null});
        try{
            const response = await axios.get(`http://localhost:3000/api/user/profile/${id}`);
            set(() => ({user: response.data, userLoading: false, success: true}));
        }catch(error){
            set({error: error.message, userLoading: false});
        }
    },

    userLogout: async () => {
        set({userLoading: true, error: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/logout');
            set(() => ({user: response.data, userLoading: false}));
        }catch(error){
            set({error: error.message, userLoading: false});
        }
    }
}));