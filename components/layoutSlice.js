import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
	name: "layout",
	initialState: {
		mounted: false,
		playing: false,
		active: "",
		volume: 0.5,
	},
	reducers: {
		mount: (state) => {
			state.mounted = true;
		},
		unmount: (state) => {
			state.mounted = false;
		},
		togglePlaying: (state) => {
			state.playing = !state.playing;
		},
		handleActive: (state, action) => {
			if (state.active === action.payload || action.payload === "") {
				state.active = "";
			} else {
				state.active = action.payload;
			}
		},
		setVolume: (state, action) => {
			state.volume = action.payload;
		},
	},
});

export const { mount, unmount, togglePlaying, handleActive, setVolume } =
	layoutSlice.actions;
export default layoutSlice.reducer;
