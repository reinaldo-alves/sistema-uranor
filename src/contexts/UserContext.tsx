import { createContext } from "react";

export const UserContext = createContext({} as any);

export const UserStore = ({ children }: any) => {
    const user = {name: 'Reinaldo Alves', level: 'Administrador'};

    return (
        <UserContext.Provider value={{user}} >
            { children }
        </UserContext.Provider>
    )
}