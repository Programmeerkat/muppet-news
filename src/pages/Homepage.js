import { useState } from "react";
import Contentstack from "contentstack";

export default function Homepage() {
  const [home, setHome] = useState([]);

  const Stack = Contentstack.Stack({
    api_key: process.env.REACT_APP_API_KEY,
    delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
    environment: process.env.REACT_APP_ENVIROMENT,
    region: Contentstack.Region.EU,
  });
  const Query = Stack.ContentType("homepage").Query();
  Query.language("en-us")
    .toJSON()
    .find()
    .then((result) => setHome(result[0][0]))
    .catch((error) => console.log(error));
  return (
    <div>
      <p>Homepage</p>
    </div>
  );
}
