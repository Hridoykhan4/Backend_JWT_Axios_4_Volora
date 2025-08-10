// eslint-disable-next-line no-unused-vars
import { motion, transform } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, boxShadow: "0 12px 20px rgba(99, 102, 241, 0.3)" },
};

const VolunteerCard = ({ volunteer }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      // whileHover="hover"
      className="p-6 max-w-lg border hover:scale-105 transition-all  border-indigo-300  rounded-3xl flex flex-col items-center bg-white cursor-pointer  duration-700 ease-in-out"
    >
      <img
        src={volunteer?.thumbnail}
        alt={volunteer.postTitle}
        className="h-52 w-full object-cover rounded-xl border border-gray-200 shadow-sm"
      />

      <div className="mt-6 w-full text-center">
        <h4 className="font-extrabold text-2xl text-indigo-700 leading-tight">
          {volunteer.postTitle}
        </h4>

        <p className="mt-2 text-indigo-600 font-semibold uppercase tracking-wide text-sm">
          {volunteer.category}
        </p>

        <p className="mt-1 text-gray-500 text-sm">
          Deadline:{" "}
          <time dateTime={volunteer.deadline}>
            {new Date(volunteer.deadline).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </p>

        <button
          type="button"
          className="mt-6 w-full rounded-md bg-indigo-600 px-5 py-2 text-white font-semibold text-sm shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default VolunteerCard;
