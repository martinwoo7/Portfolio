import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import moment from "moment";

const Clock = ({ size }) => {
	const [time, setTime] = useState(moment());
	// console.log(time)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(moment());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const totalSeconds = time.seconds() + time.minutes() * 60;
	const totalMinutes = time.minutes() + time.hours() * 60;
	const totalHours = (time.hours() % 12) + time.minutes() / 60;

	const secondRotation = useSpring({
		transform: `rotate(${
			(totalSeconds / 60) * 360
		}deg) translateY(-90%) translateX(-50%)`,
	});
	const minuteRotation = useSpring({
		transform: `rotate(${
			(totalMinutes / 60) * 360
		}deg) translateY(-100%) translateX(-50%)`,
	});
	const hourRotation = useSpring({
		transform: `rotate(${
			(totalHours / 12) * 360
		}deg) translateY(-100%) translateX(-50%)`,
	});

	return (
		<div>
			<div className="relative w-32 h-32 bg-white rounded-full">
				<div className="absolute top-1/2 left-1/2 bg-black w-2 h-2 rounded-full translate-x-[-50%] translate-y-[-50%]">
					<div className="absolute z-40 top-1/2 left-1/2  bg-white h-1 w-1 translate-x-[-50%] translate-y-[-50%] rounded-full" />
				</div>
				<animated.div
					className={
						"w-px h-16 top-1/2 left-1/2 absolute bg-orange-500 z-20 rounded-2xl"
					}
					style={{
						...secondRotation,
						transformOrigin: "0% 0%",
					}}
				></animated.div>
				<animated.div
					className={
						"w-1 h-14 top-1/2 left-1/2 absolute bg-black rounded-3xl z-10"
					}
					style={{
						...minuteRotation,
						transformOrigin: "0% 0%",
					}}
				></animated.div>
				<animated.div
					className={
						"w-1 h-9 top-1/2 left-1/2 absolute bg-black rounded-3xl z-0"
					}
					style={{
						...hourRotation,
						transformOrigin: "0% 0%",
					}}
				></animated.div>
				{[...Array(12)].map((_, index) => {
					return (
						<div
							key={index}
							className="absolute left-1/4 top-1/4 w-16 h-16 text-center font-semibold"
							style={{
								transform: `rotate(${
									(index + 1) * 30
								}deg) translate(0, -50%)`,
							}}
						>
							{index + 1}
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Clock;
