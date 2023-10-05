import PopupWindow from "../../popupWindow";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import { useState } from "react";

const ResumeWindow = ({ name }) => {
	return (
		<PopupWindow title="Resume" name={name}>
			<div className="text-white bg-zinc-900 w-full h-full rounded-b-xl p-3 px-10 flex flex-col">
                <p>Resume</p>
            </div>
		</PopupWindow>
	);
};

export default ResumeWindow;
