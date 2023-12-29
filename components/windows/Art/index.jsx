import { useEffect, useRef, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { clamp } from "lodash";
import { useDrag } from "@use-gesture/react";
import Image from "next/image";
import { PopupWindow } from "../../popupWindow";
import MobileBar from "../../mobileBar";

const pages = ["/images/disney.png", "/images/album.png", "/images/card.png"];

const content = [
	{
		title: "Intellectually Distinct Magical Castle",
		content: "Hmm? This castle looks familiar...",
		alt: "Painting of the Disney Castle",
		date: "2021 | Adobe Photoshop",
	},
	{
		title: "Somebody I Used to Know",
		content:
			"I created this as part of a gift for a friend. \
            This painting serves as the album image for an acrylic album.",
		alt: "Painting of a woman",
		date: "2021 | Adobe Photoshop",
		landscape: true,
	},
	{
		title: "Ticket to Discounts",
		content:
			"I made this design for my university culture club's membership card. \
            The card was made of a translucent plastic. \
            This is a joke on the famous Hong Kong 'pineapple bun'.",
		alt: "Painting of a membership card ",
		date: "2020 | Adobe Photoshop",
	},
];

const ArtWindow = ({ name }) => {
	const index = useRef(0);
	const [about, setAbout] = useState(content[index.current]);

	// is there a way to delay the use measure?
	const [width, setWidth] = useState(0);
	useEffect(() => {
		setWidth(window.innerWidth);
	}, []);
	const [props, api] = useSprings(
		pages.length,
		(i) => ({
			x: i * width,
			scale: width === 0 ? 0 : 1,
			display: "block",
		}),
		[width]
	);
	const bind = useDrag(
		({ active, movement: [mx], direction: [xDir], cancel }) => {
			if (active && Math.abs(mx) > width / 2) {
				index.current = clamp(
					index.current + (xDir > 0 ? -1 : 1),
					0,
					pages.length - 1
				);
				setAbout(content[index.current]);
				cancel();
			}
			api.start((i) => {
				if (i < index.current - 1 || i > index.current + 1)
					return { display: "none" };
				const x = (i - index.current) * width + (active ? mx : 0);
				const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
				return { x, scale, display: "block" };
			});
		}
	);

	return (
		<PopupWindow title="Art" name={name} sizing="lg">
			<div className="w-full h-full relative flex flex-col md:flex-row bg-zinc-800 rounded-b-xl md:pt-0">
				<MobileBar colour={"bg-zinc-800"} />
				<div className="rounded-xl relative w-full md:w-4/6 h-full overflow-hidden">
					{props.map(({ x, display, scale }, i) => (
						<animated.div
							{...bind()}
							key={i}
							style={{ display, x, touchAction: "none" }}
							className="absolute z-10 w-full h-full"
						>
							<animated.div
								className="w-full h-full flex justify-center"
								style={{
									touchAction: "none",
									scale,
								}}
							>
								<div className="relative rounded-xl overflow-hidden my-6 mx-3 flex justify-center">
									<Image
										src={pages[i]}
										alt={about.alt}
										width={0}
										height={0}
										sizes="100vw"
										style={{
											height: "100%",
											width: "auto",
											pointerEvents: "none",
										}}
										className="rounded-xl"
									/>
								</div>
							</animated.div>
						</animated.div>
					))}
				</div>
				<div className="w-full md:w-2/6 h-full relative z-20 flex flex-col p-3 px-8 md:pr-5 gap-2">
					<div className="bg-zinc-900 p-5 h-full rounded-xl">
						<h1 className="text-3xl">{about.title}</h1>
						<p className="text-lg md:mx-3">{about.date}</p>
						<p className="md:mx-3 mt-6">{about.content}</p>
					</div>
				</div>
			</div>
		</PopupWindow>
	);
};

export default ArtWindow;
