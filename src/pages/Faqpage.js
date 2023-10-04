import { Helmet } from "react-helmet";
import useContentStackFetch from "../utils/useContentStackFetch";
import Faq from "../components/Faq";

export default function Faqpage() {
  const fetchOptions = {
    contentType: "faq",
    references: [],
    jsonToHTML: ["q_and_a_entry.answer", "description"],
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
      <div className="flex flex-col gap-4">
        {data !== null && (
          <>
            <h2>{data[0].title}</h2>
            <div
              className="flex flex-col gap-1"
              dangerouslySetInnerHTML={{ __html: data[0].description }}
            />
            <div className="flex flex-col gap-4">
              {data[0].q_and_a_entry.map((faq) => (
                <Faq
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
