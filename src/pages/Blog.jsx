import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Newspaper, Heart, MessageSquare, Plus, ArrowRight, X, Clock } from "lucide-react";

export const Blog = () => {
  const { blogPosts, addBlogPost } = useApp();
  const [subTab, setSubTab] = useState("feed"); // feed, write
  const [selectedPost, setSelectedPost] = useState(null);
  const [likesMap, setLikesMap] = useState({});

  const [newPost, setNewPost] = useState({
    title: "",
    category: "Career & Tech",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    excerpt: "",
    content: ""
  });

  const handleLike = (id) => {
    setLikesMap(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    addBlogPost(newPost);
    setNewPost({
      title: "",
      category: "Career & Tech",
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      excerpt: "",
      content: ""
    });
    setSubTab("feed");
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">CAMPUS VOICE</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          STUDENT BLOG & ARTICLES
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Read interview roadmaps, tech tutorials, campus life survival guides, and publish articles.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "feed" ? "active" : ""}`} onClick={() => setSubTab("feed")}>
          📰 ARTICLES FEED ({blogPosts.length})
        </button>
        <button className={`subnav-tab ${subTab === "write" ? "active" : ""}`} onClick={() => setSubTab("write")}>
          ✍️ PUBLISH ARTICLE
        </button>
      </div>

      {/* Articles Feed Tab */}
      {subTab === "feed" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
          {blogPosts.map(post => {
            const addedLikes = likesMap[post.id] || 0;

            return (
              <div key={post.id} className="glass-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ position: "relative", height: "190px" }}>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span className="badge badge-blue" style={{ position: "absolute", top: "12px", right: "12px" }}>
                      {post.category}
                    </span>
                  </div>

                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "0.4rem" }}>
                      ✍️ {post.author} ({post.authorRole}) • ⏱️ {post.readTime}
                    </div>

                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff", marginBottom: "0.6rem", lineHeight: 1.2 }}>
                      {post.title}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{ padding: "1rem 1.5rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    <span
                      style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", color: addedLikes > 0 ? "#f43f5e" : "inherit" }}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart size={16} fill={addedLikes > 0 ? "#f43f5e" : "transparent"} /> {post.likes + addedLikes}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <MessageSquare size={16} /> {post.commentsCount}
                    </span>
                  </div>

                  <button className="btn-pill-solid" style={{ fontSize: "0.75rem", padding: "0.5rem 1.1rem" }} onClick={() => setSelectedPost(post)}>
                    READ ARTICLE <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Write Article Tab */}
      {subTab === "write" && (
        <div className="glass-card-reference" style={{ maxWidth: "750px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            PUBLISH CAMPUS ARTICLE
          </h3>

          <form onSubmit={handlePublish} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Article Title
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. How I Cracked Microsoft SDE Placement Drive"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Category
                </label>
                <select
                  className="form-input-reference"
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                >
                  <option value="Career & Tech">Career & Tech</option>
                  <option value="Campus Life">Campus Life</option>
                  <option value="Research & Projects">Research & Projects</option>
                  <option value="Student Clubs">Student Clubs</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  value={newPost.readTime}
                  onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Short Excerpt / Teaser
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="A brief 2-line summary of what the article covers..."
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Full Article Content (Supports Markdown formatting)
              </label>
              <textarea
                className="form-input-reference"
                rows={8}
                placeholder="Write your article body here..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              PUBLISH TO CAMPUSHUB FEED
            </button>
          </form>
        </div>
      )}

      {/* Reader Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" style={{ maxWidth: "700px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span className="badge badge-blue">{selectedPost.category}</span>
              <X size={20} style={{ cursor: "pointer" }} onClick={() => setSelectedPost(null)} />
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color: "#ffffff", marginBottom: "0.5rem" }}>
              {selectedPost.title}
            </h2>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Written by <strong>{selectedPost.author}</strong> ({selectedPost.authorRole}) • Published {selectedPost.date}
            </div>

            <img
              src={selectedPost.coverImage}
              alt={selectedPost.title}
              style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "12px", marginBottom: "1.5rem" }}
            />

            <div style={{ color: "#e2e8f0", fontSize: "0.95rem", lineHeight: 1.7, whitespace: "pre-line" }}>
              {selectedPost.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
