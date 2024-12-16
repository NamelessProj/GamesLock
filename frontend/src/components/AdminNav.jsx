import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, IconButton, MobileNav, Navbar, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import {HiBars3BottomRight, HiXMark} from "react-icons/hi2";

const AdminNav = () => {
    const {userInfo} = useAuthStore();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => window.innerWidth >= 960 && setOpen(false));
    }, []);

    const navListLiProps = {
        as: 'li',
        variant: 'small',
        color: 'blue-gray',
        className: 'p-1 font-normal',
    }

    const NavList = () => (
        <ul className="mt-2 mb-4 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography {...navListLiProps}>
                <Link to="/admin">
                    Dashboard
                </Link>
            </Typography>
            <Typography {...navListLiProps}>
                <Link to="/admin/reported">
                    Reported Posts
                </Link>
            </Typography>
        </ul>
    )

    return (
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to="/admin">
                    <Typography className="mr-4 py-1.5 font-medium">
                        Admin
                    </Typography>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">
                        <NavList/>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Typography variant="lead" className="max-w-[130px] overflow-clip text-nowrap whitespace-nowrap" style={{textOverflow: 'ellipsis'}}>
                            {userInfo.user.username}
                        </Typography>
                        <Avatar src={`${import.meta.env.VITE_IMG_URL}user/${userInfo.user.profileImage}`} loading="lazy" alt={userInfo.user.username} variant="circular"/>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover::bg-transparent focus::bg-transparent active::bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <HiXMark size={24} />
                        ):(
                            <HiBars3BottomRight size={24} />
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={open}>
                <NavList/>
            </MobileNav>
        </Navbar>
    );
};

export default AdminNav;