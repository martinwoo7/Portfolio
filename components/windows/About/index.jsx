import { PopupWindow } from "../../popupWindow";
import Link from "next/link";
import Image from "next/image";
import face from "../../../public/images/face.jpg";

import { useSpring, animated, useTransition } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import { useState } from "react";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

export const LogoContainer = ({ children }) => {
	const [hover, setHover] = useState(false);
	const props = useSpring({ scale: hover ? 1.1 : 1 });
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
			<div className="text-white bg-zinc-900 w-full h-full rounded-b-xl p-3 px-10 flex flex-col">
				<div className="flex items-center gap-12 justify-center mt-4 mb-8">
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
						I can do a lot of computer stuff from software
						engineering and machine learning modeling to web
						development. Heh, it's just so hard being
						multi-talented.
					</p>
					<p>
						The one thing prevelant in all my work is the
						undesputible love for creating and the joy I receive
						from manifesting the ideas in my head into fruition.
					</p>
					<p>
						I have recently started focusing on web development and
						enjoy working with React the most.
					</p>
					<p>
						I enjoy other artistic hobbies such as drawing (digital)
						and crocheting (physical), and physical hobbies such as
						bouldering, tennis, running, muay thai, and
						snowboarding.
					</p>
					<p className="text-3xl">I love cats.</p>
				</div>
			</div>
		</PopupWindow>
	);
};

export default AboutWindow;
