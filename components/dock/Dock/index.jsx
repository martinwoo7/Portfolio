import React, {
	cloneElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { animated, useSpringValue } from "@react-spring/web";
import { clamp } from "@react-spring/shared";

import { DockContext } from "./DockContext";
import { useWindowResize } from "../hooks/useWindowResize";
import styles from "../../../styles/Dock.module.css";
export const DOCK_ZOOM_LIMIT = [-100, 50];

export const Dock = ({ children }) => {
	const [activeCard, setActiveCard] = useState(null);
	const [hovered, setHovered] = useState(false);
	const [width, setWidth] = useState(0);

	const isZooming = useRef(false);
	const dockRef = useRef(null);

	const setIsZooming = useCallback((value) => {
		isZooming.current = value;
		setHovered(!value);
	}, []);

	const zoomLevel = useSpringValue(1, {
		onChange: () => {
			setWidth(dockRef.current.clientWidth);
		},
	});

	useWindowResize(() => {
		setWidth(dockRef.current.clientWidth);
	});

	return (
		<DockContext.Provider
			value={{
				hovered,
				setIsZooming,
				width,
				zoomLevel,
				activeCard,
				setActiveCard,
			}}
		>
			<animated.div
				ref={dockRef}
				className={styles.dock}
				onMouseOver={() => {
					if (!isZooming.current) {
						setHovered(true);
					}
				}}
				onMouseOut={() => {
					setHovered(false);
				}}
				style={{
					scale: zoomLevel
						.to({
							range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
							output: [2, 1, 0.5],
						})
						.to((value) => clamp(0.5, 2, value)),
				}}
			>
				{children}
			</animated.div>
		</DockContext.Provider>
	);
};
