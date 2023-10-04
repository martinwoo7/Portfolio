import React, { Fragment, useEffect, useState } from "react";
import { Dock } from "./dock/Dock";
import { DockCard } from "./dock/DockCard";
import { DockDivider } from "./dock/DockDivider";
import { Card } from "./dock/Card";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useDispatch, useSelector } from "react-redux";
import { handleActive, unmount } from "./layoutSlice";

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
		title: "Random",
	},
	null,
	{
		src: "https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut-p-130x130q80.jpeg",
		title: "Settings",
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
		console.log(e);
		e.preventDefault(); // Prevent the default context menu
		const clickX = e.clientX;
		const clickY = e.clientY;
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

	const mounted = useSelector((state) => state.layout.mounted);
	const playing = useSelector((state) => state.layout.playing);
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

	const handleMouseMove = (event) => {
		const { _, clientY } = event;
		if (clientY <= window.innerHeight - 130) {
			if (dockVisible) setDockVisible(false);
		} else {
			if (!dockVisible) setDockVisible(true);
		}
	};

	// spotify integration
	// useEffect(() => {
	// 	const base64Credentials = Buffer.from(
	// 		`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
	// 	).toString("base64");

	// 	const getAccessToken = async () => {
	// 		try {
	// 			const tokenResponse = await axios.post(
	// 				"https://accounts.spotify.com/api/token",
	// 				querystring.stringify({
	// 					grant_type: "client_credentials",
	// 				}),
	// 				{
	// 					headers: {
	// 						"Content-Type": "application/x-www-form-urlencoded",
	// 						Authorization: `Basic ${base64Credentials}`,
	// 					},
	// 				}
	// 			);
	// 			const { access_token, refresh_token } = tokenResponse.data;
	// 			console.log("Access Token:", access_token);
	// 			setToken(access_token);

	// 			const topTracks = await getTrack(
	// 				"22TntnVO3lQNDR5nsvxGRs",
	// 				access_token
	// 			);
	// 			console.log(topTracks);
	// 		} catch (error) {
	// 			console.error("Error:", error);
	// 		}
	// 	};
	// 	getAccessToken();
	// }, []);

	useEffect(() => {
		// reset everything on initial load
		dispatch(unmount());
	}, []);
	const active = useSelector((state) => state.layout.active);
	useEffect(() => {
		const handleOutsideClick = (event) => {
			// console.log(!event.target.closest(".menu-container"))
			if (active && !event.target.closest(".menu-container")) {
				setActiveButton("");
				dispatch(handleActive(""));
			}
		};
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [active]);

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
		<div onContextMenu={handleContextMenu} className="h-full">
			<div
				className="relative bg-zinc-950 flex justify-center items-center h-screen p-2 z-20"
				onMouseMove={handleMouseMove}
			>
				{/* bg-zinc-950 below */}
				<div className="flex flex-col relative rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-full z-20">
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
															className="absolute mt-1.5 z-40 backdrop-blur-lg rounded-xl"
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
								volume={0.3}
							/>
						</div>
						<div className="flex gap-2 items-center">
							{right.map((tab, index) => {
								if (tab.type === "icon") {
									return (
										<ToolItem name={tab.name} key={index} />
									);
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
									<SwitchMenu />
								</animated.div>
							)
					)}

					{children}

					<animated.div
						className={
							"fixed flex bottom-3 w-full justify-center flex-col items-center z-10"
						}
						style={dockStyle}
					>
						<div className="bg-black/40 mb-6 h-1 w-7 rounded-full" />

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
