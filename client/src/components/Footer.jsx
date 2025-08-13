import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/imagesPro/volora_logo.png";

const sections = [
  {
    title: "Quick Links",
    items: [
      { title: "Home", link: "/" },
      { title: "Need Volunteer", link: "/volunteers" },
      { title: "Program", link: "/program" },
      { title: "Blogs", link: "/" },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "Pricing", link: "/" },
      { title: "Documentation", link: "/" },
      { title: "Guides", link: "/" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Claims", link: "/" },
      { title: "Privacy", link: "/" },
      { title: "Terms", link: "/" },
      { title: "Policies", link: "/" },
      { title: "Conditions", link: "/" },
    ],
  },
  {
    title: "Urgent Charity",
    items: [
      { title: "Old People", link: "/" },
      { title: "War Donation", link: "/" },
      { title: "Kids Donation", link: "/" },
      { title: "Policies", link: "/" },
      { title: "Non Profit School", link: "/" },
    ],
  },
];

const socialItems = [
  { icon: FaFacebook, link: "https://www.facebook.com/" },
  { icon: FaInstagram, link: "https://www.instagram.com/" },
  { icon: FaTwitter, link: "https://twitter.com/" },
];

const Footer = () => {
  return (
    <footer className="bg-blue-500/10  text-gray-900">
      <div className="max-w-[1240px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-6 gap-8 border-b border-gray-300">
        {/* Branding & Newsletter */}
        <div className="md:col-span-2">
          <Link
            to="/"
            className="text-3xl font-bold text-black flex items-center gap-2 mb-4"
          >
            <img className="w-10 h-10 rotate-90" src={logo} alt="Volora Logo" />
            Volora
          </Link>
          <p className="text-sm mb-6">
            Join CareCrew in our mission to make a difference. Let's build
            stronger communities through volunteerism and compassion.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full input sm:w-auto flex-grow px-4 py-2 rounded-md text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-[#60CBD8] font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Sections */}
        {sections.map((section, idx) => (
          <div key={idx}>
            <h6 className="font-bold uppercase mb-4">{section.title}</h6>
            <ul className="space-y-2 text-sm">
              {section.items.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="hover:underline hover:text-blue-900 transition"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1240px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} Volora. All rights reserved.</p>
        <div className="flex gap-6 text-xl mt-4 md:mt-0">
          {socialItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <item.icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
