import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { useHover } from "@use-gesture/react";
import ReactPlayer from "react-player";

const PlayContainer = ({ children }) => (
	<div className="overflow-hidden p-2 bg-black/10 rounded-full h-9 w-9 flex items-center justify-center">
		{children}
	</div>
);

const WebPlayback = () => {
	const [is_paused, setPaused] = useState(false);
	const [hovering, setHovering] = useState(false);

	const bind = useHover(({ hovering }) => {
		setHovering(hovering);
	});
	const props = useSpring({ scale: hovering ? 1.1 : 1 });
	useEffect(() => {}, []);

	const togglePlay = () => {
		setPaused(!is_paused);
	};

	return (
		<div className="flex items-center gap-2 grow">
			<img
				src="images/album.jpg"
				className="w-11 h-11"
				alt="Go Further In Lightness"
			/>

			<div className="flex flex-col grow">
				<div className="text-white/80">{"Achilles Come Down"}</div>
				<div className="text-white/30">{"Gang of Youths"}</div>
			</div>
			<div className="w-14 h-5">
				<ReactPlayer
					url={"audio/achilles.flac"}
					playing={is_paused}
					width="100%" // Set the width to your desired value
					height="100%"
					volume={0.3}
				/>
			</div>

			<button className="mr-2" onClick={togglePlay} {...bind()}>
				{!is_paused ? (
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
