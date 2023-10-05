import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTransition, animated } from "@react-spring/web";

import PopupWindow from "../components/popupWindow";
import AboutWindow from "../components/windows/About";
import ResumeWindow from "../components/windows/Resume";
import WallpaperWindow from "../components/windows/Wallpaper";

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

		// Add more items and corresponding components as needed
	};

	// useEffect(() => {
	// 	const height = window.innerHeight;
	// 	const width = window.innerWidth;
	// }, [])
	const activeWindows = useSelector((state) => state.window.opened);
	const transitions = useTransition(activeWindows, {
		from: { transform: "scale(1)", opacity: 1 },
		enter: { transform: "scale(1)", opacity: 1 },
		leave: { transform: "scale(0.2)", opacity: 0 },
	});

	return (
		<div
			className="rounded-b-xl overflow-hidden flex"
			style={{ height: position.height - 50, width: position.width - 16 }}
		>
			{transitions((props, item) => {
				const componentToRender = componentMapping[item];
				return (
					item && (
						<animated.div style={props} className={"w-full"}>
							{componentToRender}
						</animated.div>
					)
				)
			})}
			{/* <animated.div className={"w-full"}>
				<WallpaperWindow name="Wallpapers" />
				<AboutWindow name="About" />
			</animated.div> */}
		</div>
	);
};
export default Home;
