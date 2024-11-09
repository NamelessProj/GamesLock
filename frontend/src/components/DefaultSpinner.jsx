import React from 'react';
import {ScaleLoader} from "react-spinners";

const DefaultSpinner = ({spinner=null, color="#bc4b27", className=""}) => {
    return (
        <>
            {React.isValidElement(spinner) ? spinner : (
                <ScaleLoader color={color} className={className} />
            )}
        </>
    );
};

export default DefaultSpinner;