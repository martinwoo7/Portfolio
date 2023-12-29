import { useEffect, useState } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { PopupWindow } from "../../popupWindow";
import useMeasure from "react-use-measure";
import MobileBar from "../../mobileBar";

const Websites = [
	{ title: "one" },
	{ title: "two" },
	{ title: "three" },
	{ title: "four" },
];
const Software = [{ title: "first" }, { title: "second" }, { title: "third" }];

const ProjectWindow = ({ name }) => {
	const [displayWebsites, setDisplayWebsites] = useState({
		display: false,
		content: { title: "One" },
	});
	const handleWebsiteClick = (clicked) => {
		if (displayWebsites.content === clicked && displayWebsites.display) {
			setDisplayWebsites({
				...displayWebsites,
				display: false,
			});
		} else {
			if (!displayWebsites.display) {
				setDisplayWebsites({ display: true, content: clicked });
			} else {
				setDisplayWebsites({ ...displayWebsites, content: clicked });
			}
		}
	};

	const [displaySoftware, setDisplaySoftware] = useState({
		display: false,
		content: { title: "first" },
	});
	const handleSoftwareClick = (clicked) => {
		if (displaySoftware.content === clicked && displaySoftware.display) {
			setDisplaySoftware({
				...displaySoftware,
				display: false,
			});
		} else {
			if (!displaySoftware.display) {
				setDisplaySoftware({ display: true, content: clicked });
			} else {
				setDisplaySoftware({ ...displaySoftware, content: clicked });
			}
		}
	};

	const { height: webHeight, opacity: webOpacity } = useSpring({
		from: { height: 0, opacity: 0 },
		to: {
			height: displayWebsites.display ? 230 : 0,
			opacity: displayWebsites.display ? 1 : 0,
		},
	});

	const { height: softHeight, opacity: softOpacity } = useSpring({
		from: { height: 0, opacity: 0 },
		to: {
			height: displaySoftware.display ? 230 : 0,
			opacity: displaySoftware.display ? 1 : 0,
		},
	});

	return (
		<PopupWindow title="Projects" name={name}>
			<div className="h-full bg-zinc-900 md:rounded-b-xl md:px-10">
				<MobileBar />
				<div className="px-8 overflow-y-scroll h-full overflow-y-hidden">
					<p className="text-xl font-semibold">Projects</p>
					<div className="my-6">
						<p>Websites</p>
						<div className="flex overflow-x-scroll gap-4 mt-2 overflow-hidden">
							{Websites.map((items, index) => {
								return (
									<div
										className="bg-pink-500 h-24 w-36 rounded-xl flex-shrink-0"
										key={index}
										onClick={() =>
											handleWebsiteClick(items)
										}
									>
										{items.title}
									</div>
								);
							})}
						</div>

						<animated.div
							className="flex flex-col mt-5"
							style={{
								opacity: webOpacity,
								height: webHeight,
							}}
						>
							<div className="w-full h-48 bg-green-500 rounded-xl"></div>
							<div>
								<p>{displayWebsites.content.title}</p>
							</div>
						</animated.div>
					</div>
					<div className="my-6">
						<p>Software</p>
						<div className="flex overflow-x-scroll gap-4 mt-2 overflow-hidden">
							{Software.map((items, index) => {
								return (
									<div
										className="bg-blue-500 h-24 w-36 rounded-xl flex-shrink-0"
										key={index}
										onClick={() =>
											handleSoftwareClick(items)
										}
									>
										{items.title}
									</div>
								);
							})}
						</div>
						<animated.div
							className="flex flex-col mt-5"
							style={{
								opacity: softOpacity,
								height: softHeight,
							}}
						>
							<div className="w-full h-48 bg-purple-500 rounded-xl"></div>
							<div>
								<p>{displaySoftware.content.title}</p>
							</div>
						</animated.div>
					</div>
				</div>
			</div>
		</PopupWindow>
	);
};

export default ProjectWindow;
