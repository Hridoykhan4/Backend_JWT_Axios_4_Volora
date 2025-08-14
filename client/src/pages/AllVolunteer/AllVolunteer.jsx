// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import VolunteerCard from "../../components/VolunteerCard";
import useScrollTo from "../../hooks/useScrollTo";
import { useEffect, useState } from "react";
import VolunteerTable from "../../components/VolunteerTable";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const tableVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const AllVolunteer = () => {
  const [layout, setLayout] = useState("card");
  const [inputValue, setInputValue] = useState("");
  useScrollTo();
  const axiosSecure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const numberOfPages = Math.ceil(count / pageSize);

  const {
    data: volunteers = [],
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allVolunteer", inputValue, currentPage, pageSize],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/volunteers?searchField=${inputValue}&page=${currentPage}&size=${pageSize}`
      );
      return data;
    },
  });

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/totalVolunteersPostCount?searchField=${inputValue}`
      );
      setCount(data.count);
    };

    getCount();
  }, [axiosSecure, inputValue]);

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
        className="w-full mx-auto mb-10"
      >
        <input
          type="text"
          onChange={(e) => {
            !e.target.value && setCurrentPage(1);
            setInputValue(e.target.value);
            // setCurrentPage(1);
          }}
          placeholder="Search by Title/Category"
          className="w-full max-w-md mx-auto block px-4 py-2 text-gray-800 placeholder-gray-400 bg-white border 
               border-gray-300 rounded-lg shadow-sm focus:outline-none 
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition-all duration-300"
        />

        <div className="flex justify-end mt-4 gap-2">
          {/* Card Layout Button */}
          <button
            onClick={() => setLayout("card")}
            className={`flex ${
              layout === "card"
                ? "focus:ring-blue-400 bg-blue-600 transition  rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2"
                : "bg-gray-600 hover:bg-gray-700"
            } items-center gap-2 px-4 py-2 text-sm font-medium text-white`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            Card Layout
          </button>

          {/* Table Layout Button */}
          <button
            onClick={() => setLayout("table")}
            className={`flex ${
              layout === "table"
                ? "focus:ring-blue-400 bg-blue-600 transition  rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2"
                : "bg-gray-600 hover:bg-gray-700"
            } items-center gap-2 px-4 py-2 text-sm font-medium text-white`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="4" rx="1" />
              <rect x="3" y="9" width="18" height="4" rx="1" />
              <rect x="3" y="15" width="18" height="4" rx="1" />
            </svg>
            Table Layout
          </button>
        </div>
      </motion.div>

      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : volunteers.length === 0 ? (
        <>
          <h2 className="text-center text-red-600 font-semibold">
            No Volunteer Found !!
          </h2>
        </>
      ) : layout === "card" ? (
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
      ) : (
        <motion.div
          variants={tableVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          // className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8"
        >
          <div className="overflow-x-auto rounded-2xl border border-indigo-300 shadow-md">
            <table className="w-full border-collapse text-left">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold">Thumbnail</th>
                  <th className="px-6 py-3 text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-sm font-semibold">Deadline</th>
                  <th className="px-6 py-3 text-sm font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer, i) => (
                  <VolunteerTable
                    key={volunteer._id}
                    i={i}
                    volunteer={volunteer}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {numberOfPages > 1 && (
        <div className="py-10 flex gap-2 justify-center flex-wrap items-center">
          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`btn btn-outline px-4 py-2 rounded-lg transition ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-500 hover:text-white"
            }`}
          >
            ◀ Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                onClick={() => setCurrentPage(pageNum)}
                className={`btn px-4 py-2 rounded-lg transition ${
                  pageNum === currentPage
                    ? "btn-success text-white shadow-lg scale-105"
                    : "btn-outline hover:bg-indigo-500 hover:text-white"
                }`}
                key={pageNum}
              >
                {pageNum}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))
            }
            disabled={currentPage === numberOfPages}
            className={`btn btn-outline px-4 py-2 rounded-lg transition ${
              currentPage === numberOfPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-500 hover:text-white"
            }`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default AllVolunteer;
