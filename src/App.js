import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';
import Newspage from './Newspage';
import News from './News';
import Faqpage from './Faqpage';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/news/' element={<Newspage/>}/>
            <Route path='/news/:id/' element={<News/>}/>
            <Route path='/faq/' element={<Faqpage/>}/>
          </Routes>
        </main>
        <Footer/>
      </>
    </BrowserRouter>
  );
}

export default App;
