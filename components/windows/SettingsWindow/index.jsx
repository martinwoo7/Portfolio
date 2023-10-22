import { useDispatch } from "react-redux";
import { closeWindow } from "../../popupWindow/windowSlice";
import { useState, useRef, useEffect } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useHover, useDrag } from "@use-gesture/react";
import Scrollbars from "react-custom-scrollbars-2";

import {
	IoMdClose,
	IoMdRemove,
	IoLogoApple,
	IoIosWifi,
	IoIosBluetooth,
	IoIosNotifications,
	IoMdMoon,
	IoMdKey,
	IoMdFingerPrint,
} from "react-icons/io";
import { BiExpandAlt } from "react-icons/bi";
import { MdOutlineDesktopMac, MdGroups2 } from "react-icons/md";
import { BsWindowDock, BsFillShieldLockFill } from "react-icons/bs";

import HorizontalLine from "../../horizontal";
import ToolText from "../../tooltext";
import SettingsAbout from "./About";

const SettingsWindow = ({ name, search = true }) => {
	const size = 12;
	const iconSize = 24;
	const left = [
		{
			name: "About This Mart",
			content: <SettingsAbout />,
			icon: <MdOutlineDesktopMac size={iconSize} />,
		},
		{
			name: "AppleID",
			content: "AppleID",
			icon: <IoLogoApple size={iconSize} />,
			disabled: true,
		},
		{
			name: "Family Sharing",
			content: "Family",
			icon: <MdGroups2 size={iconSize} />,
			disabled: true,
		},
		"",
		{
			name: "Wi-Fi",
			content: "Wifi",
			icon: <IoIosWifi size={iconSize} />,
			disabled: true,
		},
		{
			name: "Bluetooth",
			content: "Blue",
			icon: <IoIosBluetooth size={iconSize} />,
			disabled: true,
		},
		{
			name: "Dock & Menu Bar",
			content: "Dock",
			icon: <BsWindowDock size={iconSize} />,
		},
		{
			name: "Desktop Settings",
			content: "Desktop",
			icon: <MdOutlineDesktopMac size={iconSize} />,
			disabled: true,
		},
		{
			name: "Notifications",
			content: "NOtification",
			icon: <IoIosNotifications size={iconSize} />,
			disabled: true,
		},
		{ name: "Focus", content: "Focus", icon: <IoMdMoon size={iconSize} /> },
		"",
		{
			name: "Passwords",
			content: "Pass",
			icon: <IoMdKey size={iconSize} />,
			disabled: true,
		},
		{
			name: "TouchID",
			content: "Touching",
			icon: <IoMdFingerPrint size={iconSize} />,
			disabled: true,
		},
		{
			name: "Security & Privacy",
			content: "Sec",
			icon: <BsFillShieldLockFill size={iconSize} />,
			disabled: true,
		},
	];

	const dispatch = useDispatch();
	const componentRef = useRef(null);
	const [hover, setHover] = useState(false);
	const [topBound, setTopBound] = useState(-100);
	const [active, setActive] = useState({
		name: "About This Mart",
		content: <SettingsAbout />,
		icon: <MdOutlineDesktopMac size={iconSize} />,
	});
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});
	useEffect(() => {
		const element = componentRef.current;

		if (element) {
			const width = element.clientWidth;
			const height = element.clientHeight;

			console.log(`Width: ${width}px`);
			console.log(`Height: ${height}px`);
			setPosition({
				x: (window.innerWidth - width) / 2,
				y: (window.innerHeight - height) / 2,
			});
			const temp = (window.innerHeight - height) / 2;
			// console.log(-temp);
			setTopBound(-temp);
		}
	}, []);
	const handleClick = (item) => {
		setActive(item);
	};

	const opacityProps = useSpring({ opacity: hover ? 1 : 0 });
	const scaleProps = useSpring({
		scale: hover ? 1.1 : 1,
		transform: hover ? "translateZ(1px)" : "translateZ(0px)",
	});
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
		{ bounds: { top: topBound } }
	);
	const transitions = useTransition(active, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0, position: "absolute" },
	});

	return (
		<animated.div
			style={props}
			className="relative w-10/12 h-4/5 text-sm max-w-4xl min-w-3xl"
			ref={componentRef}
		>
			<div className="absolute inset-0 backdrop-blur-md" />
			<animated.div className="text-white rounded-xl w-full h-full flex relative ">
				<div
					id="left"
					className="bg-zinc-900/70 w-5/12 flex flex-col rounded-l-xl pb-4 gap-2"
				>
					<div
						className="w-full pt-4 pb-7 pl-4 rounded-tl-xl relative"
						{...dragBind()}
						style={{ touchAction: "none" }}
					>
						<div
							className="flex gap-2 absolute px-1"
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
					<div className="px-4">
						{search && (
							<input
								className="focus:outline-none focus:ring-0 bg-zinc-800 rounded-md p-2 py-2 w-full"
								placeholder="Search (disabled)"
								disabled
							/>
						)}
					</div>
					<div className="pl-4 h-full">
						<Scrollbars style={{ height: "100%", width: "100%" }}>
							<div className="flex flex-col pr-4 mt-3 gap-0.5">
								{left.map((item, index) => {
									if (item) {
										return (
											<div
												style={{
													backgroundColor:
														active.name ===
														item.name
															? "rgba(0,0,0,0.1)"
															: "transparent",
												}}
												className="rounded-xl"
												key={index}
											>
												<ToolText
													name={item.name}
													icon={item.icon}
													onClick={() => {
														!item.disabled &&
															handleClick({
																name: item.name,
																content:
																	item.content,
																icon: item.icon,
															});
													}}
													disabled={
														item.disabled
															? true
															: false
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
							</div>
						</Scrollbars>
					</div>
				</div>
				<div
					id="right"
					className="bg-zinc-800 w-full rounded-r-xl flex flex-col pb-4 px-8"
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
		</animated.div>
	);
};

export default SettingsWindow;
