"use client";
import React from "react";
import { useRouter } from "next/router";

const CategoryDetailPage = () => {
	const router = useRouter();
	const { id } = router.query;

	if (!id) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>Category Detail</h1>
			<p>Category ID: {id}</p>
			{/* Add more details or functionality as needed */}
		</div>
	);
};

export default CategoryDetailPage;
