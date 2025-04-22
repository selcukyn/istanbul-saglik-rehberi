export interface HealthInstitution {
  _id: number;
  "Saglik Tesisi Adi": string;
  "Ana Kategori": string;
  "Alt Kategori": string;
  "Ilce Adi": string;
  "Il Adi": string;
  "Mahalle Adi": string;
  ADRES: string;
  Latitude: number;
  Longitude: number;
  IL_ADI?: string;
  ILCE_ADI?: string;
  SAGLIK_TESISI_ADI?: string;
  ANA_KATEGORI?: string;
  ALT_KATEGORI?: string;
  ENLEM?: number;
  BOYLAM?: number;
  distance?: number; // Mesafe bilgisi için yeni alan
}

export interface FilterOptions {
  il: string;
  ilce: string;
  anaKategori: string;
  altKategori: string;
  searchTerm: string;
}

// Kategori ikonları için yeni interface
export interface CategoryIcon {
  [key: string]: string; // Alt kategori adı: SVG path
}
