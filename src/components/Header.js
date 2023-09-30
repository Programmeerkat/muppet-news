import { Link } from "react-router-dom";

export default function Header() {
    return(
        <header className="w-full h-20 bg-sky-500 flex items-center justify-center">
            <h1>Muppet News</h1>
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
            <Link to="/faq">FAQ</Link>
        </header>
    )
}