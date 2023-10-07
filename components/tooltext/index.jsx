import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import { IoMdHeart } from "react-icons/io";
import { useSelector } from "react-redux";

const ToolText = ({ name, onClick, icon }) => {
	const [hovering, setHovering] = useState(false);
	const active = useSelector((state) => state.layout.active);
	const colour = useSelector((state) => state.layout.colour);
	const bind = useHover(({ hovering }) => {
		setHovering(hovering);
	});

	const hoverAnimation = useSpring({
		backgroundColor: hovering ? "rgba(0,0,0,0.2)" : "transparent", // Initial background color
		config: { duration: 300 },
	});
	return (
		<animated.div
			className="text-white rounded-lg p-1 flex items-center overflow-hidden"
			style={{
				...hoverAnimation,
				...(active === name && {
					backgroundColor: "rgba(0, 0, 0, 0.2)",
				}),
			}}
			onClick={onClick}
			{...bind()}
		>
			{icon && (
				<div
					style={{ backgroundColor: colour }}
					className="w-8 h-8 p-1 rounded-md overflow-hidden flex justify-center items-center mr-4"
				>
					{icon}
				</div>
			)}
			{name === "Menu" ? <IoMdHeart size={21} /> : <p>{name}</p>}
		</animated.div>
	);
};

export default ToolText;
