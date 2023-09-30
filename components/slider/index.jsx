import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";

const Slider = () => {
	const [value, setValue] = useState(50);
	const springProps = useSpring({ x: value });
	const widthProps = useSpring({ width: value + 20 });
	// Handle the drag gesture
	const bind = useDrag(({ down, movement: [x] }) => {
		const newValue = value + (x / 236) * 236;
		const clampedValue = Math.min(236, Math.max(0, newValue));
		if (!down) {
			setValue(clampedValue);
			console.log(clampedValue);
		} else {
			springProps.x.start(clampedValue);
			widthProps.width.start(clampedValue + 20);
		}
	});

	return (
		<div className="w-64 h-5 relative bg-white/10 rounded-full z-0 overflow-hidden">
			<animated.div
				{...bind()}
				className="h-5 w-5 rounded-full bg-white absolute top-0 z-20 "
				style={{
					touchAction: "none",
					...springProps,
					boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
				}}
			/>
			<animated.div
				className={
					"absolute h-5 bg-white top-0 left-0 z-10 w-full rounded-r-full"
				}
				style={{ ...widthProps }}
			/>
		</div>
	);
};

export default Slider;
