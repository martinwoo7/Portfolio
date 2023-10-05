import HorizontalLine from "../horizontal";
import MenuItem from "../toolmenu/MenuItem";
// TODO: Make the context menu start elsewhere depending on the initial click position
const ContextMenu = ({ x, y, onClose }) => {
	const handleItemClick = (action) => {
		// perform desired action based on menu item clicked
		onClose();
	};

	const contextMenuStyle = {
		top: y,
		left: x,
		zIndex: 1000,
	};

	const items = [
		"New Folder",
		"",
		"Get Info",
		"Change Desktop Background",
		"",
		"Use Stacks",
		"Sort By",
		"Clean Up",
		"Clean Up By",
		"Show View Options",
	];
	return (
		<div
			style={contextMenuStyle}
			className="absolute bg-black/20 backdrop-blur-lg text-white/80 p-2 rounded-lg text-sm"
		>
			{items.map((item, index) => {
				if (item) {
					return (
						<div key={index} onClick={() => handleItemClick(item)}>
							<MenuItem>{item}</MenuItem>
						</div>
					);
				} else {
					return <HorizontalLine key={index} />;
				}
			})}
		</div>
	);
};

export default ContextMenu;
