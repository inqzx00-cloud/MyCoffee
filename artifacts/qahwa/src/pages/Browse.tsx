import { useMemo, useState } from "react";
import { Link } from "wouter";
import { MapPin, Star, Map, TrendingUp, Award, Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { CafeCard } from "../components/CafeCard";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const CARD_ACCENTS = [
  "#D9A066", "#7A8F7B", "#A65D57", "#6F4E37",
  "#A67C52", "#4A6670", "#C08080", "#3E2C23",
];

const FILTERS = ["All", "Quiet", "Good WiFi", "Aesthetic", "Study-friendly", "Outdoor", "Late-night"];

export default function Browse() {
  const { shops, user, avatar, userRatedShopIds, getAverageRating } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All");

  const featured = useMemo(() => shops[Math.floor(Math.random() * shops.length)], []);
  const unclaimed = shops.filter((s) => !userRatedShopIds.includes(s.id));
  const claimedCount = userRatedShopIds.length;
  const pct = Math.round((claimedCount / shops.length) * 100);

  const tierLabel =
    claimedCount === 0 ? "Explorer" :
    claimedCount <= 2 ? "Wanderer" :
    claimedCount <= 4 ? "Regular" :
    claimedCount <= 6 ? "Connoisseur" : "Legend";

  const featuredAvg = getAverageRating(featured.id);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #F5E9DA 0%, #EAD7C3 100%)" }}>

      {/* ── Hero header ── */}
      <section style={{ background: "#3E2C23", paddingBottom: 32 }}>
        <div className="max-w-6xl mx-auto px-5 pt-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "#D9A06699" }}>
                {getGreeting()}{avatar ? `, ${avatar.emoji}` : ""}
              </p>
              <h1
                className="text-3xl md:text-4xl font-bold leading-tight mb-1"
                style={{ fontFamily: "'Playfair Display', serif", color: "#F5E9DA", letterSpacing: "-0.5px" }}
              >
                Qahwa
              </h1>
              <p style={{ color: "#D9A06699", fontSize: 15 }}>Find your next coffee spot</p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 pt-1">
              <span className="text-2xl font-bold" style={{ color: "#D9A066" }}>
                {user.points} pts
              </span>
              <span className="text-xs" style={{ color: "#D9A06699" }}>
                brewed so far ☕
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-6"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Search size={16} color="#D9A06699" />
            <span style={{ color: "#D9A06666", fontSize: 14 }}>Search cafés, neighbourhoods…</span>
          </div>

          {/* Filter chips */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  flexShrink: 0,
                  padding: "7px 16px",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.2s ease",
                  background: activeFilter === f ? "#D9A066" : "rgba(255,255,255,0.08)",
                  color: activeFilter === f ? "#3E2C23" : "#D9A06699",
                  boxShadow: activeFilter === f ? "0 2px 10px rgba(217,160,102,0.35)" : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5">

        {/* ── Progress strip ── */}
        <section className="py-5">
          <div
            className="rounded-2xl px-5 py-4 flex items-center gap-5"
            style={{
              background: "rgba(251,243,234,0.9)",
              border: "1px solid #E8D5BE",
              boxShadow: "0 2px 12px rgba(217,160,102,0.1)",
            }}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6F4E37" }}>
                  Territory
                </span>
                <span className="text-xs font-bold" style={{ color: "#3E2C23" }}>
                  {claimedCount}/{shops.length} claimed
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#E8D5BE" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: "linear-gradient(90deg,#D9A066,#A65D57)",
                    transition: "width 0.7s ease",
                  }}
                />
              </div>
            </div>
            <div style={{ width: 1, height: 36, background: "#E8D5BE" }} />
            <div className="flex items-center gap-1.5">
              <Award size={15} style={{ color: "#D9A066" }} />
              <span className="text-sm font-bold" style={{ color: "#3E2C23" }}>{tierLabel}</span>
            </div>
            <div style={{ width: 1, height: 36, background: "#E8D5BE" }} />
            <Link href="/map">
              <div
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 cursor-pointer"
                style={{
                  background: "#3E2C23", color: "#F5E9DA",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 10px rgba(62,44,35,0.25)",
                }}
              >
                <Map size={13} />
                <span className="text-xs font-semibold">View map</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── Featured spotlight ── */}
        <section className="pb-7">
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
            >
              Today's Spotlight
            </h2>
            <span
              className="inline-block w-8 h-1 rounded-full"
              style={{ background: "#D9A066" }}
            />
          </div>
          <Link href={`/shop/${featured.id}`}>
            <div
              className="relative w-full overflow-hidden rounded-2xl cursor-pointer group"
              style={{ height: 270, boxShadow: "0 4px 24px rgba(62,44,35,0.18)" }}
            >
              <img
                src={featured.image_url}
                alt={featured.name}
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.7s ease" }}
                onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(30,16,8,0.88) 0%, rgba(30,16,8,0.2) 55%, transparent 100%)" }}
              />
              {featuredAvg && (
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <Star size={13} className="fill-amber-300 text-amber-300" />
                  {featuredAvg}
                </div>
              )}
              <div
                className="absolute top-4 left-4"
                style={{
                  width: 32, height: 32, borderRadius: 6, opacity: 0.6,
                  backgroundImage: "repeating-conic-gradient(rgba(255,255,255,0.4) 0% 25%, transparent 0% 50%)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#D9A066" }}>
                  Featured café
                </p>
                <h3
                  className="text-2xl font-bold text-white mb-1 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {featured.name}
                </h3>
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <MapPin size={13} />
                  {featured.location}
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── Undiscovered horizontal scroll ── */}
        {unclaimed.length > 0 && (
          <section className="pb-7">
            <div className="flex items-center justify-between mb-3">
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
              >
                Undiscovered
              </h2>
              <span className="text-xs" style={{ color: "#A67C52" }}>
                {unclaimed.length} spots waiting
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {unclaimed.map((shop, i) => {
                const avg = getAverageRating(shop.id);
                const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
                return (
                  <Link key={shop.id} href={`/shop/${shop.id}`}>
                    <div
                      className="flex-shrink-0 relative overflow-hidden rounded-xl cursor-pointer group"
                      style={{
                        width: 180, height: 225,
                        border: `2px solid ${accent}28`,
                        boxShadow: `0 4px 16px ${accent}18`,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onMouseOver={e => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 28px ${accent}30`;
                      }}
                      onMouseOut={e => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${accent}18`;
                      }}
                      data-testid={`undiscovered-card-${shop.id}`}
                    >
                      <img
                        src={shop.image_url}
                        alt={shop.name}
                        className="w-full h-full object-cover"
                        style={{ transition: "transform 0.5s ease" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(20,10,4,0.82) 0%, transparent 55%)" }}
                      />
                      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accent }} />
                      <div
                        className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: accent + "30", color: "#fff",
                          border: `1px solid ${accent}70`,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        Unclaimed
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4
                          className="font-bold text-white text-sm leading-tight mb-0.5"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {shop.name}
                        </h4>
                        <p className="text-white/60 text-xs">{shop.location}</p>
                        {avg && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={10} className="fill-amber-300 text-amber-300" />
                            <span className="text-white/80 text-xs">{avg}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Link href="/map">
                <div
                  className="flex-shrink-0 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer"
                  style={{
                    width: 140, height: 225,
                    background: "#3E2C23",
                    border: "2px dashed #D9A06644",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseOver={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(-5px)")}
                  onMouseOut={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
                >
                  <Map size={26} style={{ color: "#D9A066" }} />
                  <p className="text-center text-xs font-semibold px-4 leading-tight" style={{ color: "#D9A066" }}>
                    See all on map
                  </p>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── All corners grid ── */}
        <section className="pb-14">
          <div className="flex items-center gap-3 mb-5">
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
            >
              All Corners
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, #D9A06660, transparent)" }}
            />
            <TrendingUp size={15} style={{ color: "#D9A066" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shops.map((shop, i) => (
              <CafeCard key={shop.id} shop={shop} accent={CARD_ACCENTS[i % CARD_ACCENTS.length]} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
