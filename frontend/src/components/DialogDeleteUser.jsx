import {Button, Dialog, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";

const DialogDeleteUser = ({open, handle, handleConfirm}) => {
    const handleClick = (e) => {
        e.preventDefault();
        handleConfirm(true);
        handle();
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
                    Are you sure you want to delete your account?
                </Typography>
            </DialogHeader>
            <DialogFooter className="flex justify-center items-center gap-6">
                <Button color="green" variant="text" onClick={handle}>
                    Cancel
                </Button>
                <Button color="red" variant="gradient" onClick={handleClick}>
                    Delete This Account
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogDeleteUser;