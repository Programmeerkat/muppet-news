import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Contentstack from "contentstack";

export default function Header({ slogan }) {
  const [navigation, setNavigation] = useState(null);

  useEffect(() => {
    const Stack = Contentstack.Stack({
      api_key: process.env.REACT_APP_API_KEY,
      delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
      environment: process.env.REACT_APP_ENVIROMENT,
      region: Contentstack.Region.EU,
    });
    const Query = Stack.ContentType("navigation").Query();
    Query.language("en-us")
      .includeReference([
        "navigation_links.internal_link.homepage",
        "navigation_links.internal_link.newspage",
        "navigation_links.internal_link.faq",
      ])
      .toJSON()
      .find()
      .then((result) => {
        setNavigation(
          result[0][0].navigation_links.map((item) => ({
            url: item.internal_link[0].url,
            label: item.internal_link[0].title,
          }))
        );
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <header className="w-full h-20 bg-sky-500 flex items-center justify-center">
      <h1>Muppet News</h1>
      <div className="flex gap-3">
        {navigation !== null &&
          navigation.map((link) => (
            <Link
              className="p-2 rounded-xl bg-sky-800 text-cyan-50"
              key={link.label}
              to={link.url}
            >
              {link.label}
            </Link>
          ))}
      </div>
      <p className="text-xl">{slogan}</p>
    </header>
  );
}
