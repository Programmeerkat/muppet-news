import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Homepage from "./pages/Homepage";
import Newspage from "./pages/Newspage";
import News from "./pages/News";
import Faqpage from "./pages/Faqpage";

export default function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Banner
          label="Breaking news"
          dialog="Miss Piggy wins prize for best actress!"
        />
        <main className="max-w-3xl min-h-[300px] m-auto bg-sky-200">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/news/" element={<Newspage />} />
            <Route path="/news/:id/" element={<News />} />
            <Route path="/faq/" element={<Faqpage />} />
          </Routes>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}
