import { configureStore } from "@reduxjs/toolkit";
import greetingSlice from "./components/greeting/greetingSlice";
import layoutSlice from "./components/layoutSlice";
import windowSlice from "./components/popupWindow/windowSlice";

export default configureStore({
	reducer: {
		login: greetingSlice,
		layout: layoutSlice,
		window: windowSlice,
	},
});
