import RootHeader from "./components/RootHeader"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <RootHeader />
            <main>{children}</main>
        </div>
    );
}