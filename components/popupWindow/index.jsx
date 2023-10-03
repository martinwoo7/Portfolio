import { useState, useRef } from "react";
import { useDrag, useHover } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import { IoMdClose, IoMdRemove } from "react-icons/io";
import { BiExpandAlt } from "react-icons/bi";

const PopupWindow = ({ children, title }) => {
	const size = 11;

	const [hover, setHover] = useState(false);

	const opacityProps = useSpring({ opacity: hover ? 1 : 0 });
	const scaleProps = useSpring({ scale: hover ? 1.1 : 1 });
	const bind = useHover(({ hovering }) => {
		console.log(hovering);
		setHover(hovering);
	});

	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const dragBind = useDrag(
		({ down, offset: [x, y] }) => api.start({ x, y }),
		{ bounds: { top: 0 } }
	);
	return (
		<animated.div
			{...dragBind()}
			style={{ x, y, touchAction: "none" }}
			className="text-white/80 rounded-xl bg-black/10 w-96 h-80 top-10 left-10 pt-2 z-10 backdrop-blur-lg"
		>
			<div className="flex items-center" id="top-part">
				<div
					className="flex gap-2 z-0 absolute float-left ml-3"
					{...bind()}
					style={{ width: "fit-content" }}
				>
					<animated.div
						style={scaleProps}
						className="rounded-full overflow-hidden w-4 h-4 bg-red-500 flex justify-center items-center"
					>
						<animated.div style={opacityProps}>
							<IoMdClose size={size} />
						</animated.div>
					</animated.div>
					<animated.div
						style={scaleProps}
						className="rounded-full overflow-hidden w-4 h-4 bg-yellow-500 flex justify-center items-center"
					>
						<animated.div style={opacityProps}>
							<IoMdRemove size={size} />
						</animated.div>
					</animated.div>
					<animated.div
						style={scaleProps}
						className="rounded-full overflow-hidden w-4 h-4 bg-green-500 flex justify-center items-center"
					>
						<animated.div style={opacityProps}>
							<BiExpandAlt size={size} />
						</animated.div>
					</animated.div>
				</div>
				<div class="flex-1 text-center">
					<h1 class="text-lg ">{title}</h1>
				</div>
			</div>
			{children}
		</animated.div>
	);
};
export default PopupWindow;
