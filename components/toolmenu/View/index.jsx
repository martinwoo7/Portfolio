import MenuItem from "../MenuItem";
import HorizontalLine from "../../horizontal";

const ViewMenu = () => {
	const items = [
		"As Icons",
		"As List",
		"As Columns",
		"As Gallery",
		"",
		"Use Stacks",
		"Sort By",
		"Clean Up",
		"Clean Up By",
		"",
		"Hide Sidebar",
		"Show Preview",
		"",
		"Hide Toolbar",
		"Show All Tabs",
		"Show Tab Bar",
		"Show Path Bar",
		"Show Status Bar",
		"",
		"Customize Toolbar...",
		"",
		"Show View Options",
		"Show Preview Options",
		"",
		"Enter Full Screen",
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

export default ViewMenu;
