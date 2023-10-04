import { Helmet } from "react-helmet";
import useContentStackFetch from "../utils/useContentStackFetch";
import Newspanel from "../components/Newspanel";

export default function Allnewspage() {
  const fetchOptions = {
    contentType: "newspage",
    references: ["news", "news.author"],
    jsonToHTML: [],
  };

  const [data, isLoading, isError] = useContentStackFetch(fetchOptions);

  return (
    <>
      {data !== null && (
        <Helmet>
          <title>{data[0].seo.title}</title>
          <meta name="description" content={data[0].seo.description} />
        </Helmet>
      )}
      <div className="flex gap-2 flex-col">
        {data !== null &&
          data[0].news.map((newsItem) => (
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
    </>
  );
}
