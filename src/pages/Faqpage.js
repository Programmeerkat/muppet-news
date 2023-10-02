import { useState, useEffect } from "react";
import Faq from "../components/Faq";
import Contentstack from "contentstack";
import richTextRenderOptions from "../utils/richTextRenderOptions";

export default function Faqpage() {
  const [pageData, setPageDate] = useState([]);

  useEffect(() => {
    const Stack = Contentstack.Stack({
      api_key: process.env.REACT_APP_API_KEY,
      delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
      environment: process.env.REACT_APP_ENVIROMENT,
      region: Contentstack.Region.EU,
    });
    Stack.ContentType("faq")
      .Query()
      .language("en-us")
      .toJSON()
      .find()
      .then((entry) => {
        Contentstack.Utils.jsonToHTML({
          entry,
          paths: ["q_and_a_entry.answer", "description"],
          renderOption: richTextRenderOptions,
        });
        setPageDate(entry[0][0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const title = pageData.title ?? "";
  const description = pageData.description ?? "";
  const faqs = pageData.q_and_a_entry ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h2>{title}</h2>
      <div
        className="flex flex-col gap-1"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex flex-col gap-4">
        {faqs.map((faq) => (
          <Faq key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
