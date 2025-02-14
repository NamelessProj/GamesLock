import UserTrailer from "./UserTrailer.jsx";
import {getPostLocale} from "../utils/getPostLocale.js";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";

const UserList = ({users, noUserMessage=""}) => {
    const {t} = useTranslation();
    const locale = getPostLocale();

    return (
        <div className="w-post mx-auto flex flex-col pt-8">
            {users.length ? (
                users.map((user, key) => (<UserTrailer key={key} user={user} locale={locale} />))
            ):(
                <Typography variant="lead" className="text-center mx-auto text-primary-900">
                    {noUserMessage === "" ? t("profile.list.noUsers") : noUserMessage}
                </Typography>
            )}
        </div>
    );
};

export default UserList;