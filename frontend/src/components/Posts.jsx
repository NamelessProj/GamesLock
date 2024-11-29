import Post from "./Post.jsx";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import DialogLikePost from "./DialogLikePost.jsx";
import {enGB, fr} from "date-fns/locale";
import i18n from "i18next";

const Posts = ({posts=[], keyPrefix=null, noPostMessage=""}) => {
    const {t} = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    const locales = {
        en: enGB,
        fr: fr
    };
    const i18nLocale = i18n.language;
    const locale = locales[i18nLocale] || enGB;

    return (
        <div className="w-full flex flex-col gap-10 pt-8">
            <DialogLikePost open={openDialog} handler={handleOpenDialog} />
            {
                posts.length ? (
                    posts.map((post, key) => (<Post key={keyPrefix ? `${keyPrefix}${key}` : key} post={post} locale={locale} handleDialog={handleOpenDialog} />))
                ):(
                    <Typography variant="lead" className="text-center mx-auto text-primary-900">
                        {noPostMessage === "" ? t("posts.noPosts") : noPostMessage}
                    </Typography>
                )
            }
        </div>
    );
};

export default Posts;