import { CoffeeShop, Rating } from "../types";

export const SHOPS: CoffeeShop[] = [
  {
    id: "tulip-and-grounds",
    name: "Tulip & Grounds",
    location: "Portland, OR",
    image_url: "https://picsum.photos/seed/tulip-and-grounds/600/400",
    lat: 45.5231,
    lng: -122.6765,
  },
  {
    id: "sonder-coffee",
    name: "Sonder Coffee",
    location: "Austin, TX",
    image_url: "https://picsum.photos/seed/sonder-coffee/600/400",
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    id: "the-still-cup",
    name: "The Still Cup",
    location: "Brooklyn, NY",
    image_url: "https://picsum.photos/seed/the-still-cup/600/400",
    lat: 40.6782,
    lng: -73.9442,
  },
  {
    id: "arabica-house",
    name: "Arabica House",
    location: "Chicago, IL",
    image_url: "https://picsum.photos/seed/arabica-house/600/400",
    lat: 41.8781,
    lng: -87.6298,
  },
  {
    id: "mellow-fellow",
    name: "Mellow Fellow",
    location: "Nashville, TN",
    image_url: "https://picsum.photos/seed/mellow-fellow/600/400",
    lat: 36.1627,
    lng: -86.7816,
  },
  {
    id: "vessel-and-bean",
    name: "Vessel & Bean",
    location: "Seattle, WA",
    image_url: "https://picsum.photos/seed/vessel-and-bean/600/400",
    lat: 47.6062,
    lng: -122.3321,
  },
  {
    id: "morning-ritual",
    name: "Morning Ritual",
    location: "San Francisco, CA",
    image_url: "https://picsum.photos/seed/morning-ritual/600/400",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: "dust-and-bloom",
    name: "Dust & Bloom",
    location: "Denver, CO",
    image_url: "https://picsum.photos/seed/dust-and-bloom/600/400",
    lat: 39.7392,
    lng: -104.9903,
  },
];

export const INITIAL_RATINGS: Rating[] = [
  { id: "r1", shop_id: "tulip-and-grounds", coffee: 5, vibe: 4, internet: 3, created_at: new Date().toISOString() },
  { id: "r2", shop_id: "sonder-coffee",     coffee: 4, vibe: 5, internet: 4, created_at: new Date().toISOString() },
  { id: "r3", shop_id: "the-still-cup",     coffee: 5, vibe: 5, internet: 2, created_at: new Date().toISOString() },
  { id: "r4", shop_id: "arabica-house",     coffee: 3, vibe: 4, internet: 5, created_at: new Date().toISOString() },
  { id: "r5", shop_id: "mellow-fellow",     coffee: 4, vibe: 5, internet: 4, created_at: new Date().toISOString() },
  { id: "r6", shop_id: "vessel-and-bean",   coffee: 5, vibe: 3, internet: 4, created_at: new Date().toISOString() },
  { id: "r7", shop_id: "morning-ritual",    coffee: 4, vibe: 4, internet: 3, created_at: new Date().toISOString() },
  { id: "r8", shop_id: "dust-and-bloom",    coffee: 4, vibe: 5, internet: 5, created_at: new Date().toISOString() },
];
