"use client";

import { MenuDto } from "@/application/usecases/admin/menu/dto/MenuDto";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";

interface RowExProps {
	menuId: number;
}

const RowEx: FC<RowExProps> = ({ menuId }) => {
	const [menu, setMenu] = useState<MenuDto | null>(null);
	const [loading, setLoading] = useState<boolean>(true); // Added loading state

	const { token } = useAuthStore(); // Assuming you have a way to get the token

	useEffect(() => {
		// Fetch menu details
		const fetchMenu = async () => {
			try {
				setLoading(true); // Set loading to true before fetching
				console.log("Fetching menu details for ID:", menuId); // Debugging log

				const response = await fetch(`/api/admin/menus/${menuId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch menu details");
				}
				const data: MenuDto = await response.json();
				setMenu(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};

		fetchMenu();
	}, [menuId, token]);

	return (
		<>
			{loading ? ( // Show loading indicator while fetching
				<tr>
					<td colSpan={5}>Loading...</td>
				</tr>
			) : (
				menu && (
					<tr>
						<td colSpan={5}>
							<section>
								<h1 className="d:none">상세내용</h1>
								<dl className="n-list:dash-lined">
									<div>
										<dt>영문명</dt>
										<dd className="ml:1">{menu.engName}</dd>
									</div>
									<div>
										<dt>사진</dt>
										<dd className="ml:1">
											<ul className="n-bar flex-wrap:wrap">
												{menu.images.map((image) => (
													<li
														key={image.id}
														className={image.isDefault ? "active:border" : ""}
													>
														<Image
															className="w:4 h:auto"
															src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image/product/${image.name}`}
															alt={menu.engName}
															width={100}
															height={100}
														/>
													</li>
												))}
											</ul>
										</dd>
									</div>
									<div>
										<dt>가격</dt>
										<dd className="ml:1">{menu.price.toLocaleString()}원</dd>
									</div>
									<div>
										<dt>등록일자</dt>
										<dd className="ml:1">
											{new Date(menu.createdAt).toLocaleString("ko-KR", {
												year: "numeric",
												month: "2-digit",
												day: "2-digit",
												hour: "2-digit",
												minute: "2-digit",
												second: "2-digit",
											})}
										</dd>
									</div>
								</dl>
							</section>
						</td>
					</tr>
				)
			)}
		</>
	);
};

export default RowEx;
