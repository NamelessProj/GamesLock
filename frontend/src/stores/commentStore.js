import {create} from "zustand";
import api from "../api/axiosConfig";

export const useCommentStore = create((set) => ({
    comments: [],
    commentsError: null,
    commentsLoading: false,
    commentSuccess: false,

    addComment: async (msgId, comment) => {
        set(() => ({commentsLoading: true, commentsError: null}));
        try{
            const response = await api.post(`comment/${msgId}`, comment, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({comments: response.data, commentsLoading: false, commentSuccess: true}));
        }catch(error){
            set({commentsError: error.response.data.message || error.message, commentsLoading: false});
        }
    },
}));