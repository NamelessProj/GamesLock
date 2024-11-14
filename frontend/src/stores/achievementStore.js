import {create} from "zustand";
import axios from "axios";

export const useAchievementStore = create((set) => ({
    achievements: [],
    achievementsLoading: false,
    achievementsError: null,
    achievementSuccess: false,

    getAllAchievements: async () => {
        set(() => ({achievementsLoading: true, achievementsError: null}));
        try{
            const response = await axios.get('http://localhost:3000/api/achievement/');
            set(() => ({achievements: response.data.achievements, achievementsLoading: false, achievementSuccess: true}));
        }catch(error){
            set({achievementsError: error.message, achievementsLoading: false});
        }
    },
}));