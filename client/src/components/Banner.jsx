// eslint-disable-next-line no-unused-vars
import { easeInOut, motion } from "framer-motion";
import banner1 from '../assets/imagesRandom/banner-1.jpg'
const Banner = () => {
  return (
    <div
      className=" bg-cover z-0 overflow-hidden"
      style={{
        backgroundImage:
          `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6)), url(${banner1})`,
      }}
    >
      <div className="text-neutral-content flex items-center min-h-screen px-4 z-10">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="mb-5 text-4xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Making a Difference
          </motion.h1>
          <motion.p
            className="mb-6 text-lg md:text-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: easeInOut }}
          >
            Together we can create positive change in the world — one step, one hand, and one heart at a time.
          </motion.p>
          <motion.button
            className="btn btn-primary btn-md md:btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Mission
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
