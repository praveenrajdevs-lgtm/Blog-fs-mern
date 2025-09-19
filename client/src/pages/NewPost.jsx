import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setImage("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Option 1: Reset form
  const handleCancelReset = () => {
    setTitle("");
    setContent("");
    setImage("");
    setError(null);
    setMessage(null);
    navigate("/dashboard");
  };

  // Option 2: Navigate away
  const handleCancelNavigate = () => {
    navigate("/dashboard"); // or "/" if you want to go home
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-zinc-900 p-8 border-zinc-900 shadow-lg">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">
          Create New Post
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-400 mb-2">
              Post Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Enter title"
              className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Content Input */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-400 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              rows="6"
              placeholder="Write your post content..."
              className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
              required
            ></textarea>
          </div>

          {/* Image URL Input */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-400 mb-2">
              Image URL (Optional)
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="url"
              id="image"
              placeholder="Enter image URL"
              className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-400 text-zinc-900 px-6 py-3 hover:bg-blue-500 transition
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>

            {/* Cancel → Option 1: Reset form */}
            <button
              type="button"
              onClick={handleCancelReset}
              className="px-6 py-3 bg-gray-600 text-white hover:bg-gray-700 transition"
            >
              Cancel
            </button>

            {/* Cancel → Option 2: Navigate away */}
            {/* 
            <button
              type="button"
              onClick={handleCancelNavigate}
              className="px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition"
            >
              Cancel
            </button> 
            */}
          </div>

          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewPost;
