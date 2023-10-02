import { configureStore } from "@reduxjs/toolkit";
import greetingSlice from "./components/greeting/greetingSlice";
import layoutSlice from "./components/layoutSlice";

export default configureStore({
	reducer: {
		login: greetingSlice,
		layout: layoutSlice,
	},
});
