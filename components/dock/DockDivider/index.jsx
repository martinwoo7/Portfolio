import React from "react";
import styles from "../../../styles/Dock.module.css";
export const DockDivider = () => {
	return (
		<div className={styles.dividerContainer}>
			<span className={styles.divider}></span>
		</div>
	);
};
