export const getUserPfp = (user=null) => {
    if(user) return `${import.meta.env.VITE_IMG_URL}user/${user.profileImage}`;
    return `${import.meta.env.VITE_IMG_URL}user/default.jpg`;
}