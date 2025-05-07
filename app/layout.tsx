"use client";
import "newtil-css";
// import { initLayout } from "newtil-css";
import "./global.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// import { ReactNode, useLayoutEffect } from "react";

type LayoutProps = {
	children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
	// useLayoutEffect(() => {
	// 	console.log("initLayout:", initLayout); // 확인용 로그
	// 	initLayout();
	// }, []);

	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Title</title>
				<link
					rel="stylesheet"
					crossOrigin="anonymous"
					as="style"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
				/>
			</head>
			<body>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
