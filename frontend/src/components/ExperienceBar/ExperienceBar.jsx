import './experiencebar.css';

const ExperienceBar = ({percent=0}) => {
    return (
        <div className="experience-bar" aria-label={percent+"%"}>
            <div style={{width:percent+"%"}} ></div>
        </div>
    );
};

export default ExperienceBar;