// eslint-disable-next-line no-unused-vars
import { easeInOut, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuthValue from "../../hooks/useAuthValue";
import MyPost from "../../components/MyPost";
import LoadingSpinner from "../../components/LoadingSpinner";
import MyRequest from "../../components/MyRequest";
import useScrollTo from "../../hooks/useScrollTo";
import { Link } from "react-router-dom";

const ManageMyPosts = () => {
  useScrollTo();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthValue();
  const {
    data: myPosts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-post", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-post?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60,
  });

  const {
    data: myRequests = [],
    isLoading: isRequestLoading,
    isError: isRequestIsError,
    error: isRequestError,
  } = useQuery({
    queryKey: ["my-requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-requests/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  if (isError || error) {
    return (
      <div>
        <p className="text-center text-red-600 font-semibold">
          Failed to load Your Posts
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeInOut, delay: 0.3 }}
      className="w-11/12 mx-auto py-6 space-y-10"
    >
      {/* My Posted Jobs */}
      {myPosts.length > 0 && (
        <section className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-center text-xl font-bold mb-5 text-indigo-600">
            📌 My Posted Jobs
          </h2>
          {myPosts.length > 0 ? (
            <div className="overflow-x-auto static rounded-lg border border-gray-200">
              <table className="table static w-full">
                <thead>
                  <tr className="text-gray-600">
                    <th>#</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Deadline</th>
                    <th>Volunteer Needed</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myPosts.map((post, i) => (
                    <MyPost key={post?._id} post={post} i={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 border border-gray-200 rounded-lg">
              No posts found...
            </div>
          )}
        </section>
      )}

      {myPosts.length === 0 && (
        <div className="max-w-sm mx-auto mt-12 p-6 bg-red-50 border border-red-300 rounded-lg shadow-md text-center text-red-700 font-medium">
          You have no posts to see! <Link className="link" to="/add-volunteer">Add Post</Link>
        </div>
      )}

      {/* My Volunteer Request Post */}
      {isRequestError ||
        (isRequestIsError && (
          <div>
            <p className="text-center text-red-600 font-semibold">
              Failed to load Your Requests
            </p>
          </div>
        ))}
      {myRequests.length === 0 && (
        <div className="max-w-md mx-auto mt-12 p-8 bg-red-100 border border-red-300 rounded-lg shadow-lg text-center text-red-700 font-semibold space-y-4">
          <p className="text-lg">You have not requested any post yet!</p>
          <Link
            to="/allVolunteers"
            className="inline-block px-6 py-2 bg-red-600 text-white rounded-full font-semibold shadow-md hover:bg-red-700 transition"
          >
            Find Posts
          </Link>
        </div>
      )}

      {/* My Requested Post */}
      {isRequestLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        myRequests.length > 0 && (
          <section className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-center text-xl font-bold mb-5 text-indigo-600">
              🙋 My Volunteer Request Post
            </h2>
            <div className="overflow-x-auto static rounded-lg border border-gray-200">
              <table className="table static w-full">
                <thead>
                  <tr className="text-gray-600">
                    <th>#</th>
                    <th>Owner Info</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map((post, i) => (
                    <MyRequest key={post?._id} post={post} i={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      )}
    </motion.div>
  );
};

export default ManageMyPosts;
