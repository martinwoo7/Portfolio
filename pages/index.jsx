import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTransition, animated, useSpring } from "@react-spring/web";

import AboutWindow from "../components/windows/About";
import ResumeWindow from "../components/windows/Resume";
import WallpaperWindow from "../components/windows/Wallpaper";
import { PopupWindow } from "../components/popupWindow";
import SettingsWindow from "../components/windows/SettingsWindow";

const Home = () => {
	const componentMapping = {
		About: <AboutWindow name="About" />,
		Resume: <ResumeWindow name="Resume" />,
		Projects: <PopupWindow title="Projects" name="Projects" />,
		Wallpapers: <WallpaperWindow name="Wallpapers" />,
		Settings: <SettingsWindow name="Settings" />,

		// Add more items and corresponding components as needed
	};

	const activeWindows = useSelector((state) => state.window.opened);
	const transitions = useTransition(activeWindows, {
		from: { transform: "scale(1)", opacity: 1 },
		enter: { transform: "scale(1)", opacity: 1 },
		leave: { transform: "scale(0.2)", opacity: 0 },
	});

	const props = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { delay: 500 },
	});
	return (
		<div
			className="rounded-b-xl overflow-hidden flex relative w-full h-full"
			style={{
				// height: window.innerHeight - 50,
				// width: window.innerWidth - 16,
			}}
		>
			{/* {transitions((props, item) => {
				const componentToRender = componentMapping[item];
				return (
					item && (
						<animated.div style={props} className={"w-full h-full absolute"}>
							{componentToRender}
						</animated.div>
					)
				)
			})} */}
			<animated.div className={"w-full absolute h-full"} style={props}>
				{/* <WallpaperWindow name="Wallpapers" /> */}
				{/* <AboutWindow name="About" /> */}
				<SettingsWindow name="Settings" />
			</animated.div>
		</div>
	);
};
export default Home;
