import {create} from "zustand";
import axios from "axios";

export const useCommentStore = create((set) => ({
    comments: [],
    commentsError: null,
    commentsLoading: false,
    commentSuccess: false,

    addComment: async (msgId, comment) => {
        set(() => ({commentsLoading: true, commentsError: null}));
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}comment/${msgId}`, comment, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({comments: response.data, commentsLoading: false, commentSuccess: true}));
        }catch(error){
            set({commentsError: error.response.data.message || error.message, commentsLoading: false});
        }
    },
}));