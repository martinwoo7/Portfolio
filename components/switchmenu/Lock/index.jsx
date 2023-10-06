import { animated, useSpring, useTransition } from "@react-spring/web";
import { useSelector } from "react-redux";

import { IoMdUnlock, IoMdLock } from "react-icons/io";
const Lock = () => {
	const unlocked = useSelector((state) => state.layout.unlocked);
	const unlockStyle = useSpring({
		color: unlocked ? "rgb(250,250,250)" : "rgb(239,68,68)",
	});

	const textStyle = useTransition(unlocked, {
		from: { opacity: 1, transform: "translateY(-10px)" },
		enter: { opacty: 1, transform: "translateY(0px)" },
		leave: {
			opacity: 0,
			position: "absolute",
			transform: "translateY(10px)",
		},
	});

	return (
		<div className="flex flex-col items-center w-16 ">
			<animated.div style={unlockStyle} >
				{unlocked ? (
					<IoMdUnlock size={24} className="my-1 switch-menu" />
				) : (
					<IoMdLock size={24} className="my-1 switch-menu" />
				)}
			</animated.div>

			<p>Dock</p>
			<div className="relative w-full flex justify-center">
				{textStyle((props, item) =>
					item ? (
						<animated.p style={props}>Unlocked</animated.p>
					) : (
						<animated.p style={props}>Locked</animated.p>
					)
				)}
			</div>
		</div>
	);
};

export default Lock;
