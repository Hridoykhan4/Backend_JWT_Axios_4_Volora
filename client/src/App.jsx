import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useAuthValue from "./hooks/useAuthValue";
import LoadingSpinner from "./components/LoadingSpinner";
import { TiPlane } from "react-icons/ti";
import useScrollTo from "./hooks/useScrollTo";
import Footer from "./components/Footer";

function App() {
  const { loading } = useAuthValue();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <header className="bg-base-100 shadow-sm">
        <Navbar />
      </header>

      <main className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>

      <>
      <Footer></Footer>
      </>

      <button
        onClick={useScrollTo}
        className="fixed bottom-4 right-4 bg-[#008b8b] p-4 rounded-full text-white transition-opacity duration-300"
      >
        <TiPlane />
      </button>
    </>
  );
}

export default App;
