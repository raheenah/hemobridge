import { createContext, useContext } from "react";


export const FacilityContext = createContext(undefined);



export const useFacilityContext = () => useContext(FacilityContext);