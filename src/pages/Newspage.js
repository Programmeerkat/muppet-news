import { useEffect, useState } from "react";
import Contentstack from "contentstack";

export default function Newspage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const Stack = Contentstack.Stack({
      api_key: process.env.REACT_APP_API_KEY,
      delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
      environment: process.env.REACT_APP_ENVIROMENT,
      region: Contentstack.Region.EU,
    });
    const Query = Stack.ContentType("news").Query();
    Query.language("en-us")
      .toJSON()
      .find()
      .then((result) => setNews(result[0]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Newspage</h2>
      {news.map((newsItem) => (
        <h3>{newsItem.title}</h3>
      ))}
    </div>
  );
}
