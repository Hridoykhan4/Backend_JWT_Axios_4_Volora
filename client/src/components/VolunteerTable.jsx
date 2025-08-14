// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

const VolunteerTable = ({ volunteer }) => {
  return (
    <tr key={volunteer._id}>
      {/* Thumbnail */}
      <td className="px-6 py-4">
        <img
          src={volunteer?.thumbnail}
          alt={volunteer?.postTitle}
          className="h-14 w-20 object-cover rounded border border-gray-300"
        />
      </td>

      {/* Title */}
      <td className="px-6 py-4 font-semibold text-indigo-700">
        {volunteer?.postTitle}
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-indigo-600">{volunteer?.category}</td>

      {/* Deadline */}
      <td className="px-6 py-4 text-gray-600 text-sm">
        {new Date(volunteer?.deadline).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-center">
        <Link
          to={`/view-volunteer/${volunteer?._id}`}
          className="rounded bg-indigo-600 px-3 py-1 text-white text-sm hover:bg-indigo-700 transition"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default VolunteerTable;
