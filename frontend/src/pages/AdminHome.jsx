import {Card, CardHeader, Typography} from "@material-tailwind/react";
import CountUp from "../components/CountUp.jsx";
import {useAdminStore} from "../stores/adminStore.js";
import {useEffect} from "react";

const AdminHome = () => {
    const {userCount, messageCount, getUserCount, getMessageCount} = useAdminStore();

    useEffect(() => {
        const fetchData = async () => {
            await getUserCount();
            await getMessageCount();
        }

        (async () => await fetchData())();
    }, []);

    return (
        <div className="max-w-2xl px-3 mx-auto">
            <section>
                <Typography variant="h1">
                    Dashboard
                </Typography>
            </section>
            <section>
                <Typography variant="h2" className="mb-6">
                    Some Statistics
                </Typography>
                <div className="flex flex-wrap justify-center gap-6">
                    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
                        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 mb-8 rounded-none text-center">
                            <Typography variant="small" color="white" className="font-normal uppercase">
                                Total Users
                            </Typography>
                            <Typography variant="h1" as="p" color="white" className="mt-6 flex justify-center text-7xl font-normal">
                                <CountUp to={userCount} />
                            </Typography>
                        </CardHeader>
                    </Card>

                    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
                        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 mb-8 rounded-none text-center">
                            <Typography variant="small" color="white" className="font-normal uppercase">
                                Total Messages
                            </Typography>
                            <Typography variant="h1" as="p" color="white" className="mt-6 flex justify-center text-7xl font-normal">
                                <CountUp to={messageCount} />
                            </Typography>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default AdminHome;