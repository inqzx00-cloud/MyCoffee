import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES = { sm: 16, md: 22, lg: 30 };

export function StarRating({ value, onChange, readOnly = false, size = "md" }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const [pressed, setPressed] = useState(false);

  const active = hovered > 0 ? hovered : value;
  const px = SIZES[size];

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => setHovered(0)}
      data-testid="star-rating"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const lit = star <= active;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => {
              onChange?.(star);
              setPressed(true);
              setTimeout(() => setPressed(false), 150);
            }}
            onMouseEnter={() => !readOnly && setHovered(star)}
            style={{
              background: "none",
              border: "none",
              padding: 2,
              cursor: readOnly ? "default" : "pointer",
              transform: pressed && lit ? "scale(0.85)" : hovered === star && !readOnly ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.15s ease",
              display: "flex",
            }}
            data-testid={`star-${star}`}
          >
            <Star
              size={px}
              style={{
                fill: lit ? "#D9A066" : "transparent",
                color: lit ? "#D9A066" : "#C8B89A",
                transition: "fill 0.12s ease, color 0.12s ease",
                filter: lit && hovered === star ? "drop-shadow(0 0 4px #D9A06688)" : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
