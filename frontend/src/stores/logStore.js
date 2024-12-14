import {create} from "zustand";
import axios from "axios";

export const useLogStore = create((set) => ({
    logs: [],
    logLoading: false,
    logError: null,

    getLogs: async () => {
        set(() => ({logLoading: true, logError: null}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}log`, {
                method: 'get',
                withCredentials: true,
            });
            set(() => ({logs: response.data.logs, searchLoading: false}));
        }catch(error){
            set({logError: error.message, logLoading: false});
        }
    },

    deleteALog: async (id) => {
        set(() => ({logLoading: true, logError: null}));
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}log/delete/${id}`, {
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({logs: response.data.logs, searchLoading: false}));
        }catch(error){
            set({logError: error.message, logLoading: false});
        }
    },

    deleteAllLogs: async () => {
        set(() => ({logLoading: true, logError: null}));
        try{
            await axios.delete(`${import.meta.env.VITE_API_URL}log/delete`, {
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({logs: [], searchLoading: false}));
        }catch(error){
            set({logError: error.message, logLoading: false});
        }
    },
}));