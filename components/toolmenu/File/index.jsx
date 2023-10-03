import MenuItem from "../MenuItem";
import HorizontalLine from "../../horizontal";

const FileMenu = () => {
	const items = [
		"New Finder Window",
        "New Folder",
        "New Folder with Selection",
        "New Smart Folder",
        "New tab",
        "Open",
        "Open With",
        "Print",
        "Close Window",
        "",
        "Get Info",
        "Rename",
        "",
        "Compress",
        "",
        "Duplicate",
        "Make Alias",
        "Quick Look",
        "Show Original",
        "Add to Sidebar",
        "",
        "Move to Trash",
        "Eject",
        "",
        "Find",
        "",
        "Tags..."
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

export default FileMenu;
