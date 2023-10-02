import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contentstack from "contentstack";
import richTextRenderOptions from "../utils/richTextRenderOptions";

export default function Singlenewspage() {
  const { id: newsId } = useParams();

  const [news, setNews] = useState(null);

  useEffect(() => {
    const Stack = Contentstack.Stack({
      api_key: process.env.REACT_APP_API_KEY,
      delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
      environment: process.env.REACT_APP_ENVIROMENT,
      region: Contentstack.Region.EU,
    });
    Stack.ContentType("news")
      .Entry(newsId)
      .includeReference("author")
      .toJSON()
      .fetch()
      .then((entry) => {
        Contentstack.Utils.jsonToHTML({
          entry,
          paths: ["body"],
          renderOption: richTextRenderOptions,
        });
        setNews(entry);
      })
      .catch((error) => console.error(error));
  }, [newsId]);

  return (
    <div className="p-4">
      {news !== null && (
        <div>
          <img src={news.featured_image?.url} alt="" />
          <h2>{news.title}</h2>
          <p>Posted on: {news.date}</p>
          <p>By: {news.author[0].title}</p>
          <div dangerouslySetInnerHTML={{ __html: news.body }} />
          <h2>About the author:</h2>
          <div className="p-4 rounded-xl bg-sky-100">
            <h3>{news.author[0]?.title}</h3>
            <h3>{news.author[0]?.email}</h3>
            <img src={news.author[0]?.photo?.url} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
