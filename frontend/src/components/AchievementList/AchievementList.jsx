import './achievement_list.css';
import Achievement from "../Achievement/Achievement.jsx";

const AchievementList = ({achievements}) => {
    return (
        <div className="achievement_list">
            {achievements.length ? (
                achievements.map((achievement) => (
                    <Achievement key={achievement.id} achievement={achievement} />
                ))
            ):(
                <p>No achievements to show.</p>
            )}
        </div>
    );
};

export default AchievementList;