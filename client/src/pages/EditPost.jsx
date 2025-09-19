import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react"; // small icon lib, works nicely

const EditPost = () => {
  const { id } = useParams(); // get postId from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch existing post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.post.title);
        setContent(res.data.post.content);
        setImage(res.data.post.image);
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, content, imageUrl: image },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Post updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-zinc-900 p-8 border border-blue-400 shadow-lg">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">Edit Post</h1>

        {loading && <p className="text-blue-400">Loading...</p>}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Image URL</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className={` py-2 px-4 font-medium border transition-transform duration-200 cursor-pointer
              ${
                loading
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-blue-400 text-zinc-900 hover:bg-blue-500 hover:scale-105"
              }`}
            >
              {loading ? "Updating..." : "Update Post"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-zinc-900 text-white border border-blue-400 font-medium transition-transform duration-400 px-4 py-2 hover:bg-red-700 hover:text-zinc-900 hover:border-none hover:scale-103 transition cursor-pointer"
            >
              Close
            </button>
          </div>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPost;
