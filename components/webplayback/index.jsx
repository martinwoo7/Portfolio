import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { useHover } from "@use-gesture/react";
import { togglePlaying } from "../layoutSlice";
import { useDispatch, useSelector } from "react-redux";

const PlayContainer = ({ children }) => (
	<div className="overflow-hidden p-2 bg-black/10 rounded-full h-9 w-9 flex items-center justify-center">
		{children}
	</div>
);

const WebPlayback = () => {
	const [hovering, setHovering] = useState(false);
	const playing = useSelector((state) => state.layout.playing);
	const dispatch = useDispatch();

	const bind = useHover(({ hovering }) => {
		setHovering(hovering);
	});
	const props = useSpring({ scale: hovering ? 1.1 : 1 });
	useEffect(() => {}, []);

	return (
		<div className="flex items-center gap-2 grow">
			<img
				src="images/spider.webp"
				className="w-11 h-11"
				alt="Spider-Man: Across the Spider-Verse album cover"
			/>

			<div className="flex flex-col grow">
				<div className="text-white/80">{"Mona Lisa"}</div>
				<div className="text-white/30">{"Dominic Fike"}</div>
			</div>

			<button
				className="mr-2"
				onClick={() => dispatch(togglePlaying())}
				{...bind()}
			>
				{!playing ? (
					// <PlayContainer>
					<animated.div style={props}>
						<IoIosPlay className="text-white/80" size={24} />
					</animated.div>
				) : (
					// </PlayContainer>
					// <PlayContainer>
					<animated.div style={props}>
						<IoIosPause className="text-white/80" size={24} />
					</animated.div>

					// </PlayContainer>
				)}
			</button>
		</div>
	);
};

export default WebPlayback;
