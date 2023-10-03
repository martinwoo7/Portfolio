import MenuItem from "../MenuItem";
import HorizontalLine from "../../horizontal";

const FinderMenu = () => {
	const items = [
		"About Finder",
		"",
		"Preferences",
		"",
		"Empty Trash",
		"",
		"Hide Finder",
		"Hide Others",
		"Show All",
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

export default FinderMenu;
