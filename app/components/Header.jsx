import Link from "next/link";

export default function Header() {
    return (
        <div className="header-container">
            <h1>Salamand Tracker</h1>
            <h2>via contrast detect</h2>
            <div className="header-links">
                <Link href="/">Home</Link>
                <Link href="/results">Results</Link>
            </div>
        </div>
    )
}