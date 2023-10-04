import { Link } from "react-router-dom";
import useContentStackFetch from "../utils/useContentStackFetch";

export default function Header({ slogan }) {
  const fetchOptions = {
    contentType: "navigation",
    references: [
      "navigation_links.internal_link.homepage",
      "navigation_links.internal_link.newspage",
      "navigation_links.internal_link.faq",
    ],
    jsonToHTML: [],
  };

  const [data, isLoading, isError] = useContentStackFetch(fetchOptions);

  return (
    <header className="w-full h-20 bg-sky-500 flex justify-center">
      <div className="max-w-3xl w-full h-full flex items-center justify-between">
        <h1>Muppet News</h1>
        <p className="text-xl w-40 text-center">
          <i>{slogan}</i>
        </p>
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
      </div>
    </header>
  );
}
