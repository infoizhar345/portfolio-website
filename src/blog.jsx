import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy posts array with unique IDs and restored duration
const posts = [
  {
    id: 1,
    title: "How to download capcut for pc",
    date: "July 2025",
    duration: "5 min read",
    excerpt: "Want to edit videos like a pro? Here’s the easiest way to download CapCut for your PC in just minutes!",
    description: "Want to edit videos like a pro? Here’s the easiest way to download CapCut for your PC in just minutes!.",
    category: "video editing",
    image: "https://i.postimg.cc/MTgPbHR3/capcut-cover.webp",
    views: "2.1K",
    success: "⭐️capcut"
  },
  {
    id: 2,
    title: "Manus AI: The All-in-One Super Tool",
    date: "June 2025",
    duration: "7 min read",
    excerpt: "Manus AI isn’t just another AI tool — it’s a next-gen powerhouse that builds websites, makes videos, converts text to speech, and even does deep research. ChatGPT was only the beginning.",
    description: "Say goodbye to juggling multiple tools — Manus AI is here, and it’s rewriting the rules of what AI can do. From creating studio-level videos to turning raw data into beautiful visuals, Manus AI handles it all in seconds. Whether you're a content creator, a marketer, or a business owner, this is the one tool you can’t ignore. In this blog, we’ll break down what Manus AI is, how it works, and why it's making waves across industries.",
    category: "AI",
    image: "https://i.postimg.cc/vmKLpmhr/Chat-GPT-Image-Aug-2-2025-04-45-38-PM.png",
    views: "1.5K",
    success: "🔥 AI"
  }
];

// Function to parse date strings (e.g., "July 2025") into Date objects
const parseDate = (dateString) => {
  const [month, year] = dateString.split(" ");
  const monthIndex = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].indexOf(month);
  return new Date(year, monthIndex);
};

// Sort posts by date (latest first)
const sortedPosts = [...posts].sort((a, b) => parseDate(b.date) - parseDate(a.date));

// Modal Component
function BlogModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="bg-[#18181b] text-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8">
        <button
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-primary"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <div className="flex items-center text-xs text-gray-400 mb-3">
          <span>👁️ {post.views}</span>
          <span className="mx-2">|</span>
          <span>📅 {post.date} • {post.duration || "N/A"}</span>
          <span className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded">{post.success}</span>
        </div>
        <h2 className="text-3xl font-bold mb-3">{post.title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">{post.category}</span>
        </div>
        <p className="text-base text-gray-300 mb-2">{post.excerpt}</p>
        <div className="text-gray-200 text-sm whitespace-pre-line">{post.description}</div>
      </div>
    </div>
  );
}

function Blog() {
  const [showAll, setShowAll] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  // Use sortedPosts, show 4 posts initially
  const visiblePosts = showAll ? sortedPosts : sortedPosts.slice(0, 4);

  return (
    <section id="blog" className="section-padding">
      <div className="container-max">
        {/* Back to Home Button */}
        <div className="mb-8">
          <button
            className="bg-primary text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-primary/80"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
        {/* Heading and description */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-primary text-sm font-semibold mb-4">
            <span className="text-3xl">📝</span>
            <span className="text-4xl font-bold">BLOG</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            My Thoughts, <span className="text-primary">Your Learning</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore my latest articles.
          </p>
        </div>

        {/* Blog Cards */}
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            overflow: "hidden",
            gridTemplateRows: "auto",
          }}
        >
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="group card-hover bg-card rounded-lg overflow-hidden relative shadow-md cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-0.5 rounded text-xs flex items-center space-x-1">
                  <span>👁️</span>
                  <span>{post.views}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="px-3 pb-2 pt-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                  <span>📅</span>
                  <span>
                    {post.date} • {post.duration || "N/A"}
                  </span>
                  <div className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">
                    {post.success}
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1 truncate">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-1 text-xs line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button to show all posts */}
        {!showAll && (
          <div className="text-center mt-6">
            <button
              className="bg-primary/20 text-primary border border-primary px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              onClick={() => setShowAll(true)}
            >
              View All Posts
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
}

export default Blog;