import React, { createContext, useEffect, useState } from "react";

type ContextProps = {
    currentPost: string | null,
    setCurrentPost: React.Dispatch<React.SetStateAction<string | null>>,
}

export const NavContext = createContext<ContextProps>({} as ContextProps);

const NavProvider: React.FC = ({ children }) => {
    const [currentPost, setCurrentPost] = useState<string | null>(null);

    return (
        <NavContext.Provider
            value={{
                currentPost,
                setCurrentPost
            }}
        >
            {children}
        </NavContext.Provider>
    )
}

export default NavProvider;