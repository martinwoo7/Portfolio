import MenuItem from "../MenuItem";
import HorizontalLine from "../../horizontal";

const MenuMenu = () => {
	const items = [
		"About This System",
        "",
        "System Preferences...",
        "App Store...",
        "",
        "Recent Items",
        "",
        "Force Quit",
        "Sleep",
        "Restart...",
        "Shut Down...",
        "",
        "Lock Screen",
        "Log Out User..."

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

export default MenuMenu;
