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
import {FaPlus} from "react-icons/fa";
import SvgHome from "./SVG/SvgHome.jsx";
import SvgSearch from "./SVG/SvgSearch.jsx";
import SvgPlus from "./SVG/SvgPlus.jsx";
import SvgUser from "./SVG/SvgUser.jsx";
import SvgBell from "./SVG/SvgBell.jsx";

const SpeedNav = () => {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const labelProps = {
        variant: "small",
        color: "blue-gray",
        className: "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal text-primary-900"
    }

    return (
        <div className="fixed bottom-2 right-2 z-30">
            <SpeedDial open={open} handler={setOpen}>
                <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full">
                        <FaPlus className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/')}}>
                        <SvgHome className="h-5 w-5" />
                        <Typography {...labelProps}>Home</Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/search')}}>
                        <SvgSearch className="h-5 w-5" />
                        <Typography {...labelProps}>Search</Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/add')}}>
                        <SvgPlus className="h-5 w-5" />
                        <Typography {...labelProps}>Add</Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/profile')}}>
                        <SvgUser className="h-5 w-5" />
                        <Typography {...labelProps}>Profile</Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative bg-gray-800 border-0" onClick={() => {navigate('/notifications')}}>
                        <SvgBell className="h-5 w-5" />
                        <Typography {...labelProps}>Notifications</Typography>
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );
};

export default SpeedNav;