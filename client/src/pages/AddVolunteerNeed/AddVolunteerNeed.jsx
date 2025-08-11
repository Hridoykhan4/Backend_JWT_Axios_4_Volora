// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import useAuthValue from "../../hooks/useAuthValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddVolunteerNeed = () => {
  const [deadline, setDeadline] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const nav = useNavigate();
  const { user } = useAuthValue();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    postTitle: "",
    description: "",
    location: "",
    volunteersNeeded: "",
    thumbnail: "",
    category: "",
    email: user?.email,
    name: user?.displayName,
    photo: user?.photoURL,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (others) => {
      const { data } = await axiosSecure.post(`/add-volunteer`, others);
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        setFormData({
          postTitle: "",
          description: "",
          location: "",
          volunteersNeeded: "",
          thumbnail: "",
          category: "",
          email: user?.email,
          name: user?.displayName,
          photo: user?.photoURL,
        });
        setDeadline(new Date(Date.now() + 24 * 60 * 60 * 1000));
        toast.success("Inserted Successfully", {
          position: "top-right",
          className: "text-lg font-bold",
        });
        nav(`/manage-posts`);
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          className: "text-lg font-bold",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["allVolunteer"] });
      queryClient.invalidateQueries({ queryKey: ["needsOnHome"] });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { volunteersNeeded, name, email, photo, ...others } = formData;
    others.organizer = {
      name,
      email,
      photo,
    };
    others.deadline = deadline;
    others.volunteersNeeded = parseInt(volunteersNeeded);

    if (
      new Date(others.deadline).toDateString() === new Date().toDateString()
    ) {
      return toast.error("Deadline can not be today's date", {
        position: "top-right",
        className: "text-lg font-bold",
      });
    }

    await mutateAsync(others);
  };

  return (
    <motion.div className="py-5">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, delay: 0.1 }}
      >
        <h2 className="text-center font-semibold text-2xl sm:text-3xl tracking-wide">
          Add Volunteer Post
        </h2>
        <p className="text-center max-w-xl font-medium mx-auto text-gray-600">
          Share volunteer opportunities and connect with potential volunteers
        </p>
      </motion.div>

      {/* Form Section */}
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
            name="postTitle"
            value={formData.postTitle}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
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
              value={formData.location}
              onChange={handleChange}
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
              selected={deadline}
              onChange={(date) => setDeadline(date)}
            />
          </div>
        </div>

        {/* Volunteers Needed & Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Volunteers Needed</label>
            <input
              type="number"
              name="volunteersNeeded"
              value={formData.volunteersNeeded}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="e.g. 15"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Paste image link"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Category   */}
          <div>
            <label className="block font-medium mb-1">Select a category</label>
            <select
              defaultValue={formData.category}
              name="category"
              onChange={handleChange}
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
            <label className="block font-medium mb-1">Email & name</label>
            <input
              value={`${formData?.email}, ${formData?.name}`}
              disabled
              readOnly
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 transition"
        >
          Submit Post
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddVolunteerNeed;
