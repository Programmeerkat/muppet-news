import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useContentStackFetch from "../utils/useContentStackFetch";
import Authorspotlight from "../components/Authorspotlight";

export default function Singlenewspage() {
  const { id: newsEntryId } = useParams();

  const fetchOptions = {
    contentType: "news",
    entryUid: newsEntryId,
    references: ["author"],
    jsonToHTML: ["body", "author.bio"],
  };

  const [newsItem, isLoading, isError] = useContentStackFetch(fetchOptions);

  return (
    <>
      {newsItem !== null && (
        <Helmet>
          <title>{"Muppet News - " + newsItem.title}</title>
          <meta
            name="description"
            content={"Muppet News article titled " + newsItem.title}
          />
        </Helmet>
      )}
      <div className="p-4">
        {newsItem !== null && (
          <div>
            <img
              src={newsItem.featured_image?.url}
              alt=""
              className="w-full rounded-xl"
            />
            <h2>{newsItem.title}</h2>
            <p>Posted on: {newsItem.date}</p>
            <p>By: {newsItem.author[0].title}</p>
            <div
              className="flex flex-col gap-1"
              dangerouslySetInnerHTML={{ __html: newsItem.body }}
            />
            <h2>About the author:</h2>
            <Authorspotlight
              name={newsItem.author[0]?.title}
              email={newsItem.author[0]?.email}
              photoUrl={newsItem.author[0]?.photo?.url}
              bio={newsItem.author[0]?.bio}
            />
          </div>
        )}
      </div>
    </>
  );
}
