import { PopupWindow } from "../../popupWindow";
import Link from "next/link";
import Image from "next/image";
import face from "../../../public/images/face.jpg";

import { useSpring, animated, useTransition } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import { useState } from "react";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import MobileBar from "../../mobileBar";

export const LogoContainer = ({ children }) => {
	const [hover, setHover] = useState(false);
	const props = useSpring({
		scale: hover ? 1.1 : 1,
		transform: hover ? "translateZ(1px)" : "translateZ(0px)",
	});
	const bind = useHover(({ hovering }) => {
		setHover(hovering);
	});
	return (
		<animated.div style={props} {...bind()} className={"cursor-pointer"}>
			{children}
		</animated.div>
	);
};
const AboutWindow = ({ name }) => {
	const [nameHovered, setNameHovered] = useState(false);
	const nameHover = useHover(({ hovering }) => {
		setNameHovered(hovering);
	});
	const moveDown = useSpring({ y: nameHovered ? 20 : 0 });
	const transition = useTransition(nameHovered, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: {
			opacity: 0,
		},
		config: { duration: 200 },
	});
	return (
		<PopupWindow title="About Me" name={name}>
			<div className="h-full bg-zinc-900 md:rounded-b-xl md:px-10">
				<MobileBar />
				<div className="overflow-y-scroll overflow-y-hidden flex flex-col text-white h-screen md:rounded-b-xl md:p-3 px-10">
					<div className="flex flex-col md:flex-row items-center gap-5 md:gap-12 justify-center mt-5 mb-8">
						<Image
							src={face}
							// className="w-48 h-48 rounded-full"
							className="rounded-full"
							width={192}
							height={192}
							alt="Image of the developer"
							// priority
						/>
						<div className="flex flex-col gap-2">
							<animated.h1 className="text-4xl">
								Hi, I am{" "}
								<span className="text-red-300" {...nameHover()}>
									Martin
								</span>
							</animated.h1>
							<div className="relative flex justify-center">
								{transition(
									(props, item) =>
										item && (
											<animated.div
												style={props}
												className={"absolute top-0"}
											>
												<p>(pronounced: Martin)</p>
											</animated.div>
										)
								)}
							</div>

							<animated.div style={moveDown}>
								<h3 className="text-xl">and I made MartOS</h3>
								<div className="flex mt-3 gap-3">
									<LogoContainer>
										<Link
											href="https://github.com/martinwoo7"
											target="_blank"
										>
											<IoLogoGithub size={42} />
										</Link>
									</LogoContainer>

									<LogoContainer>
										<Link
											href="https://www.linkedin.com/in/martin-woo-21770b141/"
											target="_blank"
										>
											<IoLogoLinkedin size={46} />
										</Link>
									</LogoContainer>
								</div>
							</animated.div>
						</div>
					</div>
					<div className="flex flex-col gap-4 mb-4">
						<p>
							I'm a software engineer, but I've been recently very
							interested in web development.
						</p>
						<p>
							I love creating things, whether it be in software,
							art, or literature. There's something amazing about
							being able to manifest a concept you created in your
							head into the world.
						</p>
						<p>
							I also love sports and have a particular interest in
							bouldering, tennis, running, muay thai, and
							snowboarding.
						</p>
						<p>I've also been crocheting alot :)</p>
						<p className="text-3xl">I love cats.</p>
					</div>
				</div>
			</div>
		</PopupWindow>
	);
};

export default AboutWindow;
