// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MdDone } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { PiHandCoinsBold } from "react-icons/pi";
import { GiBrainstorm } from "react-icons/gi";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleHover = {
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const Programs = () => {
  return (
    <motion.div
      className="min-h-[calc(100vh-435.6px)] max-w-[1600px] w-[95%] mx-auto my-8 md:my-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* VISION & MISSION */}
      <motion.div
        className="flex flex-col md:flex-row-reverse justify-center items-center"
        variants={fadeUp}
      >
        <motion.div className="flex-1 space-y-4" variants={fadeUp}>
          <h1 className="flex items-center gap-1">
            <p className="w-[60px] h-[2px] bg-[#00df9a]"></p>VISION & MISSION
          </h1>
          <h1 className="text-5xl font-bold">
            Our Mission To Make A <br /> Difference.
          </h1>
          <p>
            Our mission is simple yet powerful: to make a difference. We are
            driven by the belief that even the smallest acts of kindness and
            compassion can create profound impacts on individuals, communities,
            and the world.
          </p>
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10 rounded-2xl bg-[#00df9aA3] text-black"
            variants={fadeUp}
          >
            <div className="flex-1 p-6 bg-[#00df9a] rounded-2xl">
              <h4 className="text-xl font-semibold mb-4">
                Community Engagement
              </h4>
              <p>
                We foster a sense of belonging and connectedness by engaging
                with communities, listening to their needs, and working together
                to address challenges.
              </p>
            </div>
            <div className="flex-1 space-y-3 p-4">
              {[
                "Make Positive Impact",
                "Empower Communities",
                "Helping Others",
              ].map((item, idx) => (
                <motion.h4
                  key={idx}
                  className="flex items-center gap-1 text-md font-semibold"
                  variants={fadeUp}
                  custom={idx + 1}
                >
                  <MdDone size={25} /> {item}
                </motion.h4>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://i.ibb.co/mCx8jhx/Image-of-a-smiling-architect-person-holding-the-ch-removebg-preview.png"
            alt=""
          />
        </motion.div>
      </motion.div>

      {/* PAST EVENTS */}
      <motion.div className="my-12 md:my-20" variants={fadeUp}>
        <div className="text-center flex flex-col justify-center items-center mb-12">
          <h1 className="flex items-center gap-1">
            <p className="w-[60px] h-[2px] bg-[#00df9a]"></p>PAST EVENTS
            HIGHLIGHTS
          </h1>
          <h1 className="text-5xl font-bold">
            The Memorable Moments From <br /> Our Past Events.
          </h1>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 my-4 gap-6"
          variants={staggerContainer}
        >
          {[
            {
              img: "https://i.ibb.co/9Tm2fCW/Children-s-celebration-on-Iraqi-National-Day.jpg",
              title: "Family-Friendly Activities",
              desc: "Enjoy a range of family-friendly activities and entertainment, including games, arts and crafts, live performances, and more.",
            },
            {
              img: "https://i.ibb.co/ZhbHvD4/A-photo-of-a-person-giving-a-donation-to-a-charity.jpg",
              title: "Volunteer Opportunities",
              desc: "Take part in meaningful volunteer activities designed to support and uplift those in need within our community.",
            },
          ].map((event, idx) => (
            <motion.div
              key={idx}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${event.img}')`,
              }}
              className="bg-cover bg-no-repeat text-white flex justify-center items-center gap-4 flex-col py-12 rounded-3xl text-center cursor-pointer px-2 overflow-hidden h-[400px] group relative"
              custom={idx}
              whileHover="hover"
              variants={{ ...fadeUp, ...scaleHover }}
            >
              <p className="animate-bounce bg-[#00df9a] p-2 rounded-full">
                <FaArrowDown size={30} />
              </p>
              <div className="absolute bottom-0 -mb-36 md:-mb-28 group-hover:mb-0 bg-white text-black w-[80%] mx-auto p-3 flex flex-col items-center gap-3 transition-all rounded-b rounded-2xl">
                <p className="w-[60px] h-[2px] bg-[#00df9a] mb-8"></p>
                <h1 className="text-2xl font-semibold">{event.title}</h1>
                <p>{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* PROGRAMS */}
      <motion.div className="my-12" variants={fadeUp}>
        <div className="text-center flex flex-col justify-center items-center">
          <h1 className="flex items-center gap-1">
            <p className="w-[60px] h-[2px] bg-[#00df9a]"></p>PROGRAMS &
            INITIATIVES
          </h1>
          <h1 className="text-5xl font-bold">
            Explore Our Diverse Range Of <br /> Programs And Initiatives.
          </h1>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 text-white my-12"
          variants={staggerContainer}
        >
          {[
            {
              icon: <LiaCertificateSolid size={70} />,
              title: "Youth Mentorship Program",
              img: "https://i.ibb.co/SrPhS51/celebration-of-mental-health-awareness-in-Lesotho-1.jpg",
              desc: "Empowering the leaders of tomorrow, our Youth Mentorship Program provides guidance, support, and encouragement...",
            },
            {
              icon: <AiTwotoneSafetyCertificate size={70} />,
              title: "Senior Companion Program",
              img: "https://i.ibb.co/qW1h8jm/Illustrate-a-playful-and-humorous-image-of-a-group.jpg",
              desc: "Combatting loneliness and fostering companionship, our Senior Companion Program pairs compassionate volunteers with seniors...",
            },
            {
              icon: <MdFastfood size={70} />,
              title: "Food Distribution Initiative",
              img: "https://i.ibb.co/cQ67044/A-photo-of-a-group-of-people-giving-food-to-a-fami.jpg",
              desc: "Addressing food insecurity and hunger within our communities, our Food Distribution Initiative ensures no one goes hungry...",
            },
            {
              icon: <PiHandCoinsBold size={70} />,
              title: "Environmental Conservation",
              img: "https://i.ibb.co/Th5GHvN/A-realistic-photo-of-an-opened-book-from-which-eme.jpg",
              desc: "Protecting our planet for future generations through preservation, waste reduction, and sustainable practices...",
            },
            {
              icon: <GiBrainstorm size={70} />,
              title: "Literacy Tutoring Program",
              img: "https://i.ibb.co/vkwNPkV/A-group-of-slightly-happy-School-staff-of-multicul-1.jpg",
              desc: "Empowering individuals through literacy with personalized tutoring and support to improve reading and writing skills...",
            },
            {
              icon: <MdOutlineMapsHomeWork size={70} />,
              title: "Home Repair Assistance",
              img: "https://i.ibb.co/Sf2CPFB/Envision-a-well-organized-construction-site-where.jpg",
              desc: "Ensuring safe living conditions by providing repairs and maintenance to those in financial need...",
            },
          ].map((program, idx) => (
            <motion.div
              key={idx}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url('${program.img}')`,
              }}
              className="bg-cover bg-no-repeat text-white flex justify-center items-center gap-4 flex-col py-12 rounded-3xl text-center cursor-pointer px-2"
              custom={idx}
              whileHover="hover"
              variants={{ ...fadeUp, ...scaleHover }}
            >
              <p>{program.icon}</p>
              <p className="text-2xl font-bold">{program.title}</p>
              <p className="px-4">{program.desc}</p>
              <motion.button
                className="bg-[#00df9a] btn rounded-full border-none outline-none text-black"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                Learn more <IoIosArrowRoundForward size={20} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Programs;
