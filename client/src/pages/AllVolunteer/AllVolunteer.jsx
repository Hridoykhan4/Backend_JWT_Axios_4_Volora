// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import VolunteerCard from "../../components/VolunteerCard";
import useScrollTo from "../../hooks/useScrollTo";
import { useState } from "react";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const AllVolunteer = () => {
  const [inputValue, setInputValue] = useState("");
  useScrollTo();
  const axiosSecure = useAxiosSecure();

  const {
    data: volunteers = [],
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allVolunteer", inputValue],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/volunteers?searchField=${inputValue}`
      );
      return data;
    },
  });

  if (isError)
    return (
      <div>
        <p className="text-center text-red-600 py-10">
          Failed to load volunteers data, {error.message}
        </p>
      </div>
    );

  return (
    <div className="py-10 mx-auto w-11/12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-md mx-auto mb-10"
      >
        <input
          type="text"
          // value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search by Title/Category"
          className="w-full px-4 py-2 text-gray-800 placeholder-gray-400 bg-white border 
               border-gray-300 rounded-lg shadow-sm focus:outline-none 
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition-all duration-300"
        />
      </motion.div>

      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : volunteers.length === 0 ? (
        <>
          <h2 className="text-center text-red-600 font-semibold">
            No Volunteer Found !!
          </h2>
        </>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8"
        >
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer._id} volunteer={volunteer} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllVolunteer;
