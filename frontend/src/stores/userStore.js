import {create} from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
    user: null,
    userLoading: false,
    likeLoading: false,
    otpLoading: false,
    userError: null,
    otpError: null,
    userPasswordError: null,
    likeError: null,
    userSuccess: false,
    otpSuccess: false,
    userMessage: null,
    updatedMessage: null,

    register: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}user/register`, data, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    generateOtp: async (data) => {
        set({otpLoading: true, otpError: null});
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}user/otp`, data);
            set(() => ({otpLoading: false, otpSuccess: true}));
        }catch(error){
            set({otpError: error.message, otpLoading: false});
        }
    },

    login: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}user/login`, data, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    updateUser: async (data) => {
        set({userLoading: true, userError: null, userSuccess: false});
        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}user/profile`, data, {
                method: 'put',
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    updatePassword: async (data) => {
        set({userLoading: true, userPasswordError: null, userSuccess: false});
        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}user/profile/password`, data, {
                method: 'put',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userPasswordError: error.message, userLoading: false});
        }
    },

    removeProfilePicture: async () => {
        set({userLoading: true, userError: null, userSuccess: false});
        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}user/profile/deleteImage`, null, {
                method: 'put',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    getUserById: async (id) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}user/profile/${id}`);
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    toggleMessageLike: async (id) => {
        set(() => ({likeLoading: true, likeError: null}));
        try{
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}message/like/${id}`,null, {
                method: "patch",
                withCredentials: true,
            });
            set(() => ({updatedMessage: response.data, likeLoading: false, success: true}));
        }catch(error){
            set({likeError: error.message, likeLoading: false});
        }
    },

    userLogout: async () => {
        set({userLoading: true, userError: null});
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}user/logout`, null, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: null, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    generateDeleteOtp: async () => {
        set({otpLoading: true, otpError: null});
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}user/delete/otp`, null, {
                method: 'post',
                withCredentials: true
            });
            set(() => ({otpLoading: false, otpSuccess: true}));
        }catch(error){
            set({otpError: error.message, otpLoading: false});
        }
    },

    deleteUser: async (data) => {
        set({userLoading: true, userError: null});
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}user/delete`, data,{
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({user: null, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    }
}));