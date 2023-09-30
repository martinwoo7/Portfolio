import React, { useState, useEffect } from "react";
import moment from "moment";

const RealTimeDate = ({ type }) => {
	const [currentTime, setCurrentTime] = useState(moment());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(moment());
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	if (type === "date") {
		return (
			<div className="text-white text-sm">{currentTime.format("ddd MMM YY")}</div>
		);
	} else if (type === "time") {
		return (
			<div className="text-white text-sm">{currentTime.format("h[:]mm a")}</div>
		);
	}
};

export default RealTimeDate;
