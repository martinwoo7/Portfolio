import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const SwitchItem = ({ children, row }) => {
	const containerClass = row
		? "rounded-xl flex bg-black/10 p-2 w-full" // Use valid CSS class names
		: "rounded-xl flex bg-black/10 flex-col p-2";
	return <div className={containerClass}>{children}</div>;
};

export default SwitchItem;
