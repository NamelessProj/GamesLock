import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../utils/contants.js";

export const useAchievementStore = create((set) => ({
    achievements: [],
    achievementsLoading: false,
    achievementsError: null,
    achievementSuccess: false,

    getAllAchievements: async () => {
        set(() => ({achievementsLoading: true, achievementsError: null}));
        try{
            const response = await axios.get(`${API_URL}achievement`);
            set(() => ({achievements: response.data.achievements, achievementsLoading: false, achievementSuccess: true}));
        }catch(error){
            set({achievementsError: error.message, achievementsLoading: false});
        }
    },
}));