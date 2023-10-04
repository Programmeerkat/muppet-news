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
import useContentStackFetch from "./utils/useContentStackFetch";

export default function App() {
  const fetchOptions = {
    contentType: "global_settings",
    references: [],
    jsonToHTML: [],
  };

  const [settings, isLoading, isError] = useContentStackFetch(fetchOptions);

  const slogan = settings?.[0].slogan ?? "";
  const showBanner = settings?.[0].banner?.display_banner ?? false;
  const bannerLabel = settings?.[0].banner?.banner_label ?? "";
  const bannerDialog = settings?.[0].banner?.banner_dialog ?? "";
  const bannerColor = settings?.[0].banner?.banner_color ?? "#ffffff";
  const information = settings?.[0].copyright_information ?? "";

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
