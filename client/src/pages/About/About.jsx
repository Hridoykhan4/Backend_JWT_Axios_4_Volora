import { useState } from "react";
import { CiCircleQuestion } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const About = () => {
  const [ans, setAns] = useState({
    title: "Who We Are",
    ans: "CareCrew is a dedicated team of volunteers, caregivers, and community members who are committed to fostering a culture of compassion, kindness, and service. We believe that everyone has something valuable to contribute, and we're here to help individuals find opportunities to share their time, talents, and resources for the greater good.",
  });

  const faq = [
    {
      title: "Who We Are",
      ans: "CareCrew is a dedicated team of volunteers, caregivers, and community members who are committed to fostering a culture of compassion, kindness, and service. We believe that everyone has something valuable to contribute, and we're here to help individuals find opportunities to share their time, talents, and resources for the greater good.",
    },
    {
      title: "What We Do",
      ans: "Through our Volunteer Management Website, we provide a centralized platform where volunteers can discover, sign up for, and track their volunteer activities. We partner with local organizations, nonprofits, and community groups to offer a diverse range of volunteer opportunities across various causes and sectors.",
    },
    {
      title: "Why Volunteer with CareCrew",
      ans: "Impactful Opportunities:  Whether you're passionate about supporting seniors, caring for the environment, or empowering youth, CareCrew offers a wide range of volunteer opportunities that align with your interests and values. Flexible Engagement: We understand that everyone has busy schedules and unique commitments. That's why we offer flexible volunteer opportunities that allow you to give back on your own terms, whether it's a one-time event, a recurring commitment, or a remote opportunity. Supportive Community: When you volunteer with CareCrew, you become part of a supportive community of like-minded individuals who share your passion for making a difference. Connect with fellow volunteers, share experiences, and celebrate the impact you're making together.",
    },
    {
      title: "How does CareCrew work",
      ans: "CareCrew works by partnering with local organizations, nonprofits, and community groups to offer a diverse range of volunteer opportunities across various causes and sectors. Volunteers can browse through these opportunities, sign up for those that align with their interests and availability, and track their volunteer hours and impact through their CareCrew account.",
    },
    {
      title: "Who can volunteer with CareCrew",
      ans: "CareCrew welcomes individuals of all ages, backgrounds, and abilities to volunteer with us. Whether you're a student looking for service-learning opportunities, a professional seeking to give back to your community, or a retiree wanting to stay active and engaged, there's a place for you at CareCrew.",
    },
  ];

  const teams = [
    {
      name: "Pranta Deba",
      photo: "https://i.ibb.co/JnThXMB/1655721926569-3.jpg",
      phone: "+1234567890",
      email: "pranta@gmail.com",
    },
    {
      name: "Jane Smith",
      photo:
        "https://i.ibb.co/rHty5Fy/dropshipping-with-transparent-background.jpg",
      phone: "+1987654321",
      email: "jane@gmail.com",
    },
    {
      name: "Alex Johnson",
      photo:
        "https://i.ibb.co/J50j76g/cyberpunk-beautiful-man-with-Poland-Flag.jpg",
      phone: "+1122334455",
      email: "alex@gmail.com",
    },
    {
      name: "Emily Brown",
      photo: "https://i.ibb.co/WPp0xfV/cyberpunk-style.jpg",
      phone: "+1555666777",
      email: "emily@gmail.com",
    },
    {
      name: "Michael Lee",
      photo: "https://i.ibb.co/8MzVK3b/A-passionate-male-robot-runs-fast.jpg",
      phone: "+1888888888",
      email: "michael@gmail.com",
    },
    {
      name: "Sarah Garcia",
      photo:
        "https://i.ibb.co/xC6Wnf0/Make-Disney-pixar-poster-ambience-like-university.jpg",
      phone: "+1777777777",
      email: "sarah@gmail.com",
    },
    {
      name: "David Wang",
      photo:
        "https://i.ibb.co/55245t1/Image-of-a-smiling-architect-person-holding-the-ch-1.jpg",
      phone: "+1666666666",
      email: "david@gmail.com",
    },
    {
      name: "Olivia Martinez",
      photo:
        "https://i.ibb.co/L6MtzGF/Outdoor-portrait-of-a-happy-50-year-old-white-the.jpg",
      phone: "+1444444444",
      email: "olivia@gmail.com",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-[calc(100vh-435.6px)] max-w-[1600px] w-[95%] lg:w-[80%] mx-auto my-8 md:my-2"
    >
      {/* Heading */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center flex flex-col justify-center items-center mb-12"
      >
        <h1 className="flex items-center gap-1">
          <p className="w-[30px] h-[2px] bg-[#00df9a]"></p>About CareCrew
        </h1>
        <h1 className="text-5xl font-bold">About Us</h1>
      </motion.div>

      {/* FAQ Section */}
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h1 className="uppercase font-bold">{ans.title}?</h1>
          <hr />
          <p className="mt-4" id="qes">
            {ans.ans}
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:px-20"
        >
          <h1 className="uppercase font-bold">Important FAQs</h1>
          <div className="space-y-4 mt-4">
            {faq.map((f) => (
              <motion.p
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setAns(f);
                }}
                key={f.title}
                className={`flex items-center text-2xl cursor-pointer gap-3 p-2 rounded-md ${
                  ans.title === f.title
                    ? "text-black font-semibold border-2 border-transparent bg-[#00df9a]"
                    : "text-[#00df9a] font-semibold border-2 border-[#00df9a]"
                }`}
              >
                <CiCircleQuestion />
                {f.title}?
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center flex flex-col justify-center items-center mb-12">
          <h1 className="flex items-center gap-1">
            <p className="w-[30px] h-[2px] bg-[#00df9a]"></p>Our group of
            volunteers
          </h1>
          <h1 className="text-5xl font-bold">Member</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-8">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
            >
              <img
                src={team.photo}
                alt=""
                className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
              />
              <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-wide">
                    {team.name}
                  </h2>
                  <p className="dark:text-gray-800 flex items-center gap-1">
                    <FaPhoneVolume />
                    {team.phone}
                  </p>
                  <p className="dark:text-gray-800 flex items-center gap-1">
                    <MdOutlineMailOutline />
                    {team.email}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://i.ibb.co/bNGs8r7/praying-hands-together-in-turquoise-background-On.jpg')",
        }}
        className="mb-12 py-20 px-4 bg-fixed bg-cover bg-no-repeat shadow-lg text-white"
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <motion.h1
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold"
          >
            Are you ready to volunteer?
          </motion.h1>
          <p>Start one of our programs today and help people in need</p>
          <p className="w-[90px] h-[2px] bg-[#00df9a]"></p>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to={"/volunteers"}
              className="btn bg-transparent border-2 border-[#00df9a] text-[#00df9a] outline-none px-8 text-lg hover:bg-[#00df9a] hover:text-black transition-all duration-300"
            >
              Volunteer Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
