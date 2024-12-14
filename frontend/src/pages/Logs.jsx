import {useAuthStore} from "../stores/authStore.js";
import {useLogStore} from "../stores/logStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Alert, Button, Typography} from "@material-tailwind/react";
import Log from "../components/Log.jsx";
import {getPostLocale} from "../utils/getPostLocale.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";
import NProgress from "nprogress";
import {useTranslation} from "react-i18next";

const Logs = () => {
    const {userInfo} = useAuthStore();
    const {logs, logLoading, logError, getLogs, deleteALog, deleteAllLogs} = useLogStore();

    const {t} = useTranslation();

    const navigate = useNavigate();

    const locale = getPostLocale();

    useEffect(() => {
        if(userInfo){
            getLogs();
        }else navigate('/login');
    }, []);

    const handleSingleDelete = async (e, id) => {
        e.preventDefault();
        try{
            NProgress.start();
            await deleteALog(id);
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    const handleDeleteAll = async (e) => {
        e.preventDefault();
        try{
            NProgress.start();
            await deleteAllLogs();
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    return (
        <main>
            {logLoading ? (
                <section className="h-full flex justify-center items-center">
                    <DefaultSpinner />
                </section>
            ):(
                <section>
                    {logError && (
                        <div className="flex justify-center items-center">
                            <Alert color="red">
                                {logError}
                            </Alert>
                        </div>
                    )}
                    <div>
                        {logs.length ? (
                            <div className="flex flex-col justify-center items-center gap-6 max-w-2xl mx-auto">
                                <div className="w-full flex flex-col gap-3 justify-center items-center mb-6 relative">
                                    <Typography variant="h2">
                                        {t('logs.title')}
                                    </Typography>

                                    <div className="md:absolute top-0 right-2">
                                        <Button
                                            variant="gradient"
                                            color="red"
                                            onClick={handleDeleteAll}
                                            className="flex items-center justify-center gap-3 text-base"
                                        >
                                            {t('logs.deleteAll')}
                                            <FaTrashAlt size={24} />
                                        </Button>
                                    </div>
                                </div>
                                {logs.map((log, key) => (
                                    <Log key={key} log={log} locale={locale} handleSingleDelete={handleSingleDelete} />
                                ))}
                            </div>
                        ):(
                            <div className="flex flex-col justify-center items-center gap-6 max-w-2xl mx-auto">
                                <div className="w-full flex flex-col gap-3 justify-center items-center mb-6 relative">
                                    <Typography variant="h2">
                                        {t('logs.title')}
                                    </Typography>
                                </div>
                                <Typography variant="lead">
                                    {t('logs.noLogs')}
                                </Typography>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </main>
    );
};

export default Logs;