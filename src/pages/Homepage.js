import useContentStackFetch from "../utils/useContentStackFetch";
import Newsspotlight from "../components/Newsspotlight";
import Newspanel from "../components/Newspanel";
import Authorspotlight from "../components/Authorspotlight";
import Authorpanelcollection from "../components/Authorpanelcollection";

export default function Homepage() {
  const fetchOptions = {
    contentType: "homepage",
    references: [
      "homepage_components.news_spotlight.news",
      "homepage_components.news_spotlight.news.author",
      "homepage_components.all_news.news",
      "homepage_components.all_news.news.author",
      "homepage_components.author_spotlight.authors",
      "homepage_components.all_authors.author",
    ],
    jsonToHTML: ["homepage_components.author_spotlight.authors.bio"],
  };

  const [data, isLoading, isError] = useContentStackFetch(fetchOptions);

  return (
    <div className="flex flex-col gap-4">
      {data !== null &&
        data[0].homepage_components.map((component) => {
          if (component.news_spotlight !== undefined) {
            const newsSpotlight = component.news_spotlight.news[0];
            return (
              <Newsspotlight
                title={newsSpotlight.title}
                author={newsSpotlight.author[0].title}
                date={newsSpotlight.date}
                summary={newsSpotlight.summary}
                linkUrl={"news/" + newsSpotlight.uid}
                featuredImageUrl={newsSpotlight.featured_image.url}
              />
            );
          }
          if (component.all_news !== undefined) {
            const spotlightNews = data[0]?.homepage_components.find(
              (block) => block.news_spotlight !== undefined
            ).news_spotlight.news[0].uid;
            const sortedAndFilteredNews = component.all_news.news
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .filter((news) => news.uid !== spotlightNews);
            return (
              <>
                <h2>{component.all_news.title}</h2>
                {sortedAndFilteredNews
                  .filter((news) => news.uid !== spotlightNews)
                  .sort((a, b) => a.date > b.date)
                  .map((newsItem) => (
                    <Newspanel
                      key={newsItem.title}
                      title={newsItem.title}
                      author={newsItem.author[0].title}
                      date={newsItem.date}
                      summary={newsItem.summary}
                      linkUrl={"news/" + newsItem.uid}
                      featuredImageUrl={newsItem.featured_image.url}
                    />
                  ))}
              </>
            );
          }
          if (component.author_spotlight !== undefined) {
            const author = component.author_spotlight.authors[0];
            return (
              <div>
                <h2>{component.author_spotlight.title}</h2>
                <Authorspotlight
                  name={author.title}
                  email={author.email}
                  photoUrl={author.photo.url}
                  bio={author.bio}
                />
              </div>
            );
          }
          if (component.all_authors !== undefined) {
            const spotlightAuthor = data[0]?.homepage_components.find(
              (block) => block.author_spotlight !== undefined
            ).author_spotlight.authors[0].uid;
            return (
              <div>
                <h2>{component.all_authors.title}</h2>
                <Authorpanelcollection
                  authors={component.all_authors.author.filter(
                    (author) => author.uid !== spotlightAuthor
                  )}
                />
              </div>
            );
          }
          return undefined;
        })}
    </div>
  );
}
