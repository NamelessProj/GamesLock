import {create} from "zustand";
import api from "../api/axiosConfig";

export const useLogStore = create((set) => ({
    logs: [],
    logLoading: false,
    logError: null,

    getLogs: async () => {
        set(() => ({logLoading: true, logError: null}));
        try{
            const response = await api.get('log', {
                method: 'get',
                withCredentials: true,
            });
            set(() => ({logs: response.data.logs, logLoading: false}));
        }catch(error){
            set({logError: error.response.data.message || error.message, logLoading: false});
        }
    },

    deleteALog: async (id) => {
        set(() => ({logError: null}));
        try{
            const response = await api.delete(`log/delete/${id}`, {
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({logs: response.data.logs}));
        }catch(error){
            set({logError: error.response.data.message || error.message});
        }
    },

    deleteAllLogs: async () => {
        set(() => ({logError: null}));
        try{
            await api.delete('log/delete', {
                method: 'delete',
                withCredentials: true,
            });
            set(() => ({logs: []}));
        }catch(error){
            set({logError: error.response.data.message || error.message});
        }
    },
}));