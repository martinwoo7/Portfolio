import React from "react";
import styles from "../../../styles/Dock.module.css"

export const Card = ({ src }) => {
	const preventDragHandler = (e) => {
		e.preventDefault();
	};
	return (
		<span className={styles.cards} onDragStart={preventDragHandler}>
			<img src={src} alt="" className={styles.cardBlur} />
			<img src={src} alt="" className={styles.cardImg} />
		</span>
	);
};
