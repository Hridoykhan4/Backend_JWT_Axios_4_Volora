import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuthValue from "../hooks/useAuthValue";

const MyRequest = ({ post, i }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthValue();
  const queryClient = useQueryClient();
  const categoryColor = {
    "Social Service": "bg-green-500",
    Education: "bg-yellow-500",
    "Animal Welfare": "bg-pink-500",
    HealthCare: "bg-red-500",
  };

  // Update Status
  const updateStatus = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.patch(`/volunteer-requests/${id}`, {
        status: "completed",
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

  //   Mutate Async

  const { mutateAsync: deleteRequest } = useMutation({
    mutationFn: async ({ id, volunteerId }) => {
      const { data } = await axiosSecure.delete(`/volunteer-request/${id}`, {
        data: { volunteerId },
      });
      return data;
    },
    onSuccess: (data) => {
      [
        "my-post",
        "needsOnHome",
        "allVolunteer",
        "my-requests",
        "volunteerDetails",
      ].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      toast.success(data?.message || "Request deleted successfully!", {
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

  const handleDelete = (id, volunteerId) => {
    toast(
      (t) => (
        <div className="p-5 rounded-lg shadow-lg bg-white border border-gray-300 w-80">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-5">
            Are you sure you want to delete this post?
          </h2>
          <div className="flex justify-center gap-5">
            <button
              onClick={() => {
                deleteConfirm(id, volunteerId);
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

  // Delete Confirm
  const deleteConfirm = async (id, volunteerId) => {
    await deleteRequest({ id, volunteerId });
  };

  return (
    <tr className="hover:bg-indigo-100 transition-colors  duration-300 border-b border-gray-200 last:border-b-0">
      <th className=" py-2 text-center font-semibold text-indigo-700 text-lg">
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

      <td
        className={`px-5 py-4 text-center w-5 h-5 font-semibold text-lg ${
          post?.status === "requested"
            ? "text-blue-500"
            : post?.status === "accepted"
            ? "text-green-600  "
            : "text-red-600"
        } `}
      >
        {post?.status}
      </td>

      {/* Actions */}
      <td className="flex gap-3 justify-center items-center px-3 py-10">
        <button
          onClick={() => handleDelete(post?._id, post?.volunteerId)}
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

        <button
          disabled={post?.status !== "accepted"}
          onClick={() => updateStatus.mutate({ id: post?._id })}
          title="Mark as Complete"
          className="btn btn-sm btn-outline btn-success flex disabled:cursor-not-allowed items-center gap-1 hover:bg-green-500 hover:text-white transition"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Complete
        </button>
      </td>
    </tr>
  );
};

export default MyRequest;
