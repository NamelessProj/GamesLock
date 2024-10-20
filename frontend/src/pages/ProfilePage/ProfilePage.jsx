import './profilepage.css';
import {format} from "date-fns";
import ExperienceBar from "../../components/ExperienceBar/ExperienceBar.jsx";

const ProfilePage = () => {

    const user = {
        id: 1,
        username: 'BetterPlace',
        email: 'mail@mail.test',
        level: 1,
        experience: 0,
        createdAt: '2024-09-16T11:21:15.997+00:00'
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
            </div>
        </main>
    );
};

export default ProfilePage;