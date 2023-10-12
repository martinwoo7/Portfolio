import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const Clickable = ({ text, onClick }) => {
	// Define the animation spring
	const [clicked, setClicked] = useState(false);
	const [props, setScale] = useSpring(() => ({
		scale: 1,
        backgroundColor: "rgb(63, 63, 70)"
	}));

	// Create gesture handlers
	const bind = useGesture({
		onMouseEnter: () => {
			setScale({ scale: 1.05 });
		},
		onMouseLeave: () => {
			if (!clicked) {
				setScale({ scale: 1 });
			}
		},
		onClick: () => {
			setClicked(true);
			// Add a click animation, e.g., a slight bounce
			setScale({ scale: 0.95, config: { friction: 10 } });

			// Simulate a release after the animation is complete
			setTimeout(() => {
				setClicked(false);
				setScale({ scale: 1 });
                onClick()
			}, 150);
		},
	});

	return (
		<animated.button
			{...bind()}
			style={{
				transform: props.scale.to((s) => `scale(${s})`),
				background: props.backgroundColor,
				cursor: "pointer",
			}}
			className="p-1 text-xs w-fit rounded-md flex items-center justify-center"
		>
			{text}
		</animated.button>
	);
};

export default Clickable;
