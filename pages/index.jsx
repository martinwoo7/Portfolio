import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTransition, animated } from "@react-spring/web";

import AboutWindow from "../components/windows/About";
import ResumeWindow from "../components/windows/Resume";
import WallpaperWindow from "../components/windows/Wallpaper";
import { PopupWindow } from "../components/popupWindow";
import SettingsWindow from "../components/windows/SettingsWindow";

const Home = () => {
	const [position, setPosition] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	const componentMapping = {
		About: <AboutWindow name="About" />,
		Resume: <ResumeWindow name="Resume" />,
		Projects: <PopupWindow title="Projects" name="Projects" />,
		Wallpapers: <WallpaperWindow name="Wallpapers" />,
		Settings: <SettingsWindow name="Settings"/>

		// Add more items and corresponding components as needed
	};

	const activeWindows = useSelector((state) => state.window.opened);
	const transitions = useTransition(activeWindows, {
		from: { transform: "scale(1)", opacity: 1 },
		enter: { transform: "scale(1)", opacity: 1 },
		leave: { transform: "scale(0.2)", opacity: 0 },
	});

	return (
		<div
			className="rounded-b-xl overflow-hidden flex relative"
			style={{ height: position.height - 50, width: position.width - 16 }}
		>
			{/* {transitions((props, item) => {
				const componentToRender = componentMapping[item];
				return (
					item && (
						<animated.div style={props} className={"w-full absolute"}>
							{componentToRender}
						</animated.div>
					)
				)
			})} */}
			<animated.div className={"w-full absolute"}>
				{/* <WallpaperWindow name="Wallpapers" /> */}
				{/* <AboutWindow name="About" /> */}
				<SettingsWindow name="Settings"/>
			</animated.div>
		</div>
	);
};
export default Home;
