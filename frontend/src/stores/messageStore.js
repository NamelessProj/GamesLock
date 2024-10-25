import {create} from "zustand";
import axios from "axios";

export const useMessageStore = create((set) => ({
    userMessage: null,
    messageLoading: false,
    error: null,
    success: false,

    getAllMessages: async () => {
        set(() => ({messageLoading: true, error: null, userMessage: null}));
        try{
            const response = await axios.get('http://localhost:3000/api/message');
            set(() => ({userMessage: response.data, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.message, messageLoading: false});
        }
    },

    getUserMessages: async (id) => {
        set(() => ({messageLoading: true, error: null, userMessage: null}));
        try{
            const response = await axios.get(`http://localhost:3000/api/message/${id}`);
            set(() => ({userMessage: response.data, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.message, messageLoading: false});
        }
    }
}));