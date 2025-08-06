import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <header className=" bg-base-100 shadow-sm">
        <Navbar></Navbar>
      </header>

      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default App;
