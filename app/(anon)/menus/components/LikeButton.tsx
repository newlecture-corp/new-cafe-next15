"use client";

import styles from "../page.module.scss";

const LikeButton = ({
	menuId,
	like,
}: {
	menuId: number | undefined;
	like: boolean | undefined;
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked);
		console.log(menuId);

		if (menuId === undefined) return;

		if (like)
			fetch(`/api/menus/${menuId}/like`, {
				method: "DELETE",
				body: JSON.stringify({ menuId: menuId }),
				headers: {
					"Content-Type": "application/json",
				},
			});
		else
			fetch(`/api/menus/${menuId}/like`, {
				method: "POST",
				body: JSON.stringify({ menuId: menuId }),
				headers: {
					"Content-Type": "application/json",
				},
			});
	};

	return (
		<div className={styles["like"]}>
			<label
				className={`n-icon n-icon:favorite ${
					like ? "n-icon-style:filled n-icon-color:main-2" : ""
				}`}
			>
				좋아요
				<input
					className="d:none"
					type="checkbox"
					defaultValue={1}
					onChange={handleChange}
				/>
			</label>
			<span>12</span>
		</div>
	);
};

export default LikeButton;
