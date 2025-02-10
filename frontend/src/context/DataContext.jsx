import {createContext, useState} from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [backUrl, setBackUrl] = useState(null);
    const [followUser, setFollowUser] = useState(null);

    return (
        <DataContext.Provider value={{
            backUrl,
            setBackUrl,
            followUser,
            setFollowUser
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;