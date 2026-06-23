import { useState } from "react";
import { StarRating } from "./StarRating";
import { Coffee, Wifi, Heart } from "lucide-react";

interface RatingFormProps {
  onSubmit: (ratings: { coffee: number; vibe: number; internet: number }) => void;
  isSubmitting?: boolean;
}

interface CategoryRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  last?: boolean;
}

function CategoryRow({ icon, label, value, onChange, last }: CategoryRowProps) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {icon}
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 17, fontWeight: 600, color: "#3E2C23",
            }}>
              {label}
            </label>
          </div>
          <span style={{ fontSize: 13, color: "#A67C52", fontWeight: 500 }}>
            {value > 0 ? `${value}/5` : "Tap to rate"}
          </span>
        </div>
        <StarRating value={value} onChange={onChange} size="lg" />
      </div>
      {!last && <div style={{ height: 1, background: "#E8D5BE" }} />}
    </div>
  );
}

export function RatingForm({ onSubmit, isSubmitting }: RatingFormProps) {
  const [coffee, setCoffee] = useState(0);
  const [vibe, setVibe] = useState(0);
  const [internet, setInternet] = useState(0);

  const isValid = coffee > 0 && vibe > 0 && internet > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ coffee, vibe, internet });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }} data-testid="rating-form">
      <div
        style={{
          background: "rgba(251,243,234,0.95)",
          border: "1px solid #E8D5BE",
          borderRadius: 24,
          padding: "0 24px",
          boxShadow: "0 4px 24px rgba(62,44,35,0.1)",
        }}
      >
        <CategoryRow
          icon={<Coffee size={18} color="#D9A066" />}
          label="Coffee Quality"
          value={coffee}
          onChange={setCoffee}
        />
        <CategoryRow
          icon={<Heart size={18} color="#A65D57" />}
          label="Vibe & Atmosphere"
          value={vibe}
          onChange={setVibe}
        />
        <CategoryRow
          icon={<Wifi size={18} color="#7A8F7B" />}
          label="Internet & Seating"
          value={internet}
          onChange={setInternet}
          last
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        style={{
          width: "100%",
          padding: "14px 24px",
          fontSize: 17,
          fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "0.02em",
          borderRadius: 99,
          border: "none",
          cursor: isValid ? "pointer" : "not-allowed",
          background: isValid ? "#6F4E37" : "#D9A06655",
          color: isValid ? "#F5E9DA" : "#A67C52",
          boxShadow: isValid ? "0 4px 20px rgba(111,78,55,0.3)" : "none",
          transition: "all 0.2s ease",
          transform: "translateY(0)",
        }}
        onMouseOver={e => {
          if (isValid) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(111,78,55,0.35)";
          }
        }}
        onMouseOut={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = isValid ? "0 4px 20px rgba(111,78,55,0.3)" : "none";
        }}
        data-testid="button-submit-rating"
      >
        {isSubmitting ? "Brewing…" : "Submit Rating (+15 pts)"}
      </button>
    </form>
  );
}
