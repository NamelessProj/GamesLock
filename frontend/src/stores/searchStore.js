import {create} from "zustand";
import axios from "axios";

export const useSearchStore = create((set) => ({
    searchUsers: [],
    searchGames: [],
    searchLoading: false,
    searchError: null,

    searchUser: async (string) => {
        set(() => ({searchLoading: true, searchError: null}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}search/users/${string}`);
            set(() => ({searchUsers: response.data.users, searchLoading: false}));
        }catch(error){
            set({searchError: error.response.data.message || error.message, searchLoading: false});
        }
    },

    searchGame: async (game) => {
        set(() => ({searchLoading: true, searchError: null}));
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}search/game/${game}`);
            set(() => ({searchGames: response.data.messages, searchLoading: false}));
        }catch(error){
            set({searchError: error.response.data.message || error.message, searchLoading: false});
        }
    },
}));