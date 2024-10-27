import {create} from "zustand";
import axios from "axios";

export const useMessageStore = create((set) => ({
    userMessage: [],
    allMessages: [],
    messageLoading: false,
    error: null,
    success: false,

    getAllMessages: async () => {
        set(() => ({messageLoading: true, error: null}));
        try{
            const response = await axios.get('http://localhost:3000/api/message');
            set(() => ({allMessages: response.data.messages, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.message, messageLoading: false});
        }
    },

    getUserMessages: async (id) => {
        set(() => ({messageLoading: true, error: null}));
        try{
            const response = await axios.get(`http://localhost:3000/api/message/${id}`);
            set(() => ({userMessage: response.data.messages, messageLoading: false, success: true}));
        }catch(error){
            set({error: error.message, messageLoading: false});
        }
    }
}));