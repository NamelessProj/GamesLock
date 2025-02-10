import {useContext, useEffect} from "react";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {useReportStore} from "../stores/reportStore.js";
import {useUserStore} from "../stores/userStore.js";
import {useFollowStore} from "../stores/followStore.js";
import DataContext from "../context/DataContext.jsx";

const HandleToast = ({children}) => {
    const {t} = useTranslation();
    const {reportError, reportSuccess} = useReportStore();
    const {userError, userEditSuccess} = useUserStore();
    const {addFollowSuccess, deleteFollowSuccess} = useFollowStore();

    const {followUser} = useContext(DataContext);

    // REPORTS
    useEffect(() => {
        if(reportSuccess) toast(t("posts.report.success"), {type: 'success'});
    }, [reportSuccess]);
    useEffect(() => {
        if(reportError) toast(reportError, {type: "error"});
    }, [reportError]);

    // USER
    useEffect(() => {
        if(userEditSuccess) toast(t("profile.edit.success"), {type: "success"});
    }, [userEditSuccess]);
    useEffect(() => {
        if(userError) toast(userError, {type: "error"});
    }, [userError]);

    // FOLLOW
    useEffect(() => {
        if(addFollowSuccess) toast(t("profile.followUser.add", {user: followUser.username}), {type: "success"});
    }, [addFollowSuccess]);
    useEffect(() => {
        if(deleteFollowSuccess) toast(t("profile.followUser.remove", {user: followUser.username}), {type: "success"});
    }, [deleteFollowSuccess]);

    return children;
};

export default HandleToast;