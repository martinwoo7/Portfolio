import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { setVolume } from "../layoutSlice";

import {
	IoIosWifi,
	IoIosBluetooth,
	IoIosCloud,
	IoIosMoon,
	IoIosBonfire,
	IoIosDesktop,
} from "react-icons/io";

import SwitchItem from "./SwitchItem";
import Slider from "../slider";
import WebPlayback from "../webplayback";

const SwitchIcons = ({ children, active }) => {
	const classname = active
		? "overflow-hidden bg-blue-600 flex justify-center items-center rounded-full p-1 h-7 w-7"
		: "overflow-hidden bg-white/10 flex justify-center items-center rounded-full p-1 h-7 w-7";
	return <div className={classname}>{children}</div>;
};

// maybe consider context? Probably not needed tbh
const SwitchMenu = () => {
	return (
		<div className="relative bg-black/30 rounded-2xl flex flex-col p-2 gap-2 text-xs text-white/80 ">
			<div className="flex gap-2">
				<SwitchItem row={false}>
					<div className="flex gap-3 flex-col py-1 pr-4">
						<div className="flex gap-2 items-center">
							<SwitchIcons active>
								<IoIosWifi className="text-white" size={15} />
							</SwitchIcons>
							<div className="flex flex-col gap-1">
								<p>Wi-Fi</p>
								<p
									className="text-white/30"
									style={{
										fontSize: "0.7rem",
										lineHeight: "0.9rem",
									}}
								>
									Home
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<SwitchIcons active>
								<IoIosBluetooth
									className="text-white"
									size={15}
								/>
							</SwitchIcons>

							<div className="flex flex-col">
								<p>Bluetooth</p>
							</div>
						</div>
						<div className="flex gap-2 items-center">
							<SwitchIcons active>
								<IoIosCloud className="text-white" size={15} />
							</SwitchIcons>

							<div className="flex flex-col gap-1">
								<p>AirDrop</p>
								<p
									className="text-white/30"
									style={{
										fontSize: "0.7rem",
										lineHeight: "0.9rem",
									}}
								>
									Contacts Only
								</p>
							</div>
						</div>
					</div>
				</SwitchItem>
				<div className="flex flex-col gap-2">
					<SwitchItem row={false}>
						<div className="flex items-center gap-2 py-2">
							<SwitchIcons>
								<IoIosMoon
									className="text-black/60"
									size={18}
								/>
							</SwitchIcons>
							<div className="flex flex-col">
								<p>Do Not</p>
								<p>Disturb</p>
							</div>
						</div>
					</SwitchItem>

					<div className="flex flex-grow gap-2">
						<SwitchItem row={false}>
							<div className="flex flex-col items-center">
								<IoIosBonfire size={20} className="my-1" />

								<p>Keyboard</p>
								<p>Brightness</p>
							</div>
						</SwitchItem>
						<SwitchItem row={false}>
							<div className="flex flex-col items-center px-2">
								<IoIosDesktop size={20} className="my-1" />
								<p>Toggle</p>
								<p>Device</p>
							</div>
						</SwitchItem>
					</div>
				</div>
			</div>
			<div className="flex">
				<SwitchItem row={true}>
					<div className="flex flex-col gap-2 pb-1">
						<p>Display</p>
						<Slider purpose="display"/>
					</div>
				</SwitchItem>
			</div>
			<div className="flex flex-col">
				<SwitchItem row={true}>
					<div className="flex flex-col gap-2 pb-1">
						<p>Sound</p>
						<Slider purpose="sound"/>
					</div>
				</SwitchItem>
			</div>
			<div className="flex">
				<SwitchItem row={true}>
					<WebPlayback />
				</SwitchItem>
			</div>
		</div>
	);
};

export default SwitchMenu;
