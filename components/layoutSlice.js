import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
	name: "layout",
	initialState: {
		mounted: false,
	},
	reducers: {
		mount: (state) => {
			state.mounted = true;
		},
		unmount: (state) => {
			state.mounted = false;
		},
	},
});

export const { mount, unmount } = layoutSlice.actions;
export default layoutSlice.reducer;
