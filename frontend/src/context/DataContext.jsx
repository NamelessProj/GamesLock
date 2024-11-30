import {createContext, useState} from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [backUrl, setBackUrl] = useState(null);

    return (
        <DataContext.Provider value={{
            backUrl,
            setBackUrl,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;