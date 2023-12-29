import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
const Pressable = ({ children, onClick, classes }) => {
	const [{ scale }, set] = useSpring(() => ({ scale: 1 }));
	const bind = useGesture({
		onPointerDown: () => {
			set({ scale: 0.9 });
		},
		onPointerUp: () => {
			set({ scale: 1 });
		},
	});
	return (
		<animated.div
			{...bind()}
			onClick={onClick}
			style={{ transform: scale.to((s) => `scale(${s})`) }}
			className={classes}
		>
			{children}
		</animated.div>
	);
};

export default Pressable;
