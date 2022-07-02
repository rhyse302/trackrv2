import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Watchlist from "./pages/Watchlist"
import Details from "./pages/Details"
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";

// 112613 - Ranking of Kings, 1429 - Attack on Titan, 31911 - Fullmetal Alchemist: Brotherhood

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' exact element={<Watchlist />} />
          <Route path='search/:keyword' element={<SearchResults />} />
          <Route path=':category/:id' element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
