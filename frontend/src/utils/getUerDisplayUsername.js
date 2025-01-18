export const getUerDisplayUsername = (user) => {
    if(!user) return 'Anonymous';
    return user.displayUsername || user.username;
}