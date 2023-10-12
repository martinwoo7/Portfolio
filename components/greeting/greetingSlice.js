import { createSlice } from "@reduxjs/toolkit";
import { setWithExpiry } from "../../scripts/utils";

const initialState = {
	loggedIn: false,
	touch: false,
};

export const greetingSlice = createSlice({
	name: "greeting",
	initialState,
	reducers: {
		login: (state) => {
			state.loggedIn = true;
		},
		logout: (state) => {
			state.loggedIn = false;
		},
		toggleTouch: (state) => {
			
			state.touch = !state.touch;
			console.log(state.touch)
		},
	},
});

export const asyncLogin = () => (dispatch) => {
	// localStorage.setItem("loggedIn", true);
	setWithExpiry("loggedIn", true, 60);
	dispatch(login());
};

export const asyncLogout = () => (dispatch) => {
	localStorage.removeItem("loggedIn");
	dispatch(logout());
};

export const { login, logout, toggleTouch } = greetingSlice.actions;
export default greetingSlice.reducer;
