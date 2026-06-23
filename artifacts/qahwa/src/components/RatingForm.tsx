import { useState, useRef } from "react";
import { StarRating } from "./StarRating";
import { Coffee, Wifi, Heart } from "lucide-react";

interface RatingFormProps {
  onSubmit: (ratings: { coffee: number; vibe: number; internet: number }) => void;
  isSubmitting?: boolean;
}

const LABELS: Record<number, string> = {
  0: "Tap to rate",
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

const LABEL_COLORS: Record<number, string> = {
  0: "#C8B89A",
  1: "#A65D57",
  2: "#C08060",
  3: "#A67C52",
  4: "#7A8F7B",
  5: "#D9A066",
};

interface CategoryRowProps {
  icon: React.ReactNode;
  label: string;
  emoji: string;
  value: number;
  onChange: (v: number) => void;
  accentColor: string;
  last?: boolean;
}

function CategoryRow({ icon, label, emoji, value, onChange, accentColor, last }: CategoryRowProps) {
  return (
    <div>
      <div style={{ padding: "18px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {icon}
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "#3E2C23" }}>
              {emoji} {label}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: LABEL_COLORS[value],
              transition: "color 0.2s ease",
            }}>
              {value > 0 ? `${value}/5` : ""}
            </span>
            <span style={{ fontSize: 12, color: "#A67C52", marginLeft: value > 0 ? 6 : 0 }}>
              {LABELS[value]}
            </span>
          </div>
        </div>
        <StarRating value={value} onChange={onChange} size="lg" />
        {/* Mini progress bar */}
        <div style={{ height: 3, borderRadius: 99, background: "#E8D5BE", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 99,
            width: `${(value / 5) * 100}%`,
            background: accentColor,
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>
      {!last && <div style={{ height: 1, background: "#E8D5BE" }} />}
    </div>
  );
}

export function RatingForm({ onSubmit, isSubmitting }: RatingFormProps) {
  const [coffee, setCoffee] = useState(0);
  const [vibe, setVibe] = useState(0);
  const [internet, setInternet] = useState(0);
  const [clickPressed, setClickPressed] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const isValid = coffee > 0 && vibe > 0 && internet > 0;
  const avg = isValid ? Number(((coffee + vibe + internet) / 3).toFixed(1)) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ coffee, vibe, internet });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }} data-testid="rating-form">

      {/* Live average preview */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px 20px",
        borderRadius: 16,
        background: avg ? "rgba(217,160,102,0.12)" : "rgba(232,213,190,0.4)",
        border: `1px solid ${avg ? "#D9A06640" : "#E8D5BE"}`,
        transition: "all 0.3s ease",
        gap: 10,
      }}>
        {avg ? (
          <>
            <span style={{ fontSize: 32, fontWeight: 800, color: "#D9A066", fontFamily: "'Playfair Display', serif", transition: "all 0.2s ease" }}>
              {avg}
            </span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6F4E37" }}>Overall score</div>
              <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                {[1,2,3,4,5].map(s => (
                  <div key={s} style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: s <= Math.round(avg) ? "#D9A066" : "#E8D5BE",
                    transition: "background 0.2s ease",
                  }} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <span style={{ fontSize: 13, color: "#A67C52", fontStyle: "italic" }}>
            Rate all three categories to see your overall score
          </span>
        )}
      </div>

      {/* Rating card */}
      <div style={{
        background: "rgba(251,243,234,0.95)",
        border: "1px solid #E8D5BE",
        borderRadius: 24,
        padding: "0 22px",
        boxShadow: "0 4px 24px rgba(62,44,35,0.1)",
      }}>
        <CategoryRow
          icon={<Coffee size={16} color="#D9A066" />}
          label="Coffee Quality"
          emoji="☕"
          value={coffee}
          onChange={setCoffee}
          accentColor="#D9A066"
        />
        <CategoryRow
          icon={<Heart size={16} color="#A65D57" />}
          label="Vibe & Atmosphere"
          emoji="🎧"
          value={vibe}
          onChange={setVibe}
          accentColor="#A65D57"
        />
        <CategoryRow
          icon={<Wifi size={16} color="#7A8F7B" />}
          label="Internet & Seating"
          emoji="📶"
          value={internet}
          onChange={setInternet}
          accentColor="#7A8F7B"
          last
        />
      </div>

      {/* Submit button */}
      <button
        ref={btnRef}
        type="submit"
        disabled={!isValid || isSubmitting}
        onMouseDown={() => isValid && setClickPressed(true)}
        onMouseUp={() => setClickPressed(false)}
        onMouseLeave={() => setClickPressed(false)}
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
          transform: clickPressed ? "scale(0.96)" : "scale(1)",
          transition: "transform 0.12s ease, box-shadow 0.2s ease, background 0.2s ease",
        }}
        data-testid="button-submit-rating"
      >
        {isSubmitting ? "Brewing…" : `Submit Rating (+15 pts)${avg ? ` · ${avg} avg` : ""}`}
      </button>
    </form>
  );
}
