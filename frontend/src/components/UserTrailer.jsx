import {Avatar, Card, CardHeader, Typography} from "@material-tailwind/react";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getUserPfp} from "../utils/getUserPfp.js";

const UserTrailer = ({user, locale}) => {
    const {t} = useTranslation();
    const url = `/profile/${user._id}`;

    return (
        <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
            <CardHeader color="transparent" floated={false} shadow={false} className="mx-0 flex items-center gap-4 pb-8">
                <Link to={url}>
                    <Avatar size="lg" variant="circular" src={getUserPfp(user)} loading="lazy" alt={user.username}/>
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