import {create} from "zustand";
import api from "../api/axiosConfig";

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
    userEditSuccess: false,
    userDeletedSuccess: false,

    register: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await api.post('user/register', data, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    generateOtp: async (data) => {
        set({otpLoading: true, otpError: null, otpSuccess: false});
        try{
            await api.post('user/otp', data);
            set(() => ({otpLoading: false, otpSuccess: true}));
        }catch(error){
            set({otpError: error.response.data.message || error.message, otpLoading: false, otpSuccess: false});
        }
    },

    login: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await api.post('user/login', data, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    updateUser: async (data) => {
        set({userError: null, userSuccess: false, userEditSuccess: false});
        try{
            const response = await api.put('user/profile', data, {
                method: 'put',
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            set(() => ({user: response.data.user, userSuccess: true, userEditSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message});
        }
    },

    updateNotification: async (data) => {
        set({userError: null, userEditSuccess: false});
        try{
            const response = await api.put('user/profile/notification', data, {
                method: 'put',
                withCredentials: true
            });
            set(() => ({user: response.data.user, userEditSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message});
        }
    },

    updatePassword: async (data) => {
        set({userPasswordError: null, userSuccess: false, userEditSuccess: false});
        try{
            const response = await api.put('user/profile/password', data, {
                method: 'put',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userSuccess: true, userEditSuccess: true}));
        }catch(error){
            set({userPasswordError: error.response.data.message || error.message});
        }
    },

    removeProfilePicture: async () => {
        set({userError: null, userSuccess: false, userEditSuccess: false});
        try{
            const response = await api.put('user/profile/deleteImage', null, {
                method: 'put',
                withCredentials: true,
            });
            set(() => ({user: response.data.user, userSuccess: true, userEditSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message});
        }
    },

    getUserById: async (id) => {
        set({userLoading: true, userError: null});
        try{
            const response = await api.get(`user/profile/${id}`);
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    toggleMessageLike: async (id) => {
        set(() => ({likeLoading: true, likeError: null}));
        try{
            const response = await api.patch(`message/like/${id}`,null, {
                method: "patch",
                withCredentials: true,
            });
            set(() => ({updatedMessage: response.data, likeLoading: false, success: true}));
        }catch(error){
            set({likeError: error.response.data.message || error.message, likeLoading: false});
        }
    },

    userLogout: async () => {
        set({userLoading: true, userError: null});
        try{
            await api.post('user/logout', null, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: null, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    generateDeleteOtp: async () => {
        set({otpLoading: true, otpError: null});
        try{
            await api.post('user/delete/otp', null, {
                method: 'post',
                withCredentials: true
            });
            set(() => ({otpLoading: false, otpSuccess: true}));
        }catch(error){
            set({otpError: error.response.data.message || error.message, otpLoading: false});
        }
    },

    deleteUser: async (data) => {
        set({userLoading: true, userError: null, userDeletedSuccess: false});
        try{
            await api.post('user/delete', data,{
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: null, userLoading: false, userSuccess: true, userDeletedSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false, userDeletedSuccess: false});
        }
    }
}));