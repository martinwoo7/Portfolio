import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated, useSpring } from "@react-spring/web";
import { openWindow } from "../components/popupWindow/windowSlice";

import AboutWindow from "../components/windows/About";
const ResumeWindow = dynamic(() => import("../components/windows/Resume"), {
	ssr: false,
});
// import ResumeWindow from "../components/windows/Resume";
import WallpaperWindow from "../components/windows/Wallpaper";
import { PopupWindow } from "../components/popupWindow";
import ProjectWindow from "../components/windows/Projects";
import SettingsWindow from "../components/windows/SettingsWindow";
import ArtWindow from "../components/windows/Art";
import Pressable from "../components/pressable";
import Clock from "../components/clock";

import { FaCode } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { SiAppstore } from "react-icons/si";
import { toggleMobile } from "../components/layoutSlice";

const ITEMS = [
	{ name: "Clock", size: "big", icon: <FaCode /> },
	{
		name: "App Store",
		size: "small",
		icon: <SiAppstore size={32} className="text-white" />,
	},
	{
		name: "Settings",
		size: "small",
		icon: <IoSettingsSharp size={32} className="text-white" />,
	},
	{
		name: "Source Code",
		size: "small",
		icon: <FaCode size={32} className="text-white" />,
	},
];
const Home = () => {
	const dispatch = useDispatch();
	const componentMapping = {
		About: <AboutWindow name="About" />,
		Resume: <ResumeWindow name="Resume" />,
		Projects: <ProjectWindow name="Projects" />,
		Wallpapers: <WallpaperWindow name="Wallpapers" />,
		Settings: <SettingsWindow name="Settings" />,
		Art: <ArtWindow name="Art" />,

		// Add more items and corresponding components as needed
	};

	const activeWindows = useSelector((state) => state.window.opened);
	// the transformations should be different dependingon mobile or desktop
	const transitions = useTransition(activeWindows, {
		from: { transform: "scale(0.2)", opacity: 0 },
		enter: { transform: "scale(1)", opacity: 1 },
		leave: { transform: "scale(0.2)", opacity: 0 },
	});

	const handleClick = (name) => {
		if (name === "Source Code") {
			const urlToOpen = "https://github.com/martinwoo7/Portfolio";
			window.open(urlToOpen, "_blank");
		} else {
			console.log("Opening", name);
			dispatch(openWindow(name));
			dispatch(toggleMobile());
		}
	};
	return (
		<div
			className="md:rounded-b-xl md:overflow-hidden flex relative w-full h-full"
			style={
				{
					// height: window.innerHeight - 50,
					// width: window.innerWidth - 16,
				}
			}
		>
			{transitions((props, item) => {
				const componentToRender = componentMapping[item];
				return (
					item && (
						<animated.div
							style={props}
							className="w-full h-full absolute z-10 flex justify-center items-center"
						>
							{componentToRender}
						</animated.div>
					)
				);
			})}
			{/* <animated.div className={"w-full absolute h-full"} style={props}>
				<WallpaperWindow name="Wallpapers" />
				<AboutWindow name="About" />
				<SettingsWindow name="Settings" />
			</animated.div> */}

			{/* grid for mobile */}
			<div className="mx-3 my-3 w-full pt-10 md:hidden">
				<div className="h-full w-full grid grid-cols-4 auto-rows-min lg:grid-cols-11 min-[1125px]:grid-cols-12">
					{ITEMS.map((item, index) => {
						if (item.size === "big") {
							return (
								<div
									className="col-span-2 row-span-2 flex flex-col items-center pt-1"
									key={index}
								>
									<Pressable>
										<div className="rounded-2xl bg-cover bg-[url('https://products.ls.graphics/mesh-gradients/images/41.-Tonys-Pink_1.jpg')] w-[8.5rem] aspect-square">
											<div className="flex justify-center items-center h-full">
												{<Clock />}
											</div>
										</div>
									</Pressable>
									<p className="text-white text-sm mt-1">
										{item.name}
									</p>
								</div>
							);
						} else {
							return (
								<div
									className="col-span-1 row-span-1 flex flex-col items-center pt-1"
									key={index}
								>
									<Pressable
										onClick={() => {
											handleClick(item.name);
										}}
										classes="flex justify-center rounded-2xl bg-cover bg-[url('https://products.ls.graphics/mesh-gradients/images/34.-Mauve_1.jpg')] w-[3.45rem] aspect-square z-auto"
									>
										<div className="flex justify-center items-center">
											{item.icon}
										</div>
									</Pressable>

									<p className="text-white text-sm mt-1">
										{item.name}
									</p>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
};
export default Home;
