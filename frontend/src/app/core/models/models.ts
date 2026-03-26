// ==================== USUARIO ====================
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'client' | 'admin' | 'workshop_owner' | 'store_owner';
  phone?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ==================== TALLERES ====================
export interface Workshop {
  id: number;
  name: string;
  slug?: string;
  address: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  whatsapp?: string;
  email?: string;
  description?: string;
  schedule?: Record<string, { open: string | null; close: string | null }>;
  type: 'mecanico' | 'electrico' | 'hojalateria' | 'pintura' | 'general' | 'especializado' | 'llanteria' | 'aceite';
  rating: number;
  review_count: number;
  logo?: string;
  active: boolean;
  verified: boolean;
  featured_until?: string;
  services?: WorkshopService[];
  images?: WorkshopImage[];
  reviews?: WorkshopReview[];
  distance?: number;
}

export interface WorkshopService {
  id: number;
  workshop_id: number;
  name: string;
  category?: string;
  description?: string;
  price_from?: number;
  price_to?: number;
}

export interface WorkshopImage {
  id: number;
  workshop_id: number;
  image: string;
  caption?: string;
  order: number;
}

export interface WorkshopReview {
  id: number;
  user_id: number;
  workshop_id: number;
  rating: number;
  comment?: string;
  tags?: string[];
  created_at: string;
  user?: User;
}

// ==================== REFACCIONARIAS ====================
export interface Store {
  id: number;
  name: string;
  slug?: string;
  address: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  whatsapp?: string;
  email?: string;
  description?: string;
  schedule?: Record<string, { open: string | null; close: string | null }>;
  type: 'refaccionaria' | 'agencia' | 'especializada' | 'generic';
  rating: number;
  review_count: number;
  logo?: string;
  active: boolean;
  verified: boolean;
  images?: StoreImage[];
  parts?: Part[];
  reviews?: StoreReview[];
  distance?: number;
}

export interface StoreImage {
  id: number;
  store_id: number;
  image: string;
  caption?: string;
  order: number;
}

export interface StoreReview {
  id: number;
  user_id: number;
  store_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  user?: User;
}

// ==================== REFACCIONES ====================
export interface Part {
  id: number;
  store_id: number;
  name: string;
  slug?: string;
  brand?: string;
  part_number?: string;
  description?: string;
  image?: string;
  price: number;
  stock: number;
  condition: 'new' | 'used' | 'refurbished';
  warranty?: string;
  category: string;
  rating: number;
  review_count: number;
  active: boolean;
  store?: Store;
  vehicles?: Vehicle[];
  images?: PartImage[];
  reviews?: PartReview[];
}

export interface PartImage {
  id: number;
  part_id: number;
  image: string;
  caption?: string;
  order: number;
}

export interface PartReview {
  id: number;
  user_id: number;
  part_id: number;
  rating: number;
  comment?: string;
  verified_purchase: boolean;
  created_at: string;
  user?: User;
}

// ==================== VEHÍCULOS ====================
export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  engine: string;
  version?: string;
  transmission?: string;
}

// ==================== RESPUESTAS PAGINADAS ====================
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// ==================== FILTROS ====================
export interface WorkshopFilters {
  search?: string;
  type?: string;
  service_category?: string;
  min_rating?: number;
  city?: string;
  lat?: number;
  lng?: number;
  page?: number;
}

export interface StoreFilters {
  search?: string;
  type?: string;
  min_rating?: number;
  city?: string;
  lat?: number;
  lng?: number;
  page?: number;
}

export interface PartFilters {
  brand?: string;
  model?: string;
  year?: number | string;
  engine?: string;
  category?: string;
  store_id?: number;
  condition?: string;
  price_min?: number;
  price_max?: number;
  search?: string;
  sort?: 'rating' | 'price_asc' | 'price_desc' | 'newest';
  page?: number;
}
