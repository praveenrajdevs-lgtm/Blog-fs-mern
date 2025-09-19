import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handlePost = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-4 border mx-15 my-10 bg-cover bg-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-zinc-900/50"></div>

        {/* Content */}
        <div className="relative z-10 animate-fadeIn">
          <h1 className="text-5xl font-bold text-blue-400 mb-4 animate-slideDown">
            Welcome to BlogHub
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl animate-slideUp">
            Share your thoughts, read amazing content, and connect with a
            community of passionate writers and readers.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePost}
              className="cursor-pointer border border-blue-400 text-blue-400 px-6 py-3 font-medium hover:bg-blue-500 hover:text-zinc-900 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 transition-transform duration-300"
            >
              Explore Posts
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-400 text-center mb-12">
          Why Join Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-zinc-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Write Posts</h3>
            <p className="text-gray-300">
              Share your knowledge and insights with a growing community.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Read Content</h3>
            <p className="text-gray-300">
              Explore articles and tutorials from various writers around the
              world.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-300">
              Engage with authors, leave comments, and join discussions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-zinc-900 text-gray-300 py-10 px-6 md:px-16 border-t border-blue-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">BlogHub</h3>
            <p className="text-sm leading-relaxed">
              BlogHub is a platform where writers and readers connect. Share
              your ideas, discover new perspectives, and be part of a growing
              community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-blue-400 transition">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Stay Updated
            </h3>
            <p className="text-sm mb-3">
              Subscribe to get the latest blog posts and updates directly to
              your inbox.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 bg-zinc-800 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-400 text-zinc-900 font-medium hover:bg-blue-500 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BlogHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
