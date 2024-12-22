import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";

const DialogDeletePost = ({open, handle, handleDelete}) => {
    const handleClick = (e) => {
        e.preventDefault();
        handleDelete();
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
                    Delete Post
                </Typography>
            </DialogHeader>
            <DialogBody>
                <Typography>
                    Are you sure you want to delete this post?
                </Typography>
            </DialogBody>
            <DialogFooter>
                <Button color="green" variant="text" onClick={handle}>
                    Cancel
                </Button>
                <Button color="red" variant="gradient" onClick={handleClick}>
                    Delete
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogDeletePost;