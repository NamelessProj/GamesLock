import './achievement.css';

const Achievement = ({achievement}) => {
    return (
        <div className="achievement">
            <img src="https://placehold.co/30x30" alt={"Achievement: " + achievement.title}/>
            <h2>{achievement.title}</h2>
            <p>{achievement.description}</p>
        </div>
    );
};

export default Achievement;