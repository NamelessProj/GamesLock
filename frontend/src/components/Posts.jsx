import Post from "./Post/Post.jsx";
import {Typography} from "@material-tailwind/react";

const Posts = ({posts=[], noPostMessage="No posts to show."}) => {
    return (
        <div className="flex flex-col gap-8 pt-8">
            {
                posts.length ? (
                    posts.map((post, key) => (<Post key={key} post={post} />))
                ):(
                    <Typography>
                        {noPostMessage}
                    </Typography>
                )
            }
        </div>
    );
};

export default Posts;