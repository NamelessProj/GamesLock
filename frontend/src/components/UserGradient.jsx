import {useEffect, useState} from "react";

const UserGradient = ({user, defaultColor="gray"}) => {
    const [color, setColor] = useState(defaultColor);

    useEffect(() => {
        if(user) setColor(user.profileColor.hex);
    }, [user]);

    return <div className="absolute -z-10 top-0 left-0 right-0 h-64 opacity-50" style={{background: `linear-gradient(${color}, transparent)`}} />
};

export default UserGradient;