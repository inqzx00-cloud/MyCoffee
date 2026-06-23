import { useMemo } from "react";
import { Link } from "wouter";
import { MapPin, Star, Map, TrendingUp, Award } from "lucide-react";
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

export default function Browse() {
  const { shops, user, avatar, userRatedShopIds, getAverageRating } = useAppContext();

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
    <div className="min-h-screen" style={{ background: "#F5E9DA" }}>

      {/* ── Greeting ── */}
      <section className="px-5 pt-8 pb-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-0.5" style={{ color: "#A67C52" }}>
              {getGreeting()}
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
            >
              {avatar ? (
                <span>{avatar.emoji} Coffee Lover</span>
              ) : (
                "Coffee Lover"
              )}
            </h1>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-2xl font-bold" style={{ color: "#D9A066" }}>
              {user.points} pts
            </span>
            <span className="text-xs" style={{ color: "#6F4E37" }}>
              brewed so far ☕
            </span>
          </div>
        </div>
      </section>

      {/* ── Progress strip ── */}
      <section className="px-5 pb-5 max-w-6xl mx-auto">
        <div
          className="rounded-2xl px-5 py-4 flex items-center gap-5 shadow-sm"
          style={{ background: "#FBF3EA", border: "1px solid #E8D5BE" }}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6F4E37" }}>
                Territory
              </span>
              <span className="text-xs font-bold" style={{ color: "#3E2C23" }}>
                {claimedCount}/{shops.length} claimed
              </span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#E8D5BE" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg,#D9A066,#A65D57)" }}
              />
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: "#E8D5BE" }} />
          <div className="flex items-center gap-1.5">
            <Award size={16} style={{ color: "#D9A066" }} />
            <span className="text-sm font-bold" style={{ color: "#3E2C23" }}>{tierLabel}</span>
          </div>
          <div style={{ width: 1, height: 36, background: "#E8D5BE" }} />
          <Link href="/map">
            <div
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 cursor-pointer transition-all hover:scale-105"
              style={{ background: "#3E2C23", color: "#F5E9DA" }}
            >
              <Map size={14} />
              <span className="text-xs font-semibold">View map</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Featured spotlight ── */}
      <section className="px-5 pb-6 max-w-6xl mx-auto">
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
            style={{ height: 260 }}
            data-testid={`featured-card-${featured.id}`}
          >
            <img
              src={featured.image_url}
              alt={featured.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* gradient overlays */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(30,16,8,0.85) 0%, rgba(30,16,8,0.2) 55%, transparent 100%)" }}
            />
            {/* top-right rating badge */}
            {featuredAvg && (
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <Star size={14} className="fill-amber-300 text-amber-300" />
                {featuredAvg}
              </div>
            )}
            {/* checkerboard decorative accent top-left */}
            <div
              className="absolute top-4 left-4"
              style={{
                width: 32, height: 32, borderRadius: 6,
                backgroundImage: "repeating-conic-gradient(rgba(255,255,255,0.3) 0% 25%, transparent 0% 50%)",
                backgroundSize: "8px 8px",
              }}
            />
            {/* bottom text */}
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
        <section className="pb-6">
          <div className="px-5 max-w-6xl mx-auto mb-3 flex items-center justify-between">
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
          <div className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {unclaimed.map((shop, i) => {
              const avg = getAverageRating(shop.id);
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
              return (
                <Link key={shop.id} href={`/shop/${shop.id}`}>
                  <div
                    className="flex-shrink-0 relative overflow-hidden rounded-xl cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
                    style={{ width: 180, height: 220, border: `2px solid ${accent}22` }}
                    data-testid={`undiscovered-card-${shop.id}`}
                  >
                    <img
                      src={shop.image_url}
                      alt={shop.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(20,10,4,0.82) 0%, transparent 55%)" }}
                    />
                    {/* colored top bar */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accent }} />
                    {/* claim badge */}
                    <div
                      className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: accent + "33", color: "#fff", border: `1px solid ${accent}88`, backdropFilter: "blur(4px)" }}
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
            {/* CTA card */}
            <Link href="/map">
              <div
                className="flex-shrink-0 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-transform hover:-translate-y-1"
                style={{ width: 140, height: 220, background: "#3E2C23", border: "2px dashed #D9A06644" }}
              >
                <Map size={28} style={{ color: "#D9A066" }} />
                <p className="text-center text-xs font-semibold px-4 leading-tight" style={{ color: "#D9A066" }}>
                  See all on map
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── All corners grid ── */}
      <section className="px-5 pb-12 max-w-6xl mx-auto">
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
          <TrendingUp size={16} style={{ color: "#D9A066" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shops.map((shop, i) => (
            <CafeCard key={shop.id} shop={shop} accent={CARD_ACCENTS[i % CARD_ACCENTS.length]} />
          ))}
        </div>
      </section>
    </div>
  );
}
