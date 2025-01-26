import {create} from "zustand";
import api from "../api/axiosConfig";

export const useAchievementStore = create((set) => ({
    achievements: [],
    achievementsLoading: false,
    achievementsError: null,
    achievementSuccess: false,

    getAllAchievements: async () => {
        set(() => ({achievementsLoading: true, achievementsError: null}));
        try{
            const response = await api.get('achievement');
            set(() => ({achievements: response.data.achievements, achievementsLoading: false, achievementSuccess: true}));
        }catch(error){
            set({achievementsError: error.response.data.message || error.message, achievementsLoading: false});
        }
    },
}));