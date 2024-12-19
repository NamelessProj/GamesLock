import {Avatar, Card, CardBody, CardHeader, Chip, IconButton, Typography} from "@material-tailwind/react";
import {useAdminStore} from "../stores/adminStore.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {TiLocationArrowOutline} from "react-icons/ti";
import {MdOutlineReportOff} from "react-icons/md";
import {FaCamera, FaRegTrashAlt} from "react-icons/fa";

const AdminReportedPosts = () => {
    const {reportedPosts, getReportedPosts} = useAdminStore();

    const handleUnReport = async (e, id) => {
        e.preventDefault();
        console.log(id);
    }

    const handleDeletePost = async (e, id) => {
        e.preventDefault();
        console.log(id);
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
                    Reported Posts
                </Typography>
            </section>
            <section className="flex justify-center items-center flex-col gap-6">
                {reportedPosts.length ? (
                    reportedPosts.map((post, key) => (
                        <Card color="gray" variant="gradient" className="w-full">
                            <CardHeader color="transparent" floated={false} shadow={false} className="relative">
                                <div className="absolute top-0 right-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-md flex gap-2">
                                    <IconButton color="red" variant="text" onClick={(e) => handleDeletePost(e, post._id)}>
                                        <FaRegTrashAlt size={24} />
                                    </IconButton>
                                    <IconButton color="deep-orange" variant="gradientr" onClick={(e) => handleUnReport(e, post._id)}>
                                        <MdOutlineReportOff size={24} />
                                    </IconButton>
                                    <IconButton color="deep-orange" variant="gradientr">
                                        <Link to={`/lock/${post._id}`}>
                                            <TiLocationArrowOutline size={24} />
                                        </Link>
                                    </IconButton>
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
                        No reported posts
                    </Typography>
                )}
            </section>
        </div>
    );
};

export default AdminReportedPosts;