export const getUserPfp = (user=null) => {
    return `${import.meta.env.VITE_IMG_URL}user/${user ? user.profileImage : 'GeemusuRokku.jpg'}`;
}