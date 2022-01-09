import React, { createContext, useEffect, useState } from "react";

type ContextProps = {
    currentPost: string | null,
    setCurrentPost: React.Dispatch<React.SetStateAction<string | null>>,
    openSection: string | null,
    setOpenSection: React.Dispatch<React.SetStateAction<string | null>>,
    menuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    mainScrollPosition: number,
    setMainScrollPosition: React.Dispatch<React.SetStateAction<number>>,
    currentScrollItem: number,
    setCurrentScrollItem: React.Dispatch<React.SetStateAction<number>>,
}

export const PostContext = createContext<ContextProps>({} as ContextProps);

const PostProvider: React.FC = ({ children }) => {
    const [currentPost, setCurrentPost] = useState<string | null>(null);
    const [openSection, setOpenSection] = useState<string | null>("post");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [mainScrollPosition, setMainScrollPosition] = useState<number>(0);
    const [currentScrollItem, setCurrentScrollItem] = useState<number>(0);

    useEffect(() => {
        setMenuOpen(false);
        setCurrentScrollItem(0);
        return () => {
            setMenuOpen(false);
            setCurrentScrollItem(0);
        }
    }, [currentPost]);

    return (
        <PostContext.Provider
            value={{
                currentPost,
                setCurrentPost,
                menuOpen,
                setMenuOpen,
                mainScrollPosition,
                setMainScrollPosition,
                currentScrollItem,
                setCurrentScrollItem,
                openSection,
                setOpenSection
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider;