import { useEffect, useState } from "react";
import Contentstack from "contentstack";
import Newspanel from "../components/Newspanel";

export default function Allnewspage() {
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
      .includeReference("author")
      .toJSON()
      .find()
      .then((result) => setNews(result[0]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex gap-2 flex-col">
      <h2>All news</h2>
      {news.map((newsItem) => (
        <Newspanel
          key={newsItem.title}
          title={newsItem.title}
          author={newsItem.author[0].title}
          date={newsItem.date}
          summary={newsItem.summary}
          linkUrl={newsItem.uid}
          featuredImageUrl={newsItem.featured_image.url}
        />
      ))}
    </div>
  );
}
