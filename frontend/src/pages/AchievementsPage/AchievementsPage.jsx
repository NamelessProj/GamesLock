import AchievementList from "../../components/AchievementList/AchievementList.jsx";

const AchievementsPage = () => {

    const achievements = [
        {
            id: 1,
            title: "First Achievement",
            description: "This is the description of the first achievement.",
            points: 10
        },
        {
            id: 2,
            title: "Second Achievement",
            description: "This is the description.",
            points: 20
        },
        {
            id: 3,
            title: "Third Achievement",
            description: "This is the description of the third achievement.",
            points: 30
        }
    ];

    return (
        <main>
            <h1>Achievements</h1>

            <AchievementList achievements={achievements} />
        </main>
    );
};

export default AchievementsPage;