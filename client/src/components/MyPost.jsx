import { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MyPost = ({ post, i }) => {
  const [deadline, setDeadline] = useState(new Date());
  const { name, email, photo } = post?.organizer || {};
  const [updateModal, setUpdateModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // UseMutate
  const { mutateAsync } = useMutation({
    mutationFn: async (others) => {
      const { data } = await axiosSecure.put(`/volunteer/${post?._id}`, others);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["my-post"] });
      queryClient.invalidateQueries({ queryKey: ["volunteerDetails"] });
      queryClient.invalidateQueries({ queryKey: ["needsOnHome"] });
      queryClient.invalidateQueries({ queryKey: ["allVolunteer"] });
      toast.success(data?.message || "Request submitted successfully");
    },
    onError: (error) => {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errMsg);
      console.error("❌ Error:", errMsg);
    },
  });

  // Handle Update Job
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValue = Object.fromEntries(formData.entries());
    const { volunteersNeeded, ...rest } = formValue;
    rest.deadline = deadline;
    rest.organizer = {
      name,
      email,
      photo,
    };
    rest.volunteersNeeded = parseInt(volunteersNeeded);
    mutateAsync(rest);
  };

  return (
    <tr className="hover:bg-gray-100 transition-colors duration-300">
      <th className="text-center font-medium">{i + 1}</th>

      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={post?.thumbnail} alt={post?.postTitle} />
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">
              {post?.organizer?.name}
            </div>
            <div className="text-sm text-gray-500">{post?.location}</div>
          </div>
        </div>
      </td>

      <td>
        <div className="font-semibold text-gray-900">{post?.postTitle}</div>
        <span className="badge badge-primary badge-sm mt-1">
          {post?.category}
        </span>
      </td>

      <td>{new Date(post?.deadline).toLocaleDateString()}</td>

      <td className="text-center font-semibold text-indigo-600">
        {post?.volunteersNeeded}
      </td>

      {/*Update Modal starts  */}

      {updateModal && (
        <td className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box">
            <motion.form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Post Title */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Post Title</label>
                <input
                  type="text"
                  defaultValue={post?.postTitle}
                  name="postTitle"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g. Community Cleanup Drive"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={post?.description}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows="4"
                  placeholder="Write details about the volunteer activity..."
                  required
                ></textarea>
              </div>

              {/* Location & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={post?.location}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="e.g. Central Park"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Date</label>
                  <DatePicker
                    minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    selected={post?.deadline}
                    onChange={(date) => setDeadline(date)}
                  />
                </div>
              </div>

              {/* Volunteers Needed & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-medium mb-1">
                    Volunteers Needed
                  </label>
                  <input
                    type="number"
                    name="volunteersNeeded"
                    defaultValue={post?.volunteersNeeded}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="e.g. 15"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    defaultValue={post?.thumbnail}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Paste image link"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Category   */}
                <div>
                  <label className="block font-medium mb-1">
                    Select a category
                  </label>
                  <select
                    required
                    defaultValue={post?.category}
                    name="category"
                    className="select"
                  >
                    <option disabled={true}>Pick a Category</option>
                    <option>HealthCare</option>
                    <option>Education</option>
                    <option>Social Service</option>
                    <option>Animal Welfare</option>
                  </select>
                </div>

                {/* User Email */}
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    value={`${post?.organizer?.email}`}
                    disabled
                    readOnly
                    className="w-full border cursor-not-allowed rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              {/* User Name */}
              <div className="mb-2">
                <label className="block font-medium mb-1">Name</label>
                <input
                  value={`${post?.organizer?.name}`}
                  disabled
                  readOnly
                  className="w-full border cursor-not-allowed rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 transition"
              >
                Update Post
              </motion.button>
            </motion.form>
            <div className="modal-action">
              <div method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={() => setUpdateModal(false)} className="btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        </td>
      )}

      {/* Update Modal Ends */}

      <td className="flex gap-2 justify-center items-center">
        <button
          onClick={() => setUpdateModal(true)}
          title="Update"
          className="btn btn-sm btn-outline btn-info flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
          title="Delete"
          className="btn btn-sm btn-outline btn-error flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
          className="btn  btn-xs text-gray-600 hover:text-gray-900"
        >
          Details
        </Link>
      </td>
    </tr>
  );
};

export default MyPost;
