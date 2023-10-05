import MenuItem from "../MenuItem";
import HorizontalLine from "../../horizontal";

const HelpMenu = () => {
	const items = [
		"Send Feedback",
        "",
        "MartOS Help"
	];
	return (
		<div>
			{items.map((item, index) => {
				if (item) {
					return <MenuItem key={index}>{item}</MenuItem>;
				} else {
					return <HorizontalLine key={index} />;
				}
			})}
		</div>
	);
};

export default HelpMenu;
