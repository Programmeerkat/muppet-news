import { Link } from "react-router-dom";
import useContentStackFetch from "../utils/useContentStackFetch";

export default function Header({ slogan }) {
  const fetchOptions = {
    contentType: 'navigation',
    references: [
      "navigation_links.internal_link.homepage",
      "navigation_links.internal_link.newspage",
      "navigation_links.internal_link.faq",
    ],
    jsonToHTML: [],
  };

  const [data, isLoading, isError] = useContentStackFetch(fetchOptions);

  return (
    <header className="w-full h-20 bg-sky-500 flex items-center justify-center">
      <h1>Muppet News</h1>
      <div className="flex gap-3">
        {data !== null &&
          data[0].navigation_links.map((link) => (
            <Link
              className="p-2 rounded-xl bg-sky-800 text-cyan-50"
              key={link.internal_link[0].label}
              to={link.internal_link[0].url}
            >
              {link.label}
            </Link>
          ))}
      </div>
      <p className="text-xl">{slogan}</p>
    </header>
  );
}
