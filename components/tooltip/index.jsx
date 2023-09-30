import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const Tooltip = ({ text }) => {
	const springProps = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<animated.span
			style={springProps}
			className="w-full text-sm absolute bg-white/10 text-white p-2 rounded-md left-0 top-10 flex flex-col justify-center items-center"
		>
            <p className="mb-2">Password Hint</p>

			{text}
		</animated.span>
	);
};

export default Tooltip;
