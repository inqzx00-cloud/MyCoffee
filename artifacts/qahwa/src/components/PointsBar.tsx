import { useState } from "react";
import { Link } from "wouter";
import { Map, Coffee, UserCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { AvatarPicker } from "./AvatarPicker";

export function PointsBar() {
  const { user, avatar, userRatedShopIds, shops } = useAppContext();
  const [showPicker, setShowPicker] = useState(false);

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
                  style={{
                    color: "#F5E9DA",
                    background: "rgba(255,255,255,0.08)",
                    transition: "all 0.2s ease",
                  }}
                  data-testid="nav-browse"
                >
                  <Coffee size={13} />
                  Browse
                </span>
              </Link>
              <Link href="/map">
                <span
                  className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium cursor-pointer"
                  style={{
                    color: "#D9A06699",
                    transition: "all 0.2s ease",
                  }}
                  data-testid="nav-map"
                >
                  <Map size={13} />
                  Map
                </span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {claimedCount > 0 && (
              <span className="hidden text-xs sm:block" style={{ color: "#D9A06699" }}>
                {claimedCount}/{totalCount} claimed
              </span>
            )}
            <span
              className="text-sm font-semibold"
              style={{ color: "#F5E9DA" }}
              data-testid="points-display"
            >
              {user.points > 0 ? `${user.points} pts ☕` : "0 pts"}
            </span>
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
