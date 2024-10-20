import './profilepage.css';
import {format} from "date-fns";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar.jsx";
import Posts from "../../components/Posts/Posts.jsx";

const ProfilePage = () => {

    const user = {
        id: 1,
        username: 'BetterPlace',
        email: 'mail@mail.test',
        level: 1,
        experience: 0,
        createdAt: '2024-09-16T11:21:15.997+00:00'
    }

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

    const formatNumber = (number) => {
        return new Intl.NumberFormat("fr-FR").format(number);
    }

    return (
        <main>
            <div className="profile_header">
                <div className="profile_header_pp">
                    <img src="https://placehold.co/150x150" alt={user.username + " profile picture"} />
                </div>
                <div className="profile_header_info">
                    <h1 data-level={user.level}>{user.username}</h1>
                    <h3>Joined: {format(user.createdAt, 'dd.MM.yyyy')}</h3>
                </div>
            </div>

            <div className="profile_info">
                <ExperienceBar percent={50} />

                <div className="profile_info_stats">
                    <div>
                        <h3>Follow</h3>
                        <p>{formatNumber(16)}</p>
                    </div>
                    <div>
                        <h3>Achievements</h3>
                        <p>{formatNumber(4)}</p>
                    </div>
                    <div>
                        <h3>Locks</h3>
                        <p>{formatNumber(1234)}</p>
                    </div>
                </div>
            </div>

            <div className="separator"></div>

            <Posts posts={posts} />
        </main>
    );
};

export default ProfilePage;