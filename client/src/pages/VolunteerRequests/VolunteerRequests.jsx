import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUserCircle, FaCheck, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import useAuthValue from "../../hooks/useAuthValue";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

const VolunteerRequests = () => {
  const { user } = useAuthValue();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const categoryColor = {
    "Social Service": "bg-green-500",
    Education: "bg-yellow-500",
    "Animal Welfare": "bg-pink-500",
    HealthCare: "bg-red-500",
  };

  // Fetch requests
  const {
    data: myAllVolunteerRequests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-volunteer-requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/volunteer-requests/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Mutation for Accept / Reject
  const updateStatus = useMutation({
    mutationFn: async ({ id, prevStatus, status }) => {
      //   console.log(id, prevStatus, status);
      if (prevStatus === status) {
        toast.success(`Already updated to ${status}`);
        return;
      }
      const { data } = await axiosSecure.patch(`/volunteer-requests/${id}`, {
        status,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data?.result?.modifiedCount) {
        toast.success(`Successfully updated Job Status`, {
          position: "top-right",
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["my-volunteer-requests", user?.email],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-post", data?.post?.volunteerDetails?.email],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-requests", data?.post?.volunteerDetails?.email],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">{error?.message}</div>
    );
  }

  if (myAllVolunteerRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No volunteer requests found</p>
        <p className="text-sm">
          Your requests will appear here once you join a post
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {myAllVolunteerRequests.map((req) => (
        <div
          key={req._id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-100"
        >
          <img
            src={req.thumbnail}
            alt={req.postTitle}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {req.postTitle}
            </h3>
            <span
              className={`px-3 py-1 text-xs text-white rounded-full ${
                categoryColor[req.category] || "bg-gray-400"
              }`}
            >
              {req.category}
            </span>
          </div>

          <p className="mt-1 text-gray-500 text-sm flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" /> {req.location}
          </p>

          {/* Organizer */}
          <div className="mt-3 flex items-center gap-3">
            {req.organizer.photo ? (
              <img
                src={req?.organizer?.photo}
                alt={req?.organizer?.name}
                className="w-8 h-8 rounded-full border"
              />
            ) : (
              <FaUserCircle className="text-gray-400 w-8 h-8" />
            )}
            <p className="text-sm text-gray-700">{req.organizer.name}</p>
          </div>

          {/* Deadline Picker */}
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-1">Deadline:</p>
            <DatePicker
              selected={new Date(req.deadline)}
              readOnly
              className="border rounded px-2 py-1 text-sm w-full"
            />
            {req.suggestion && (
              <p className="mt-1 text-sm italic text-gray-600">
                “{req.suggestion}”
              </p>
            )}
          </div>

          {/* Volunteer Info + Status */}
          <div className="mt-4 flex items-center gap-3 border-t pt-3">
            <img
              src={req.volunteerDetails.photo}
              alt={req.volunteerDetails.name}
              className="w-8 h-8 rounded-full border"
            />
            <p className="text-sm text-gray-700">{req.volunteerDetails.name}</p>
            <span
              className={`ml-auto text-xs px-2 py-1 rounded-full ${
                req.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : req.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {req.status}
            </span>
          </div>

          {/* Accept / Reject buttons */}
          <div className="mt-4 flex gap-3">
            <button
              disabled={req?.status === "completed"}
              onClick={() =>
                updateStatus.mutate({
                  id: req._id,
                  prevStatus: req?.status,
                  status: "accepted",
                })
              }
              className="flex disabled:bg-gray-700 disabled:cursor-not-allowed items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            >
              <FaCheck /> Accept
            </button>
            <button
              disabled={req?.status === "completed"}
              onClick={() =>
                updateStatus.mutate({
                  id: req._id,
                  prevStatus: req?.status,
                  status: "rejected",
                })
              }
              className="flex items-center disabled:bg-gray-700 disabled:cursor-not-allowed gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              <FaTimes /> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VolunteerRequests;
