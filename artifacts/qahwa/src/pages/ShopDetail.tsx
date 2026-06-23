import { Link, useParams } from "wouter";
import { useAppContext } from "../context/AppContext";
import { StarRating } from "../components/StarRating";
import { MapPin, ArrowLeft, Coffee, Heart, Wifi, Star } from "lucide-react";

export default function ShopDetail() {
  const { id } = useParams<{ id: string }>();
  const { shops, getShopRatings, getAverageRating } = useAppContext();

  const shop = shops.find(s => s.id === id);

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: "linear-gradient(180deg, #F5E9DA 0%, #EAD7C3 100%)" }}
      >
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#3E2C23", marginBottom: 16 }}>
          Shop not found
        </h1>
        <Link href="/">
          <button style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "transparent", border: "1.5px solid #D9A066",
            color: "#D9A066", borderRadius: 12, padding: "8px 18px",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            <ArrowLeft size={15} /> Back to Home
          </button>
        </Link>
      </div>
    );
  }

  const ratings = getShopRatings(shop.id);
  const avgRating = getAverageRating(shop.id);

  const avgCoffee = ratings.length ? ratings.reduce((acc, r) => acc + r.coffee, 0) / ratings.length : 0;
  const avgVibe = ratings.length ? ratings.reduce((acc, r) => acc + r.vibe, 0) / ratings.length : 0;
  const avgInternet = ratings.length ? ratings.reduce((acc, r) => acc + r.internet, 0) / ratings.length : 0;

  return (
    <div
      className="min-h-[100dvh] flex flex-col pb-16"
      style={{ background: "linear-gradient(180deg, #F5E9DA 0%, #EAD7C3 100%)" }}
    >
      {/* Hero image */}
      <div className="relative w-full" style={{ height: 300 }}>
        <img
          src={shop.image_url}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(30,16,8,0.7) 0%, rgba(30,16,8,0.15) 60%, transparent 100%)" }}
        />
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <button
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff", cursor: "pointer", transition: "all 0.2s ease",
              }}
              data-testid="button-back"
            >
              <ArrowLeft size={18} />
            </button>
          </Link>
        </div>
        {avgRating && (
          <div
            className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff", fontSize: 14, fontWeight: 700,
            }}
          >
            <Star size={13} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
            {avgRating}
          </div>
        )}
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 -mt-14 relative z-10">
        {/* Main card */}
        <div
          className="rounded-3xl p-6 md:p-8 mb-6"
          style={{
            background: "rgba(251,243,234,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid #E8D5BE",
            boxShadow: "0 8px 40px rgba(62,44,35,0.15)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold leading-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
              >
                {shop.name}
              </h1>
              <div className="flex items-center gap-1.5" style={{ color: "#A67C52", fontSize: 15 }}>
                <MapPin size={15} />
                <span>{shop.location}</span>
              </div>
            </div>
            <div
              className="flex flex-col items-center justify-center rounded-2xl px-5 py-3 min-w-24"
              style={{ background: "#3E2C23", boxShadow: "0 4px 16px rgba(62,44,35,0.25)" }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#D9A06699" }}>
                Overall
              </span>
              <span
                className="text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#D9A066" }}
              >
                {avgRating ? avgRating.toFixed(1) : "—"}
              </span>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6"
            style={{ borderTop: "1px solid #E8D5BE" }}
          >
            {[
              { icon: <Coffee size={20} color="#D9A066" />, label: "Coffee", avg: avgCoffee },
              { icon: <Heart size={20} color="#A65D57" />, label: "Vibe", avg: avgVibe },
              { icon: <Wifi size={20} color="#7A8F7B" />, label: "Internet", avg: avgInternet },
            ].map(({ icon, label, avg }) => (
              <div
                key={label}
                className="flex flex-col items-center p-4 rounded-2xl"
                style={{ background: "rgba(245,233,218,0.6)", border: "1px solid #E8D5BE" }}
              >
                {icon}
                <span className="text-sm font-medium mt-2 mb-1" style={{ color: "#6F4E37" }}>{label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl" style={{ color: "#3E2C23" }}>
                    {avg ? avg.toFixed(1) : "—"}
                  </span>
                  <StarRating value={Math.round(avg)} readOnly size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rate CTA */}
        <div
          className="flex flex-col items-center justify-center rounded-3xl p-8 text-center"
          style={{
            background: "rgba(251,243,234,0.8)",
            border: "1.5px solid #D9A06640",
            boxShadow: "0 4px 24px rgba(217,160,102,0.12)",
          }}
        >
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
          >
            Been here?
          </h3>
          <p className="mb-6 max-w-md" style={{ color: "#6F4E37", fontSize: 15, lineHeight: 1.6 }}>
            Share your thoughts on the brew, the atmosphere, and the connection. Help others find their next favorite spot.
          </p>
          <Link href={`/rate/${shop.id}`}>
            <button
              style={{
                background: "#6F4E37",
                color: "#F5E9DA",
                border: "none",
                borderRadius: 99,
                padding: "14px 32px",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(111,78,55,0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(111,78,55,0.35)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(111,78,55,0.3)"; }}
              data-testid={`button-rate-${shop.id}`}
            >
              Rate this café ☕
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
