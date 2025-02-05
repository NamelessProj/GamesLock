import {useEffect} from "react";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {useReportStore} from "../stores/reportStore.js";
import {useUserStore} from "../stores/userStore.js";

const HandleToast = ({children}) => {
    const {t} = useTranslation();
    const {reportError, reportSuccess} = useReportStore();
    const {userError, userEditSuccess} = useUserStore();

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

    return children;
};

export default HandleToast;