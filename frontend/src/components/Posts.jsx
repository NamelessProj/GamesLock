import Post from "./Post.jsx";

const Posts = ({posts}) => {
    return (
        <div>
            {
                posts.length ? (
                    posts.map((post) => (<Post key={post.id} post={post} />))
                ):(
                    <p>No posts to show.</p>
                )
            }
        </div>
    );
};

export default Posts;