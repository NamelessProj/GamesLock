import './experiencebar.css';

const ExperienceBar = ({percent=0}) => {

    const returnPercent = percent < 0 || percent > 100 ? 0 : percent;

    return (
        <div className="experience-bar" aria-label={percent+"%"}>
            <div style={{width:returnPercent+"%"}} ></div>
        </div>
    );
};

export default ExperienceBar;