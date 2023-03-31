import { createContext } from "react";

export const TemploContext = createContext({} as any);

export const TemploStore = ({ children }: any) => {
    const templos = ['Jaboatão - PE', 'Prazeres - PE', 'São José do Vale do Rio Preto - RJ']
    
    return (
        <TemploContext.Provider value={{templos}} >
            { children }
        </TemploContext.Provider>
    )
}