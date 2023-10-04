import { useState, useEffect } from "react";
import Contentstack from "contentstack";
import richTextRenderOptions from "./richTextRenderOptions";

const Stack = Contentstack.Stack({
  api_key: process.env.REACT_APP_API_KEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIROMENT,
  region: Contentstack.Region.EU,
});

export default function useContentStackFetch({
  contentType,
  entryUid,
  references,
  jsonToHTML,
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setData(null);
    setIsLoading(true);
    setIsError(false);
    const response =
      entryUid === undefined
        ? Stack.ContentType(contentType)
            .Query()
            .language("en-us")
            .includeReference(references)
            .toJSON()
            .find()
        : Stack.ContentType(contentType)
            .Entry(entryUid)
            .language("en-us")
            .includeReference(references)
            .toJSON()
            .fetch();
    response
      .then((entry) => {
        Contentstack.Utils.jsonToHTML({
          entry: entry,
          paths: jsonToHTML,
          renderOption: richTextRenderOptions,
        });
        setData(entryUid === undefined ? entry[0] : entry);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return [data, isLoading, isError];
}
