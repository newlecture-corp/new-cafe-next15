// import './globals.css';
"use client";
import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
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
                <link
                    rel="stylesheet"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/npm/newtil-css@0.2.13/dist/style.min.css"
                />
                <link rel="stylesheet" href="/css/style.css" type="text/css" />
            </head>
            <body>                
                {children}
            </body>
        </html>
    );
}