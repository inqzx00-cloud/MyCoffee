import { Link, useParams, useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import { RatingForm } from "../components/RatingForm";
import { ArrowLeft } from "lucide-react";
import { Rating } from "../types";

export default function RatePage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { shops, submitRating } = useAppContext();

  const shop = shops.find(s => s.id === id);

  if (!shop) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: "linear-gradient(180deg, #F5E9DA 0%, #EAD7C3 100%)" }}
      >
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#3E2C23", marginBottom: 16 }}>
          Shop not found
        </h1>
        <Link href="/">
          <button style={{
            border: "1.5px solid #D9A066", color: "#D9A066",
            background: "transparent", borderRadius: 12,
            padding: "8px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  const handleRatingSubmit = (ratings: { coffee: number; vibe: number; internet: number }) => {
    const newRating: Rating = {
      id: Math.random().toString(36).substring(7),
      shop_id: shop.id,
      coffee: ratings.coffee,
      vibe: ratings.vibe,
      internet: ratings.internet,
      created_at: new Date().toISOString(),
    };
    submitRating(newRating);
    setLocation(`/shop/${shop.id}`);
  };

  return (
    <div
      className="min-h-[100dvh]"
      style={{ background: "linear-gradient(180deg, #F5E9DA 0%, #EAD7C3 100%)" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: "rgba(251,243,234,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #E8D5BE",
          boxShadow: "0 2px 12px rgba(62,44,35,0.08)",
        }}
      >
        <div className="container mx-auto px-4 h-14 flex items-center max-w-lg">
          <Link href={`/shop/${shop.id}`}>
            <button
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 36, height: 36, borderRadius: "50%",
                background: "transparent", border: "1.5px solid #E8D5BE",
                color: "#6F4E37", cursor: "pointer", marginRight: 12,
                transition: "all 0.2s ease",
              }}
              data-testid="button-back"
            >
              <ArrowLeft size={16} />
            </button>
          </Link>
          <h1
            className="font-bold text-lg truncate flex-1"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
          >
            Rating {shop.name}
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-lg">
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
          >
            How was it?
          </h2>
          <p style={{ color: "#6F4E37", fontSize: 15, lineHeight: 1.6 }}>
            Your notes help the community discover the best cozy corners.
          </p>
        </div>
        <RatingForm onSubmit={handleRatingSubmit} />
      </main>
    </div>
  );
}
