import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy posts array with description
const posts = [
  {
    id: 1,
    title: "How to download capcut for pc",
    date: "July 2025",
    duration: "5 min read",
    excerpt: "Want to edit videos like a pro? Here’s the easiest way to download CapCut for your PC in just minutes!",
    description: "Want to edit videos like a pro? Here’s the easiest way to download CapCut for your PC in just minutes!.",
    category: "video editing",
    image: "/src/assets/capcut.jpg",
    views: "2.1K",
    success: "⭐️ Featured"
  },
  {
    id: 2,
    title: "Styling in React",
    date: "June 2024",
    duration: "7 min read",
    excerpt: "There are several ways to style React components. Let's explore CSS Modules, Styled Components, and more.",
    description: "Styling in React can be done using various methods such as inline styles, CSS Modules, Styled Components, and traditional CSS files. Each method has its own pros and cons. For example, CSS Modules help in scoping styles locally, while Styled Components allow you to write actual CSS in your JavaScript.",
    category: "CSS",
    image: "/src/assets/blog-2.jpg",
    views: "1.5K",
    success: "🔥 Popular"
  },
  {
    id: 3,
    title: "Understanding useEffect",
    date: "May 2024",
    duration: "6 min read",
    excerpt: "The useEffect Hook lets you perform side effects in function components. It is similar to componentDidMount and componentDidUpdate.",
    description: "useEffect is a React Hook that lets you synchronize a component with an external system. It runs after the render and can be used for data fetching, subscriptions, or manually changing the DOM. You can control when it runs by passing dependencies as the second argument.",
    category: "React",
    image: "/src/assets/blog-3.jpg",
    views: "1.9K",
    success: "💡 Insight"
  },
  {
    id: 4,
    title: "Advanced State Management",
    date: "April 2024",
    duration: "8 min read",
    excerpt: "Learn how to manage complex state in React apps using Context API and Redux.",
    description: "For complex state management in React, you can use Context API for prop drilling issues or Redux for large-scale applications. Both have their own use cases. Context is great for simple global state, while Redux is better for more complex scenarios.",
    category: "React",
    image: "/src/assets/blog-4.jpg",
    views: "1.2K",
    success: "🌟 New"
  },
  // ...aur bhi posts add kar sakte hain
];

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
          <span>📅 {post.date} • {post.duration}</span>
          <span className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded">{post.success}</span>
        </div>
        <h2 className="text-3xl font-bold mb-3">{post.title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">{post.category}</span>
          {/* subcategory, tertiary agar chahiye toh yahan add kar sakte hain */}
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
  const navigate = useNavigate(); // <-- yeh line add ki

  // Pehle 3 ya sabhi posts dikhana
  const visiblePosts = showAll ? posts : posts.slice(0, 3);

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
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{
            minHeight: "420px",
            overflow: "hidden",
            gridTemplateRows: "repeat(1, 1fr)",
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
              <div className="p-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                  <span>📅</span>
                  <span>
                    {post.date} • {post.duration}
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

        {/* Button sirf tab dikhaye jab sabhi posts nahi dikh rahe */}
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