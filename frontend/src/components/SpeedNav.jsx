import {
    IconButton,
    SpeedDial,
    SpeedDialAction,
    SpeedDialContent,
    SpeedDialHandler,
    Typography
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {FaBars, FaPlus} from "react-icons/fa";
import SvgHome from "./SVG/SvgHome.jsx";
import SvgSearch from "./SVG/SvgSearch.jsx";
import SvgPlus from "./SVG/SvgPlus.jsx";
import SvgUser from "./SVG/SvgUser.jsx";
import SvgBell from "./SVG/SvgBell.jsx";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import {LiaUserShieldSolid, LiaUserSlashSolid} from "react-icons/lia";
import {Trans} from "react-i18next";

const SpeedNav = () => {
    const [open, setOpen] = useState(false);

    const {userInfo, logout} = useAuthStore();
    const {userLogout} = useUserStore();

    const navigate = useNavigate();

    const labelProps = {
        variant: "small",
        color: "blue-gray",
        className: "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal text-primary-900"
    }

    const handleLogout = async () => {
        try{
            await userLogout();
            logout();
            navigate('/');
            location.reload();
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className="fixed bottom-2 right-2 z-30">
            <SpeedDial open={open} handler={setOpen}>
                <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full">
                        <FaBars className="h-5 w-5 group-hover:hidden" />
                        <FaPlus className="h-5 w-5 transform rotate-45 hidden group-hover:block" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/')}}>
                        <SvgHome className="h-5 w-5" />
                        <Typography {...labelProps}>
                            <Trans i18nKey="nav.home">Home</Trans>
                        </Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/search')}}>
                        <SvgSearch className="h-5 w-5" />
                        <Typography {...labelProps}>
                            <Trans i18nKey="nav.search">
                                Search
                            </Trans>
                        </Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/notifications')}}>
                        <SvgBell className="h-5 w-5" />
                        <Typography {...labelProps}>
                            <Trans i18nKey="nav.notif">
                                Notifications
                            </Trans>
                        </Typography>
                    </SpeedDialAction>
                    {userInfo ? (
                        <>
                            <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/add')}}>
                                <SvgPlus className="h-5 w-5" />
                                <Typography {...labelProps}>
                                    <Trans i18nKey="nav.add">
                                        Add
                                    </Trans>
                                </Typography>
                            </SpeedDialAction>
                            <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/profile')}}>
                                <SvgUser className="h-5 w-5" />
                                <Typography {...labelProps}>
                                    <Trans i18nKey="nav.profile">
                                        Profile
                                    </Trans>
                                </Typography>
                            </SpeedDialAction>
                            {userInfo.user.rights === 1 && (
                                <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/admin')}}>
                                    <LiaUserShieldSolid className="h5 w-5" />
                                    <Typography {...labelProps}>
                                        Admin
                                    </Typography>
                                </SpeedDialAction>
                            )}
                            <SpeedDialAction className="relative bg-gray-800 border-0" onClick={handleLogout}>
                                <LiaUserSlashSolid className="h5 w-5" />
                                <Typography {...labelProps}>
                                    <Trans i18nKey="nav.logout">
                                        Logout
                                    </Trans>
                                </Typography>
                            </SpeedDialAction>
                        </>
                    ):(
                        <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/login')}}>
                            <SvgUser className="h-5 w-5" />
                            <Typography {...labelProps}>
                                <Trans i18nKey="nav.login">
                                    Login
                                </Trans>
                            </Typography>
                        </SpeedDialAction>
                    )}
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );
};

export default SpeedNav;