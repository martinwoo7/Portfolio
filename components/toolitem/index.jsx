import React, { useState } from "react";
import {
	IoIosBatteryFull,
	IoIosWifi,
	IoIosSearch,
	IoIosSwitch,
} from "react-icons/io";
import { useSpring, animated, config } from "@react-spring/web";
import { useHover } from "@use-gesture/react";

function IconMapper({ type, size }) {
	switch (type) {
		case "Battery":
			return <IoIosBatteryFull className="text-white" size={size} />;
		case "Wifi":
			return <IoIosWifi className="text-white" size={size} />;
		case "Search":
			return <IoIosSearch className="text-white" size={size} />;
		case "Tool":
			return <IoIosSwitch className="text-white" size={size} />;
		default:
			return null;
	}
}

const ToolItem = ({ name }) => {
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
			<IconMapper type={name} size={18} />
		</animated.div>
	);
};

export default ToolItem;
