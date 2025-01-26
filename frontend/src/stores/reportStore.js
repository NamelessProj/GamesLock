import {create} from "zustand";
import api from "../api/axiosConfig";

export const useReportStore = create((set) => ({
    reports: [],
    reportLoading: false,
    reportError: null,

    getReports: async () => {
        set(() => ({reportLoading: true, reportError: null}));
        try{
            const response = await api.get('report', {
                method: 'get',
                withCredentials: true,
            });
            set(() => ({reports: response.data.reports, reportLoading: false}));
        }catch(error){
            set({reportError: error.response.data.message || error.message, reportLoading: false});
        }
    },

    addReport: async (id) => {
        set(() => ({reportError: null}));
        try{
            await api.post(`report/${id}`, null,{
                method: 'post',
                withCredentials: true,
            });
        }catch(error){
            set({reportError: error.response.data.message || error.message});
        }
    },
}));