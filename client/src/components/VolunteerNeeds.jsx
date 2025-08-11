import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import VolunteerCard from "./VolunteerCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const VolunteerNeeds = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: volunteers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["needsOnHome"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/volunteers`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div>
        <p className="text-center text-red-600 py-10">
          Failed to load volunteers data, {error.message}
        </p>
      </div>
    );

  return (
    <div className="py-16 w-11/12 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-center text-3xl md:text-4xl font-extrabold text-indigo-700 mb-2"
      >
        “Volunteer Needs”
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-gray-600 max-w-lg mx-auto mb-12 px-4"
      >
        Dive into immediate volunteer needs where your support can create an
        instant impact.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8 overflow-hidden"
      >
        {volunteers
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .slice(0, 6)
          .map((volunteer) => (
            <VolunteerCard key={volunteer._id} volunteer={volunteer} />
          ))}
      </motion.div>

      <div className="py-5">
        <Link
          to="/allVolunteers"
          className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
        >
          See All
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerNeeds;
