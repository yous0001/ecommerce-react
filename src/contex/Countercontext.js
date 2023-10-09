import { createContext, useState } from "react";


export let CounterContext=createContext(0);

export default function CounterContextProvider({children}){
    let [counter,setcounter]=useState(0);
    function changecount(){
        setcounter(counter++);
    }
    return  <CounterContext.Provider value={{counter,changecount}}>
        {children}
        </CounterContext.Provider>
}