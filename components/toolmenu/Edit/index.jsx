import MenuItem from "../MenuItem";
import HorizontalLine from "../../horizontal";

const EditMenu = () => {
	const items = [
		"Undo",
		"Redo",
		"",
		"Cut",
		"Copy",
		"Paste",
		"Select All",
		"",
		"Show Clipboard",
		"",
		"Start Dictation",
		"Emoji & Symbols",
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

export default EditMenu;
