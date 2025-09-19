import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  // Get current user info
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data.posts || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setDeleteLoading(postId);
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove post from state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Navigate to edit page
  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  // Navigate to new post
  const handleNewPost = () => {
    navigate("/new");
  };

  // View post in modal
  const handleViewPost = (post) => {
    setSelectedPost(post);
  };

  // Close modal
  const closeModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Debug logs
  console.log("All posts:", posts);
  console.log("Current user:", currentUser);

  // Filter user's own posts (temporarily show all posts for debugging)
  const userPosts = posts; // Temporary - shows all posts

  // Uncomment below when user filtering is working:
  // const userPosts = posts.filter(post =>
  //   currentUser && post.author && post.author._id === currentUser.user?.id
  // );

  // Calculate stats
  const totalPosts = userPosts.length;
  const publishedPosts = userPosts.length; // Since you don't have status field yet
  const draftPosts = 0; // Placeholder for future implementation

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8 flex justify-center items-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">Dashboard</h1>
        <button
          onClick={handleNewPost}
          className="bg-blue-400 text-zinc-900 px-4 py-2 font-medium hover:bg-blue-500 transition"
        >
          New Post
        </button>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-800 p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-400">Total Posts</h2>
          <p className="text-2xl font-bold text-blue-400">{totalPosts}</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-400">Published</h2>
          <p className="text-2xl font-bold text-blue-400">{publishedPosts}</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-400">Drafts</h2>
          <p className="text-2xl font-bold text-blue-400">{draftPosts}</p>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-6">{error}</div>
      )}

      {/* Posts Table */}
      <section className="bg-zinc-800 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-zinc-100">Your Posts</h2>
          <button
            onClick={fetchPosts}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Refresh
          </button>
        </div>

        {userPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No posts found. Create your first post!</p>
            <button
              onClick={handleNewPost}
              className="mt-4 bg-blue-400 text-zinc-900 px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-400">Title</th>
                  <th className="py-3 px-4 text-gray-400">Date Created</th>
                  <th className="py-3 px-4 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b border-gray-700 hover:bg-zinc-700 transition"
                  >
                    <td className="py-3 px-4">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleViewPost(post)}
                      >
                        <p className="font-medium text-white hover:text-blue-400 transition">
                          {post.title}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {post.content.length > 100
                            ? `${post.content.substring(0, 100)}...`
                            : post.content}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(post._id)}
                          className="px-4 py-2 border cursor-pointer border-blue-400 font-medium hover:bg-blue-400 hover:text-zinc-900 transition hover:scale-105 duration-200 hover:bg-yellow-600 hover:border-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={deleteLoading === post._id}
                          className="px-4 py-2 border cursor-pointer border-blue-400 font-medium hover:bg-blue-400 hover:text-zinc-900 transition hover:scale-105 duration-200 hover:bg-red-800 hover:border-none"
                        >
                          {deleteLoading === post._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Post View Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {selectedPost.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Post Meta */}
              <div className="text-gray-400 text-sm mb-4">
                <p>By: {selectedPost.author?.username || "Unknown"}</p>
                <p>
                  Created:{" "}
                  {new Date(selectedPost.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Post Image */}
              {selectedPost.image && (
                <div className="mb-4">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full max-h-96 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {selectedPost.content}
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    closeModal();
                    handleEdit(selectedPost._id);
                  }}
                  className="bg-zinc-900 border border-yellow-900 text-zinc-100 px-4 py-2 hover:scale-105 cursor-pointer transition"
                >
                  Edit Post
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-600  text-white px-4 py-2 hover:bg-gray-700 hover:scale-95 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
