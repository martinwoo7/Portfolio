const ToolMenu = ({ children }) => {
	return (
		<div className="bg-black/30 rounded-2xl flex flex-col p-2 gap-2 text-xs text-white/80 w-44">
			<div>{children}</div>
		</div>
	);
};

export default ToolMenu;
