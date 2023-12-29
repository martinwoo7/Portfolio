import RealTimeDate from "../realtime";
import ToolItem from "../toolitem";
const MobileBar = ({ colour }) => {
	return (
		<div
			className={`flex md:hidden w-full pt-2 justify-between items-center pl-5 pr-2 ${colour}`}
		>
			<div className="flex pl-3 md:hidden">
				<RealTimeDate type={"phone"} />
			</div>
			<div className="flex md:hidden">
				<ToolItem name={"Cell"} size={17} />
				<ToolItem name={"Wifi"} size={17} />
				<ToolItem name={"Battery"} size={17} />
			</div>
		</div>
	);
};

export default MobileBar;
