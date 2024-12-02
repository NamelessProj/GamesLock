import {Button, Dialog, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import DataContext from "../context/DataContext.jsx";

const DialogFollow = ({open, handle, userId}) => {
    const navigate = useNavigate();
    const {setBackUrl} = useContext(DataContext);

    const handleNavigate = (e) => {
        e.preventDefault();
        setBackUrl(userId ? `/profile/${userId}` : null);
        navigate('/login');
    }

    return (
        <Dialog
            open={open}
            handler={handle}
            size="xs"
            animate={{
                mount: {scale: 1},
                unmount: {scale: 0.9}
            }}
        >
            <DialogHeader>
                <Typography variant="h4" className="w-full text-center text-balance">
                    Please login to follow the user.
                </Typography>
            </DialogHeader>
            <DialogFooter className="flex justify-center items-center gap-6">
                <Button color="red" variant="text" onClick={handle}>
                    Cancel
                </Button>
                <Button color="deep-orange" variant="gradient" onClick={handleNavigate}>
                    Login
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogFollow;