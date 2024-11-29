import {Avatar, Card, CardHeader, Tooltip, Typography} from "@material-tailwind/react";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const UserTrailer = ({user, locale}) => {
    const {t} = useTranslation();
    const url = `/profile/${user._id}`;

    return (
        <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
            <CardHeader color="transparent" floated={false} shadow={false} className="mx-0 flex items-center gap-4 pb-8">
                <Link to={url}>
                    <Avatar size="lg" variant="circular" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt={user.username}/>
                </Link>
                <div className="flex w-full flex-col gap-0.5">
                    <Link to={url}>
                        <Typography variant="h5" color="deep-orange">
                            {user.username}
                        </Typography>
                    </Link>
                    <Typography>
                        {t("profile.joined")} {format(user.createdAt, 'dd MMM yyyy kk:mm', {locale})}
                    </Typography>
                </div>
            </CardHeader>
        </Card>
    );
};

export default UserTrailer;