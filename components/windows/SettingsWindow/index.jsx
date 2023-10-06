import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useHover, useDrag } from "@use-gesture/react";

import { IoMdClose, IoMdRemove } from "react-icons/io";
import { BiExpandAlt } from "react-icons/bi";

import HorizontalLine from "../../horizontal";
import ToolText from "../../tooltext";

import { closeWindow } from "../../popupWindow/windowSlice";

const SettingsWindow = ({ name, search = true }) => {
	const left = [
		{ name: "About This System", content: "About" },
		{ name: "AppleId", content: "AppleId" },
		{ name: "Family Sharing", content: "Family" },
		"",
		{ name: "Wi-Fi", content: "Wifi" },
		{ name: "Bluetooth", content: "Blue" },
		{ name: "Dock & Menu Bar", content: "Dock" },
		{ name: "Desktop Settings", content: "Desktop" },
		{ name: "Notifications", content: "NOtification" },
		{ name: "Focus", content: "Focus" },
		"",
		{ name: "Passwords", content: "Pass" },
		{ name: "TouchID", content: "Touching" },
		{ name: "Security & Privacy", content: "Sec" },
	];

	const size = 12;

	const dispatch = useDispatch();
	const [hover, setHover] = useState(false);
	const [active, setActive] = useState({
		name: "About This System",
		content: "About",
	});
	// const [position, setPosition] = useState({
	// 	x: (window.innerWidth - 700) / 2,
	// 	y: (window.innerHeight - 700) / 2,
	// });
	const handleClick = (item) => {
		setActive(item);
	};

	const [position, setPosition] = useState({
		x: (window.innerWidth - 700) / 2,
		y: (window.innerHeight - 700) / 2,
	});

	const opacityProps = useSpring({ opacity: hover ? 1 : 0 });
	const scaleProps = useSpring({ scale: hover ? 1.1 : 1 });
	const bind = useHover(({ hovering }) => {
		console.log(hovering);
		setHover(hovering);
	});

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
	const transitions = useTransition(active, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0, position: "absolute" },
	});

	return (
		<div className="relative w-3/4 h-4/6 text-sm">
			<div className="absolute inset-0 backdrop-blur-md"></div>
			<animated.div
				style={props}
				className="text-white rounded-xl w-full h-full flex relative "
			>
				<div
					id="left"
					className="bg-zinc-900/70 w-1/4 flex flex-col rounded-l-xl pb-4 gap-2"
				>
					<div
						className=" w-full pt-4 pb-5 pl-4 rounded-tl-xl relative"
						{...dragBind()}
						style={{ touchAction: "none" }}
					>
						<div
							className="flex gap-2 absolute"
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
									<IoMdClose
										size={size}
										className="text-black"
									/>
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
					</div>
					<div className="pl-4">
						{search && <div>Search bar</div>}

						<ul className="flex flex-col pr-4 mt-3">
							{left.map((item, index) => {
								if (item) {
									return (
										<div
											style={{
												backgroundColor:
													active.name === item.name
														? "rgba(0,0,0,0.1)"
														: "transparent",
											}}
											className="rounded-xl"
											key={index}
										>
											<ToolText
												name={item.name}
												onClick={() =>
													handleClick({
														name: item.name,
														content: item.content,
													})
												}
											/>
										</div>
									);
								} else {
									return (
										<HorizontalLine
											key={index}
											className="my-2"
										/>
									);
								}
							})}
						</ul>
					</div>
				</div>
				<div
					id="right"
					className="bg-zinc-800 w-3/4 rounded-r-xl flex flex-col items-center pb-4"
				>
					<div
						className="w-full pt-4 rounded-tr-xl pl-4 h-10"
						{...dragBind()}
						style={{ touchAction: "none" }}
					/>
					{/* {transitions((props, item) => (
						<animated.div style={props}>
							{item && item.content}
						</animated.div>
					))} */}
					{active ? active.content : null}
				</div>
			</animated.div>
		</div>
	);
};

export default SettingsWindow;
