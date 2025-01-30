import {useState} from "react";

const Soink = () => {
    const [isDead, setIsDead] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsDead(true);
    }

    return (
        <div className="soink-container z-50 opacity-0 flex items-end absolute bottom-0 top-[calc(100svh-250px)] left-0 overflow-clip">
            <div className={`soink w-24 h-24 bottom-4 relative ${isDead ? "isDead" : "cursor-pointer"}`} onClick={handleClick}>
                {isDead ? (
                    <img src="/soink/soink_dying.png" alt="soink" className="soink-sprite soink-dying absolute inset-0" />
                ):(
                    <img src="/soink/soink_waiting.gif" alt="soink" className="soink-sprite soink-waiting absolute inset-0" />
                )}
            </div>
        </div>
    );
};

export default Soink;