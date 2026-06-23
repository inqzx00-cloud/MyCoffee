export interface CoffeeShop {
  id: string;
  name: string;
  location: string;
  image_url: string;
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
