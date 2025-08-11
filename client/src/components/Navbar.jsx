import { Link, NavLink } from "react-router-dom";
import logo from "../assets/imagesRandom/volora_logo2.png";
import useAuthValue from "../hooks/useAuthValue";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiUser,
  FiPlusCircle,
  FiClipboard,
  FiUsers,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";
const Navbar = () => {
  const { user } = useAuthValue();
  const [open, setOpen] = useState(false);
  const { logOut } = useAuthValue();
  const toggleDrawer = () => setOpen(!open);
  const closeDrawer = () => setOpen(false);
  const navLinkStyles = "font-medium  rounded  transition";

  const pubLicNavItems = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/allVolunteers", label: "Volunteers" },
        { to: "/programs", label: "Programs" },
        { to: "/about", label: "About" },
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `${navLinkStyles} ${isActive ? "bg-blue-600 text-white" : ""}`
            }
            onClick={closeDrawer}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <div className="navbar bg-base-100  fixed top-0 left-0 w-full  z-50 shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex-1 flex  items-center">
        <img src={logo} className="w-16 h-16" alt="Volora Logo" />
      </Link>

      {/* Desktop Nav Items */}
      <div className="hidden lg:flex gap-4  items-center">
        <ul className="menu menu-horizontal space-x-4 px-1 ">
          {pubLicNavItems}
        </ul>
      </div>

      {/* Login + Hamburger */}
      <div className="flex items-center gap-2 lg:gap-4">
        {!user ? (
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
        ) : (
          <>
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12  rounded-full">
                  <img
                    title={user?.displayName}
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <ul className="dropdown dropdown-end w-full cursor-pointer -ml-[1px]">
                    <div tabIndex={0} role="button">
                      <div className="indicator">
                        <div
                          // href="/profile"
                          className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                          <FiUser size={20} />
                          <span>My Profile 👇</span>
                        </div>
                      </div>
                    </div>
                    <div
                      tabIndex={0}
                      className=" dropdown-content bg-base-100 space-y-2 z-1 mt-3  shadow"
                    >
                      <li>
                        <NavLink
                          to="/add-volunteer"
                          className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                          <FiPlusCircle size={20} />
                          <span>Add Volunteer Post</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/manage-posts"
                          className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                          <FiClipboard size={20} />
                          <span>Manage My Posts</span>
                        </NavLink>
                      </li>
                    </div>
                  </ul>
                </li>

                <li>
                  <a
                    href="/volunteer-requests"
                    className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    <FiUsers size={20} />
                    <span>Volunteer Requested</span>
                  </a>
                </li>
                <li>
                  <button
                    // onClick={toggleDarkMode}
                    aria-label="Toggle Dark Mode"
                    className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
                  >
                    <FiSun></FiSun>
                    {/* {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />} */}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logOut().then(() => {
                        toast.success("Successfully Logout", {
                          position: "top-right",
                        });
                        closeDrawer;
                      });
                    }}
                    aria-label="Log Out"
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 transition"
                  >
                    <FiLogOut size={20} />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        <button
          onClick={toggleDrawer}
          className="btn btn-ghost text-2xl text-blue-700 lg:hidden"
          aria-label="Toggle menu"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0  bg-opacity-40 z-[998]"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed lg:hidden top-20 bg-black left-0 w-full h-full  z-[999] transform transition-transform duration-700 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex bg-black text-white items-center justify-between p-4 border-b shadow-sm">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <button
            onClick={toggleDrawer}
            className="text-2xl cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer Nav Items */}
        <ul className="flex flex-col gap-2 text-lg font-medium space-y-3 px-4 bg-black/90 text-white py-6">
          {pubLicNavItems}
          {/* Drawer Login (Mobile only) */}
          {!user ? (
            <Link
              to="/login"
              onClick={closeDrawer}
              className="mt-2 mx-4 btn btn-outline btn-sm"
            >
              Login
            </Link>
          ) : (
            <li>
              <button
                onClick={() => {
                  logOut().then(() => {
                    toast.success("Successfully Logout", {
                      position: "top-right",
                    });
                    closeDrawer;
                  });
                }}
                className="mt-2 mx-4 btn btn-outline btn-sm"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
