import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './Loader';

const Home = lazy(() => import("./pages/Home"));
const Generation = lazy(() => import("./pages/Generation"))

function App() {
  const [theme] = useState("🌑");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  },[theme])


  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generation/:id/:name" element={<Generation />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App