import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../Providers/Auth/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
    
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const photo = form.photo.value;

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match", {
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #ef4444",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      });
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      setUser({ ...result.user, displayName: name, photoURL: photo });
      toast.success("✅ Signup Successful", {
        style: {
          background: "#0f766e",
          color: "#fff",
          border: "1px solid #14b8a6",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#f0fdf4",
        },
      });
      navigate("/");
    } catch (err) {
      toast.error(`🚫 ${err?.message || "Signup failed"}`, {
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #ef4444",
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center  px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-[#0f766e] mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Photo URL", name: "photo", type: "text" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
            },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                name={name}
                type={type}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60CBD8] focus:border-transparent transition text-sm"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-[#0f766e] text-white font-semibold rounded-lg hover:bg-[#115e59] transition duration-300"
          >
            🚀 Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0f766e] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
