import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../../Providers/Auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Sign-in Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;

    try {
      await signIn(email, pass);
      toast.success("Sign-in Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-302px)] px-4 py-10 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign in to access your account
        </p>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition text-sm font-medium text-gray-700 mb-5"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase mb-5">
          <span className="flex-1 border-t border-gray-300"></span>
          or
          <span className="flex-1 border-t border-gray-300"></span>
        </div>

        {/* Sign-in Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
