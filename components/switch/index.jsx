import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
const Switch = () => {
	const [isOn, setIsOn] = useState(false);

	const springStyle = useSpring({
		transform: isOn ? "translateX(80%)" : "translateX(0%)",
	});
	const backgroundStyle = useSpring({
		backgroundColor: isOn ? "rgb(59 130 246)" : "rgb(209 213 219)",
	});

	const toggleSwitch = () => {
		setIsOn(!isOn);
	};

	return (
		<animated.div
			style={backgroundStyle}
			className="relative w-10 h-6 rounded-full cursor-pointer"
		>
			<animated.div
				className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5"
				style={springStyle}
			/>
			<input
				type="checkbox"
				className="w-full h-full opacity-0 cursor-pointer"
				checked={isOn}
				onChange={toggleSwitch}
			/>
		</animated.div>
	);
};

export default Switch;
