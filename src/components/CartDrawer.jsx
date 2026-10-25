import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    cartTotals,
    setActiveTab
  } = useApp();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    setTimeout(() => setCouponFeedback(null), 3500);
    setCouponInput("");
  };

  const handleProceedToStore = () => {
    setIsCartOpen(false);
    setActiveTab("store");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="cart-backdrop"
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
          animation: "fadeIn 0.25s ease-out"
        }}
      />

      {/* Slide-out Drawer */}
      <aside
        className="cart-drawer"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "440px",
          background: "#0d1117",
          borderLeft: "1px solid var(--border-hover)",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.8)",
          animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.02)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(59, 130, 246, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8"
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
                CAMPUS CART
              </h2>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {cartTotals.count} {cartTotals.count === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: "pointer",
              transition: "var(--transition-fast)"
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Delivery progress bar */}
        <div style={{ padding: "0.75rem 1.5rem", background: "rgba(59, 130, 246, 0.06)", borderBottom: "1px solid var(--border-subtle)" }}>
          {cartTotals.subtotal >= 500 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80", fontSize: "0.8rem", fontWeight: 600 }}>
              <CheckCircle2 size={15} /> You've unlocked FREE Campus Hostel Delivery!
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                <span>Add ₹{500 - cartTotals.subtotal} more for free delivery</span>
                <span>{Math.round((cartTotals.subtotal / 500) * 100)}%</span>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, (cartTotals.subtotal / 500) * 100)}%`,
                    background: "#38bdf8",
                    transition: "width 0.3s ease"
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                color: "var(--text-muted)",
                padding: "2rem 1rem"
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem"
                }}
              >
                <ShoppingBag size={28} color="var(--text-dim)" />
              </div>
              <h3 style={{ fontSize: "1.1rem", color: "#ffffff", marginBottom: "0.4rem" }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: "0.85rem", maxWidth: "260px", marginBottom: "1.5rem" }}>
                Explore campus stationery, tech gadgets, hoodies, and exam books in our store.
              </p>
              <button
                className="btn-pill-solid"
                onClick={handleProceedToStore}
                style={{ fontSize: "0.85rem" }}
              >
                BROWSE CAMPUS STORE
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "0.9rem",
                  padding: "0.85rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  transition: "var(--transition-fast)"
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid var(--border-subtle)"
                  }}
                />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          margin: 0,
                          lineHeight: 1.3,
                          maxWidth: "190px"
                        }}
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-dim)",
                          cursor: "pointer",
                          padding: "2px"
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "#38bdf8", textTransform: "uppercase" }}>
                      {item.category}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#ffffff" }}>
                      ₹{item.price * item.quantity}
                    </div>

                    {/* Stepper */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "6px",
                        padding: "0.15rem 0.4rem"
                      }}
                    >
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        style={{ background: "transparent", border: "none", color: "#ffffff", cursor: "pointer", display: "flex" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, minWidth: "16px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        style={{ background: "transparent", border: "none", color: "#ffffff", cursor: "pointer", display: "flex" }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals & Coupon */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid var(--border-subtle)",
              background: "rgba(255, 255, 255, 0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem"
            }}
          >
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="Promo code (e.g. CAMPUS2026)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  padding: "0.5rem 0.75rem",
                  color: "#ffffff",
                  fontSize: "0.8rem"
                }}
              />
              <button
                type="submit"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  padding: "0.5rem 0.9rem",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Apply
              </button>
            </form>

            {/* Coupon Feedback Banner */}
            {couponFeedback && (
              <div
                style={{
                  fontSize: "0.75rem",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: couponFeedback.success ? "rgba(74, 222, 128, 0.15)" : "rgba(244, 63, 94, 0.15)",
                  color: couponFeedback.success ? "#4ade80" : "#f43f5e",
                  border: `1px solid ${couponFeedback.success ? "rgba(74, 222, 128, 0.3)" : "rgba(244, 63, 94, 0.3)"}`
                }}
              >
                {couponFeedback.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {couponFeedback.message}
              </div>
            )}

            {appliedCoupon && !couponFeedback && (
              <div
                style={{
                  fontSize: "0.75rem",
                  padding: "0.35rem 0.6rem",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(59, 130, 246, 0.15)",
                  color: "#38bdf8",
                  border: "1px solid rgba(59, 130, 246, 0.3)"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Tag size={13} /> {appliedCoupon.code} ({appliedCoupon.discountPct}% OFF)
                </span>
                <span style={{ fontWeight: 700 }}>-₹{cartTotals.discount}</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Subtotal</span>
                <span>₹{cartTotals.subtotal}</span>
              </div>

              {appliedCoupon && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#4ade80" }}>
                  <span>Coupon Savings</span>
                  <span>-₹{cartTotals.discount}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Delivery</span>
                <span>{cartTotals.delivery === 0 ? "FREE" : `₹${cartTotals.delivery}`}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid var(--border-subtle)",
                  marginTop: "0.2rem"
                }}
              >
                <span>Grand Total</span>
                <span>₹{cartTotals.finalTotal}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="btn-pill-solid"
              onClick={handleProceedToStore}
              style={{
                width: "100%",
                padding: "0.85rem",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              GO TO STORE & CHECKOUT <ArrowRight size={16} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
