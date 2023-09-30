import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsQuestionCircle } from "react-icons/bs";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import Tooltip from "../tooltip";
import { useHover } from "@use-gesture/react";
import { useSpring, animated, useTransition } from "@react-spring/web";

import LoadingBar from "../loadingbar";
const GreetingScreen = ({ onDismiss }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [imgHover, setImgHover] = useState(false);
	const [inputValue, setInputValue] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		if (value) {
			setInputValue(true);
		} else {
			setInputValue(false);
		}
	}, [value]);

	const bind = useHover(({ hovering }) => {
		setHovered(hovering);
	});

	const bindHover = useHover(({ hovering }) => {
		setImgHover(hovering);
	});

	const hoverProps = useSpring({ scale: imgHover ? 1.2 : 1 });
	const textProps = useSpring({ y: hovered ? 65 : 0 });
	const opacityProps = useSpring({
		opacity: inputValue ? 1 : 0,
		from: { opacity: 0 }, // Specify the initial state for the enter animation
		onRest: () => {
			if (!value) {
				// Set inputValue to false after the fade-out animation is complete
				setInputValue(false);
			}
		},
	});

	const transitions = useTransition(isLoading, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: {
			opacity: 0,
			position: "absolute",
		},
	});

	const onSubmit = (event) => {
		event.preventDefault();
		console.log("password inputted is", value);
		console.log("Imitating load");
		setIsLoading(true);
		try {
			setTimeout(() => {
				console.log("Loading done!");
				onDismiss();
			}, 2300);
		} catch (error) {
			console.log(error);
		}
	};
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent the "Enter" key from submitting the form
			onSubmit(e);
		}
	};

	return (
		<div className="flex h-screen p-3 bg-black">
			<div className="relative flex rounded-xl bg-zinc-950 h-full w-full p-3 items-center justify-center flex-col">
				<div className="relative">
					<Image
						src="/images/face.jpg"
						height={128}
						width={128}
						alt="Martin Woo"
						className="rounded-full z-20 relative"
						draggable={"false"}
						{...bindHover()}
					/>
					<animated.div
						style={hoverProps}
						className={"absolute z-10 top-0"}
					>
						<Image
							src="/images/face.jpg"
							height={128}
							width={128}
							alt="Martin Woo"
							className="rounded-full opacity-40 blur-md "
							draggable={"false"}
						/>
					</animated.div>
				</div>
				<h1 className="text-2xl text-zinc-300 mt-4">Martin Woo</h1>
				<div className="relative h-20 w-52">
					{transitions((props, item) =>
						item ? (
							<animated.div
								style={props}
								className={"h-full w-full flex justify-center"}
							>
								<LoadingBar isLoading={isLoading} />
								{/* <div className="text-white">Loading!</div> */}
							</animated.div>
						) : (
							<animated.div style={props}>
								<form className="flex">
									<div className="relative flex items-center mt-3">
										<input
											type="password"
											name="name"
											placeholder="Enter Password"
											value={value}
											onChange={(e) =>
												setValue(e.target.value)
											}
											autoComplete="off"
											className="relative bg-white/10 rounded-2xl py-1 px-3 text-zinc-300 mr-2 w-44"
											onKeyDownCapture={handleKeyPress}
										/>
										{/* TODO: Add hover to the submit button */}
										{inputValue && (
											<animated.div style={opacityProps}>
												<IoArrowForwardCircleOutline
													onClick={onSubmit}
													size={"3em"}
													className="absolute right-6 top-1/2 transform -translate-y-1/2 text-zinc-300 py-1 px-2"
												/>
											</animated.div>
										)}
										<span className="" {...bind()}>
											<BsQuestionCircle
												size={"25px"}
												className="text-zinc-300"
											/>
										</span>
										{hovered && (
											<Tooltip text="Maybe try password?" />
										)}
									</div>
								</form>

								<animated.p
									className="mt-3 text-zinc-300 w-52 text-xs"
									style={textProps}
								>
									Please enter the password to continue. Maybe
									check the hint?
								</animated.p>
							</animated.div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default GreetingScreen;
