import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setMessage("");
      setError("");
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("User registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="w-full max-w-md bg-zinc-900 border border-blue-400 hover:border-blue-500 shadow-2xl hover:shadow-blue-500/30 p-8 transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-center mb-4 text-white underline dark:hover:text-blue-400">
          Register
        </h2>
        <p className="text-white text-center mb-6">Create your new account</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-white"
            >
              User_name
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className="w-full px-3 py-2 border bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-white"
            >
              E_mail
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-white"
            >
              Pass_word
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="w-full mb-5 px-3 py-2 border bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 bg-zinc-900 text-blue-400 font-medium border
             hover:bg-blue-400 hover:text-zinc-900 hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            Register
          </button>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
