import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import PopupWindow from "../components/popupWindow";

const Home = () => {
	return (
		<div className="h-full w-full overflow-hidden">
			<PopupWindow title={"About Me"}>
				<div className="bg-neutral-900 w-full">

					hello
				</div>
			</PopupWindow>
		</div>
	);
};
export default Home;
