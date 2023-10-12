import { MdOutlineDesktopMac } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import Switch from "../../../switch";
import Scrollbars from "react-custom-scrollbars-2";
import Clickable from "../../../clickable";

const SettingsAbout = () => {
	return (
		<>
			<div className="flex gap-7 items-center">
				<MdOutlineDesktopMac size={84} />
				<div className="flex flex-col">
					<p className="text-2xl font-medium mb-2">
						iMart
						<span className="text-sm ml-3 font-normal">
							24-inch | 2025
						</span>
					</p>
					<p className="font-medium">
						Chip
						<span className="ml-3 text-sm font-normal">
							Martin A1
						</span>
					</p>
					<p className="font-medium">
						Memory
						<span className="ml-3 text-sm font-normal">128 TB</span>
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-1">
						<div className="w-9 h-9 flex justify-center items-center bg-neutral-700 rounded-lg">
							<GiFruitBowl size={24} className="text-red-400" />
						</div>
						<div className="flex flex-col">
							<p className="text-md font-medium">FuitCare+</p>
							<p className="text-xs text-white/70">
								Expires: Feb 13, 2084
							</p>
						</div>
					</div>
					<Clickable text="Get Support" onClick={() => {}} />
				</div>
			</div>

			<div className="flex flex-col mt-2">
				<h2 className="text-lg font-medium">Storage</h2>
				<p className="text-sm">49 TB (67 TB Available)</p>
				<div className="w-full h-7 bg-zinc-700 mt-3 rounded-lg flex overflow-hidden gap-0.5">
					<div className="bg-yellow-500" style={{ width: "25%" }} />
					<div className="bg-orange-600" style={{ width: "10%" }} />
					<div className="bg-green-500" style={{ width: "8%" }} />
					<div className="bg-sky-500" style={{ width: "4%" }} />
					<div className="bg-slate-800" style={{ width: "3%" }} />
				</div>
				<div className="flex mt-3 ml-3 gap-7">
					<Clickable text="Manage..." onClick={() => {}} />
					<div className="flex gap-3 items-center">
						<Switch />
						Optimize Mart storage
					</div>
				</div>
			</div>
			<div className="flex flex-col mt-5 h-full">
				<h2 className="text-lg font-medium">Software</h2>
				<div className="pl-3 mt-4 h-full">
					{/* <Scrollbars style={{ height: "100%", width: "100%" }}> */}
					<div className="flex gap-6 ">
						<div className="relative p-0.5">
							<div className="z-10 w-6 h-6 bg-red-600 drop-shadow-lg box-shadow rounded-full absolute top-0 right-0 flex items-center justify-center text-regular overflow-hidden">
								<p className="w-full h-full flex justify-center items-center">
									1
								</p>
							</div>
							<div
								style={{
									backgroundImage: `url("https://products.ls.graphics/mesh-gradients/images/12.-Tumbleweed-p-130x130q80.jpeg")`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
								}}
								className="relative h-20 w-20 rounded-full bg-white border-white border-solid border-[3px]"
							></div>
						</div>
						<div className="flex flex-col">
							<h1 className="font-medium text-2xl">
								martOS{" "}
								<span className="font-light">
									Oosoyos
								</span>
							</h1>
							<p className="text-xs text-white/70">
								Version 26.10
							</p>
							<p className="ml-1 text-sm my-2">
								A Software Update is available for your Mart
								(martOS 26.11)
							</p>
							<div className="flex gap-4">
								<Clickable text="Update" onClick={() => {}} />
								<Clickable
									text="Learn More"
									onClick={() => {}}
								/>
								<Clickable text="Advanced" onClick={() => {}} />
							</div>
							<div className="flex gap-3 items-center mt-3">
								<Switch />
								Automatically keep my Mart up to date
							</div>
						</div>
					</div>
					{/* </Scrollbars> */}
				</div>
			</div>
		</>
	);
};
export default SettingsAbout;
