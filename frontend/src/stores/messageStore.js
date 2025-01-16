import {create} from "zustand";
import axios from "axios";

export const useMessageStore = create((set) => ({
    userMessage: [],
    allMessages: [],
    followedMessages: [],
    message: null,
    userMessageAdd: null,
    messageLoading: false,
    followedMessageLoading: false,
    error: null,
    followedError: null,
    success: false,
    randomMessages: [],

    getAllMessages: async () => {
        set(() => ({messageLoading: true, error: null, success: false}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message`);
            set(() => ({allMessages: response.data.messages, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.response.data.message || error.message, messageLoading: false});
        }
    },

    getMessagesFromFollowedUsers: async (id) => {
        set(() => ({followedMessageLoading: true, followedError: null, success: false}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message/followed/${id}`);
            set(() => ({followedMessages: response.data.messages, followedMessageLoading: false, success: true}));
        }catch(error){
            set({followedError: error.response.data.message || error.message, followedMessageLoading: false});
        }
    },

    getUserMessages: async (id) => {
        set(() => ({messageLoading: true, error: null,success: false}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message/${id}`);
            set(() => ({userMessage: response.data.messages, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.response.data.message || error.message, messageLoading: false});
        }
    },

    getMessageById: async (id) => {
        set(() => ({messageLoading: true, error: null, success: false}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message/id/${id}`);
            set(() => ({message: response.data, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.response.data.message || error.message, messageLoading: false});
        }
    },

    getRandomMessage: async (num=1) => {
        set(() => ({randomMessages: [], error: null}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}message/random/${num}`);
            set(() => ({randomMessages: response.data.messages}));
        }catch(error){
            set({error: error.response.data.message || error.message});
        }
    },

    addMessage: async (data) => {
        set(() => ({messageLoading: true, error: null, success: false}));
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}message`, data, {
                method: 'post',
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            set(() => ({allMessages: response.data.messages, userMessageAdd: response.data.user, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.response.data.message || error.message, messageLoading: false});
        }
    },
}));