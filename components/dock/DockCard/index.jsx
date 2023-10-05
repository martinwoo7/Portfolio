import React, { useEffect, useRef, useState } from "react";
import {
	setActive,
	openWindow,
	closeWindow,
} from "../../popupWindow/windowSlice";
import {
	animated,
	useIsomorphicLayoutEffect,
	useSpringValue,
	useSpring,
} from "@react-spring/web";

import { useHover } from "@use-gesture/react";

import { useWindowResize } from "../hooks/useWindowResize";
import { useMousePosition } from "../hooks/useMousePosition";

import { useDock } from "../Dock/DockContext";
import styles from "../../../styles/Dock.module.css";
import { useDispatch, useSelector } from "react-redux";
const INITIAL_WIDTH = 48;

export const DockCard = ({ children, value, src }) => {
	const dispatch = useDispatch();
	const cardRef = useRef(null);
	const [elCenterX, setElCenterX] = useState(0);
	const [hovering, setHovering] = useState(false);

	const hover = useHover(({ hovering }) => {
		setHovering(hovering);
	});
	const props = useSpring({ opacity: hovering ? 1 : 0 });

	const size = useSpringValue(INITIAL_WIDTH, {
		config: {
			mass: 0.1,
			tension: 320,
		},
	});

	function openSource() {
		const urlToOpen = "https://github.com/martinwoo7/Portfolio"
		window.open(urlToOpen, '_blank')
	}

	const opacity = useSpringValue(0);
	const y = useSpringValue(0, {
		config: {
			friction: 29,
			tension: 238,
		},
	});

	const dock = useDock();
	const opened = useSelector((state) => state.window.opened);

	useMousePosition(
		{
			onChange: ({ value }) => {
				const mouseX = value.x;
				if (dock.width > 0) {
					const transformedValue =
						INITIAL_WIDTH +
						36 *
							Math.cos(
								(((mouseX - elCenterX) / dock.width) *
									Math.PI) /
									2
							) **
								12;
					if (dock.hovered) {
						size.start(transformedValue);
					}
				}
			},
		},
		[elCenterX, dock]
	);

	useIsomorphicLayoutEffect(() => {
		if (!dock.hovered) {
			size.start(INITIAL_WIDTH);
		}
	}, [dock.hovered]);

	useWindowResize(() => {
		const { x } = cardRef.current.getBoundingClientRect();
		setElCenterX(x + INITIAL_WIDTH / 2);
	});

	const timesLooped = useRef(0);
	const timeoutRef = useRef();
	const isAnimating = useRef(false);

	// pass in current active
	const handleClick = (e) => {
		e.stopPropagation();
		if (!isAnimating.current) {
			isAnimating.current = true;
			opacity.start(0.5);

			timesLooped.current = 0;

			y.start(-INITIAL_WIDTH / 2, {
				loop: () => {
					if (1 === timesLooped.current++) {
						timeoutRef.current = setTimeout(() => {
							// opacity.start(0);
							y.set(0);
							isAnimating.current = false;
							timeoutRef.current = undefined;
							if (!opened.includes(value)) {
								if (value === "Source") {

								} else {
									console.log("Opening", value);
									dispatch(openWindow(value));
								}
							}
						}, 30);

						y.stop();
					}
					return { reverse: true };
				},
			});
		} else {
			/**
			 * Allow premature exit of animation
			 * on a second click if we're currently animating
			 */
			clearTimeout(timeoutRef.current);
			opacity.start(0);
			y.start(0);
			isAnimating.current = false;
		}
	};
	useEffect(() => {
		if (!opened.includes(value)) {
			opacity.start(0);
			isAnimating.current = false;
		}
	}, [opened]);
	return (
		<div className={styles.dockCardContainer}>
			<animated.div
				style={{
					y,
				}}
			>
				<animated.div
					className="bg-black/20 rounded-md mb-2 text-white flex justify-center text-sm"
					style={props}
				>
					{value}
				</animated.div>
				<animated.button
					{...hover()}
					ref={cardRef}
					className={`${styles.dockCard}`}
					onClick={value === "Source" ? openSource : handleClick}
					style={{
						width: size,
						height: size,
						// y,
						backgroundImage: `url(${src})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
					}}
				>
					{children}
				</animated.button>
			</animated.div>
			<animated.div className={styles.dockDot} style={{ opacity }} />
		</div>
	);
};
