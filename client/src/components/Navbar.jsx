import { Link, NavLink } from "react-router-dom";
import logo from "../assets/imagesRandom/volora_logo2.png";
import useAuthValue from "../hooks/useAuthValue";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useAuthValue();
  const [open, setOpen] = useState(false);
  const { logOut } = useAuthValue();
  const toggleDrawer = () => setOpen(!open);
  const closeDrawer = () => setOpen(false);

  const navLinkStyles =
    "text-lg font-medium px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-700 transition";

  const pubLicNavItems = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/volunteers", label: "Volunteers" },
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
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full  z-50 shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex-1 flex items-center">
        <img src={logo} className="w-16 h-16" alt="Volora Logo" />
      </Link>

      {/* Desktop Nav Items */}
      <div className="hidden lg:flex items-center">
        <ul className="menu menu-horizontal px-1">{pubLicNavItems}</ul>
      </div>

      {/* Login + Hamburger */}
      <div className="flex items-center gap-2 lg:gap-4">
        {!user ? (
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
        ) : (
          <>
            <div className="dropdown dropdown-end z-[2000]">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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
        <ul className="flex flex-col gap-2 text-lg font-medium px-4 bg-black/90 text-white py-6">
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
