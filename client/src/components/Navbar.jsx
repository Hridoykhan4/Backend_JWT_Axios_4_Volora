import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/imagesPro/volora_logo.png";
import { HiMiniBarsArrowDown } from "react-icons/hi2";
import useAuthValue from "../hooks/useAuthValue";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, logOut } = useAuthValue();
  const nav = useNavigate();
  const activeLinkStyle = ({ isActive }) =>
    isActive
      ? "border-b-2 border-l-2 border-r-2 rounded-6 border-lime-500 "
      : "";

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={activeLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/volunteer" className={activeLinkStyle}>
          Volunteer
        </NavLink>
      </li>
      <li>
        <NavLink to="/programs" className={activeLinkStyle}>
          Programs
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={activeLinkStyle}>
          About
        </NavLink>
      </li>
    </>
  );

  /* Log out */
  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Signed Out Successfully", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#1e3a8a",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "1px solid #2563eb",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#f0fdf4",
        },
      });
      nav("/");
    });
  };

  return (
    <div className="w-full bg-base-100 shadow-md z-40 relative">
      <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />

      <div className="drawer-side fixed top-0 left-0 h-full z-50 md:hidden transition-transform duration-300">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className=" w-64 min-h-full p-5 pt-10 text-white  bg-black/60 rounded-r-lg shadow-lg">
          <ul className="menu text-lg space-y-2">{navItems}</ul>
        </div>
      </div>

      <div className="navbar w-[98%] mx-auto py-2 px-1 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-1 items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="rotate-90 w-14 h-14 md:w-16 md:h-16"
              src={logo}
              alt="Volora Logo"
            />
            <span className="text-xl font-bold hidden sm:inline">Volora</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="md:hidden  ml-2 ">
          <label
            htmlFor="my-drawer"
            className="cursor-pointer text-3xl text-green-700"
          >
            <HiMiniBarsArrowDown />
          </label>
        </div>

        {!user ? (
          <Link
            to="/login"
            className="relative ml-2 flex items-center px-5 py-2 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
          >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Login
            </span>
          </Link>
        ) : (
          <div className="ms-auto">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <img
                  src={user?.photoURL}
                  className="w-12 cursor-pointer rounded-full h-12 ring-sky-200 ring-4"
                  alt=""
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
                <li>
                  <button onClick={handleLogOut} className="btn">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
