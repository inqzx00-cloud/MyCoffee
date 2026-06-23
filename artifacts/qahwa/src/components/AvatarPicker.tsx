import { AVATARS, Avatar } from "../types";
import { useAppContext } from "../context/AppContext";
import { X } from "lucide-react";

interface AvatarPickerProps {
  onClose: () => void;
}

export function AvatarPicker({ onClose }: AvatarPickerProps) {
  const { avatar, setAvatar } = useAppContext();

  const handleSelect = (a: Avatar) => {
    setAvatar(a);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      data-testid="avatar-picker-overlay"
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl p-8 shadow-2xl"
        style={{ background: "#FBF3EA", border: "1.5px solid #D9A066" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6F4E37] hover:text-[#3E2C23] transition-colors"
          data-testid="avatar-picker-close"
        >
          <X size={20} />
        </button>

        <h2
          className="mb-1 text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif", color: "#3E2C23" }}
        >
          Choose your spirit
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#6F4E37" }}>
          Your avatar appears on the map wherever you've claimed a café.
        </p>

        <div className="grid grid-cols-4 gap-3">
          {AVATARS.map((a) => {
            const isSelected = avatar?.id === a.id;
            return (
              <button
                key={a.id}
                data-testid={`avatar-option-${a.id}`}
                onClick={() => handleSelect(a)}
                className="flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all duration-200 hover:scale-105"
                style={{
                  background: isSelected ? a.bg : "transparent",
                  outline: isSelected ? `2.5px solid ${a.bg}` : "2px solid transparent",
                  outlineOffset: "2px",
                }}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm"
                  style={{ background: a.bg }}
                >
                  {a.emoji}
                </span>
                <span
                  className="text-center text-[10px] font-medium leading-tight"
                  style={{ color: isSelected ? a.bg : "#6F4E37" }}
                >
                  {a.label}
                </span>
              </button>
            );
          })}
        </div>

        {avatar && (
          <p className="mt-6 text-center text-sm" style={{ color: "#7A8F7B" }}>
            Currently: {avatar.emoji} {avatar.label}
          </p>
        )}
      </div>
    </div>
  );
}
