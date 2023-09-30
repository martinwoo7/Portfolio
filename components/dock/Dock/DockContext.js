import { createContext, useContext } from "react";

export const DockContext = createContext({ width: 0, activeCard: 0, hovered: false, setIsZooming: () => {}, setActiveCard: () => {}})
export const useDock = () => {
    return useContext(DockContext)
}