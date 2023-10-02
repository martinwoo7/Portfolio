import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const initialState = {
	loggedIn: false,
};

export const greetingSlice = createSlice({
	name: "loggedIn",
	initialState,
	reducers: {
		login: (state) => {
			state.loggedIn = true;
		},
		logout: (state) => {
			state.loggedIn = false;
		},
	},
});

export const asyncLogin = () => (dispatch) => {
	localStorage.setItem("loggedIn", true);
	dispatch(login());
};

export const asyncLogout = () => (dispatch) => {
	localStorage.setItem("loggedIn", false);
	dispatch(logout());
};

export const { login, logout } = greetingSlice.actions;
export default greetingSlice.reducer;
