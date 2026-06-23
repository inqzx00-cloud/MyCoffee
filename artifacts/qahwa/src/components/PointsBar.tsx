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
        className="w-full shadow-md"
        style={{ background: "#3E2C23" }}
        data-testid="points-bar"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <span
                className="text-xl font-bold tracking-tight cursor-pointer"
                style={{ fontFamily: "'Playfair Display', serif", color: "#D9A066" }}
                data-testid="nav-logo"
              >
                Qahwa
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/">
                <span
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/10 cursor-pointer"
                  style={{ color: "#F5E9DA" }}
                  data-testid="nav-browse"
                >
                  <Coffee size={14} />
                  Browse
                </span>
              </Link>
              <Link href="/map">
                <span
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/10 cursor-pointer"
                  style={{ color: "#D9A066" }}
                  data-testid="nav-map"
                >
                  <Map size={14} />
                  Map
                </span>
              </Link>
            </nav>
          </div>

          {/* Points + Avatar */}
          <div className="flex items-center gap-3">
            {claimedCount > 0 && (
              <span className="hidden text-xs sm:block" style={{ color: "#D9A066" }}>
                {claimedCount}/{totalCount} claimed
              </span>
            )}
            <span className="text-sm font-medium" style={{ color: "#F5E9DA" }} data-testid="points-display">
              {user.points > 0 ? `${user.points} pts ☕` : "0 pts"}
            </span>
            <button
              onClick={() => setShowPicker(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-105 hover:ring-2 ring-offset-1 ring-offset-[#3E2C23]"
              style={{
                background: avatar ? avatar.bg : "#6F4E37",
                ringColor: avatar?.bg ?? "#D9A066",
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
