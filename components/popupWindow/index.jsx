import { useState, useEffect, useRef } from "react";
import { useDrag, useGesture, useHover } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { closeWindow } from "./windowSlice";
import { toggleMobile } from "../layoutSlice";
import Pressable from "../pressable";
import { useDispatch } from "react-redux";
// import RealTimeDate from "../realtime";
// import ToolItem from "../toolitem";
// import MobileBar from "../mobileBar";
import useMeasure from "react-use-measure";
import { IoMdClose, IoMdRemove } from "react-icons/io";
import { BiExpandAlt } from "react-icons/bi";

export const PopupWindow = ({ children, title, name, sizing }) => {
	const size = 12;
	const dispatch = useDispatch();
	const [dimensions, setDimensions] = useState(null);
	const [hover, setHover] = useState(false);
	const [mobile, setMobile] = useState(false);
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
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

	const rectRef = useRef();
	useEffect(() => {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		if (screenWidth < screenHeight) {
			setMobile(true);
		}
		setTimeout(() => {
			const rect = rectRef.current.getBoundingClientRect();
			console.log(rect);
			setDimensions(rect);
		}, 500);

		// setDimensions(rect.)
	}, []);

	useEffect(() => {
		const handleResize = () => {
			// setWindowWidth(window.innerWidth);
			const rect = rectRef.current.getBoundingClientRect();
			console.log(rect);
			setDimensions(rect);
		};

		// Attach the event listener
		window.addEventListener("resize", handleResize);

		// Call the event handler initially to set the initial window width
		handleResize();

		// Detach the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const [props, set] = useSpring(() => ({ x: position.x, y: position.y }));
	const dragBind = useDrag(
		({ down, movement: [mx, my], offset: [x, y] }) => {
			const newX = position.x + mx;
			const newY = position.y + my;

			const maxY = (window.innerHeight - dimensions.height - 60) / -2;
			console.log(maxY);
			if (!down) {
				if (newY < maxY) {
					setPosition({ x: newX, y: maxY });
				} else {
					setPosition({ x: newX, y: newY });
				}
			} else {
				set({ x: newX, y: newY < maxY ? maxY : newY });
			}
			// Ensure the component stays within the bounds
		}

		// figure out how to calculate the top bounds
		// probably something to do with the screenheight and the inital position
	);
	// TODO: Pass in certain h and w depending on the menu we're rendering

	return (
		<animated.div
			ref={rectRef}
			style={!mobile ? props : null}
			className={`w-full md:relative ${
				sizing === "sm"
					? "w-1/2"
					: sizing === "lg"
					? "w-11/12"
					: "w-3/4"
			}   h-full md:h-4/6 max-w-4xl min-w-2xl md:rounded-xl z-12 bg-slate-900 md:bg-transparent`}
		>
			<div className="hidden md:absolute md:inset-0 md:backdrop-blur-md rounded-xl" />
			<animated.div className="relative text-white rounded-xl md:bg-black/10 w-full h-full md:pt-2">
				<div
					className="hidden md:flex items-center mb-1 mt-10 md:mt-0"
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
								dispatch(toggleMobile());
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
					style={
						mobile
							? { height: "100%" }
							: { height: `calc(100% - 33px)` }
					}
					className="md:rounded-b-xl"
				>
					{/* <MobileBar colour={"bg-zinc-800"}/> */}
					{children}
				</div>
				{/* floating close button */}
				<Pressable
					onClick={() => {
						console.log("Closing ", name);
						dispatch(closeWindow(name));
						dispatch(toggleMobile());
					}}
					classes={
						"absolute right-5 bottom-5 p-2 bg-white rounded-full z-20 md:hidden"
					}
				>
					<IoMdClose size={24} className="text-black" />
				</Pressable>
			</animated.div>
		</animated.div>
	);
};
