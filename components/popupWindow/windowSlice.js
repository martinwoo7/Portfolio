import { createSlice } from "@reduxjs/toolkit";
export const PopupSlice = createSlice({
	name: "popup",
	initialState: {
		opened: [],
		active: "",
		numberOfMounted: 0,
	},
	reducers: {
		setActive: (state, action) => {
			state.active = action.payload;
		},
		openWindow: (state, action) => {
			state.numberOfMounted += 1;
			state.active = action.payload;
			state.opened.push(action.payload);
		},
		closeWindow: (state, action) => {
			state.numberOfMounted -= 1;
			state.active = "";
			state.opened = state.opened.filter((name) => name !== action.payload);
		},
	},
});
export const { setActive, openWindow, closeWindow } = PopupSlice.actions;
export default PopupSlice.reducer;
