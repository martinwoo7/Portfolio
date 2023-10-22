import { useState, useEffect } from "react";
import { useDrag, useHover } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { closeWindow } from "./windowSlice";

import { useDispatch } from "react-redux";

import { IoMdClose, IoMdRemove } from "react-icons/io";
import { BiExpandAlt } from "react-icons/bi";

export const PopupWindow = ({ children, title, name, sizing }) => {
	const size = 12;

	const dispatch = useDispatch();
	const [hover, setHover] = useState(false);
	// const [position, setPosition] = useState({
	// 	x: (window.innerWidth - 700) / 2,
	// 	y: (window.innerHeight - 700) / 2,
	// });
	const [position, setPosition] = useState({
		x: (window.innerWidth - 700) / 2,
		y: (window.innerHeight - 700) / 2,
	});

	const opacityProps = useSpring({ opacity: hover ? 1 : 0 });
	const scaleProps = useSpring({
		scale: hover ? 1.1 : 1,
		transform: hover ? "translateZ(1px)" : "translateZ(0px)",
	});
	const bind = useHover(({ hovering }) => {
		console.log(hovering);
		setHover(hovering);
	});

	// useEffect(() => {
	// 	const screenWidth = window.innerWidth;
	// 	const screenHeight = window.innerHeight;
	// 	const initialX = (screenWidth - 400) / 2; // Adjust 400 to your desired window width
	// 	const initialY = (screenHeight - 400) / 2; // Adjust 400 to your desired window height
	// 	setPosition({ x: initialX, y: initialY });
	// }, []);

	const props = useSpring({ x: position.x, y: position.y });
	const dragBind = useDrag(
		({ down, movement: [x, y] }) => {
			const newX = position.x + x;
			const newY = position.y + y;

			if (!down) {
				setPosition({ x: newX, y: newY });
			} else {
				props.x.start(newX);
				props.y.start(newY);
			}
		},
		// figure out how to calculate the top bounds
		// probably something to do with the screenheight and the inital position
		{ bounds: { top: -120 } }
	);
	// TODO: Pass in certain h and w depending on the menu we're rendering
	return (
		<animated.div
			style={props}
			className={`relative ${
				sizing === "sm"
					? "w-1/2"
					: sizing === "lg"
					? "w-11/12"
					: "w-3/4"
			}   h-4/6 max-w-4xl min-w-2xl rounded-xl`}
		>
			<div className="absolute inset-0 backdrop-blur-md rounded-xl" />
			<animated.div className="relative text-white rounded-xl bg-black/10 w-full h-full pt-2">
				<div
					className="flex items-center mb-1"
					id="top-part"
					{...dragBind()}
					style={{ touchAction: "none" }}
				>
					<div
						className="flex gap-2 z-0 absolute float-left ml-3"
						{...bind()}
						style={{ width: "fit-content" }}
					>
						<animated.div
							style={scaleProps}
							className="rounded-full overflow-hidden w-4 h-4 bg-red-500 flex justify-center items-center"
							onClick={() => {
								console.log("Closing ", name);
								dispatch(closeWindow(name));
							}}
						>
							<animated.div style={opacityProps}>
								<IoMdClose size={size} className="text-black" />
							</animated.div>
						</animated.div>
						<animated.div
							style={scaleProps}
							className="rounded-full overflow-hidden w-4 h-4 bg-yellow-500 flex justify-center items-center"
						>
							<animated.div style={opacityProps}>
								<IoMdRemove
									size={size}
									className="text-black"
								/>
							</animated.div>
						</animated.div>
						<animated.div
							style={scaleProps}
							className="rounded-full overflow-hidden w-4 h-4 bg-green-500 flex justify-center items-center"
						>
							<animated.div style={opacityProps}>
								<BiExpandAlt
									size={size}
									className="text-black"
								/>
							</animated.div>
						</animated.div>
					</div>
					{title && (
						<div className="flex-1 text-center">
							<h1 className="text-lg">{title}</h1>
						</div>
					)}
				</div>
				<div
					style={{ height: `calc(100% - 33px)` }}
					className="rounded-b-xl"
				>
					{children}
				</div>
			</animated.div>
		</animated.div>
	);
};
