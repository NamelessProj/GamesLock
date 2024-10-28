import {useParams} from "react-router-dom";

const ProfilePageTwo = () => {

    const {id} = useParams();

    return (
        <div>
            <p>{id}</p>
        </div>
    );
};

export default ProfilePageTwo;