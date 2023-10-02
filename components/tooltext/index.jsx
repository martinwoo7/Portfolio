import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import { IoMdHeart } from "react-icons/io";

const ToolText = ({ name }) => {
	const [hovering, setHovering] = useState(false);
	const bind = useHover(({ hovering }) => {
		setHovering(hovering);
	});

	const hoverAnimation = useSpring({
		backgroundColor: hovering ? "rgba(0,0,0,0.2)" : "transparent", // Initial background color
		config: { duration: 300 },
	});
	return (
		<animated.div
			className="text-white rounded-xl p-2"
			style={hoverAnimation}
			{...bind()}
		>
			{name === "Menu" ? <IoMdHeart size={22} /> : <p>{name}</p>}
		</animated.div>
	);
};

export default ToolText;
