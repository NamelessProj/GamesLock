import DefaultSpinner from "./DefaultSpinner.jsx";

const AppLoader = () => {
    return (
        <>
            <header></header>
            <main className="flex justify-center items-center">
                <DefaultSpinner />
            </main>
            <div></div>
            <footer></footer>
        </>
    );
};

export default AppLoader;