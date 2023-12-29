import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import "../styles/globals.css";
import { useTransition, animated } from "@react-spring/web";
import { Provider } from "react-redux";
import store from "../store";
import Head from "next/head";

import GreetingScreen from "../components/greeting";
import LockOrientation from "../components/lockOrientation/LockOrientation";

import Clock from "../components/clock";

const MyApp = ({ Component, pageProps }) => {
	const [showGreeting, setShowGreeting] = useState(true);
	const transitions = useTransition(showGreeting, {
		from: { opacity: 1 },
		enter: { opacity: 1 },
		leave: {
			position: "absolute",
			zIndex: 100,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			opacity: 0,
		},
	});

	return (
		<Provider store={store}>
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1, maximum-scale=1, user-scalable=no, orientation=portrait"
				/>
			</Head>
			<LockOrientation />
			{transitions((props, item) =>
				item ? (
					<animated.div style={props}>
						<GreetingScreen
							onDismiss={() => setShowGreeting(false)}
						/>
					</animated.div>
				) : (
					<animated.div>
			
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</animated.div>
				)
			)}

			{/* Test Environment */}
			{/* <Clock /> */}
		</Provider>
	);
};
export default MyApp;
