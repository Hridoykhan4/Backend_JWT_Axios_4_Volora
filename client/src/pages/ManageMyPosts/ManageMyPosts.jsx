// eslint-disable-next-line no-unused-vars
import {easeInOut, motion} from 'framer-motion'
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuthValue from "../../hooks/useAuthValue";
import MyPost from "../../components/MyPost";
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageMyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthValue();
  const {
    data: myPosts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-post"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-post?email=${user?.email}`);
      return data;
    },
    enabled: !!user,
  });


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
    initial={{opacity: 0, y: 30}}
    animate={{opacity: 1, y:0}}
    transition={{duration: 1, ease: easeInOut, delay: 0.3}}
    className=" w-11/12 mx-auto z-10 py-4">
      {/* My Posted Jobs */}
      <div>
        <h2 className="text-center font-semibold mb-3 underline">
          My Posted Jobs
        </h2>
        <div className="overflow-x-auto ">
          <table className="table static">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Title</th>
                <th>Deadline</th>
                <th>Volunteer Needed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myPosts?.map((post, i) => (
                <MyPost post={post} key={post?._id} i={i}></MyPost>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>sds</div>
    </motion.div>
  );
};

export default ManageMyPosts;
