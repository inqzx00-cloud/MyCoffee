export interface CoffeeShop {
  id: string;
  name: string;
  location: string;
  image_url: string;
  lat: number;
  lng: number;
}

export interface Rating {
  id: string;
  shop_id: string;
  coffee: number;
  vibe: number;
  internet: number;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  points: number;
}

export interface Avatar {
  id: string;
  emoji: string;
  label: string;
  color: string;
  bg: string;
}

export const AVATARS: Avatar[] = [
  { id: "fox",      emoji: "🦊", label: "The Fox",       color: "#fff", bg: "#D9A066" },
  { id: "bear",     emoji: "🐻", label: "The Bear",      color: "#fff", bg: "#6F4E37" },
  { id: "owl",      emoji: "🦉", label: "The Owl",       color: "#fff", bg: "#3E2C23" },
  { id: "cat",      emoji: "🐱", label: "The Cat",       color: "#fff", bg: "#A65D57" },
  { id: "hedgehog", emoji: "🦔", label: "The Wanderer",  color: "#fff", bg: "#7A8F7B" },
  { id: "rabbit",   emoji: "🐰", label: "The Dreamer",   color: "#fff", bg: "#C08080" },
  { id: "deer",     emoji: "🦌", label: "The Gentle",    color: "#fff", bg: "#A67C52" },
  { id: "penguin",  emoji: "🐧", label: "The Regular",   color: "#fff", bg: "#4A6670" },
];
