import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const LoadingBar = () => {
	// Define a spring animation for the loading bar width

	const [open, toggle] = useState(false);
	const [animationConfig, setAnimationConfig] = useState({
		duration: 2000,
	});

	useEffect(() => {
		setTimeout(() => {
			toggle(true);
		}, 1000);

		// setTimeout(() => {
		// 	setAnimationConfig({ duration: 6000 });
		// }, 1000);

		// setTimeout(() => {
		// 	setAnimationConfig({ duration: 3000 });
		// }, 2000);
	}, []);

	const loadingBarAnimation = useSpring({
		width: open ? "100%" : "0%", // Animate from 0% to 100% width
		config: { animationConfig: 2000 },
	});

	return (
		<div
			className={
				"flex mt-4 w-full h-1 rounded-md relative overflow-hidden bg-white/20"
			}
			// onClick={() => toggle(!open)}
		>
			<animated.div
				style={loadingBarAnimation}
				className={"absolute top-0 left-0 w-full h-full bg-red-500"}
			/>
		</div>
	);
};

export default LoadingBar;
