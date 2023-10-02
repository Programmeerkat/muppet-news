import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contentstack from "contentstack";
import richTextRenderOptions from "../utils/richTextRenderOptions";
import Authorspotlight from "../components/Authorspotlight";

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
          paths: ["body", "author.bio"],
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
          <div
            className="flex flex-col gap-1"
            dangerouslySetInnerHTML={{ __html: news.body }}
          />
          <h2>About the author:</h2>
          <Authorspotlight
            name={news.author[0]?.title}
            email={news.author[0]?.email}
            photoUrl={news.author[0]?.photo?.url}
            bio={news.author[0]?.bio}
          />
        </div>
      )}
    </div>
  );
}
