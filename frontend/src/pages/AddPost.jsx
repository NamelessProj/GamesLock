import {Button, Input, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const AddPost = () => {
    const [text, setText] = useState('');

    const {t} = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(text);
    }

    return (
        <main className="flex justify-center items-center">
            <section className="my-6">
                <Typography as="h1">
                    Add Post
                </Typography>
                <form>
                    <div className="flex flex-col gap-6">
                        <Input
                            name="text"
                            label="Your message"
                            variant="standard"
                            color="deep-orange"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button
                            color="deep-orange"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default AddPost;