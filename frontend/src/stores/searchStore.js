import {create} from "zustand";
import api from "../api/axiosConfig";

export const useSearchStore = create((set) => ({
    searchUsers: [],
    searchGames: [],
    searchLoading: false,
    searchError: null,

    searchUser: async (string) => {
        set(() => ({searchLoading: true, searchError: null}));
        try{
            const response = await api.get(`search/users/${string}`);
            set(() => ({searchUsers: response.data.users, searchLoading: false}));
        }catch(error){
            set({searchError: error.response.data.message || error.message, searchLoading: false});
        }
    },

    searchGame: async (game) => {
        set(() => ({searchLoading: true, searchError: null}));
        try{
            const response = await api.get(`search/game/${game}`);
            set(() => ({searchGames: response.data.messages, searchLoading: false}));
        }catch(error){
            set({searchError: error.response.data.message || error.message, searchLoading: false});
        }
    },
}));