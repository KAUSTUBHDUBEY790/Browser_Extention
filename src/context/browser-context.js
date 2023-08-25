import { createContext, useContext, useReducer} from "react";
import { browserReducer } from "../Reducer/browser-reducer";


const initialValue = {
    name: "",
    time:"",
    message:"",
    task:null,
};

const BrowserContext = createContext(initialValue);

const BrowserProvider = ({children}) => {
    const [{name,time,message,task},browserdispatch] = useReducer(browserReducer,initialValue);


    return (
        <BrowserContext.Provider value={{name,time,message,task,browserdispatch}}>
            {children}
        </BrowserContext.Provider>
    );
};
const useBrowser = () => useContext(BrowserContext);

export { useBrowser, BrowserProvider }
