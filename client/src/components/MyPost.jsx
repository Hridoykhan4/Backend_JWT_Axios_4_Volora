import { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const categories = [
  "HealthCare",
  "Education",
  "Social Service",
  "Animal Welfare",
];

const MyPost = ({ post, i }) => {
  const [deadline, setDeadline] = useState(new Date(post?.deadline));
  const { name, email, photo } = post?.organizer || {};
  const [updateModal, setUpdateModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const categoryColor = {
    "Social Service": "bg-green-500",
    Education: "bg-yellow-500",
    "Animal Welfare": "bg-pink-500",
    HealthCare: "bg-red-500",
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (others) => {
      const { data } = await axiosSecure.put(`/volunteer/${post?._id}`, others);
      return data;
    },
    onSuccess: (data) => {
      setUpdateModal(false);
      [
        "my-post",
        "volunteerDetails",
        "needsOnHome",
        "allVolunteer",
        "my-request",
      ].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      if (data.modifiedCount) {
        toast.success(
          data?.message || "Volunteer details updated successfully!",
          {
            duration: 3000,
            position: "top-center",
          }
        );
      } else {
        toast.success(data?.message || "No changes were made!");
      }
    },
    onError: (error) => {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(`❌ ${errMsg}`, { duration: 4000, position: "top-left" });
    },
  });

  const { mutateAsync: deleteVolunteer } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/volunteer/${post?._id}`, id);
      return data;
    },
    onSuccess: (data) => {
      [
        "my-post",
        "needsOnHome",
        "allVolunteer",
        "my-requests",
      ].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      toast.success(data?.message || "Volunteer deleted successfully!", {
        duration: 3000,
        position: "top-center",
      });
    },
    onError: (error) => {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(`❌ ${errMsg}`, { duration: 4000, position: "top-left" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValue = Object.fromEntries(formData.entries());
    const { volunteersNeeded, ...rest } = formValue;
    rest.deadline = deadline;
    rest.organizer = { name, email, photo };
    rest.volunteersNeeded = parseInt(volunteersNeeded);
    mutateAsync(rest);
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="p-5 rounded-lg shadow-lg bg-white border border-gray-300 w-80">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-5">
            Are you sure you want to delete this post?
          </h2>
          <div className="flex justify-center gap-5">
            <button
              onClick={() => {
                deleteConfirm(id);
                toast.dismiss(t.id);
              }}
              className="px-5 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-5 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 10000,
        style: { background: "transparent", boxShadow: "none" },
      }
    );
  };

  const deleteConfirm = async (id) => {
    await deleteVolunteer(id);
  };

  return (
    <tr className="hover:bg-indigo-100 transition-colors duration-300 border-b border-gray-200 last:border-b-0">
      <th className="px-5 py-4 text-center font-semibold text-indigo-700 text-lg">
        {i + 1}
      </th>

      <td className="px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="mask mask-squircle h-14 w-14 overflow-hidden shadow-md">
              <img
                src={post?.thumbnail}
                alt={post?.postTitle}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-indigo-900 text-lg">
              {post?.organizer?.name}
            </p>
            <p className="text-gray-500 text-sm">{post?.location}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="font-semibold text-gray-900 text-lg">{post?.postTitle}</p>
        <span
          className={`inline-block ${
            categoryColor[post?.category] || "bg-gray-500"
          } mt-2 px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-full shadow-sm select-none`}
        >
          {post?.category}
        </span>
      </td>

      <td className="px-5 py-4 text-gray-700 font-medium">
        {new Date(post?.deadline).toLocaleDateString()}
      </td>

      <td className="px-5 py-4 text-center font-semibold text-indigo-600 text-lg">
        {post?.volunteersNeeded}
      </td>

      {updateModal && (
        <td
          colSpan={6}
          className="modal modal-open modal-bottom sm:modal-middle"
        >
          <div className="modal-box max-w-4xl p-8 rounded-3xl shadow-2xl border border-indigo-300 bg-gradient-to-tr from-indigo-50 to-white">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-indigo-700 text-center mb-4">
                Update Volunteer Post
              </h3>

              {/* Post Title */}
              <div>
                <label className="block mb-1 font-semibold text-indigo-700">
                  Post Title
                </label>
                <input
                  type="text"
                  defaultValue={post?.postTitle}
                  name="postTitle"
                  className="w-full border border-indigo-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-indigo-400"
                  placeholder="e.g. Community Cleanup Drive"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-semibold text-indigo-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={post?.description}
                  className="w-full border border-indigo-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-indigo-400 resize-none"
                  rows="4"
                  placeholder="Write details about the volunteer activity..."
                  required
                />
              </div>

              {/* Location & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-semibold text-indigo-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={post?.location}
                    className="w-full border border-indigo-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-indigo-400"
                    placeholder="e.g. Central Park"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-indigo-700">
                    Date
                  </label>
                  <DatePicker
                    minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                    className="w-full border border-indigo-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    required
                  />
                </div>
              </div>

              {/* Volunteers Needed & Thumbnail URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-semibold text-indigo-700">
                    Volunteers Needed
                  </label>
                  <input
                    type="number"
                    name="volunteersNeeded"
                    defaultValue={post?.volunteersNeeded}
                    className="w-full border border-indigo-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-indigo-400"
                    placeholder="e.g. 15"
                    required
                    min={1}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-indigo-700">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    defaultValue={post?.thumbnail}
                    className="w-full border border-indigo-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-indigo-400"
                    placeholder="Paste image link"
                    required
                  />
                </div>
              </div>

              {/* Category & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-semibold text-indigo-700">
                    Select a category
                  </label>
                  <select
                    required
                    defaultValue={post?.category}
                    name="category"
                    className="w-full select select-bordered border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option disabled>Pick a Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-indigo-700">
                    Email
                  </label>
                  <input
                    value={email}
                    disabled
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-gray-100 cursor-not-allowed text-gray-500"
                  />
                </div>
              </div>

              {/* Organizer Name */}
              <div>
                <label className="block mb-1 font-semibold text-indigo-700">
                  Name
                </label>
                <input
                  value={name}
                  disabled
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-gray-100 cursor-not-allowed text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition"
              >
                Update Post
              </motion.button>
            </motion.form>

            {/* Close Modal */}
            <div className="modal-action mt-4">
              <button
                onClick={() => setUpdateModal(false)}
                className="btn btn-outline btn-indigo w-full hover:bg-indigo-50"
              >
                Close
              </button>
            </div>
          </div>
        </td>
      )}

      {/* Actions */}
      <td className="flex gap-3 justify-center items-center px-3 py-10">
        <button
          onClick={() => setUpdateModal(true)}
          title="Update"
          className="btn btn-sm btn-outline btn-info flex items-center gap-1 hover:bg-info hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536M16.5 6.75L7.5 15.75v3h3l9-9-3-3z"
            />
          </svg>
          Update
        </button>

        <button
          onClick={() => handleDelete(post?._id)}
          title="Delete"
          className="btn btn-sm btn-outline btn-error flex items-center gap-1 hover:bg-error hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
            />
          </svg>
          Delete
        </button>

        <Link
          to={`/view-volunteer/${post?._id}`}
          className="btn btn-xs text-gray-600 hover:text-indigo-700 transition font-semibold"
          title="Details"
        >
          Details
        </Link>
      </td>
    </tr>
  );
};

export default MyPost;
