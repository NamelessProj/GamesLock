import {Card, CardBody, CardHeader, Switch, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import NProgress from "nprogress";

const EditNotification = () => {
    const {updateNotification} = useUserStore();

    const [likeNotification, setLikeNotification] = useState(true);
    const handleLikeNotification = () => setLikeNotification(!likeNotification);

    const [commentNotification, setCommentNotification] = useState(true);
    const handleCommentNotification = () => setCommentNotification(!commentNotification);

    const [followNotification, setFollowNotification] = useState(true);
    const handleFollowNotification = () => setFollowNotification(!followNotification);

    const [messageNotification, setMessageNotification] = useState(true);
    const handleMessageNotification = () => setMessageNotification(!messageNotification);

    const Label = ({text}) => (
        <Typography className="text-primary-900">
            {text}
        </Typography>
    );

    const handleSubmit = async (e, handler) => {
        e.preventDefault();
        try{
            NProgress.start();
            await updateNotification({
                like: !likeNotification,
                comment: !commentNotification,
                follow: !followNotification,
                newMessage: !messageNotification
            });
            handler();
        }catch(err){
            console.error(err);
        }finally{
            NProgress.done();
        }
    }

    return (
        <Card className="w-full max-w-[24rem]" color="gray">
            <CardHeader color="gray" floated={false} shadow={false} className="relative w-full m-0 flex justify-center items-center flex-col gap-4 px-4 py-8 text-center">
                <Typography variant="h4" color="white">
                    Notifications
                </Typography>
            </CardHeader>
            <CardBody className="w-full">
                <form className="flex flex-col gap-4">
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={likeNotification}
                            onChange={(e) => handleSubmit(e, handleLikeNotification)}
                            label={<Label text={"When someone like one of your post"}/>}
                        />
                    </div>
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={commentNotification}
                            onChange={(e) => handleSubmit(e, handleCommentNotification)}
                            label={<Label text={"When someone comment on one of your post"}/>}
                        />
                    </div>
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={followNotification}
                            onChange={(e) => handleSubmit(e, handleFollowNotification)}
                            label={<Label text={"When someone start following you"}/>}
                        />
                    </div>
                    <div>
                        <Switch
                            color="deep-orange"
                            checked={messageNotification}
                            onChange={(e) => handleSubmit(e, handleMessageNotification)}
                            label={<Label text={"When someone you follow post a new Lock"}/>}
                        />
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default EditNotification;