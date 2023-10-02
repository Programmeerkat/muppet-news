import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contentstack from "contentstack";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Homepage from "./pages/Homepage";
import Allnewspage from "./pages/Allnewspage";
import Singlenewspage from "./pages/Singlenewspage";
import Faqpage from "./pages/Faqpage";

export default function App() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const Stack = Contentstack.Stack({
      api_key: process.env.REACT_APP_API_KEY,
      delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
      environment: process.env.REACT_APP_ENVIROMENT,
      region: Contentstack.Region.EU,
    });
    const Query = Stack.ContentType("global_settings").Query();
    Query.language("en-us")
      .toJSON()
      .find()
      .then((result) => setSettings(result[0][0]))
      .catch((error) => console.error(error));
  }, []);

  const slogan = settings?.slogan ?? "";
  const showBanner = settings?.banner?.display_banner ?? false;
  const bannerLabel = settings?.banner?.banner_label ?? "";
  const bannerDialog = settings?.banner?.banner_dialog ?? "";
  const bannerColor = settings?.banner?.banner_color ?? "#ffffff";
  const information = settings?.copyright_information ?? "";

  return (
    <BrowserRouter>
      <>
        <Header slogan={slogan} />
        {showBanner && (
          <Banner
            label={bannerLabel}
            dialog={bannerDialog}
            color={bannerColor}
          />
        )}
        <main className="max-w-3xl min-h-[300px] m-auto bg-sky-200 p-4">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/news/" element={<Allnewspage />} />
            <Route path="/news/:id/" element={<Singlenewspage />} />
            <Route path="/faq/" element={<Faqpage />} />
          </Routes>
        </main>
        <Footer information={information} />
      </>
    </BrowserRouter>
  );
}
