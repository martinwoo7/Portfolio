import { useSpring, animated, useSpringValue } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect, useState } from "react";
import { setVolume } from "../layoutSlice";
import { useDispatch, useSelector } from "react-redux";

const Slider = ({ purpose }) => {
	const dispatch = useDispatch();
	// value needs to be percentage
	const volume = useSelector((state) => state.layout.volume);
	const condition = purpose === "sound" ? volume * 236 : 40;
	const [value, setValue] = useState(condition);

	// const springProps = useSpring({ x: valueRef.current });
	// const widthProps = useSpring({ width: valueRef.current + 20 });

	const x = useSpringValue(value);
	const width = useSpringValue(value + 20);

	// Handle the drag gesture
	const bind = useDrag(({ down, movement: [mx] }) => {
		const newValue = value + (mx / 236) * 236;
		const clampedValue = Math.min(236, Math.max(0, newValue));
		if (!down) {
			setValue(clampedValue);
			// console.log("Final:", clampedValue);
		} else {
			// console.log("Moving:", clampedValue);
			if (purpose === "sound") {
				const percent = clampedValue / 236;
				// console.log();
				dispatch(setVolume(parseFloat(percent.toFixed(2))));
			}

			// springProps.x.start(clampedValue);
			// widthProps.width.start(clampedValue + 20);
			x.start(clampedValue);
			width.start(clampedValue + 20);
		}
	});

	return (
		<div className="w-64 h-5 relative bg-white/10 rounded-full z-0 overflow-hidden">
			<animated.div
				{...bind()}
				className="h-5 w-5 rounded-full bg-white absolute top-0 z-20 "
				style={{
					touchAction: "none",
					// ...springProps,
					x,
					boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
				}}
			/>
			<animated.div
				className={
					"absolute h-5 bg-white top-0 left-0 z-10 w-full rounded-r-full"
				}
				// style={{ ...widthProps }}
				style={{ width }}
			/>
		</div>
	);
};

export default Slider;
