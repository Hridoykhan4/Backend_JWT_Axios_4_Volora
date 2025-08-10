import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import VolunteerCard from "../../components/VolunteerCard";
import useScrollTo from "../../hooks/useScrollTo";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const AllVolunteer = () => {
  useScrollTo();
  const axiosSecure = useAxiosSecure();

  const {
    data: volunteers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["needsOnDeadline"],
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
    <div className="py-10 mx-auto w-11/12">
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
    </div>
  );
};

export default AllVolunteer;
