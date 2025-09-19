import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-16 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Have a question, feedback, or just want to say hello? We’d love to
          hear from you! Reach out using the form below or through our contact
          details.
        </p>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-zinc-800 border border-blue-400 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full p-3 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-400 text-zinc-900 font-medium hover:bg-blue-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-zinc-800 border border-blue-400 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-blue-400 mb-3">
                Contact Information
              </h2>
              <p className="text-gray-400 mb-2">
                📍 Location: TamilNadu, India
              </p>
              <p className="text-gray-400 mb-2">
                📧 Email: support@bloghub.com
              </p>
              <p className="text-gray-400">
                🕒 Working Hours: Mon - Fri (9:00 AM - 6:00 PM)
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="bg-zinc-800 border border-blue-400 p-6 shadow-lg text-center">
              <div className="w-full h-56 bg-zinc-700 flex items-center justify-center text-gray-400">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d3518.792702532306!2d80.2435134745462!3d12.946716865424413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e0!4m3!3m2!1d12.946620699999999!2d80.2460736!4m3!3m2!1d12.946612199999999!2d80.24607689999999!5e1!3m2!1sen!2sin!4v1758289021455!5m2!1sen!2sin"
                  width="600"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-400 mt-12 text-sm">
          We aim to respond to all queries within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default Contact;
