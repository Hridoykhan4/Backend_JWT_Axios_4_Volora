import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// eslint-disable-next-line no-unused-vars
import { motion, number } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import useScrollTo from "../../hooks/useScrollTo";
import { useState } from "react";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAuthValue from "../../hooks/useAuthValue";
import toast from "react-hot-toast";
const VolunteerDetails = () => {
  const { user } = useAuthValue();
  const nav = useNavigate();
  useScrollTo();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [beVolunteerModal, setBeVolunteerModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const {
    data: volunteer = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["volunteerDetails", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/volunteer/${id}`);
      return data;
    },
  });

  const {
    postTitle,
    description,
    category,
    deadline,
    location,
    volunteersNeeded,
    thumbnail,
  } = volunteer || {};

  /* Mutation Starts */

  const { mutateAsync } = useMutation({
    mutationFn: async (others) => {
      const { data } = await axiosSecure.post(
        `/volunteer-request/${user?.email}`,
        others
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["volunteerDetails", id] });
      queryClient.invalidateQueries({ queryKey: ["allVolunteer"] });
      queryClient.invalidateQueries({ queryKey: ["needsOnHome"] });
      queryClient.invalidateQueries({ queryKey: ["manage-posts"] });
      toast.success(data?.message || "Request submitted successfully");
      setBeVolunteerModal(false);
      nav("/manage-posts");
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

  /* Mutation Ends */

  // Apply Request
  const handleApplyRequest = async (e) => {
    e.preventDefault();

    const suggestion = e.target.suggestion.value;

    // eslint-disable-next-line no-unused-vars
    const { _id, volunteersNeeded, description, ...others } = volunteer || {};

    others.suggestion = suggestion;
    others.volunteerId = _id;
    others.volunteerDetails = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };
    others.status = "requested";
    await mutateAsync(others);
  };

  /* Mutate Review Form */
  const { mutateAsync: reviewAsync } = useMutation({
    mutationFn: async (reviewData) => {
      const { data } = await axiosSecure.post("/review", reviewData);
      return data;
    },
    onSuccess: (data) => {
      if (data?.insertedId) {
        toast.success("Review has been added");
        setReviewModal(false);
      }
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  /* Handle Review Submit */
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const reviewerEmail = user?.email;
    const reviewerName = user?.displayName;
    const reviewerPhoto = user?.photoURL;
    const organizerEmail = volunteer?.organizer?.email;
    const organizerName = volunteer?.organizer?.name;
    const organizerPhoto = volunteer?.organizer?.photo;
    const reviewData = {
      review,
      organizerInfo: { organizerEmail, organizerName, organizerPhoto },
      reviewerInfo: { reviewerName, reviewerEmail, reviewerPhoto },
      date: new Date().toISOString(),
    };
    await reviewAsync(reviewData);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  if (isError || error) {
    return (
      <div>
        <p className="text-center text-red-600 font-semibold">
          Failed to load volunteer details
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Image Section */}
      <motion.div
        className="rounded-2xl  shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={thumbnail}
          alt={postTitle}
          className="h-96 w-full object-cover"
        />
        <motion.span
          className="-translate-10 w-1/2 ms-auto bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <FaUsers /> {volunteersNeeded} Needed
        </motion.span>
      </motion.div>

      {/* Details Section */}
      <div className="flex flex-col justify-center gap-4">
        {/* Category */}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit shadow-md uppercase tracking-wider">
          #{category}
        </span>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 leading-snug">
          {postTitle}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg">{description}</p>

        {/* Date & Location */}
        <div className="flex flex-wrap gap-3 mt-2">
          <span className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            <FaCalendarAlt /> {new Date(deadline).toLocaleDateString("en-GB")}
          </span>
          <span className="flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            <FaMapMarkerAlt /> {location}
          </span>
        </div>

        {/* Organizer Info */}
        <div className="mt-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          {/* Organizer Avatar */}
          <img
            referrerPolicy="no-referrer"
            src={
              volunteer?.organizer?.photo || "https://via.placeholder.com/80"
            }
            alt={volunteer?.organizer?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow-sm"
          />

          {/* Organizer Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {volunteer?.organizer?.name}
            </h2>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${volunteer?.organizer?.email}`}
              className="text-indigo-500 hover:underline text-sm font-medium"
            >
              {volunteer?.organizer?.email}
            </a>
          </div>
        </div>

        {/* Be a Volunteer Modal */}
        {beVolunteerModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Volunteer Signup</h3>
              <p className="py-4">
                Fill in your details to volunteer for this event.
              </p>

              {/* form Start */}
              <motion.form
                onSubmit={handleApplyRequest}
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
                    defaultValue={postTitle}
                    readOnly
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
                    readOnly
                    defaultValue={description}
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
                      readOnly
                      defaultValue={location}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="e.g. Central Park"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Date</label>
                    <DatePicker
                      readOnly
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      selected={deadline}
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
                      //   type="number"
                      value={volunteersNeeded}
                      readOnly
                      name="volunteersNeeded"
                      //   value={formData.volunteersNeeded}
                      //   onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      //   placeholder="e.g. 15"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={thumbnail}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Paste image link"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-4">
                  {/* Category   */}
                  <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select
                      //   defaultValue={formData.category}
                      //   onChange={handleChange}
                      value={category}
                      readOnly
                      disabled
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
                </div>

                {/* Organizer Name & Email */}
                <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-1">
                      Organizer Name
                    </label>
                    <input
                      //   value={`${formData?.email}, ${formData?.name}`}
                      value={volunteer.organizer.name}
                      disabled
                      readOnly
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Organizer Email
                    </label>
                    <input
                      //   value={`${formData?.email}, ${formData?.name}`}
                      value={volunteer.organizer.email}
                      disabled
                      readOnly
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                {/* Volunteer Name & Email */}
                <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-1">
                      Volunteer Name
                    </label>
                    <input
                      //   value={`${formData?.email}, ${formData?.name}`}
                      value={user?.displayName}
                      disabled
                      readOnly
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Volunteer Email
                    </label>
                    <input
                      value={user?.email}
                      disabled
                      readOnly
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                {/* Suggestion */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">Suggestion</label>
                  <textarea
                    name="suggestion"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows="4"
                    placeholder="Write suggestion about the volunteer activity..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 transition"
                >
                  Send Request
                </motion.button>
              </motion.form>
              {/* form End */}

              <div className="modal-action">
                <button
                  onClick={() => setBeVolunteerModal(false)}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {reviewModal && (
          <div className="modal modal-open modal-bottom sm:modal-middle">
            <div className="modal-box rounded-2xl shadow-2xl border border-green-200 bg-gradient-to-br from-white via-green-50 to-green-100">
              {/* Organizer Info */}
              <div className="flex justify-center items-center gap-4 mb-4">
                <img
                  className="w-14 h-14 rounded-full ring-2 ring-green-400 shadow-md"
                  src={volunteer?.organizer?.photo}
                  alt="Organizer"
                />
                <div>
                  <p className="font-semibold text-lg">
                    {volunteer?.organizer?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {volunteer?.organizer?.email}
                  </p>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-center font-bold text-xl text-green-700 mb-3">
                Share Your Feedback 🌟
              </h2>

              {/* Feedback Form */}
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <textarea
                  name="review"
                  required
                  className="textarea textarea-bordered w-full h-28 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Write your honest feedback for the organizer..."
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-success w-full rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
                >
                  🚀 Submit Review
                </button>
              </form>

              {/* Close Button */}
              <div className="modal-action">
                <button
                  onClick={() => setReviewModal(false)}
                  className="btn btn-outline btn-error rounded-full w-10 h-10 p-0 text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        {user?.email === volunteer?.organizer?.email ? (
          <div className="text-lg font-semibold text-amber-500 animate-pulse">
            {volunteer?.postTitle}'s post is your own post 🔥
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mt-2">
            {volunteer?.volunteersNeeded !== 0 && (
              <motion.button
                onClick={() => setBeVolunteerModal(true)}
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-6 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                 text-white font-bold rounded-full shadow-lg shadow-red-500/50 transition-all duration-300
                 hover:shadow-red-500/80"
              >
                <span className="relative z-10">🔥 Be a Volunteer</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 opacity-0 hover:opacity-30 transition-opacity duration-300" />
              </motion.button>
            )}

            <motion.button
              onClick={() => setReviewModal(true)}
              whileHover={{ scale: 1.08, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden px-6 py-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 
                 text-white font-bold rounded-full shadow-lg shadow-blue-500/50 transition-all duration-300
                 hover:shadow-blue-500/80"
            >
              <span className="relative z-10">⚡ Organizer</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 opacity-0 hover:opacity-30 transition-opacity duration-300" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VolunteerDetails;
