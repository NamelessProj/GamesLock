import {useParams} from "react-router-dom";
import {useMessageStore} from "../stores/messageStore.js";
import {useUserStore} from "../stores/userStore.js";
import {useEffect} from "react";
import {ScaleLoader} from "react-spinners";
import {Alert, Typography} from "@material-tailwind/react";

const ProfilePageTwo = () => {
    const {id} = useParams();
    const {userMessage, getUserMessages, error, messageLoading} = useMessageStore();
    const {user, userLoading, userError, getUserById} = useUserStore();

    useEffect(() => {
        const fetchUser = async () => {
            try{
                await getUserById(id);
            }catch(e){
                console.log(e);
            }
        }

        (async () => await fetchUser()) ();
    }, []);

    return (
        <main className="flex justify-center items-center flex-col gap-3">
            {userError && (
                <section>
                    <Alert color="red">{userError}</Alert>
                </section>
            )}

            {userLoading ? (
                <ScaleLoader color="#bc4b27" />
            ):(
                <>
                    {user ? (
                        <p>{user.username}</p>
                    ):(
                        <Typography variant="lead" className="text-primary-900">
                            This user doesn't seem to exist.
                        </Typography>
                    )}
                </>
            )}
        </main>
    );
};

export default ProfilePageTwo;