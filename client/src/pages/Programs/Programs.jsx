// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MdDone } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";

const Programs = () => {
  const missionPoints = [
    "Make Positive Impact",
    "Empower Communities",
    "Helping Others",
  ];

  const pastEvents = [
    {
      img: "https://i.ibb.co/9Tm2fCW/Children-s-celebration-on-Iraqi-National-Day.jpg",
      title: "Family-Friendly Activities",
      desc: "Games, arts & crafts, and fun events for all ages.",
    },
    {
      img: "https://i.ibb.co/ZhbHvD4/A-photo-of-a-person-giving-a-donation-to-a-charity.jpg",
      title: "Volunteer Opportunities",
      desc: "Helping and supporting those in need within our community.",
    },
  ];

  const programs = [
    {
      icon: <LiaCertificateSolid size={50} />,
      title: "Youth Mentorship Program",
      desc: "Guidance and encouragement to empower future leaders.",
    },
    {
      icon: <MdDone size={50} />,
      title: "Community Engagement",
      desc: "Connecting and supporting communities in meaningful ways.",
    },
    {
      icon: <IoIosArrowRoundForward size={50} />,
      title: "Volunteer & Support",
      desc: "Hands-on opportunities to help others and create impact.",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto my-16 px-4 space-y-20">
      {/* VISION & MISSION */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-[#00df9a] font-semibold">VISION & MISSION</h2>
        <h1 className="text-4xl font-bold">
          Our Mission To Make A Difference
        </h1>
        <p>
          We believe that even the smallest acts of kindness can create a big
          impact. Our mission is to empower communities, support the needy,
          and make the world a better place.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-6">
          <div className="bg-[#00df9a] p-6 rounded-xl text-white flex-1">
            <h3 className="text-xl font-bold mb-3">Community Engagement</h3>
            <p>
              We connect with communities, understand their needs, and work
              together to bring meaningful change.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2">
            {missionPoints.map((point, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <MdDone size={24} className="text-[#00df9a]" /> {point}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* PAST EVENTS */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-[#00df9a] font-semibold mb-2">
          PAST EVENTS
        </h2>
        <h1 className="text-center text-4xl font-bold mb-8">
          Memorable Moments From Our Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pastEvents.map((event, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-sm">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* PROGRAMS */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-[#00df9a] font-semibold mb-2">
          PROGRAMS & INITIATIVES
        </h2>
        <h1 className="text-center text-4xl font-bold mb-8">
          Explore Our Programs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold mb-2">{program.title}</h3>
              <p className="text-gray-700">{program.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Programs;
