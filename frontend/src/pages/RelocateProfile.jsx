import {useAuthStore} from "../stores/authStore.js";
import {Navigate} from "react-router-dom";

const RelocateProfile = () => {
    const {userInfo} = useAuthStore();
    return (
        <Navigate to={userInfo ? `/profile/${userInfo.user._id}` : '/login'} />
    );
};

export default RelocateProfile;