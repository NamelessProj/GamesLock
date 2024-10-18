import Posts from "../components/Posts/Posts.jsx";

const Home = () => {

    const posts = [
        {
            id: 3,
            user: {
                id: 1,
                username: 'user1'
            },
            body: 'Hello everyone, nice to meet you!',
            createdAt: '2024-10-18T15:30:23.254+02:00'
        },
        {
            id: 2,
            user: {
                id: 2,
                username: 'UserName'
            },
            body: 'I\'m here to stay.',
            createdAt: '2024-10-18T12:11:33.254+02:00'
        },
        {
            id: 1,
            user: {
                id: 1,
                username: 'user1'
            },
            body: 'This is the body of post 1.',
            createdAt: '2024-09-16T11:21:54.254+00:00'
        }
    ];

    return (
        <main>
            <Posts posts={posts} />
        </main>
    );
};

export default Home;