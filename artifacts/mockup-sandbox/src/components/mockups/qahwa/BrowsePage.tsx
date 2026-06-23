import { Star, MapPin, Map, Award, Coffee, UserCircle, TrendingUp } from "lucide-react";

const SHOPS = [
  { id: "1", name: "Qahwa House", location: "Al Olaya, Riyadh", image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80", claimed: true },
  { id: "2", name: "Brew & Co.", location: "Tahlia St, Riyadh", image_url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80", claimed: false },
  { id: "3", name: "The Corner Cup", location: "Sulaimania, Riyadh", image_url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80", claimed: false },
  { id: "4", name: "Misk Coffee", location: "King Fahd Rd, Riyadh", image_url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80", claimed: false },
];

const CARD_ACCENTS = ["#D9A066", "#7A8F7B", "#A65D57", "#6F4E37"];

function NavBar() {
  return (
    <header style={{ background: "#3E2C23", boxShadow: "0 2px 16px rgba(62,44,35,0.3)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#D9A066", letterSpacing: "-0.5px" }}>
            Qahwa
          </span>
          <nav style={{ display: "flex", gap: 4 }}>
            {[
              { icon: <Coffee size={13} />, label: "Browse", active: true },
              { icon: <Map size={13} />, label: "Map", active: false },
            ].map(({ icon, label, active }) => (
              <span key={label} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer",
                color: active ? "#F5E9DA" : "#D9A06699",
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                transition: "all 0.2s ease",
              }}>
                {icon}{label}
              </span>
            ))}
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#D9A066", fontWeight: 500 }}>42 pts ☕</span>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#6F4E37", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease" }}>
            <UserCircle size={18} color="#F5E9DA" />
          </div>
        </div>
      </div>
    </header>
  );
}

function ProgressStrip() {
  return (
    <div style={{
      background: "rgba(251,243,234,0.8)",
      border: "1px solid #E8D5BE",
      borderRadius: 20,
      padding: "14px 20px",
      display: "flex", alignItems: "center", gap: 20,
      boxShadow: "0 2px 12px rgba(217,160,102,0.1)",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6F4E37" }}>Territory</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#3E2C23" }}>1/4 claimed</span>
        </div>
        <div style={{ height: 10, borderRadius: 99, background: "#E8D5BE", overflow: "hidden" }}>
          <div style={{ width: "25%", height: "100%", background: "linear-gradient(90deg,#D9A066,#A65D57)", borderRadius: 99, transition: "width 0.7s ease" }} />
        </div>
      </div>
      <div style={{ width: 1, height: 36, background: "#E8D5BE" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Award size={15} color="#D9A066" />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#3E2C23" }}>Wanderer</span>
      </div>
      <div style={{ width: 1, height: 36, background: "#E8D5BE" }} />
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "#3E2C23", color: "#F5E9DA",
        borderRadius: 12, padding: "8px 14px", cursor: "pointer",
        fontSize: 12, fontWeight: 600,
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(62,44,35,0.25)",
      }}>
        <Map size={13} /> View map
      </div>
    </div>
  );
}

function FeaturedCard() {
  const shop = SHOPS[0];
  return (
    <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", height: 280, cursor: "pointer" }}
      className="group"
    >
      <img src={shop.image_url} alt={shop.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
        onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,16,8,0.88) 0%, rgba(30,16,8,0.18) 55%, transparent 100%)" }} />
      <div style={{
        position: "absolute", top: 16, right: 16,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: 99, padding: "6px 12px",
        fontSize: 13, fontWeight: 700, color: "#fff",
      }}>
        <Star size={13} style={{ fill: "#fbbf24", color: "#fbbf24" }} /> 4.3
      </div>
      <div style={{
        position: "absolute", top: 16, left: 16,
        width: 32, height: 32, borderRadius: 6, opacity: 0.6,
        backgroundImage: "repeating-conic-gradient(rgba(255,255,255,0.4) 0% 25%, transparent 0% 50%)",
        backgroundSize: "8px 8px",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#D9A066", marginBottom: 4 }}>Featured café</p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 6, lineHeight: 1.2 }}>{shop.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
          <MapPin size={13} />{shop.location}
        </div>
      </div>
    </div>
  );
}

function UndiscoveredScroll() {
  const unclaimed = SHOPS.filter(s => !s.claimed);
  return (
    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
      {unclaimed.map((shop, i) => {
        const accent = CARD_ACCENTS[(i + 1) % CARD_ACCENTS.length];
        return (
          <div key={shop.id} style={{
            flexShrink: 0, width: 175, height: 225,
            borderRadius: 18, overflow: "hidden", position: "relative",
            cursor: "pointer", border: `2px solid ${accent}28`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: `0 4px 16px ${accent}18`,
          }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 28px ${accent}30`; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${accent}18`; }}
          >
            <img src={shop.image_url} alt={shop.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,10,4,0.85) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accent }} />
            <div style={{
              position: "absolute", top: 12, right: 12,
              fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 99,
              background: accent + "30", color: "#fff",
              border: `1px solid ${accent}70`, backdropFilter: "blur(4px)",
            }}>
              Unclaimed
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px" }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: 13, lineHeight: 1.3, marginBottom: 2 }}>{shop.name}</h4>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>{shop.location}</p>
            </div>
          </div>
        );
      })}
      <div style={{
        flexShrink: 0, width: 140, height: 225, borderRadius: 18,
        background: "#3E2C23", border: "2px dashed #D9A06644",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
        cursor: "pointer", transition: "transform 0.2s ease",
      }}
        onMouseOver={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")}
        onMouseOut={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
      >
        <Map size={26} color="#D9A066" />
        <p style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#D9A066", padding: "0 16px", lineHeight: 1.4 }}>See all on map</p>
      </div>
    </div>
  );
}

function CafeCard({ shop, accent }: { shop: typeof SHOPS[0]; accent: string }) {
  return (
    <div style={{
      borderRadius: 22, overflow: "hidden", cursor: "pointer",
      background: "#FBF3EA",
      border: shop.claimed ? `1.5px solid ${accent}` : "1.5px solid transparent",
      boxShadow: `0 3px 16px ${accent}15`,
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
      onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 36px ${accent}28`; }}
      onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 3px 16px ${accent}15`; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: shop.claimed ? 3 : 2, background: accent }} />
      <div style={{ position: "relative", height: 185, overflow: "hidden" }}>
        <img src={shop.image_url} alt={shop.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,10,4,0.55) 0%, transparent 60%)", opacity: 0.65 }} />
        {shop.claimed && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            display: "flex", alignItems: "center", gap: 5,
            background: accent, color: "#fff",
            borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 700,
          }}>☕ Claimed</div>
        )}
        <div style={{
          position: "absolute", top: 12, right: 12,
          display: "flex", alignItems: "center", gap: 4,
          background: "rgba(251,243,234,0.93)", backdropFilter: "blur(4px)",
          borderRadius: 99, padding: "4px 8px", fontSize: 11, fontWeight: 700, color: "#3E2C23",
        }}>
          <Star size={10} style={{ fill: accent, color: accent }} /> 4.2
        </div>
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: "#3E2C23", marginBottom: 4, lineHeight: 1.3 }}>{shop.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#A67C52", fontSize: 13, marginBottom: 14 }}>
          <MapPin size={12} />{shop.location}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 99,
            background: accent + "22", color: accent, border: `1px solid ${accent}44`,
          }}>View café →</span>
          {!shop.claimed && (
            <button style={{
              fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 99,
              background: "#3E2C23", color: "#F5E9DA", border: "none", cursor: "pointer",
              transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(62,44,35,0.2)",
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >Rate</button>
          )}
        </div>
      </div>
    </div>
  );
}

