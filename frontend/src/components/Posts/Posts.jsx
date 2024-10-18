import './posts.css';
import Post from "../Post/Post.jsx";

const Posts = ({posts}) => {
    return (
        <div className="post_container">
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