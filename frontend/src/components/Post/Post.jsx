import './post.css';
import {Link} from "react-router-dom";
import {format} from "date-fns";
import SvgComment from "../SVG/SvgComment.jsx";
import SvgShare from "../SVG/SvgShare.jsx";
import SvgLike from "../SVG/SvgLike.jsx";

const Post = ({post}) => {
    return (
        <div className="post">
            <div className="post_content">
                <div className="post_header">
                    <div className="post_header_pp">
                        <img src="https://placehold.co/30x30" alt="" loading="lazy"/>
                    </div>
                    <div className="post_header_info">
                        <p className="post_header_info_username">
                            <Link to={'/profile/' + post.user.id}>{post.user.username}</Link>
                        </p>
                        <p className="post_header_info_date">{format(post.createdAt, 'dd MMM yyyy kk:mm')}</p>
                    </div>
                </div>
                <div className="post_content_body">
                    <p>{post.body}</p>
                </div>
            </div>
            <div className="post_actions">
                <button type="button">
                    <SvgComment />
                </button>
                <button type="button">
                    <SvgShare />
                </button>
                <button type="button">
                    <SvgLike />
                </button>
            </div>
        </div>
    );
};

export default Post;