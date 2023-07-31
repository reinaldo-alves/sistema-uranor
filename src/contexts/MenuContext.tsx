import { useState } from 'react';
import { createContext } from "react";

export const MenuContext = createContext({} as any);

export const MenuStore = ({ children }: any) => {
    const [openMenu, setOpenMenu ] = useState(false);

    return (
        <MenuContext.Provider value={{openMenu, setOpenMenu}} >
            { children }
        </MenuContext.Provider>
    )
}