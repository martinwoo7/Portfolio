import PopupWindow from "../../popupWindow";
import Scrollbars from "react-custom-scrollbars-2";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import { useState } from "react";

const WallpaperWindow = ({ name }) => {
	return (
		<PopupWindow title="Wallpapers" name={name}>
			<Scrollbars style={{width: '100%', height: "100%"}}>
				<div className="text-white bg-zinc-900 w-full h-full rounded-b-xl p-3 px-10 flex flex-col items-center">
					<div className="flex flex-col items-center w-96 gap-6">
						<div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-72 rounded-2xl"></div>
						<div className="w-full ">
							<h2 className="text-3xl">Blue Gradient</h2>
							<p className="text-md text-white/70">
								Gradient Wallpaper
							</p>
						</div>
					</div>
				</div>
			</Scrollbars>
		</PopupWindow>
	);
};

export default WallpaperWindow;
