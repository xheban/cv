import React, {useState} from "react";
import {userData} from "../Data/usersData";

export const CvContext = React.createContext();

export const CvContextProvider = ({ children }) => {
    let cvId = JSON.parse(localStorage.getItem('cvId'));
    cvId = cvId === undefined ? 0 : cvId;
    const [cv, setCv] = useState(userData[parseInt(cvId)]);


    const value = {cv, setCv};
    return (
        <CvContext.Provider value={value}>
            {children}
        </CvContext.Provider>
    );
};