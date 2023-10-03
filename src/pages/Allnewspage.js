import useContentStackFetch from "../utils/useContentStackFetch";
import Newspanel from "../components/Newspanel";

export default function Allnewspage() {
  const fetchOptions = {
    contentType: 'news',
    references: ["author"],
    jsonToHTML: [],
  };

  const [data, isLoading, isError] = useContentStackFetch(fetchOptions);

  return (
    <div className="flex gap-2 flex-col">
      {data !== null && <>
        <h2>All news</h2>
        {data.map((newsItem) => (
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
      </>}
    </div>
  );
}
