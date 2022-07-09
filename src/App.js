import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/Notfound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { GithubProvider } from "./context/github/GithubContext";

function App() {
  return (
    <GithubProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen bg-gray-800">
          <Navbar />
          <main className="text-white container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GithubProvider>

    // <BrowserRouter>
    //   <div className="flex flex-col justify-between h-screen bg-gray-800">
    //     <Routes>
    //       <Route path="/" element={<Navbar />} />
    //     </Routes>
    //     <main className="bg-gray-50 container mx-auto px-3 pb-12">Content</main>
    //     <Footer />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
