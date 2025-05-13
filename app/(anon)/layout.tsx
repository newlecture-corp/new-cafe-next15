"use client";
import RootFooter from "./components/RootFooter";
import RootHeader from "./components/RootHeader";

export default function AnonLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<RootHeader />
			{children}
			<RootFooter />
		</div>
	);
}
