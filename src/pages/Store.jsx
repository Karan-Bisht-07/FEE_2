import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { INITIAL_PRODUCTS } from "../data/initialData";
import {
  ShoppingBag,
  Search,
  Tag,
  Star,
  Check,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  Wifi,
  WifiOff,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building,
  CheckCircle2,
  X
} from "lucide-react";

export const Store = () => {
  const {
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    cartTotals,
    networkMode,
    setNetworkMode,
    asyncStatus,
    simulateAsyncOrder,
    user
  } = useApp();

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState({});
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);

  // Checkout Modal Local State
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    hostel: user.hostel || "Block B - Room 304",
    phone: user.phone || "+91 98765 43210",
    paymentMethod: "campus_card",
    notes: ""
  });
  const [orderReceipt, setOrderReceipt] = useState(null);

  const categories = ["All", "Books", "Electronics", "Stationery", "Merchandise"];

  // Simulate network fetch with skeleton loader whenever category changes
  useEffect(() => {
    setIsLoading(true);
    const delay = networkMode === "slow" ? 1800 : 400;
    const timer = setTimeout(() => {
      let filtered = INITIAL_PRODUCTS;
      if (selectedCategory !== "All") {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      setProducts(filtered);
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, networkMode]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItemMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg(res);
    setTimeout(() => setCouponMsg(null), 4000);
    setCouponInput("");
  };

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setOrderReceipt(null);
    setShowCheckoutModal(true);
  };

  const handleExecuteCheckout = async (e) => {
    e.preventDefault();
    try {
      const receipt = await simulateAsyncOrder(checkoutData);
      setOrderReceipt(receipt);
    } catch (err) {
      // Error handled inside context asyncStatus
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* Pedagogical Header Banner for Viva Evaluation */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          borderRadius: "14px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge-status badge-verified" style={{ fontSize: "0.7rem" }}>
              UNIT 49–54 MINI-PROJECT
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              React Context API & Async State Machine
            </span>
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0.3rem 0 0", color: "#ffffff" }}>
            Campus Bookstore & Essentials Hub
          </h2>
        </div>

        {/* Viva Live Simulation Controls: Network Modes */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
            SIMULATE ASYNC MODE:
          </span>
          <div style={{ display: "flex", gap: "0.3rem", background: "rgba(0,0,0,0.3)", padding: "0.2rem", borderRadius: "8px" }}>
            <button
              onClick={() => setNetworkMode("normal")}
              style={{
                background: networkMode === "normal" ? "#38bdf8" : "transparent",
                color: networkMode === "normal" ? "#000000" : "var(--text-muted)",
                border: "none",
                borderRadius: "6px",
                padding: "0.3rem 0.6rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <Wifi size={12} /> Normal
            </button>
            <button
              onClick={() => setNetworkMode("slow")}
              style={{
                background: networkMode === "slow" ? "#facc15" : "transparent",
                color: networkMode === "slow" ? "#000000" : "var(--text-muted)",
                border: "none",
                borderRadius: "6px",
                padding: "0.3rem 0.6rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <RefreshCw size={12} /> Slow 3G
            </button>
            <button
              onClick={() => setNetworkMode("error")}
              style={{
                background: networkMode === "error" ? "#f43f5e" : "transparent",
                color: networkMode === "error" ? "#ffffff" : "var(--text-muted)",
                border: "none",
                borderRadius: "6px",
                padding: "0.3rem 0.6rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <WifiOff size={12} /> Sim Error
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Products on Left (8 cols) + Cart Summary on Right (4 cols) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        
        {/* Left Column: Search, Filter, Products */}
        <div style={{ flex: 2 }}>
          {/* Controls Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem"
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: "relative",
                flex: "1 1 240px",
                maxWidth: "360px"
              }}
            >
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search textbooks, calculators, hoodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.85rem 0.6rem 2.4rem",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "0.85rem"
                }}
              />
            </div>

            {/* Category Pills */}
            <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.3rem" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "9999px",
                    border: "1px solid",
                    borderColor: selectedCategory === cat ? "#38bdf8" : "var(--border-subtle)",
                    background: selectedCategory === cat ? "rgba(56, 189, 248, 0.15)" : "transparent",
                    color: selectedCategory === cat ? "#38bdf8" : "var(--text-muted)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "var(--transition-fast)"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid or Shimmer Skeletons */}
          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div
                  key={n}
                  style={{
                    height: "360px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    overflow: "hidden"
                  }}
                  className="skeleton-shimmer"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "14px",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <ShoppingBag size={40} color="var(--text-dim)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.1rem", color: "#ffffff" }}>No campus items found</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
                Try adjusting your search query or switching categories.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {products.map(product => {
                const isAdded = addedItemMap[product.id];
                const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

                return (
                  <div
                    key={product.id}
                    className="module-card card-interactive"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "1rem",
                      borderRadius: "14px",
                      position: "relative"
                    }}
                  >
                    {/* Discount badge */}
                    {discountPct > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "1.5rem",
                          left: "1.5rem",
                          background: "#f43f5e",
                          color: "#ffffff",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          padding: "0.2rem 0.5rem",
                          borderRadius: "6px",
                          zIndex: 2
                        }}
                      >
                        {discountPct}% OFF
                      </span>
                    )}

                    {/* Image */}
                    <div
                      style={{
                        height: "170px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginBottom: "0.9rem",
                        background: "#090d16"
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>

                    {/* Meta & Ratings */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.7rem", color: "#38bdf8", fontWeight: 700, textTransform: "uppercase" }}>
                        {product.category}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.75rem", color: "#facc15" }}>
                        <Star size={12} fill="#facc15" />
                        <span>{product.rating}</span>
                        <span style={{ color: "var(--text-dim)", fontSize: "0.65rem" }}>({product.reviews})</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 0.3rem", lineHeight: 1.3, color: "#ffffff" }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.9rem", flex: 1, lineHeight: 1.4 }}>
                      {product.desc}
                    </p>

                    {/* Price & Add Button */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.6rem", borderTop: "1px solid var(--border-subtle)" }}>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                          ₹{product.price}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", textDecoration: "line-through" }}>
                          ₹{product.originalPrice}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          background: isAdded ? "#10b981" : "#ffffff",
                          color: "#000000",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.45rem 0.85rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          transition: "var(--transition-fast)"
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} /> Added
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Checkout Card (4 cols) */}
        <div style={{ flex: "1 1 320px", maxWidth: "400px" }}>
          <div
            style={{
              position: "sticky",
              top: "100px",
              background: "#0d1117",
              border: "1px solid var(--border-subtle)",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingBag size={18} color="#38bdf8" /> Order Summary
              </h3>
              <span className="badge-status badge-info" style={{ fontSize: "0.7rem" }}>
                {cartTotals.count} items
              </span>
            </div>

            {/* Cart Items Preview */}
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                No items in your cart yet.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "220px", overflowY: "auto", paddingRight: "0.25rem" }}>
                {cart.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.5rem",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "8px",
                      border: "1px solid var(--border-subtle)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <img src={item.image} alt={item.name} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }} />
                      <div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 600, maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          ₹{item.price} × {item.quantity}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#fff", borderRadius: "4px", width: "22px", height: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Minus size={10} />
                      </button>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, minWidth: "14px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#fff", borderRadius: "4px", width: "22px", height: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon Entry */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.4rem" }}>
              <input
                type="text"
                placeholder="Promo (CAMPUS2026)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  padding: "0.45rem 0.65rem",
                  fontSize: "0.75rem",
                  color: "#ffffff"
                }}
              />
              <button
                type="submit"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  padding: "0.45rem 0.75rem",
                  fontSize: "0.75rem",
                  color: "#ffffff",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Apply
              </button>
            </form>

            {couponMsg && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: couponMsg.success ? "#4ade80" : "#f43f5e",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                {couponMsg.success ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
                {couponMsg.message}
              </div>
            )}

            {/* Price Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Subtotal</span>
                <span>₹{cartTotals.subtotal}</span>
              </div>
              {appliedCoupon && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#4ade80" }}>
                  <span>Discount ({appliedCoupon.discountPct}%)</span>
                  <span>-₹{cartTotals.discount}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Hostel Delivery</span>
                <span>{cartTotals.delivery === 0 ? "FREE" : `₹${cartTotals.delivery}`}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  paddingTop: "0.6rem",
                  borderTop: "1px solid var(--border-subtle)"
                }}
              >
                <span>Total Amount</span>
                <span>₹{cartTotals.finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              className="btn-pill-solid"
              onClick={handleStartCheckout}
              disabled={cart.length === 0}
              style={{
                width: "100%",
                padding: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                opacity: cart.length === 0 ? 0.5 : 1,
                cursor: cart.length === 0 ? "not-allowed" : "pointer"
              }}
            >
              PROCEED TO CHECKOUT <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Checkout & Async Simulation Modal */}
      {showCheckoutModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(5px)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
        >
          <div
            style={{
              background: "#0f131a",
              border: "1px solid var(--border-hover)",
              borderRadius: "16px",
              padding: "2rem",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
              position: "relative"
            }}
          >
            <button
              onClick={() => {
                setShowCheckoutModal(false);
                setOrderReceipt(null);
              }}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              <X size={16} />
            </button>

            {orderReceipt ? (
              /* Success Receipt View */
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(74, 222, 128, 0.15)",
                    color: "#4ade80",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem"
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem" }}>
                  Order Confirmed!
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  Your order <strong>{orderReceipt.orderId}</strong> has been received and sent to Campus Dispatch.
                </p>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    padding: "1rem",
                    textAlign: "left",
                    marginBottom: "1.5rem",
                    fontSize: "0.85rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Order ID:</span>
                    <span style={{ fontWeight: 700 }}>{orderReceipt.orderId}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Delivery Target:</span>
                    <span>{orderReceipt.deliveryAddress}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Total Paid:</span>
                    <span style={{ fontWeight: 800, color: "#4ade80" }}>₹{orderReceipt.total}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Estimated Time:</span>
                    <span>45 minutes (Hostel Delivery)</span>
                  </div>
                </div>

                <button
                  className="btn-pill-solid"
                  onClick={() => setShowCheckoutModal(false)}
                  style={{ width: "100%", padding: "0.75rem" }}
                >
                  RETURN TO STORE
                </button>
              </div>
            ) : (
              /* Checkout Form View */
              <form onSubmit={handleExecuteCheckout}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                  <ShieldCheck size={24} color="#38bdf8" />
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                      Campus Checkout
                    </h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Async Request Lifecycle Demonstration (Unit 53)
                    </span>
                  </div>
                </div>

                {/* Simulated Error Banner if active */}
                {asyncStatus.error && (
                  <div
                    style={{
                      background: "rgba(244, 63, 94, 0.15)",
                      border: "1px solid rgba(244, 63, 94, 0.4)",
                      borderRadius: "10px",
                      padding: "0.85rem",
                      marginBottom: "1.25rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontSize: "0.85rem",
                      color: "#f43f5e"
                    }}
                  >
                    <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong>Async Error Caught:</strong>
                      <div style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>{asyncStatus.error}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                        Tip: Switch Network Mode back to "Normal" at the top of Store to succeed.
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      HOSTEL DELIVERY ADDRESS / ROOM
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutData.hostel}
                      onChange={(e) => setCheckoutData({ ...checkoutData, hostel: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "0.85rem"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      CONTACT PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "0.85rem"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      PAYMENT METHOD
                    </label>
                    <select
                      value={checkoutData.paymentMethod}
                      onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        background: "#14181f",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "0.85rem"
                      }}
                    >
                      <option value="campus_card">Campus Smart ID Card (Balance: ₹1,250)</option>
                      <option value="upi">UPI / QR Code / Net Banking</option>
                      <option value="cod">Cash on Delivery at Hostel Gate</option>
                    </select>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "10px",
                      padding: "0.85rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Total Payable:</span>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#38bdf8" }}>₹{cartTotals.finalTotal}</span>
                  </div>

                  <button
                    type="submit"
                    className="btn-pill-solid"
                    disabled={asyncStatus.loading}
                    style={{
                      width: "100%",
                      padding: "0.85rem",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      opacity: asyncStatus.loading ? 0.7 : 1,
                      cursor: asyncStatus.loading ? "wait" : "pointer"
                    }}
                  >
                    {asyncStatus.loading ? (
                      <>
                        <RefreshCw size={16} className="spin-slow" /> PROCESSING PAYMENT...
                      </>
                    ) : (
                      <>
                        CONFIRM & PAY ₹{cartTotals.finalTotal} <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
