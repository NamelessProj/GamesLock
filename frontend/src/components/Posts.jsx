import Post from "./Post.jsx";
import {Typography} from "@material-tailwind/react";
import {Trans} from "react-i18next";

const Posts = ({posts=[], noPostMessage=<Trans i18nKey="posts.noPosts">No posts to show.</Trans>}) => {
    return (
        <div className="w-full flex flex-col gap-8 pt-8">
            {
                posts.length ? (
                    posts.map((post, key) => (<Post key={key} post={post} />))
                ):(
                    <Typography variant="lead" className="text-center mx-auto text-primary-900">
                        {noPostMessage}
                    </Typography>
                )
            }
        </div>
    );
};

export default Posts;