import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "wouter";
import { Star, Coffee, Wifi, Music } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { AvatarPicker } from "../components/AvatarPicker";
import { CoffeeShop } from "../types";

function makeShopIcon(claimed: boolean, avatarEmoji: string | null, avatarBg: string) {
  if (claimed && avatarEmoji) {
    return L.divIcon({
      className: "",
      html: `
        <div style="
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        ">
          <div style="
            width: 44px; height: 44px;
            border-radius: 50%;
            background: ${avatarBg};
            border: 3px solid #fff;
            box-shadow: 0 4px 16px rgba(0,0,0,0.25), 0 0 0 3px ${avatarBg}44;
            display: flex; align-items: center; justify-content: center;
            font-size: 22px;
            animation: pulse-ring 2s infinite;
          ">${avatarEmoji}</div>
          <div style="
            width: 0; height: 0;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 10px solid ${avatarBg};
            margin-top: -1px;
          "></div>
        </div>`,
      iconSize: [44, 58],
      iconAnchor: [22, 58],
      popupAnchor: [0, -62],
    });
  }

  return L.divIcon({
    className: "",
    html: `
      <div style="
        display: flex; flex-direction: column; align-items: center;
      ">
        <div style="
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #FBF3EA;
          border: 2.5px solid #D9A066;
          box-shadow: 0 3px 10px rgba(0,0,0,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        ">☕</div>
        <div style="
          width: 0; height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 9px solid #D9A066;
          margin-top: -1px;
        "></div>
      </div>`,
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -52],
  });
}

function ShopMarker({ shop }: { shop: CoffeeShop }) {
  const { avatar, userRatedShopIds, getAverageRating } = useAppContext();
  const isClaimed = userRatedShopIds.includes(shop.id);
  const avg = getAverageRating(shop.id);

  const icon = makeShopIcon(
    isClaimed,
    avatar?.emoji ?? null,
    avatar?.bg ?? "#D9A066"
  );

  return (
    <Marker position={[shop.lat, shop.lng]} icon={icon}>
      <Popup
        className="qahwa-popup"
        maxWidth={220}
      >
        <div style={{ fontFamily: "system-ui, sans-serif", padding: "4px 2px" }}>
          {isClaimed && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              background: avatar?.bg ?? "#D9A066",
              color: "#fff", borderRadius: "999px",
              padding: "2px 8px", fontSize: "11px", fontWeight: 600,
              marginBottom: "6px"
            }}>
              <span>{avatar?.emoji}</span> Claimed by you
            </div>
          )}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "16px", fontWeight: 700,
            color: "#3E2C23", marginBottom: "2px"
          }}>
            {shop.name}
          </div>
          <div style={{ fontSize: "12px", color: "#6F4E37", marginBottom: "8px" }}>
            {shop.location}
          </div>
          {avg !== null && (
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              fontSize: "13px", color: "#D9A066", fontWeight: 600,
              marginBottom: "10px"
            }}>
              <span>★</span> {avg} avg rating
            </div>
          )}
          <a
            href={`/shop/${shop.id}`}
            style={{
              display: "block", textAlign: "center",
              background: "#D9A066", color: "#fff",
              padding: "6px 14px", borderRadius: "8px",
              fontSize: "12px", fontWeight: 600,
              textDecoration: "none", marginBottom: "4px"
            }}
          >
            View café
          </a>
          {!isClaimed && (
            <a
              href={`/rate/${shop.id}`}
              style={{
                display: "block", textAlign: "center",
                border: "1.5px solid #D9A066", color: "#D9A066",
                padding: "5px 14px", borderRadius: "8px",
                fontSize: "12px", fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Rate &amp; claim
            </a>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export default function MapPage() {
  const { shops, avatar, userRatedShopIds } = useAppContext();
  const [showPicker, setShowPicker] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  const claimedCount = userRatedShopIds.length;
  const pct = Math.round((claimedCount / shops.length) * 100);

  const tierLabel =
    claimedCount === 0 ? "Explorer" :
    claimedCount <= 2 ? "Wanderer" :
    claimedCount <= 4 ? "Regular" :
    claimedCount <= 6 ? "Connoisseur" : "Legend";

  const tierColor =
    claimedCount === 0 ? "#6F4E37" :
    claimedCount <= 2 ? "#A67C52" :
    claimedCount <= 4 ? "#D9A066" :
    claimedCount <= 6 ? "#7A8F7B" : "#A65D57";

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col" style={{ background: "#F5E9DA" }}>
      {showPicker && <AvatarPicker onClose={() => setShowPicker(false)} />}

      {/* Stats bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 shadow-sm"
        style={{ background: "#FBF3EA", borderBottom: "1px solid #E8D5BE" }}
      >
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs font-medium" style={{ color: "#6F4E37" }}>Territory</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-32 overflow-hidden rounded-full" style={{ background: "#E8D5BE" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: "#D9A066" }}
                />
              </div>
              <span className="text-sm font-bold" style={{ color: "#3E2C23" }}>
                {claimedCount}/{shops.length}
              </span>
            </div>
          </div>
          <div style={{ width: 1, height: 32, background: "#E8D5BE" }} />
          <div>
            <p className="text-xs font-medium" style={{ color: "#6F4E37" }}>Rank</p>
            <p className="text-sm font-bold" style={{ color: tierColor }}>
              {tierLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!avatar ? (
            <button
              onClick={() => setShowPicker(true)}
              className="rounded-lg px-4 py-1.5 text-sm font-semibold shadow-sm transition-all hover:scale-105"
              style={{ background: "#D9A066", color: "#fff" }}
              data-testid="pick-avatar-btn"
            >
              Pick your avatar to claim cafés
            </button>
          ) : (
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all hover:scale-105"
              style={{ background: avatar.bg + "22", border: `1.5px solid ${avatar.bg}`, color: "#3E2C23" }}
              data-testid="change-avatar-btn"
            >
              <span className="text-lg">{avatar.emoji}</span>
              Change avatar
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div
        className="flex items-center gap-5 px-4 py-2 text-xs"
        style={{ color: "#6F4E37", borderBottom: "1px solid #E8D5BE", background: "#FBF3EA" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border-2" style={{ background: "#FBF3EA", borderColor: "#D9A066" }} />
          Unclaimed café
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: avatar?.bg ?? "#D9A066" }} />
          Claimed by you
        </div>
        <span className="ml-auto hidden sm:block" style={{ color: "#A0856A" }}>
          Rate cafés to claim territory · earn 15 pts each
        </span>
      </div>

      {/* Map */}
      <div className="flex-1" data-testid="map-container">
        {mapReady && (
          <MapContainer
            center={[39.5, -98.35]}
            zoom={4}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {shops.map((shop) => (
              <ShopMarker key={shop.id} shop={shop} />
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
