"use client";
import Link from "next/link";
import {header, a} from "./RootHeader.module.scss";

const RootHeader = () => {
    return (
        <header className={header}>
            <h1 className={a}>My Application</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/menus">menus</Link></li>
                    <li><Link href="/admin">dashboard</Link></li>
                    <li><Link href="/login">login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default RootHeader;