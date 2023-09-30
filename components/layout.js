import React, { useEffect, useState } from "react";
import { Dock } from "./dock/Dock";
import { DockCard } from "./dock/DockCard";
import { DockDivider } from "./dock/DockDivider";
import { Card } from "./dock/Card";
import moment from "moment/moment";
import querystring from "querystring";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import RealTimeDate from "./realtime";
import ToolItem from "./toolitem";
import ToolText from "./tooltext";
import SwitchMenu from "./switchmenu";
import axios from "axios";

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

const items = ["Messages", "File", "Edit", "View", "Window", "Help"];
const right = [
	{ type: "icon", name: "Battery" },
	{ type: "icon", name: "Wifi" },
	{ type: "icon", name: "Search" },
	{ type: "icon", name: "Tool" },
	{ type: "date", date: moment() },
	{ type: "time", time: moment() },
];

async function fetchWebApi(endpoint, method, token) {
	const res = await fetch(`https://api.spotify.com/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method,
		// body: JSON.stringify(body),
	});
	return await res.json();
}

async function getTrack(trackId, token) {
	return await fetchWebApi(`v1/tracks/${trackId}`, "GET", token);
}

const Layout = ({ children }) => {
	const [token, setToken] = useState("");
	const [dockVisible, setDockVisible] = useState(false);
	const dockStyle = useSpring({
		transform: dockVisible ? "translateY(0%)" : "translateY(80%)",
	});

	const handleMouseMove = (event) => {
		const { _, clientY } = event;
		if (clientY <= window.innerHeight - 130) {
			if (dockVisible) setDockVisible(false);
		} else {
			if (!dockVisible) setDockVisible(true);
		}
	};

	useEffect(() => {
		const base64Credentials = Buffer.from(
			`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
		).toString("base64");

		const getAccessToken = async () => {
			try {
				const tokenResponse = await axios.post(
					"https://accounts.spotify.com/api/token",
					querystring.stringify({
						grant_type: "client_credentials",
					}),
					{
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							Authorization: `Basic ${base64Credentials}`,
						},
					}
				);
				const { access_token, refresh_token } = tokenResponse.data;
				console.log("Access Token:", access_token);
				setToken(access_token);

				const topTracks = await getTrack(
					"22TntnVO3lQNDR5nsvxGRs",
					access_token
				);
				console.log(topTracks);
			} catch (error) {
				console.error("Error:", error);
			}
		};
		getAccessToken();
	}, []);

	return (
		<div
			className="bg-zinc-950 flex justify-center items-center h-screen p-2"
			onMouseMove={handleMouseMove}
		>
			{/* bg-zinc-950 below */}
			<div className="relative rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-full">
				<div className="flex w-full h-10 bg-black/20 justify-between items-center px-3">
					<div className="flex gap-2 items-center">
						{items.map((tab, index) => (
							<div className="text-white text-sm" key={index}>
								<ToolText name={tab} />
							</div>
						))}
					</div>
					<div className="flex gap-2 items-center">
						{right.map((tab, index) => {
							if (tab.type === "icon") {
								return (
									// <div className="text-white rounded-xl bg-[#262626] p-2">
									// 	<IconMapper type={tab.name} size={18} />
									// </div>
									<ToolItem name={tab.name} key={index} />
								);
							} else if (tab.type === "date") {
								return (
									<RealTimeDate type={"date"} key={index} />
								);
							} else if (tab.type === "time") {
								return (
									<RealTimeDate type={"time"} key={index} />
								);
							}
						})}
					</div>
				</div>

				{/* add animation to mount and unmount */}
				<animated.div className="absolute right-0 top-11 right-1">
					<SwitchMenu token={token} />
				</animated.div>
				<div>{children}</div>

				<animated.div
					className={"fixed left-1/2 bottom-3"}
					style={dockStyle}
				>
					<div className="bg-black/40 mb-6 h-1 w-7 rounded-full" />
					{/* <IoIosArrowUp size="2rem" className="text-white mb-4" /> */}
					<Dock>
						{GRADIENTS.map((item, index) =>
							item ? (
								<DockCard key={index} value={item.title}>
									<Card src={item.src} />
								</DockCard>
							) : (
								<DockDivider key={index} />
							)
						)}
					</Dock>
				</animated.div>
			</div>
		</div>
	);
};

export default Layout;
