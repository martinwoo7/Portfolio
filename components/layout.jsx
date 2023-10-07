import React, { Fragment, useEffect, useState } from "react";
import { Dock } from "./dock/Dock";
import { DockCard } from "./dock/DockCard";
import { DockDivider } from "./dock/DockDivider";
import { Card } from "./dock/Card";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useDispatch, useSelector } from "react-redux";
import { handleActive, unmount } from "./layoutSlice";
import { togglePlaying } from "./layoutSlice";

import moment from "moment/moment";
import ReactPlayer from "react-player";
import RealTimeDate from "./realtime";

import ToolItem from "./toolitem";
import ToolText from "./tooltext";
import ToolMenu from "./toolmenu";
import SwitchMenu from "./switchmenu";

import EditMenu from "./toolmenu/Edit";
import ViewMenu from "./toolmenu/View";
import WindowMenu from "./toolmenu/Window";
import HelpMenu from "./toolmenu/Help";
import FileMenu from "./toolmenu/File";
import FinderMenu from "./toolmenu/Finder";
import MenuMenu from "./toolmenu/Menu";
import ContextMenu from "./contextmenu";

import calico from "../public/images/calico.jpg";
import cathedral from "../public/images/cathedral.jpg";

const GRADIENTS = [
	{
		src: "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
		title: "Home",
	},
	{
		src: "https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg",
		title: "About",
	},
	{
		src: "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
		title: "Resume",
	},
	{
		src: "https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg",
		title: "Projects",
	},
	{
		src: "https://products.ls.graphics/mesh-gradients/images/12.-Tumbleweed-p-130x130q80.jpeg",
		title: "Art",
	},
	{
		src: "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
		title: "Settings",
	},
	null,
	{
		src: "https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut-p-130x130q80.jpeg",
		title: "Source",
	},
];

