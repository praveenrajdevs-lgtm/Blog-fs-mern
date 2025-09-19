const About = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-16 flex justify-center">
      <div className="max-w-3xl text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-400 mb-6">About BlogHub</h1>

        {/* Intro */}
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          BlogHub is a platform built for passionate writers, thinkers, and
          readers. Whether you want to share your ideas, tell stories, or
          discover unique perspectives, BlogHub connects people through the
          power of words.
        </p>

        {/* Mission Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We believe everyone has a voice worth hearing. Our mission is to
            provide a simple yet powerful space where people can express their
            creativity, connect with others, and grow as part of a supportive
            community.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-3 mt-12">
          <div className="p-6 border border-blue-400 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Share</h3>
            <p className="text-gray-400">
              Write posts, express your ideas, and let the world hear your
              voice.
            </p>
          </div>

          <div className="p-6 border border-blue-400 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Discover
            </h3>
            <p className="text-gray-400">
              Explore posts from others and gain fresh insights and inspiration.
            </p>
          </div>

          <div className="p-6 border border-blue-400 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Connect
            </h3>
            <p className="text-gray-400">
              Interact with writers, exchange feedback, and be part of a growing
              community.
            </p>
          </div>
        </div>

        {/* Closing */}
        <p className="text-gray-300 mt-12 text-lg italic">
          “BlogHub isn’t just a platform — it’s a home for ideas.”
        </p>
      </div>
    </div>
  );
};

export default About;
