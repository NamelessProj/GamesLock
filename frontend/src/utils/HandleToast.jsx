import {useEffect} from "react";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {useReportStore} from "../stores/reportStore.js";

const HandleToast = ({children}) => {
    const {t} = useTranslation();
    const {reportError, reportSuccess} = useReportStore();

    // REPORTS
    useEffect(() => {
        if(reportSuccess) toast(t("posts.report.success"), {type: 'success'});
    }, [reportSuccess]);
    useEffect(() => {
        if(reportError) toast.error(reportError);
    }, [reportError]);

    return children;
};

export default HandleToast;