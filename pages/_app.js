import React, { useState } from "react";
import Layout from "../components/layout";
import "../styles/globals.css";
import { useTransition, animated } from "@react-spring/web";
import { Provider } from "react-redux";
import store from "../store";

import GreetingScreen from "../components/greeting";
const MyApp = ({ Component, pageProps }) => {
	const [showGreeting, setShowGreeting] = useState(true);
	const transitions = useTransition(showGreeting, {
		from: { opacity: 1 },
		enter: { opacity: 1 },
		leave: {
			position: "absolute",
			zIndex: 1,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			opacity: 0,
		},
	});

	return (
		<Provider store={store}>
			{transitions((props, item) =>
				item ? (
					<animated.div style={props}>
						<GreetingScreen
							onDismiss={() => setShowGreeting(false)}
						/>
					</animated.div>
				) : (
					<animated.div>
						{/* No animation for Layout */}
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</animated.div>
				)
			)}
		</Provider>
	);
};
export default MyApp;
