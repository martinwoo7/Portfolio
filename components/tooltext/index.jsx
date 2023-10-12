import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import { IoMdHeart } from "react-icons/io";
import { useSelector } from "react-redux";

const ToolText = ({ name, onClick, icon, padding, disabled }) => {
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
			className="rounded-xl flex items-center overflow-hidden"
			style={{
				...(!disabled && hoverAnimation),
				...(active === name && {
					backgroundColor: "rgba(0, 0, 0, 0.2)",
				}),
				paddingLeft: padding ? "7px" : "4px",
				paddingRight: padding ? "7px" : "4px",
				paddingTop: padding ? "7px" : "4px",
				paddingBottom: padding ? "7px" : "4px",
			}}
			onClick={onClick}
			{...bind()}
		>
			{icon && (
				<div
					style={
						disabled
							? { backgroundColor: "grey" }
							: { backgroundColor: colour }
					}
					className="w-8 h-8 p-1 rounded-md overflow-hidden flex justify-center items-center mr-4"
				>
					{icon}
				</div>
			)}
			{name === "Menu" ? <IoMdHeart size={21} /> : <p style={disabled ? {color: 'darkgrey'} : {}}>{name}</p>}
		</animated.div>
	);
};

export default ToolText;
