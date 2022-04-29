import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Main from "../../components/main/main";

export const appointmentDetailsContext= React.createContext(null);

export default function Homepage() {
    const {state} = useLocation();

    return (
        <>
        <appointmentDetailsContext.Provider value={state}>
           <Main/>
        </appointmentDetailsContext.Provider>
        </>
    );
}