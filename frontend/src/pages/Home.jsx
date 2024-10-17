import Posts from "../components/Posts.jsx";

const Home = () => {

    const posts = [];

    return (
        <main>
            <Posts posts={posts} />
        </main>
    );
};

export default Home;