const Layout = ({ children }) => {
	const [dockVisible, setDockVisible] = useState(false);
	const [activeButton, setActiveButton] = useState("");

	/* context menu */
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});
	const [showContextMenu, setShowContextMenu] = useState(false);
	const handleContextMenu = (e) => {
		e.preventDefault(); // Prevent the default context menu
		const menuWidth = 215;
		const menuHeight = 290;
		const screenWidth = window.innerWidth - 20;
		const screenHeight = window.innerHeight - 20;
		const x = e.clientX;
		const y = e.clientY;
		const clickX = Math.min(x, screenWidth - menuWidth);
		const clickY = Math.min(y, screenHeight - menuHeight);

		setContextMenuPosition({ x: clickX, y: clickY });
		setShowContextMenu(true);
	};

	// Close the context menu
	const closeContextMenu = () => {
		setShowContextMenu(false);
	};
	/* context menu end */

	const buttonData = [
		{ name: "Menu", content: <MenuMenu /> },
		{ name: "Finder", content: <FinderMenu /> },
		{ name: "File", content: <FileMenu /> },
		{ name: "Edit", content: <EditMenu /> },
		{ name: "View", content: <ViewMenu /> },
		{ name: "Window", content: <WindowMenu /> },
		{ name: "Help", content: <HelpMenu /> },
	];

	const right = [
		{ type: "icon", name: "Battery" },
		{ type: "icon", name: "Wifi" },
		{ type: "icon", name: "Search" },
		{ type: "icon", name: "Tool" },
		{ type: "date", date: moment() },
		{ type: "time", time: moment() },
	];

	// Redux states
	const mounted = useSelector((state) => state.layout.mounted);
	const playing = useSelector((state) => state.layout.playing);
	const volume = useSelector((state) => state.layout.volume);
	const active = useSelector((state) => state.layout.active);
	const unlocked = useSelector((state) => state.layout.unlocked);

	const dispatch = useDispatch();

	const dockStyle = useSpring({
		transform: dockVisible ? "translateY(0%)" : "translateY(80%)",
	});

	const getButtonTransitions = (buttonName) => {
		return useTransition(activeButton === buttonName, {
			from: {
				opacity: 0,
				// transform: "translateY(-10px)",
			},
			enter: {
				opacity: 1,
				// transform: "translateY(0px)",
			},
			leave: {
				opacity: 0,
				// transform: "translateY(-10px)",
			},
		});
	};
	const buttonClickHandler = (buttonName) => {
		if (activeButton === buttonName) {
			// If the same button is clicked again, close its menu
			setActiveButton("");
		} else {
			// Close the currently active button's menu and open the new one
			setActiveButton(buttonName);
		}
	};
	const buttonTransitions = buttonData.map((button) => {
		return getButtonTransitions(button.name);
	});

	const menuTransitions = useTransition(mounted, {
		from: { opacity: 0, transform: "translateY(-10px)" },
		enter: { opacity: 1, transform: "translateY(0px)" },
		leave: { opacity: 0, transform: "translateY(-10px)" },
	});

	const barStyle = useSpring({ opacity: unlocked ? 1 : 0 });

	const handleMouseMove = (event) => {
		const { _, clientY } = event;
		if (clientY <= window.innerHeight - 130) {
			if (dockVisible) setDockVisible(false);
		} else {
			if (!dockVisible) setDockVisible(true);
		}
	};

	// useEffects
	useEffect(() => {
		// reset everything on initial load
		dispatch(unmount());
	}, []);

	useEffect(() => {
		if (unlocked) {
			setDockVisible(false);
		} else {
			setDockVisible(true);
		}
	}, [unlocked]);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			// console.log(!event.target.closest(".menu-container"))
			if (active && !event.target.closest(".menu-container")) {
				setActiveButton("");
				dispatch(handleActive(""));
			}
			if (
				mounted &&
				!event.target.closest(".switch-menu") &&
				!event.target.closest(".tool-icon")
			) {
				dispatch(unmount());
			}
		};
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [active, mounted]);

	useEffect(() => {
		const handleClick = (event) => {
			if (showContextMenu && !event.target.closest(".context-menu")) {
				closeContextMenu();
			}
		};
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [showContextMenu]);

	return (
		<div onContextMenu={handleContextMenu} className="h-screen">
			<div
				className="relative bg-zinc-950 flex justify-center items-center h-screen p-2 z-20"
				onMouseMove={unlocked ? handleMouseMove : null}
			>
				{/* 
					bg-gradient-to-r from-cyan-500 to-blue-500 below
					bg-gradient-to-r from-purple-500 to-pink-500
				*/}
				<div
					// style={{
					// 	backgroundImage: `url(${calico.src})`,
					// 	backgroundPosition: "center",
					// 	backgroundSize: "cover",
					// 	backgroundRepeat: "no-repeat",
					// }}
					className="overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col relative rounded-2xl h-full w-full z-20"
				>
					<div className="flex w-full h-10 bg-black/20 justify-between items-center px-3">
						<div className="flex gap-2 items-center">
							{buttonData.map((tab, index) => {
								return (
									<Fragment key={index}>
										<div
											className="text-white text-sm relative menu-container"
											onClick={() => {
												buttonClickHandler(tab.name);
												dispatch(
													handleActive(tab.name)
												);
											}}
										>
											<ToolText name={tab.name} />
											{buttonTransitions[index](
												(style, item) =>
													item && (
														<animated.div
															style={style}
															className="absolute mt-2 z-40 backdrop-blur-lg rounded-xl"
														>
															<ToolMenu>
																{tab.content}
															</ToolMenu>
														</animated.div>
													)
											)}
										</div>
									</Fragment>
								);
							})}
						</div>
						<div className="w-14 h-5">
							<ReactPlayer
								url={"audio/spider.flac"}
								playing={playing}
								width="100%" // Set the width to your desired value
								height="100%"
								volume={volume}
								onEnded={() => dispatch(togglePlaying())}
							/>
						</div>
						<div className="flex gap-2 items-center">
							{right.map((tab, index) => {
								if (tab.type === "icon") {
									if (tab.name === "Tool") {
										return (
											<ToolItem
												name={tab.name}
												key={index}
												className="tool-icon"
											/>
										);
									} else {
										return (
											<ToolItem
												name={tab.name}
												key={index}
											/>
										);
									}
								} else if (tab.type === "date") {
									return (
										<RealTimeDate
											type={"date"}
											key={index}
										/>
									);
								} else if (tab.type === "time") {
									return (
										<RealTimeDate
											type={"time"}
											key={index}
										/>
									);
								}
							})}
						</div>
					</div>

					{menuTransitions(
						(prop, item) =>
							item && (
								<animated.div
									className="absolute right-0 top-11 right-1 z-40 backdrop-blur-lg"
									style={prop}
								>
									<SwitchMenu className="switch-menu" />
								</animated.div>
							)
					)}

					{children}

					<animated.div
						className={
							"absolute flex bottom-1 w-full justify-center flex-col items-center z-10"
						}
						style={dockStyle}
					>
						<animated.div
							style={barStyle}
							className="bg-black/40 mb-5 h-1 w-7 rounded-full"
						/>
						{/* <IoIosArrowUp size="2rem" className="text-white mb-4" /> */}
						<div
							style={{ width: "fit-content" }}
							className="relative z-10"
						>
							<Dock>
								{GRADIENTS.map((item, index) =>
									item ? (
										<DockCard
											key={index}
											value={item.title}
											src={item.src}
										>
											<Card src={item.src} />
										</DockCard>
									) : (
										<DockDivider key={index} />
									)
								)}
							</Dock>
						</div>
					</animated.div>
					{showContextMenu && (
						<ContextMenu
							x={contextMenuPosition.x}
							y={contextMenuPosition.y}
							onClose={closeContextMenu}
							className="context-menu"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Layout;
