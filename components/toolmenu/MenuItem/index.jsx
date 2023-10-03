import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
const MenuItem = ({ children }) => {
	const [hovering, setHovering] = useState(false);
	const bind = useHover(({ hovering }) => {
		setHovering(hovering);
	});
	const props = useSpring({
		backgroundColor: hovering ? "rgba(0,0,0,0.2)" : "transparent",
	});
	return (
		<animated.div
			className="flex rounded-xl p-2 py-1.5 w-full"
			style={props}
			{...bind()}
		>
			{children}
		</animated.div>
	);
};

export default MenuItem;
