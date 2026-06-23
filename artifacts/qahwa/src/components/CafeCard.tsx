import { Link, useLocation } from "wouter";
import { CoffeeShop } from "../types";
import { useAppContext } from "../context/AppContext";
import { Star, MapPin, CheckCircle, Wifi, Volume2, BookOpen } from "lucide-react";

interface CafeCardProps {
  shop: CoffeeShop;
  accent?: string;
}

const SHOP_TAGS: Record<string, string[]> = {
  default: ["Quiet", "Good WiFi", "Study-friendly"],
};

function getShopTags(shopId: string): string[] {
  return SHOP_TAGS[shopId] ?? SHOP_TAGS.default;
}

const TAG_ICONS: Record<string, React.ReactNode> = {
  "Quiet": <Volume2 size={10} />,
  "Good WiFi": <Wifi size={10} />,
  "Study-friendly": <BookOpen size={10} />,
};

export function CafeCard({ shop, accent = "#D9A066" }: CafeCardProps) {
  const { getAverageRating, userRatedShopIds, avatar } = useAppContext();
  const [, setLocation] = useLocation();
  const avgRating = getAverageRating(shop.id);
  const isClaimed = userRatedShopIds.includes(shop.id);
  const tags = getShopTags(shop.id);

  const handleRate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocation(`/rate/${shop.id}`);
  };

  return (
    <Link href={`/shop/${shop.id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl cursor-pointer flex flex-col"
        style={{
          background: "#FBF3EA",
          border: isClaimed ? `1.5px solid ${accent}` : "1.5px solid #EAD7C3",
          boxShadow: "0 3px 16px rgba(62,44,35,0.08)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseOver={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 36px rgba(62,44,35,0.16)`;
        }}
        onMouseOut={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 3px 16px rgba(62,44,35,0.08)";
        }}
        data-testid={`cafe-card-${shop.id}`}
      >
        {/* Accent top bar */}
        <div
          style={{ height: isClaimed ? 3 : 2, background: accent, transition: "height 0.2s ease" }}
        />

        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 190 }}>
          <img
            src={shop.image_url}
            alt={shop.name}
            className="w-full h-full object-cover"
            style={{ transition: "transform 0.5s ease" }}
            onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
            onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(20,10,4,0.65) 0%, rgba(20,10,4,0.1) 55%, transparent 100%)" }}
          />

          {/* Claimed badge */}
          {isClaimed && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ background: accent, color: "#fff", boxShadow: `0 2px 8px ${accent}55` }}
            >
              {avatar ? (
                <span className="text-sm leading-none">{avatar.emoji}</span>
              ) : (
                <CheckCircle size={11} />
              )}
              Claimed
            </div>
          )}

          {/* Rating badge */}
          {avgRating && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold"
              style={{
                background: "#D9A066",
                color: "#fff",
                boxShadow: "0 2px 10px rgba(217,160,102,0.45)",
              }}
            >
              <Star size={10} style={{ fill: "#fff", color: "#fff" }} />
              {avgRating}
            </div>
          )}

          {/* Decorative corner */}
          <div
            className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-40"
            style={{
              width: 18, height: 18,
              backgroundImage: "repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)",
              backgroundSize: "4px 4px",
              borderRadius: 3,
              transition: "opacity 0.2s ease",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          {/* Name + Location */}
          <div>
            <h3
              className="font-bold text-lg leading-tight mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
            >
              {shop.name}
            </h3>
            <div className="flex items-center gap-1" style={{ color: "#A67C52", fontSize: 13 }}>
              <MapPin size={12} />
              <span>{shop.location}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "#F5E9DA",
                  color: "#6F4E37",
                  border: "1px solid #E8D5BE",
                }}
              >
                {TAG_ICONS[tag]}
                {tag}
              </span>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: accent + "1A",
                color: accent,
                border: `1px solid ${accent}44`,
              }}
            >
              View café →
            </span>
            {!isClaimed && (
              <button
                onClick={handleRate}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: "#3E2C23",
                  color: "#F5E9DA",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(62,44,35,0.2)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.07)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(62,44,35,0.3)";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(62,44,35,0.2)";
                }}
                data-testid={`button-rate-${shop.id}`}
              >
                Rate
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
