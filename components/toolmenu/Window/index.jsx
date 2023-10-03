import MenuItem from "../MenuItem";
import HorizontalLine from "../../horizontal";

const WindowMenu = () => {
	const items = [
		"Minimize",
		"Zoom",
        "Move Window to Left Side of Screen",
        "Move Window to Right Side of Screen",
        "Cycle Through Windows",
        "",
        "Show Previous Tab",
        "Show Next Tab",
        "Move Tab to Next Window",
        "Merge all Windows",
        "",
        "Bring All to Front"
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

export default WindowMenu;
