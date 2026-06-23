import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Map, Coffee, UserCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { AvatarPicker } from "./AvatarPicker";

export function PointsBar() {
  const { user, avatar, userRatedShopIds, shops } = useAppContext();
  const [showPicker, setShowPicker] = useState(false);
  const [animating, setAnimating] = useState(false);
  const prevPoints = useRef(user.points);

  useEffect(() => {
    if (user.points !== prevPoints.current && user.points > prevPoints.current) {
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 800);
      prevPoints.current = user.points;
      return () => clearTimeout(t);
    }
    prevPoints.current = user.points;
  }, [user.points]);

  const claimedCount = userRatedShopIds.length;
  const totalCount = shops.length;

  return (
    <>
      {showPicker && <AvatarPicker onClose={() => setShowPicker(false)} />}

      <header
        className="w-full sticky top-0 z-50"
        style={{
          background: "#3E2C23",
          boxShadow: "0 2px 20px rgba(62,44,35,0.35)",
        }}
        data-testid="points-bar"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          {/* Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <span
                className="text-xl font-bold tracking-tight cursor-pointer"
                style={{ fontFamily: "'Playfair Display', serif", color: "#D9A066", letterSpacing: "-0.3px" }}
                data-testid="nav-logo"
              >
                Qahwa
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/">
                <span
                  className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium cursor-pointer"
                  style={{ color: "#F5E9DA", background: "rgba(255,255,255,0.08)", transition: "all 0.2s ease" }}
                  data-testid="nav-browse"
                >
                  <Coffee size={13} /> Browse
                </span>
              </Link>
              <Link href="/map">
                <span
                  className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium cursor-pointer"
                  style={{ color: "#D9A06699", transition: "all 0.2s ease" }}
                  data-testid="nav-map"
                >
                  <Map size={13} /> Map
                </span>
              </Link>
            </nav>
          </div>

          {/* Points + Avatar */}
          <div className="flex items-center gap-3">
            {/* Points badge */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: animating ? "rgba(217,160,102,0.25)" : "rgba(217,160,102,0.1)",
                border: `1px solid ${animating ? "#D9A066" : "#D9A06633"}`,
                borderRadius: 99,
                padding: "5px 12px",
                transition: "all 0.3s ease",
                transform: animating ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: animating ? "#D9A066" : "#F5E9DA",
                  transition: "color 0.3s ease",
                }}
                data-testid="points-display"
              >
                {user.points > 0
                  ? `You've brewed ${user.points} pts ☕`
                  : "0 pts brewed ☕"}
              </span>
            </div>

            {/* Claimed count */}
            {claimedCount > 0 && (
              <span className="hidden text-xs sm:block" style={{ color: "#D9A06680" }}>
                {claimedCount}/{totalCount} claimed
              </span>
            )}

            {/* Avatar */}
            <button
              onClick={() => setShowPicker(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-105"
              style={{
                background: avatar ? avatar.bg : "#6F4E37",
                boxShadow: `0 0 0 2px ${avatar?.bg ?? "#D9A066"}44`,
                transition: "all 0.2s ease",
              }}
              data-testid="avatar-button"
              title={avatar ? `${avatar.label} — change avatar` : "Choose your avatar"}
            >
              {avatar ? (
                <span className="text-lg leading-none">{avatar.emoji}</span>
              ) : (
                <UserCircle size={18} color="#F5E9DA" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
