import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Marquee from "react-fast-marquee";
import { MdDone } from "react-icons/md";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    data: reviews = [],
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure("/reviews");
      return data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading reviews...</p>;
  if (isError)
    return <p className="text-center py-10">Error loading reviews</p>;

  return (
    <div className="py-16 ">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-5 text-[#00df9a] drop-shadow-lg">
        Volunteer Reviews
      </h2>

      <Marquee pauseOnHover gradient={false} speed={50} loop={0}>
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="inline-block ease-in-out duration-700 w-80 md:w-96 p-6 mx-4 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.reviewerInfo.reviewerPhoto}
                alt={review.reviewerInfo.reviewerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#00df9a]"
              />
              <div>
                <p className="font-semibold text-lg">
                  {review.reviewerInfo.reviewerName}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-800">{review.review}</p>
            <div className="flex items-center gap-2 mt-2">
              <MdDone className="text-[#00df9a]" />
              <p className="text-sm text-gray-500">
                Organized by {review.organizerInfo.organizerName}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
