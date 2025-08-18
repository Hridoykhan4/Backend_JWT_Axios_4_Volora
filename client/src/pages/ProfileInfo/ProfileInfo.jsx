// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import useAuthValue from "../../hooks/useAuthValue";
import { useState } from "react";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// 🔹 Date formatter with suffix
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getDate();
  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `${day}${getOrdinal(day)} ${month}, ${year}`;
};

const ProfileInfo = () => {
  const { user } = useAuthValue();
  const [activeTab, setActiveTab] = useState("info");
  const [deadline, setDeadline] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: realUser = {},
  } = useQuery({
    queryKey: ["realUser", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user.email}`);
      return data;
    },
    enabled: !!user,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.put("/users", info);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0 || data.insertedId) {
        toast.success("Profile Updated Successfully.", {
          style: {
            border: "1px solid #00df9a",
            padding: "10px",
            color: "#00df9a",
          },
          iconTheme: {
            primary: "#00df9a",
            secondary: "white",
          },
        });
      }
      queryClient.invalidateQueries({ queryKey: ["realUser", user.email] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const handleProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const address = form.address.value;
    const phoneNumber = form.phoneNumber.value;
    const email = user?.email;
    const name = user?.displayName;
    const formInfo = { address, phoneNumber, deadline: deadline, email, name };
    await mutateAsync(formInfo);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-[#00df9a]"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          ⚠ Failed to load profile
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl py-2 w-11/12 mx-auto">
      {/* Header */}
      <motion.h2
        className="text-center font-extrabold text-3xl md:text-4xl tracking-wide text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Manage Your Profile
      </motion.h2>

      <div className="flex mt-10 flex-col md:flex-row gap-8">
        {/* Profile Card */}
        <motion.div
          className="flex flex-col flex-1 justify-center items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(0,223,154,0.4)",
          }}
        >
          <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#00df9a] to-[#008a66]">
            <img
              className="w-36 h-36 rounded-full object-cover border-4 border-white dark:border-gray-800"
              src={
                user?.photoURL || "https://i.ibb.co/2n4d5w6/default-avatar.png"
              }
              alt="User Avatar"
            />
          </div>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {user?.displayName}
          </p>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
        </motion.div>

        {/* Tabs + Content */}
        <div className="flex-1">
          <div className="flex gap-3 mb-5">
            <motion.button
              onClick={() => setActiveTab("info")}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-xl font-medium transition-colors duration-200 shadow-sm border text-sm md:text-base ${
                activeTab === "info"
                  ? "bg-[#00df9a] text-black border-[#00df9a]"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border"
              }`}
            >
              My Info
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("edit")}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-xl font-medium transition-colors duration-200 shadow-sm border text-sm md:text-base ${
                activeTab === "edit"
                  ? "bg-[#00df9a] text-black border-[#00df9a]"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border"
              }`}
            >
              Edit Profile
            </motion.button>
          </div>

          {/* Tab Content */}
          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              {activeTab === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md"
                >
                  <ul className="space-y-3">
                    <li className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Your Personal Info
                    </li>
                    <li className="text-gray-800 dark:text-gray-200">
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {formatDate(realUser?.deadline)}
                    </li>
                    <li className="text-gray-800 dark:text-gray-200">
                      <span className="font-medium">Address:</span>{" "}
                      {realUser?.address || "N/A"}
                    </li>
                    <li className="text-gray-800 dark:text-gray-200">
                      <span className="font-medium">Phone:</span>{" "}
                      {realUser?.phoneNumber || "N/A"}
                    </li>
                  </ul>
                </motion.div>
              )}

              {activeTab === "edit" && (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md"
                >
                  <form
                    onSubmit={handleProfile}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        defaultValue={realUser?.address}
                        name="address"
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#00df9a] outline-none"
                        placeholder="Enter your address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        Date of Birth
                      </label>
                      <DatePicker
                        required
                        onChange={(date) => setDeadline(date)}
                        minDate={new Date("1930-01-01")}
                        maxDate={new Date(Date.now())}
                        selected={
                          realUser?.deadline
                            ? new Date(realUser.deadline)
                            : deadline
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#00df9a] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        defaultValue={realUser?.phoneNumber}
                        type="number"
                        name="phoneNumber"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#00df9a] outline-none"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-[#00df9a] text-black font-semibold shadow-md hover:shadow-lg hover:bg-[#00c985] transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
