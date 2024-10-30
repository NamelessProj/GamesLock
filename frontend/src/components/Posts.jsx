import Post from "./Post.jsx";
import {Typography} from "@material-tailwind/react";

const Posts = ({posts=[], noPostMessage="No posts to show."}) => {
    return (
        <div className="w-full flex flex-col gap-8 pt-8">
            {
                posts.length ? (
                    posts.map((post) => (<Post key={post._id} post={post} />))
                ):(
                    <Typography variant="lead" className="text-center mx-auto">
                        {noPostMessage}
                    </Typography>
                )
            }
        </div>
    );
};

export default Posts;