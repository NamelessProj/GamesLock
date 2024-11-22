import {Button, Card, CardBody, CardHeader, Input, Textarea, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useMessageStore} from "../stores/messageStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";

const AddPost = () => {
    const [game, setGame] = useState('');
    const [text, setText] = useState('');
    const [defaultImage, setDefaultImage] = useState('');

    const {messageLoading} = useMessageStore();

    const {t} = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(text);
    }

    return (
        <main className="flex justify-center items-center">
            {messageLoading ? (
                <DefaultSpinner />
            ):(
                <section className="my-6">
                    <Card className="w-full max-w-[24rem]" color="gray">
                        <CardHeader color="gray" floated={false} shadow={true}
                                    className="w-full m-0 grid place-items-center px-4 py-8 text-center">
                            <div className="mb-4 h-20 p-6 text-primary-900">
                                <img className="w-14 object-contain" alt="Post image"
                                     src={defaultImage ? defaultImage : "https://docs.material-tailwind.com/icons/paypall.png"}/>
                            </div>
                            <Typography variant="h5" color="white">
                                {t("posts.new.title")}
                            </Typography>
                        </CardHeader>
                        <CardBody className="w-full">
                            <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                                <Input
                                    value={game}
                                    onChange={(e) => setGame(e.target.value)}
                                    color="deep-orange"
                                    variant="standard"
                                    name="game"
                                    label={t("posts.new.game")}
                                    className="text-primary-900"
                                />
                                <Textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    color="deep-orange"
                                    variant="standard"
                                    name="text"
                                    label={t("posts.new.text")}
                                    className="text-primary-900"
                                />
                                <Button
                                    color="deep-orange"
                                    onClick={handleSubmit}
                                >
                                    {t("posts.new.submit")}
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </section>
            )}
        </main>
    );
};

export default AddPost;