export function BrowsePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #F5E9DA 0%, #EAD7C3 100%)",
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <NavBar />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px" }}>

        {/* Greeting */}
        <section style={{ padding: "32px 0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#A67C52", marginBottom: 4 }}>Good morning</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: "#3E2C23", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
                ☕ Coffee Lover
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#D9A066", lineHeight: 1 }}>42 pts</div>
              <div style={{ fontSize: 12, color: "#6F4E37", marginTop: 3 }}>brewed so far ☕</div>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section style={{ paddingBottom: 24 }}>
          <ProgressStrip />
        </section>

        {/* Featured */}
        <section style={{ paddingBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "#3E2C23" }}>Today's Spotlight</h2>
            <span style={{ display: "inline-block", width: 32, height: 4, borderRadius: 99, background: "#D9A066" }} />
          </div>
          <FeaturedCard />
        </section>

        {/* Undiscovered */}
        <section style={{ paddingBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "#3E2C23" }}>Undiscovered</h2>
            <span style={{ fontSize: 12, color: "#A67C52" }}>3 spots waiting</span>
          </div>
          <UndiscoveredScroll />
        </section>

        {/* All Corners */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "#3E2C23" }}>All Corners</h2>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #D9A06660, transparent)" }} />
            <TrendingUp size={15} color="#D9A066" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, position: "relative" }}>
            {SHOPS.map((shop, i) => (
              <CafeCard key={shop.id} shop={shop} accent={CARD_ACCENTS[i % CARD_ACCENTS.length]} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
