import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../Providers/Auth/AuthContext";
import useScrollTo from "../../hooks/useScrollTo";
import useAuthValue from "../../hooks/useAuthValue";

const Register = () => {
  const {user} = useAuthValue()
  useScrollTo();
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser, setLoading } =
    useContext(AuthContext);


  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [user, navigate])


  // Controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passErr, setPassErr] = useState("");

  // Toast styles
  const toastStyle = {
    success: {
      style: {
        background: "#0f766e",
        color: "#fff",
        border: "1px solid #14b8a6",
      },
      iconTheme: { primary: "#22c55e", secondary: "#f0fdf4" },
    },
    error: {
      style: {
        background: "#1f2937",
        color: "#fff",
        border: "1px solid #ef4444",
      },
      iconTheme: { primary: "#ef4444", secondary: "#fff" },
    },
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, photo, email, password, confirmPassword } = formData;

    // Password validation
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passPattern.test(password)) {
      setPassErr(
        "Password must be at least 6 characters long and include uppercase & lowercase letters."
      );
      toast.error("❌ Weak password!", toastStyle.error);
      return;
    } else {
      setPassErr("");
    }

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match", toastStyle.error);
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      setUser({ ...result.user, displayName: name, photoURL: photo });
      toast.success("✅ Signup Successful", toastStyle.success);
      navigate("/");
    } catch (err) {
      toast.error(`🚫 ${err?.message || "Signup failed"}`, toastStyle.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-[#0f766e] mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Photo URL", name: "photo", type: "url" },
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
                value={formData[name]}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60CBD8] focus:border-transparent transition text-sm ${
                  passErr && name === "password"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
          ))}

          {passErr && <p className="text-red-500 text-sm">{passErr}</p>}

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
