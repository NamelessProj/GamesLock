import {Avatar, Card, CardBody, CardHeader, Chip, IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {useAdminStore} from "../stores/adminStore.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {TiLocationArrowOutline} from "react-icons/ti";
import {MdOutlineReportOff} from "react-icons/md";
import {FaCamera, FaTrashAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const AdminReportedPosts = () => {
    const {reportedPosts, getReportedPosts, unreportPost, deletePost} = useAdminStore();

    const {t} = useTranslation();

    const handleUnReport = async (e, id) => {
        e.preventDefault();
        await unreportPost(id);
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        await deletePost(id);
    }

    useEffect(() => {
        const fetchData = async () => {
            await getReportedPosts();
        }

        (async () => await fetchData())();
    }, []);

    return (
        <div className="max-w-2xl px-3 mx-auto">
            <section>
                <Typography variant="h1">
                    {t("admin.reports.title")}
                </Typography>
            </section>
            <section className="flex justify-center items-center flex-col gap-6">
                {reportedPosts.length ? (
                    reportedPosts.map((post, key) => (
                        <Card key={key} color="gray" variant="gradient" className="w-full">
                            <CardHeader color="transparent" floated={false} shadow={false} className="relative">
                                <div className="absolute top-0 right-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-md flex gap-2">
                                    <Tooltip content={t("admin.reports.delete")}>
                                        <IconButton color="red" variant="text" onClick={(e) => handleDelete(e, post._id)}>
                                            <FaTrashAlt size={24} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content={t("admin.reports.unreport")}>
                                        <IconButton color="deep-orange" variant="gradientr" onClick={(e) => handleUnReport(e, post._id)}>
                                            <MdOutlineReportOff size={24} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content={t("admin.reports.see")}>
                                        <IconButton color="deep-orange" variant="gradientr">
                                            <Link to={`/lock/${post._id}`}>
                                                <TiLocationArrowOutline size={24} />
                                            </Link>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="flex gap-2 items-center mb-3">
                                    <Avatar src={post.user ? `${import.meta.env.VITE_IMG_URL}user/${post.user.profileImage}` : `${import.meta.env.VITE_IMG_URL}user/default.jpg`} variant="circular"/>
                                    <Link to={`/profile/${post.userId}`}>
                                        <Typography variant="lead" color="white" className="text-nowrap whitespace-nowrap overflow-clip text-white" style={{textOverflow: 'ellipsis'}}>
                                            {post.user ? post.user.username : "Unknown User"}
                                        </Typography>
                                    </Link>
                                </div>
                                {post.game && <Chip value={post.game} size="sm" color="red" className="w-fit" style={{background: post.color.a, color: 'black'}}/>}
                            </CardHeader>
                            <CardBody>
                                {post.image.path && <FaCamera color="#bc4b27" size={24} className="mb-3" />}
                                <Typography className="whitespace-nowrap text-nowrap overflow-clip" style={{textOverflow: 'ellipsis'}}>
                                    {post.text}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))
                ):(
                    <Typography variant="p">
                        {t("admin.reports.noReports")}
                    </Typography>
                )}
            </section>
        </div>
    );
};

export default AdminReportedPosts;