import { useState, useEffect } from "react";
import Contentstack from "contentstack";
import richTextRenderOptions from "../utils/richTextRenderOptions";

export default function Faqpage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const Stack = Contentstack.Stack({
      api_key: process.env.REACT_APP_API_KEY,
      delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
      environment: process.env.REACT_APP_ENVIROMENT,
      region: Contentstack.Region.EU,
    });
    const Query = Stack.ContentType("faq").Query();
    Query.language("en-us")
      .toJSON()
      .find()
      .then((entry) => {
        Contentstack.Utils.jsonToHTML({
          entry,
          paths: ["q_and_a_entry.answer"],
          renderOption: richTextRenderOptions,
        });
        setFaqs(entry[0][0].q_and_a_entry);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq) => (
        <div className="p-4 rounded-xl bg-sky-100" key={faq.question}>
          <p>{faq.question}</p>
          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </div>
      ))}
    </div>
  );
}
