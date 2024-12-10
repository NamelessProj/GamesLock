import {Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {FaTrashAlt} from "react-icons/fa";
import {useState} from "react";
import {BsThreeDots} from "react-icons/bs";
import {Link} from "react-router-dom";

const Notification = ({notification, handleDelete}) => {
    const [open, setOpen] = useState(false);

    const typographyProps = {
        className: "text-black"
    };
    const menuButtonsProps = {
        variant: "text",
        color: "deep-orange",
        className: "w-full flex items-center justify-between gap-3"
    };
    const menuIconsProps = {
        size: 24,
        className: "fill-gray-500 hover:fill-primary-400 transition"
    };

    return (
        <div className="notif relative w-full p-4 pt-6 rounded-xl bg-gray-800">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${notification.from._id}`}>
                    <Typography variant="lead">
                        {notification.from.username}
                    </Typography>
                </Link>
                <Typography>
                    {notification.text}
                </Typography>
            </div>

            <div className="absolute top-2 right-2">
                <Menu open={open} handler={setOpen} placement="bottom-end" allowHover>
                    <MenuHandler>
                        <IconButton variant="text" color="deep-orange">
                            <BsThreeDots size={24} />
                        </IconButton>
                    </MenuHandler>
                    <MenuList className="bg-gray-600 border-none">
                        <MenuItem>
                            <Button {...menuButtonsProps} onClick={(e) => handleDelete(e, notification._id)}>
                                <Typography {...typographyProps}>
                                    Delete
                                </Typography>
                                <FaTrashAlt {...menuIconsProps} />
                            </Button>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default Notification;