// import './globals.css';
// "use client";
import { ReactNode } from "react";
import Basket from "./components/Basket";

type LayoutProps = {
	children: ReactNode;
};

export default function AnonMenuLayout({ children }: LayoutProps) {
	return (
		<>
			{children}
			<Basket />
		</>
	);
}
