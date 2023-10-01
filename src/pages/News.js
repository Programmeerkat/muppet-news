import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contentstack from "contentstack";

export default function News() {
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
  const { id } = useParams();
  return (
    <div>
      <h2>Newspage</h2>
      <p>{id}</p>
      {news.map((newsItem) => (
        <h3>{newsItem.title}</h3>
      ))}
    </div>
  );
}
